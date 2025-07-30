import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/db.js";
connectDB();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
