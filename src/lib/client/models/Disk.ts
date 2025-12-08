/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Partition } from './Partition';
export type Disk = {
    name: string;
    path: string;
    size: number;
    model?: (string | null);
    serial?: (string | null);
    rotational: boolean;
    partitions?: Array<Partition>;
    is_system?: boolean;
    available?: boolean;
    raid_group?: (string | null);
    raid_level?: (string | null);
};

