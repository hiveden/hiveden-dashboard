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
