const { getJewels, getJewelsForFilters } = require("../models/jewelsModel");
const { errorServer, filtersNotFoundError } = require("../helpers/errors")

// Filtrado de registros en una consulta
const getAllJewelsForFilters = async (req, res) => {
  try {
    const queryStrings = req.query;
    const { categoria, metal } = req.query;

    if (!categoria && !metal) {
      return res.status(filtersNotFoundError.status).send({
        status: filtersNotFoundError.statusText,
        data: filtersNotFoundError.text,
      });
    }

    const inventario = await getJewelsForFilters(queryStrings);
    res.json(inventario);
  } catch {
    res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
      throw new Error(e);
  }
};

const getAllJewels = async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventario = await getJewels(queryStrings);
    const HATEOAS = await jewelsHATEOAS(inventario);
    res.json(HATEOAS);
  } catch{
    res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
      throw new Error(e);
  }
};

const jewelsHATEOAS = (inventario) => {
  const results = inventario
    .map((m) => {
      return {
        name: m.nombre,
        href: `/inventario/filtros/${m.id}`,
      };
    })
    .slice(0, 6);
  const total = inventario.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};

module.exports = { getAllJewels, getAllJewelsForFilters };