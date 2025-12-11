import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { listDirectory, searchFiles, getOperationStatus } from "@/actions/explorer";
import { DirectoryListingResponse, FileEntry, SortBy, SortOrder } from "@/lib/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";

interface ExplorerState {
  currentPath: string;
  files: FileEntry[];
  folders: FileEntry[];
  isLoading: boolean;
  error: string | null;
  selectedItems: Set<string>;
  history: string[];
  historyIndex: number;
  viewMode: "list" | "grid";
  showHidden: boolean;
  sortBy: SortBy;
  sortOrder: SortOrder;
  isSearching: boolean;
  searchQuery: string;
}

interface ExplorerContextType extends ExplorerState {
  navigateTo: (path: string) => void;
  navigateBack: () => void;
  navigateForward: () => void;
  navigateUp: () => void;
  refresh: () => void;
  toggleSelection: (name: string, multi?: boolean) => void;
  clearSelection: () => void;
  selectAll: () => void;
  setViewMode: (mode: "list" | "grid") => void;
  toggleHidden: () => void;
  setSort: (by: SortBy, order: SortOrder) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

const ExplorerContext = createContext<ExplorerContextType | null>(null);

export const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error("useExplorer must be used within an ExplorerProvider");
  }
  return context;
};

export function ExplorerProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>("/"); // Default to root, or fetch from URL
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [folders, setFolders] = useState<FileEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Navigation History
  const [history, setHistory] = useState<string[]>(["/"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // View Settings
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showHidden, setShowHidden] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [preSearchFiles, setPreSearchFiles] = useState<FileEntry[]>([]);
  const [preSearchFolders, setPreSearchFolders] = useState<FileEntry[]>([]);

  const loadDirectory = useCallback(
    async (path: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await listDirectory(path, sortBy, sortOrder, showHidden);

        if (data && data.entries) {
          const f = data.entries.filter((e) => e.type === "file");
          const d = data.entries.filter((e) => e.type === "directory");
          setFiles(f);
          setFolders(d);
        } else {
          setFiles([]);
          setFolders([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load directory");
        notifications.show({
          title: "Error",
          message: err.message || "Failed to load directory",
          color: "red",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [sortBy, sortOrder, showHidden],
  );

  // Initial load
  useEffect(() => {
    if (!isSearching) {
      loadDirectory(currentPath);
    }
  }, [currentPath, loadDirectory, isSearching]);

  const navigateTo = (path: string) => {
    if (path === currentPath) return;

    if (isSearching) {
      clearSearch();
    }

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setCurrentPath(path);
    setSelectedItems(new Set()); // Clear selection on nav
  };

  const navigateBack = () => {
    if (historyIndex > 0) {
      if (isSearching) clearSearch();
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const navigateForward = () => {
    if (historyIndex < history.length - 1) {
      if (isSearching) clearSearch();
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const navigateUp = () => {
    if (currentPath === "/") return;
    const parent = currentPath.split("/").slice(0, -1).join("/") || "/";
    navigateTo(parent);
  };

  const refresh = () => {
    if (isSearching) {
      performSearch(searchQuery);
    } else {
      loadDirectory(currentPath);
    }
  };

  const toggleSelection = (name: string, multi = false) => {
    setSelectedItems((prev) => {
      const newSet = new Set(multi ? prev : []);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const clearSelection = () => setSelectedItems(new Set());

  const selectAll = () => {
    const allNames = [...folders, ...files].map((e) => e.name);
    setSelectedItems(new Set(allNames));
  };

  const toggleHidden = () => setShowHidden((prev) => !prev);
  const setSort = (by: SortBy, order: SortOrder) => {
    setSortBy(by);
    setSortOrder(order);
  };

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    if (!isSearching) {
      // Save current state before search
      setPreSearchFiles(files);
      setPreSearchFolders(folders);
      setIsSearching(true);
    }

    setSearchQuery(query);
    setIsLoading(true);
    setError(null);

    try {
      const { operation_id } = await searchFiles({
        path: currentPath,
        pattern: query,
        show_hidden: showHidden,
      });

      if (!operation_id) {
        throw new Error("Failed to start search operation");
      }

      // Poll for status
      const pollInterval = setInterval(async () => {
        try {
          const response = await getOperationStatus(operation_id);
          const op = response.operation;

          if (op.status === "completed") {
            clearInterval(pollInterval);
            setIsLoading(false);

            if (op.result) {
              try {
                console.log("Result: ", op);
                const parsedResult = JSON.parse(op.result);
                // Assuming result structure contains entries or list of files
                // If parsedResult is directly the array of FileEntry
                const entries = (parsedResult.matches || parsedResult) as FileEntry[];

                if (Array.isArray(entries)) {
                  const f = entries.filter((e) => e.type === "file");
                  const d = entries.filter((e) => e.type === "directory");
                  setFiles(f);
                  setFolders(d);
                } else {
                  setFiles([]);
                  setFolders([]);
                }
              } catch (e) {
                console.error("Failed to parse search results", e);
                setFiles([]);
                setFolders([]);
              }
            } else {
              setFiles([]);
              setFolders([]);
            }
          } else if (op.status === "failed" || op.status === "cancelled") {
            clearInterval(pollInterval);
            setIsLoading(false);
            throw new Error(op.error_message || "Search operation failed");
          }
          // If 'pending' or 'in_progress', continue polling
        } catch (pollErr: any) {
          clearInterval(pollInterval);
          setIsLoading(false);
          setError(pollErr.message || "Error checking search status");
          notifications.show({
            title: "Search Error",
            message: pollErr.message,
            color: "red",
          });
        }
      }, 1000);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Search failed");
      notifications.show({
        title: "Search Error",
        message: err.message,
        color: "red",
      });
    }
  };

  const clearSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
    setFiles(preSearchFiles);
    setFolders(preSearchFolders);
    setPreSearchFiles([]);
    setPreSearchFolders([]);
    // Reload directory to ensure freshness if we want, but restoring state is faster for "cancel" feel
    // loadDirectory(currentPath);
  };

  return (
    <ExplorerContext.Provider
      value={{
        currentPath,
        files,
        folders,
        isLoading,
        error,
        selectedItems,
        history,
        historyIndex,
        viewMode,
        showHidden,
        sortBy,
        sortOrder,
        isSearching,
        searchQuery,
        navigateTo,
        navigateBack,
        navigateForward,
        navigateUp,
        refresh,
        toggleSelection,
        clearSelection,
        selectAll,
        setViewMode,
        toggleHidden,
        setSort,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
}
