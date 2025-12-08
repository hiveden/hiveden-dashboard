/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Network = {
    Name: string;
    Id: string;
    Created: string;
    Scope: string;
    Driver: string;
    EnableIPv6: boolean;
    IPAM: Record<string, any>;
    Internal: boolean;
    Attachable: boolean;
    Ingress: boolean;
    ConfigFrom: Record<string, any>;
    ConfigOnly: boolean;
    Containers: Record<string, any>;
    Options?: (Record<string, any> | null);
    Labels?: (Record<string, any> | null);
};

