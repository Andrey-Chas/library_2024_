const Router = require('express-promise-router')

const router = new Router()


// export our router to be mounted by the parent application
module.exports = router

router.get('/', function (req, res) {
  res.render('login', {
    title: 'Register',
  });
});
