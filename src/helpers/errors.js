const errorServer = {
  status: 500,
  statusText: "error",
  text: "Error en los datos ingresados",
};

const filtersNotFoundError = {
  status: 400,
  statusText: "error",
  text: "No ha ingresado ningun filtro",
};

module.exports = { errorServer, filtersNotFoundError };