import { execSync } from "node:child_process";

console.info(">> checking prepare script requirements");
if (process.env.NODE_ENV !== "production" && isInsideRepo()) {
  console.info(">> executing prepare script");
  execSync("git config core.hooksPath .githooks", { stdio: "inherit" });
} else {
  console.info(">> requirements not met. skipping");
}

function isInsideRepo() {
  try {
    const result = execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf-8",
    });
    return result.trim() === "true";
  } catch {
    return false;
  }
}
