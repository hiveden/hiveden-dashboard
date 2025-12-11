/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContainerCreate } from "../models/ContainerCreate";
import type { ContainerCreateResponse } from "../models/ContainerCreateResponse";
import type { ContainerListResponse } from "../models/ContainerListResponse";
import type { ContainerResponse } from "../models/ContainerResponse";
import type { NetworkCreate } from "../models/NetworkCreate";
import type { NetworkListResponse } from "../models/NetworkListResponse";
import type { NetworkResponse } from "../models/NetworkResponse";
import type { SuccessResponse } from "../models/SuccessResponse";
import type { TemplateCreate } from "../models/TemplateCreate";
import type { TemplateResponse } from "../models/TemplateResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DockerService {
  /**
   * Create Template
   * @param requestBody
   * @returns TemplateResponse Successful Response
   * @throws ApiError
   */
  public static createTemplateDockerContainersTemplatePost(requestBody: TemplateCreate): CancelablePromise<TemplateResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/docker/containers/template",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * List All Containers
   * @returns ContainerListResponse Successful Response
   * @throws ApiError
   */
  public static listAllContainersDockerContainersGet(): CancelablePromise<ContainerListResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/docker/containers",
    });
  }
  /**
   * Create New Container
   * @param requestBody
   * @returns ContainerCreateResponse Successful Response
   * @throws ApiError
   */
  public static createNewContainerDockerContainersPost(requestBody: ContainerCreate): CancelablePromise<ContainerCreateResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/docker/containers",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get One Container
   * @param containerId
   * @returns ContainerResponse Successful Response
   * @throws ApiError
   */
  public static getOneContainerDockerContainersContainerIdGet(containerId: string): CancelablePromise<ContainerResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/docker/containers/{container_id}",
      path: {
        container_id: containerId,
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
  public static removeOneContainerDockerContainersContainerIdDelete(containerId: string): CancelablePromise<SuccessResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/docker/containers/{container_id}",
      path: {
        container_id: containerId,
      },
      errors: {
        400: `Bad Request: Container is running or other client-side error.`,
        422: `Validation Error`,
      },
    });
  }
  /**
   * Start One Container
   * @param containerId
   * @returns ContainerResponse Successful Response
   * @throws ApiError
   */
  public static startOneContainerDockerContainersContainerIdStartPost(containerId: string): CancelablePromise<ContainerResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/docker/containers/{container_id}/start",
      path: {
        container_id: containerId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Stop One Container
   * @param containerId
   * @returns ContainerResponse Successful Response
   * @throws ApiError
   */
  public static stopOneContainerDockerContainersContainerIdStopPost(containerId: string): CancelablePromise<ContainerResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/docker/containers/{container_id}/stop",
      path: {
        container_id: containerId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Restart One Container
   * @param containerId
   * @returns ContainerResponse Successful Response
   * @throws ApiError
   */
  public static restartOneContainerDockerContainersContainerIdRestartPost(containerId: string): CancelablePromise<ContainerResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/docker/containers/{container_id}/restart",
      path: {
        container_id: containerId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Stream Container Logs
   * Stream container logs in real-time using Server-Sent Events.
   * Args:
   * container_id: Container ID or name
   * follow: If True, stream logs in real-time (default: True)
   * tail: Number of lines to show from the end (default: 100)
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
    follow?: boolean | null,
    tail?: number | null,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/docker/containers/{container_id}/logs",
      path: {
        container_id: containerId,
      },
      query: {
        follow: follow,
        tail: tail,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * List All Networks
   * @returns NetworkListResponse Successful Response
   * @throws ApiError
   */
  public static listAllNetworksDockerNetworksGet(): CancelablePromise<NetworkListResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/docker/networks",
    });
  }
  /**
   * Create New Network
   * @param requestBody
   * @returns NetworkResponse Successful Response
   * @throws ApiError
   */
  public static createNewNetworkDockerNetworksPost(requestBody: NetworkCreate): CancelablePromise<NetworkResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/docker/networks",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get One Network
   * @param networkId
   * @returns NetworkResponse Successful Response
   * @throws ApiError
   */
  public static getOneNetworkDockerNetworksNetworkIdGet(networkId: string): CancelablePromise<NetworkResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/docker/networks/{network_id}",
      path: {
        network_id: networkId,
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
  public static removeOneNetworkDockerNetworksNetworkIdDelete(networkId: string): CancelablePromise<SuccessResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/docker/networks/{network_id}",
      path: {
        network_id: networkId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
