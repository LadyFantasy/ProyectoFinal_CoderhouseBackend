const express = require("express");
const app = express();
const config = require("./config/config.json")
const persistenceType = config.persistencia
// const MongoType = config.typeMongo
require(`./DBConfig/${persistenceType}`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTERS
const routerProductos = require("./routes/productos");
app.use("/productos", routerProductos);

const routerCarrito = require("./routes/carrito");
app.use("/carrito", routerCarrito);

// ruta "/" muestra index.html
app.use(express.static("public"));

// manejo de errores de aplicación
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Se rompió todo");
});

const puerto = process.env.PORT || 8080;

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
  console.log();
});
