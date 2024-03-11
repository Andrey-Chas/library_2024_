const user = require('./user')
const dash = require('./dashboard')


module.exports = app => {
  app.use('/user', user)
  app.use('/dashboard', dash)
}