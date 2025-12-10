/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HostConfig } from './HostConfig';
import type { NetworkSettings } from './NetworkSettings';
export type Container = {
    Id: string;
    Name: string;
    Image: string;
    ImageID: string;
    Command: Array<string>;
    Created: string;
    State: string;
    Status: string;
    Ports: Record<string, any>;
    Labels: Record<string, any>;
    NetworkSettings: NetworkSettings;
    HostConfig: HostConfig;
    IPAddress?: (string | null);
};

