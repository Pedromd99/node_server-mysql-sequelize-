var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');

/* GET home page. */

var sequelize = new Sequelize("nodemysql", 'root', '123456', {
  host: "localhost",
  dialect: "mariadb",
  port: 3306,
  database: 'nodemysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const productos = sequelize.define('productos', {
  product_id: {
    type: Sequelize.SMALLINT,
    primaryKey: true
  },
  nombre: Sequelize.STRING
})

//get all
router.get('/', function (req, res, next) {
  productos.findAll({
      attributes: ['product_id', 'nombre']
    })

    .then(productos => {
      // var nombre = dataValues.nombre
      for (var i = 0; i < productos.length; i++)

        console.log(productos[i].nombre);

      res.render('index', {
        title: 'Express',
        nome: productos

      });
    })

    .catch(err => {
      console.log(err);
    })
});

//create
router.post('/new', function (req, res, next) {
  console.log(req.body);

  const {
    nuevop
  } = req.body;
  productos.create({
      nombre: nuevop

    })
    .then(productos => {
      // console.log(productos);

      res.redirect('/');
    });
})

//get 1
// router.get('/:id', function (req, res) {
//   productos.findAll({
//     where: {
//       product_id: product.id
//     }
//   })  
// })

router.get("/:id", function(req, res, next) {
  productos.findByPk(req.params.id)
  .then ((productos) =>{
    console.log(productos);
    
  })
})


//destroy
router.delete('/:id', function (req, res, next) {
  const product_id = req.params.id;
  productos.destroy({
      where: {
        product_id: product_id
      }
    })
    .then(status => {
      console.log(status);

    })
})


module.exports = router;