/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataResponse } from '../models/DataResponse';
import type { LXCContainerCreate } from '../models/LXCContainerCreate';
import type { SuccessResponse } from '../models/SuccessResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LxcService {
    /**
     * List Lxc Containers Endpoint
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static listLxcContainersEndpointLxcContainersGet(): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lxc/containers',
        });
    }
    /**
     * Create Lxc Container Endpoint
     * @param requestBody
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static createLxcContainerEndpointLxcContainersPost(
        requestBody: LXCContainerCreate,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lxc/containers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Lxc Container Endpoint
     * @param name
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static getLxcContainerEndpointLxcContainersNameGet(
        name: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lxc/containers/{name}',
            path: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Lxc Container Endpoint
     * @param name
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static deleteLxcContainerEndpointLxcContainersNameDelete(
        name: string,
    ): CancelablePromise<SuccessResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/lxc/containers/{name}',
            path: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Start Lxc Container Endpoint
     * @param name
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static startLxcContainerEndpointLxcContainersNameStartPost(
        name: string,
    ): CancelablePromise<SuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lxc/containers/{name}/start',
            path: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Stop Lxc Container Endpoint
     * @param name
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static stopLxcContainerEndpointLxcContainersNameStopPost(
        name: string,
    ): CancelablePromise<SuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lxc/containers/{name}/stop',
            path: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
