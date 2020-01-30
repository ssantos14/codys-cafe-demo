const Sequelize = require('sequelize')
const db = require('./database')
const Op = Sequelize.Op

const Coffee = db.define('coffee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

Coffee.prototype.getIngredients = function() {
  return this.ingredients.join(', ')
}

Coffee.findByIngredient = function (ingredient) {
  const drink = Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [ingredient]
      }
    }
  })
  return drink
}

Coffee.beforeSave(function(coffeeInstance){
  if (!coffeeInstance.ingredients.includes('love')) {
    coffeeInstance.ingredients.push('love')
  }
})

module.exports = Coffee
