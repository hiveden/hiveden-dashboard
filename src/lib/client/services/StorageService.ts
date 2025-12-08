/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataResponse } from '../models/DataResponse';
import type { StorageStrategy } from '../models/StorageStrategy';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StorageService {
    /**
     * List Devices
     * List all block devices on the system.
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static listDevicesStorageDevicesGet(): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/devices',
        });
    }
    /**
     * Get Device Details
     * Get detailed information for a specific disk (including SMART data).
     * @param deviceName
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static getDeviceDetailsStorageDevicesDeviceNameGet(
        deviceName: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/devices/{device_name}',
            path: {
                'device_name': deviceName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Strategies
     * Suggests storage configuration strategies based on currently unused disks.
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static listStrategiesStorageStrategiesGet(): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/strategies',
        });
    }
    /**
     * Apply Strategy
     * Applies a storage strategy. Starts a background job.
     * @param requestBody
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static applyStrategyStorageApplyPost(
        requestBody: StorageStrategy,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/apply',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
