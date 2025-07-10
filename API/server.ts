import app from "@/app"

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Docs: http://localhost:${PORT}/api/docs`)
  console.log(`Health: http://localhost:${PORT}/health`)
})
