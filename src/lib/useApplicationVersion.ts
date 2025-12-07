'use client';

import { useState, useEffect } from 'react';
import { getApplicationVersion } from '@/actions/info';

interface VersionInfo {
  rawVersion: string;
  formattedVersion: string;
  frontendVersion: string;
  isLoading: boolean;
  error: string | null;
}

export function useApplicationVersion(): VersionInfo {
  const [rawVersion, setRawVersion] = useState<string>('');
  const [formattedVersion, setFormattedVersion] = useState<string>('Unknown Version');
  const [frontendVersion, setFrontendVersion] = useState<string>('test');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set frontend version from env
    setFrontendVersion(process.env.NEXT_PUBLIC_APP_VERSION || 'test');

    const fetchVersion = async () => {
      try {
        const response = await getApplicationVersion();
        if (response.data?.version) {
          const version = response.data.version;
          setRawVersion(version);

          let displayVersion = version;
          if (version.startsWith('v')) {
            displayVersion = version; // e.g. v1.2.3
          } else if (/[0-9a-fA-F]{7}/.test(version)) {
            displayVersion = `Commit: ${version}`; // e.g. a1b2c3d
          } else if (version.toLowerCase() === 'test') {
            displayVersion = 'Test Build';
          } else {
            displayVersion = `Dev: ${version}`;
          }
          setFormattedVersion(displayVersion);
        } else {
          setFormattedVersion('Unknown Version');
        }
      } catch (err) {
        console.error('Failed to fetch application version:', err);
        setError('Failed to load version');
        setFormattedVersion('Unknown Version');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVersion();
  }, []);

  return { rawVersion, formattedVersion, frontendVersion, isLoading, error };
}
