/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OSType } from './OSType';
import type { PackageOperation } from './PackageOperation';
export type PackageStatus = {
    name: string;
    title: string;
    description: string;
    operation?: PackageOperation;
    os_types?: Array<OSType>;
    tags?: Array<string>;
    installed: boolean;
};

