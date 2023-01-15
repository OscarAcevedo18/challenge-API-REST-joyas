const pool = require("../helpers/connectionDb");
const format = require("pg-format");
const { errorServer } = require("../helpers/errors");

const getJewels = async ({ limits = 6, order_by = "stock_ASC", page = 1 }) => {
  try {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formattedQuery = format(
      "SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s",
      campo,
      direccion,
      limits,
      offset
    );
    const { rows: inventario } = await pool.query(formattedQuery);
    return inventario;
  } catch {
    res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
      throw new Error(e);
    }
};

const getJewelsForFilters = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  try {
    let filtros = [];
    let valoresAceptados = /^[0-9]+$/;

    if (precio_min) {
      if (precio_min.match(valoresAceptados)) {
        if (precio_min < precio_max) {
          filtros.push(`precio >= ${precio_min}`);
          console.log("datos en el precio minimo es numericos");
        }
      } else {
        console.log("datos en el precio máximo NO es numericos");
      }
    }

    if (precio_max) {
      if (precio_max.match(valoresAceptados)) {
        filtros.push(`precio <= ${precio_max}`);
        console.log("datos en los precios  maximos son numericos");
      } else {
        console.log("datos en los precios  maximos NO son numericos");
      }
    }
    if (categoria) filtros.push(`categoria = '${categoria}'`);
    console.log("categoria existe");
    if (metal) filtros.push(`metal = '${metal}'`);
    console.log("metal existe");

    let consulta = "SELECT * FROM inventario";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      consulta += ` WHERE ${filtros}`;
      console.log(filtros);
    }
    const { rows: inventario } = await pool.query(consulta);
    return inventario;
  } catch {
    res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
      throw new Error(e);
    }
};

module.exports = {
  getJewels,
  getJewelsForFilters,
};
