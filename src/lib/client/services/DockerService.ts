/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataResponse } from '../models/DataResponse';
import type { DBContainerCreate } from '../models/DBContainerCreate';
import type { NetworkCreate } from '../models/NetworkCreate';
import type { SuccessResponse } from '../models/SuccessResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DockerService {
    /**
     * List All Containers
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static listAllContainersDockerContainersGet(): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/docker/containers',
        });
    }
    /**
     * Create New Container
     * @param requestBody
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static createNewContainerDockerContainersPost(
        requestBody: DBContainerCreate,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/docker/containers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get One Container
     * @param containerId
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static getOneContainerDockerContainersContainerIdGet(
        containerId: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/docker/containers/{container_id}',
            path: {
                'container_id': containerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove One Container
     * @param containerId
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static removeOneContainerDockerContainersContainerIdDelete(
        containerId: string,
    ): CancelablePromise<SuccessResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/docker/containers/{container_id}',
            path: {
                'container_id': containerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Start One Container
     * @param containerId
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static startOneContainerDockerContainersContainerIdStartPost(
        containerId: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/docker/containers/{container_id}/start',
            path: {
                'container_id': containerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Stop One Container
     * @param containerId
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static stopOneContainerDockerContainersContainerIdStopPost(
        containerId: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/docker/containers/{container_id}/stop',
            path: {
                'container_id': containerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Stream Container Logs
     * Stream container logs in real-time using Server-Sent Events.
     *
     * Args:
     * container_id: Container ID or name
     * follow: If True, stream logs in real-time (default: True)
     * tail: Number of lines to show from the end (default: 100)
     *
     * Returns:
     * StreamingResponse with text/event-stream content type
     * @param containerId
     * @param follow
     * @param tail
     * @returns any Successful Response
     * @throws ApiError
     */
    public static streamContainerLogsDockerContainersContainerIdLogsGet(
        containerId: string,
        follow?: (boolean | null),
        tail?: (number | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/docker/containers/{container_id}/logs',
            path: {
                'container_id': containerId,
            },
            query: {
                'follow': follow,
                'tail': tail,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List All Networks
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static listAllNetworksDockerNetworksGet(): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/docker/networks',
        });
    }
    /**
     * Create New Network
     * @param requestBody
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static createNewNetworkDockerNetworksPost(
        requestBody: NetworkCreate,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/docker/networks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get One Network
     * @param networkId
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static getOneNetworkDockerNetworksNetworkIdGet(
        networkId: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/docker/networks/{network_id}',
            path: {
                'network_id': networkId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove One Network
     * @param networkId
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static removeOneNetworkDockerNetworksNetworkIdDelete(
        networkId: string,
    ): CancelablePromise<SuccessResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/docker/networks/{network_id}',
            path: {
                'network_id': networkId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
