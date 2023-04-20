import { app } from ".";

const port = process.env.port

app.listen(port, () => console.log(`Server running on port ${port}`))
