/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	// Build a minimal self-contained server in .next/standalone for the
	// CapRover container — no need to copy the full node_modules tree.
	output: "standalone",
};

export default config;
