const express = require('express');
const router = express.Router();
const jugueteCtrl = require('../controllers/juguetes.controller');

router.post('/',jugueteCtrl.addJuguete);

router.get('/',jugueteCtrl.getJuguetes);

router.get('/juguete/:id',jugueteCtrl.getJuguete);

router.get('/jugueteByName/:name',jugueteCtrl.getByName);

router.patch('/:id',jugueteCtrl.updateJuguete);

router.delete('/:id',jugueteCtrl.deleteJuguete);

router.get('/categoria',jugueteCtrl.getCategoria)

module.exports = router;
