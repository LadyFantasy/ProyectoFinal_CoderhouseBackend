// const productosFile = require("../persistencia/productosFile.json");
const ProductosService = require("../persistencia/productos");

class ProductosController {
  constructor() {
    this.arrayProductos = [];
  }

  async listar() {
    const productos = await ProductosService.listar();
    this.arrayProductos = productos;
    return productos.length > 0 ? productos : { error: "no hay productos cargados" };
  }

  async listarId(id) {
    this.arrayProductos = await ProductosService.listar();
    const producto = await this.arrayProductos.find(prod => {
      return prod.id == id;
    });
    return producto ?? null;
  }

  async guardar(body) {
    this.arrayProductos = await ProductosService.listar();
    let { nombre, precio, foto, descripcion, codigo, stock } = body;
    if (nombre && precio && foto && descripcion && codigo && stock) {
      const id = this.arrayProductos.length + 1;
      const time = new Date();
      const timestamp = time.toUTCString();
      const producto = { id, timestamp, nombre, descripcion, precio, foto, codigo, stock };
      this.arrayProductos.push(producto);

      ProductosService.agregar(this.arrayProductos);
      return producto;
    } else return;
  }

  async actualizar(id, body) {
    let productExists = await this.listarId(id);
    this.arrayProductos = await ProductosService.listar();

    if (productExists && body) {
      const producto = this.arrayProductos.findIndex(product => product.id == id);
      Object.assign(this.arrayProductos[producto], body);
      ProductosService.agregar(this.arrayProductos);
      return this.arrayProductos[producto];
    } else return;
  }

  async borrar(id) {
    let productExists = await this.listarId(id);
    this.arrayProductos = await ProductosService.listar();

    if (productExists) {
      this.arrayProductos = this.arrayProductos.filter(product => product.id != id);
      ProductosService.agregar(this.arrayProductos);
      return productExists;
    } else return;
  }
}

module.exports = new ProductosController();
