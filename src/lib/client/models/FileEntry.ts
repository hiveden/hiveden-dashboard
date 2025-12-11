/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileType } from './FileType';
export type FileEntry = {
    name: string;
    path: string;
    type: FileType;
    size: number;
    size_human: string;
    permissions: string;
    owner: string;
    group: string;
    modified?: (string | null);
    accessed?: (string | null);
    created?: (string | null);
    is_hidden: boolean;
    is_symlink: boolean;
    symlink_target?: (string | null);
    mime_type?: (string | null);
    permissions_octal?: (string | null);
    owner_id?: (number | null);
    group_id?: (number | null);
    inode?: (number | null);
    hard_links?: (number | null);
    is_readable?: (boolean | null);
    is_writable?: (boolean | null);
    is_executable?: (boolean | null);
};

