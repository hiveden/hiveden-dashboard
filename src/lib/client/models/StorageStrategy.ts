/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorageStrategy = {
    name: string;
    description: string;
    raid_level: StorageStrategy.raid_level;
    disks: Array<string>;
    usable_capacity: number;
    redundancy: string;
};
export namespace StorageStrategy {
    export enum raid_level {
        RAID0 = 'raid0',
        RAID1 = 'raid1',
        RAID5 = 'raid5',
        RAID6 = 'raid6',
        RAID10 = 'raid10',
        SINGLE = 'single',
    }
}

