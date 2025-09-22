import tktEslintConfig from "@thekeytechnology/frontend-config/eslint.config.js";
import tseslint from "typescript-eslint";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default tseslint.config(...tktEslintConfig, {
	ignores: ["**/.react-router/**", "**/apps/backend/**"],
});
