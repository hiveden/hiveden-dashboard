/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataResponse } from '../models/DataResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConfigService {
    /**
     * Submit Config
     * Submit a YAML configuration.
     * @param requestBody
     * @returns DataResponse Successful Response
     * @throws ApiError
     */
    public static submitConfigConfigPost(
        requestBody: string,
    ): CancelablePromise<DataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
