import dotenv from "dotenv";
// server.js
import app from "./src/app.js";

// Configure dotenv
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
