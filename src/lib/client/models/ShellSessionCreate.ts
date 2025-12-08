/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShellType } from './ShellType';
/**
 * Request to create a new shell session.
 */
export type ShellSessionCreate = {
    /**
     * Type of shell session
     */
    shell_type: ShellType;
    /**
     * Target (container ID, hostname, etc.)
     */
    target: string;
    /**
     * User to execute commands as
     */
    user?: (string | null);
    /**
     * Working directory
     */
    working_dir?: (string | null);
    /**
     * Environment variables
     */
    environment?: (Record<string, string> | null);
    /**
     * Shell command for Docker exec
     */
    docker_command?: (string | null);
    /**
     * SSH port
     */
    ssh_port?: (number | null);
    /**
     * Path to SSH private key
     */
    ssh_key_path?: (string | null);
    /**
     * SSH password (if not using key)
     */
    ssh_password?: (string | null);
};

