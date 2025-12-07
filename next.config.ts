import type { NextConfig } from "next";
import { execSync } from "child_process";

let version = "test";

// Allow overriding via environment variable (useful for CI)
if (process.env.APP_VERSION) {
  version = process.env.APP_VERSION;
} else {
  try {
    // Try to get the latest tag pointing to the current commit
    version = execSync("git describe --tags --exact-match 2>/dev/null")
      .toString()
      .trim();
  } catch {
    try {
      // Fallback to short commit hash
      version = execSync("git rev-parse --short HEAD 2>/dev/null")
        .toString()
        .trim();
    } catch {
      // Fallback to "test" remains
      console.warn("Could not determine git version, defaulting to 'test'");
    }
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
};

export default nextConfig;
