/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataResponse } from '../models/DataResponse';
import type { PackageCheckRequest } from '../models/PackageCheckRequest';
import type { ShellSessionCreate } from '../models/ShellSessionCreate';
import type { SuccessResponse } from '../models/SuccessResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShellService {
    /**
     * Create Shell Session
     * Create a new shell session.
     *
     * Args:
     * request: Shell session creation request
     *
     * Returns:
     * Created session information
     *
     * Example for Docker:
     * ```json
     * {
         * "shell_type": "docker",
         * "target": "container_id_or_name",
         * "user": "root",
         * "working_dir": "/app"
         * }
         * ```
         *
         * Example for SSH:
         * ```json
         * {
             * "shell_type": "ssh",
             * "target": "192.168.1.100",
             * "user": "root",
             * "ssh_port": 22,
             * "ssh_key_path": "/path/to/key"
             * }
             * ```
             *
             * Example for Local:
             * ```json
             * {
                 * "shell_type": "local",
                 * "target": "localhost",
                 * "working_dir": "/tmp"
                 * }
                 * ```
                 * @param requestBody
                 * @returns DataResponse Successful Response
                 * @throws ApiError
                 */
                public static createShellSessionShellSessionsPost(
                    requestBody: ShellSessionCreate,
                ): CancelablePromise<DataResponse> {
                    return __request(OpenAPI, {
                        method: 'POST',
                        url: '/shell/sessions',
                        body: requestBody,
                        mediaType: 'application/json',
                        errors: {
                            422: `Validation Error`,
                        },
                    });
                }
                /**
                 * List Shell Sessions
                 * List all shell sessions.
                 *
                 * Args:
                 * active_only: If True, only return active sessions
                 *
                 * Returns:
                 * List of shell sessions
                 * @param activeOnly Only return active sessions
                 * @returns DataResponse Successful Response
                 * @throws ApiError
                 */
                public static listShellSessionsShellSessionsGet(
                    activeOnly: boolean = true,
                ): CancelablePromise<DataResponse> {
                    return __request(OpenAPI, {
                        method: 'GET',
                        url: '/shell/sessions',
                        query: {
                            'active_only': activeOnly,
                        },
                        errors: {
                            422: `Validation Error`,
                        },
                    });
                }
                /**
                 * Get Shell Session
                 * Get a specific shell session.
                 *
                 * Args:
                 * session_id: Session ID
                 *
                 * Returns:
                 * Shell session information
                 * @param sessionId
                 * @returns DataResponse Successful Response
                 * @throws ApiError
                 */
                public static getShellSessionShellSessionsSessionIdGet(
                    sessionId: string,
                ): CancelablePromise<DataResponse> {
                    return __request(OpenAPI, {
                        method: 'GET',
                        url: '/shell/sessions/{session_id}',
                        path: {
                            'session_id': sessionId,
                        },
                        errors: {
                            422: `Validation Error`,
                        },
                    });
                }
                /**
                 * Close Shell Session
                 * Close a shell session.
                 *
                 * Args:
                 * session_id: Session ID to close
                 *
                 * Returns:
                 * Success message
                 * @param sessionId
                 * @returns SuccessResponse Successful Response
                 * @throws ApiError
                 */
                public static closeShellSessionShellSessionsSessionIdDelete(
                    sessionId: string,
                ): CancelablePromise<SuccessResponse> {
                    return __request(OpenAPI, {
                        method: 'DELETE',
                        url: '/shell/sessions/{session_id}',
                        path: {
                            'session_id': sessionId,
                        },
                        errors: {
                            422: `Validation Error`,
                        },
                    });
                }
                /**
                 * Check Package
                 * Check if a package is installed on the local system.
                 *
                 * Args:
                 * request: Package check request
                 *
                 * Returns:
                 * Installation status and message
                 *
                 * Example:
                 * ```json
                 * {
                     * "package_name": "nginx",
                     * "package_manager": "auto"
                     * }
                     * ```
                     * @param requestBody
                     * @returns DataResponse Successful Response
                     * @throws ApiError
                     */
                    public static checkPackageShellPackagesCheckPost(
                        requestBody: PackageCheckRequest,
                    ): CancelablePromise<DataResponse> {
                        return __request(OpenAPI, {
                            method: 'POST',
                            url: '/shell/packages/check',
                            body: requestBody,
                            mediaType: 'application/json',
                            errors: {
                                422: `Validation Error`,
                            },
                        });
                    }
                    /**
                     * Create Docker Shell
                     * Create a shell session for a Docker container.
                     *
                     * This is a convenience endpoint that creates a Docker shell session.
                     *
                     * Args:
                     * container_id: Docker container ID or name
                     * user: User to execute commands as (default: root)
                     * working_dir: Working directory (default: /)
                     * shell_command: Shell command to use (default: /bin/bash)
                     *
                     * Returns:
                     * Created session information
                     * @param containerId
                     * @param user
                     * @param workingDir
                     * @param shellCommand
                     * @returns DataResponse Successful Response
                     * @throws ApiError
                     */
                    public static createDockerShellShellDockerContainerIdShellPost(
                        containerId: string,
                        user?: (string | null),
                        workingDir?: (string | null),
                        shellCommand?: (string | null),
                    ): CancelablePromise<DataResponse> {
                        return __request(OpenAPI, {
                            method: 'POST',
                            url: '/shell/docker/{container_id}/shell',
                            path: {
                                'container_id': containerId,
                            },
                            query: {
                                'user': user,
                                'working_dir': workingDir,
                                'shell_command': shellCommand,
                            },
                            errors: {
                                422: `Validation Error`,
                            },
                        });
                    }
                    /**
                     * Create Lxc Shell
                     * Create a shell session for an LXC container via SSH.
                     *
                     * This is a convenience endpoint that creates an SSH shell session to an LXC container.
                     *
                     * Args:
                     * container_name: LXC container name (will be used as hostname)
                     * user: User to execute commands as (default: root)
                     * working_dir: Working directory (default: /)
                     * ssh_port: SSH port (default: 22)
                     * ssh_key_path: Path to SSH private key
                     *
                     * Returns:
                     * Created session information
                     * @param containerName
                     * @param user
                     * @param workingDir
                     * @param sshPort
                     * @param sshKeyPath
                     * @returns DataResponse Successful Response
                     * @throws ApiError
                     */
                    public static createLxcShellShellLxcContainerNameShellPost(
                        containerName: string,
                        user?: (string | null),
                        workingDir?: (string | null),
                        sshPort?: (number | null),
                        sshKeyPath?: (string | null),
                    ): CancelablePromise<DataResponse> {
                        return __request(OpenAPI, {
                            method: 'POST',
                            url: '/shell/lxc/{container_name}/shell',
                            path: {
                                'container_name': containerName,
                            },
                            query: {
                                'user': user,
                                'working_dir': workingDir,
                                'ssh_port': sshPort,
                                'ssh_key_path': sshKeyPath,
                            },
                            errors: {
                                422: `Validation Error`,
                            },
                        });
                    }
                }
