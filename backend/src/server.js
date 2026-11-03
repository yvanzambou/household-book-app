import "dotenv/config";
import { initDatabase } from "./db/init.js";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`Backend läuft auf Port ${PORT}`);
});
