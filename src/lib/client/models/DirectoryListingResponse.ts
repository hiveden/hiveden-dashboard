/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileEntry } from './FileEntry';
export type DirectoryListingResponse = {
    success?: boolean;
    current_path: string;
    parent_path?: (string | null);
    entries: Array<FileEntry>;
    total_entries: number;
    total_size: number;
    total_size_human: string;
};

