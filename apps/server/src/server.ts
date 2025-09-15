import app from "./app.js"

const {PORT} = process.env
if (PORT == undefined) {
    throw new Error("PORT env var not set")
}

app.listen(PORT, function onServerListen() {
    console.log(`> listening to http://localhost:${PORT}`)
})
