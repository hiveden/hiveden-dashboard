/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataResponse } from '../models/DataResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PackagesService {
    /**
     * List Required Packages
     * List all required packages for the system and their installation status.
     *
     * Args:
     * tags: Comma-separated list of tags to filter packages by (e.g. "storage,system")
     *
     * Returns:
     * List of required packages with status
     * @param tags
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static listRequiredPackagesPkgsRequiredGet(
        tags?: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pkgs/required',
            query: {
                'tags': tags,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
