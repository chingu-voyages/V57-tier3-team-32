import app from "./app.js";
import Env from "./config/env.js";

const PORT = Env.PORT;
if (PORT == undefined) {
  throw new Error("PORT env var not set");
}

app.listen(PORT, function onServerListen() {
  console.info(`> listening to http://localhost:${PORT}`);
});
