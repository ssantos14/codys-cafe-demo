const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  biography: {
    type: Sequelize.TEXT
  }
})

Pug.belongsTo(Coffee, {as: 'favoriteCoffee'});
Coffee.hasMany(Pug);

//console.log(Object.keys(Pug.prototype));

//Pug.hasMany(Pug, {as: 'friends'});

Pug.belongsToMany(Pug, {as: 'friends', through: 'friendship'})

Pug.prototype.isPuppy = function () {
  if (this.age < 1) return true
  return false
}

Pug.prototype.shortBio = function () {
  return this.biography.split(/[.!?]/)[0];
}

Pug.findByCoffee = async function (coffee) {
  // const coffeeObj = await Coffee.findOne({
  //   where: {
  //     name: coffee
  //   }
  // })
  // const Pugs = await Pug.findAll({
  //   include: ['favoriteCoffee'], 
  //   where: {
  //     favoriteCoffeeId: coffeeObj.id
  //   }
  // })

  return Pug.findAll({
    include: {
      model: Coffee,
      as: 'favoriteCoffee',
      where: {
        name: coffee
      }
    }
  })

  // return Pugs
}

Pug.beforeSave(pug => {
  pug.name = pug.name[0].toUpperCase() + pug.name.slice(1)
})

module.exports = Pug
