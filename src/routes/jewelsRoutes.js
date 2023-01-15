const express = require('express')
const router = express.Router()
const { reportRequest } = require('../middlewares/logger')

const { getAllJewels, getAllJewelsForFilters } = require('../controllers/jewelsController')

router.get('/inventario/joyas', reportRequest, getAllJewels)
router.get('/inventario/filtros', getAllJewelsForFilters)

router.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe")
  })

module.exports = router;