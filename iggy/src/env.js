import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Server-side environment variables.
	 *
	 * Auth (BETTER_AUTH_*) and DATABASE_URL are temporarily disabled for the
	 * Sacrumpluto kiteboarding landing page. They're optional here so the app
	 * boots without provisioning a database or OAuth credentials.
	 */
	server: {
		BETTER_AUTH_SECRET: z.string().optional(),
		BETTER_AUTH_GITHUB_CLIENT_ID: z.string().optional(),
		BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string().optional(),
		DATABASE_URL: z.string().url().optional(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},

	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string(),
	},

	runtimeEnv: {
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		BETTER_AUTH_GITHUB_CLIENT_ID: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
		BETTER_AUTH_GITHUB_CLIENT_SECRET:
			process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
