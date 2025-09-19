export default {
  "apps/client/*.{js,ts,tsx,mjs,mts,cjs,cts}":
    "eslint -c apps/client/eslint.config.js --max-warnings 0",
  "{apps/server,configs,scripts}/*.{js,ts,tsx,mjs,mts,cjs,cts}":
    "eslint -c apps/server/eslint.config.js --max-warnings 0",
  "*": "prettier --write --ignore-unknown",
};
