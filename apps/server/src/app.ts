import express from 'express'

const app = express()

app.use(express.json())
app.use(function logIncomingRequests(req, _, next) {
  console.log(`${new Date().toISOString().slice(11, 19)} ${req.method} initiated on ${req.path}`)
  next()
})

app.use(function notFound(_, res) {
  res.status(404).json({ message: "Route not found" })
});

export default app
