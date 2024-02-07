const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
