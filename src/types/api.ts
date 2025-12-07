// Auto-generated from OpenAPI spec

// Common Response Types
export interface DataResponse<T = any> {
  status: string;
  message?: string | null;
  data?: T | null;
}

export interface SuccessResponse {
  status: string;
  message?: string | null;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

// Docker Types
export interface DockerContainer {
  Name: string;
  Image: string;
  Command?: string | null;
  Env?: EnvVar[] | null;
  Ports?: Port[] | null;
  Mounts?: Mount[] | null;
  Labels?: Record<string, string> | null;
}

// Docker container with runtime info (returned from list/get endpoints)
export interface DockerContainerInfo extends DockerContainer {
  Id: string;
  State: string;
  Status: string;
}

export interface EnvVar {
  Name: string;
  Value: string;
}

export interface Port {
  HostPort: number;
  container_port: number;
  protocol?: string; // default: "tcp"
}

export interface Mount {
  source: string;
  target: string;
  type?: string; // default: "bind"
}

export interface NetworkCreate {
  name: string;
}

// Container Create Request Types
export interface CreateEnvVar {
  name: string;
  value: string;
}

export interface CreatePort {
  host_port: number;
  container_port: number;
  protocol: "tcp" | "udp";
}

export interface CreateMount {
  source: string;
  target: string;
  type: "bind" | "volume";
}

export interface ContainerCreateRequest {
  // Docker Config
  name: string;
  image: string;
  command?: string;
  env?: CreateEnvVar[];
  ports?: CreatePort[];
  mounts?: CreateMount[];
  labels?: Record<string, string>;

  // System Metadata
  is_container: boolean; // true = Run now, false = Save template only
  enabled: boolean;      // Default true
  type: "docker";        // Fixed value
}

// LXC Types
export interface LXCContainerCreate {
  name: string;
  template?: string; // default: "ubuntu"
}

// Shares Types
export interface SMBShareCreate {
  name: string;
  path: string;
  comment?: string | null; // default: ""
  read_only?: boolean; // default: false
  browsable?: boolean; // default: true
  guest_ok?: boolean; // default: false
}

export interface ZFSPoolCreate {
  name: string;
  devices: string[];
}

export interface ZFSDatasetCreate {
  name: string;
}

// Storage Types
export interface Partition {
  name: string;       // e.g., "sda1"
  path: string;       // e.g., "/dev/sda1"
  size: number;       // in bytes
  fstype: string | null; // e.g., "ext4", "vfat", "swap"
  mountpoint: string | null; // e.g., "/", "/boot"
}

export interface Disk {
  name: string;       // e.g., "sda"
  path: string;       // e.g., "/dev/sda"
  size: number;       // in bytes
  model: string | null;
  serial: string | null;
  rotational: boolean; // true = HDD, false = SSD (Use for icons)
  partitions: Partition[];
  is_system: boolean;  // If true, display a "System" badge and disable selection
  available: boolean;  // If true, this disk can be used for new storage strategies
  
  // New Fields for RAID Grouping
  raid_group?: string; // e.g. "md0", "md127"
  raid_level?: string; // e.g. "raid1", "raid5"
}

export interface SmartAttribute {
  id: number;
  name: string;
  value: number;
  worst: number;
  thresh: number;
  raw: { value: number; string: string };
}

export interface SmartData {
  healthy: boolean;      // true if overall assessment is PASSED
  health_status: string; // "Passed" or "Failed"
  temperature?: number;  // in Celsius
  power_on_hours?: number;
  power_cycles?: number;
  model_name?: string;
  serial_number?: string;
  firmware_version?: string;
  rotation_rate?: number;
  attributes: SmartAttribute[]; // Raw table of SMART attributes
}

export interface DiskDetail extends Disk {
  vendor?: string;
  bus?: string;        // "ATA", "USB", "NVMe"
  smart?: SmartData;   // Optional, might be null if smartctl fails or no support
}

export type RaidLevel = "raid0" | "raid1" | "raid5" | "raid6" | "raid10" | "single";

export interface StorageStrategy {
  name: string;        // e.g., "Balanced (RAID 5)"
  description: string; // Marketing text explaining pros/cons
  raid_level: RaidLevel;
  disks: string[];     // Array of disk paths involved, e.g. ["/dev/sdb", "/dev/sdc"]
  usable_capacity: number; // Expected size after formatting (bytes)
  redundancy: string;  // e.g., "Can withstand 1 drive failure"
}

export interface ApplyStrategyResponse {
  job_id: string;
}

// WebSocket Messages
export interface JobLogMessage {
  type: "log";
  data: {
    timestamp: string;
    output: string;
    error: boolean;
  };
}

export interface JobCompletedMessage {
  type: "job_completed";
  data: {
    id: string;
    status: "completed" | "failed";
    exit_code: number;
  };
}

// Package Types
export enum PackageOperation {
  INSTALL = "INSTALL",
  UNINSTALL = "UNINSTALL"
}

export enum OSType {
  ARCH = "arch",
  DEBIAN = "debian",
  UBUNTU = "ubuntu",
  FEDORA = "fedora",
  CENTOS = "centos",
  RHEL = "rhel",
  ALL = "all"
}

export interface PackageStatus {
  name: string;
  title: string;
  description: string;
  operation: PackageOperation;
  os_types: OSType[];
  tags: string[];     // e.g. ["storage", "raid"]
  installed: boolean;
}
