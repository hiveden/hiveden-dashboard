/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Partition } from './Partition';
import type { SmartData } from './SmartData';
export type DiskDetail = {
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
    vendor?: (string | null);
    bus?: (string | null);
    smart?: (SmartData | null);
};

