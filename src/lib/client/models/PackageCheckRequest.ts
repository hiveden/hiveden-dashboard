/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to check if a package is installed.
 */
export type PackageCheckRequest = {
    /**
     * Name of the package to check
     */
    package_name: string;
    /**
     * Package manager (apt, yum, dnf, pacman, or auto)
     */
    package_manager?: (string | null);
};

