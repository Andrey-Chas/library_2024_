const Router = require('express-promise-router')

const router = new Router()
const mongoUtil = require('../utils/mongoUtils')


// export our router to be mounted by the parent application
module.exports = router

router.get('/', function (req, res) {
  res.render('login', {
    title: 'Login',
  });
});

router.post('/', async function (req, res) {
  console.log(req.body)

  const users = await mongoUtil.connectToMongo().then((db) => {
    return mongoUtil.findDocuments('users', { "email": req.body.email }).catch((error) => console.log(error))
  }).catch((error) => console.log(error));

  if (users.length > 0) {
    return res.status(400).json({ message: 'User already exists in our system' });
  }

  mongoUtil.connectToMongo().then((db) => {
    mongoUtil.insertDocument('users', { "email": req.body.email, "password": req.body.password })
      .then((result) => console.log(result.insertedId))
      .catch((error) => console.log(error));
  })
    .catch((error) => console.error(error));

  res.json({ message: 'Data received successfully' });
});

router.post('/login', async function (req, res) {
  const users = await mongoUtil.connectToMongo().then((db) => {
    console.log(req.body)

    return mongoUtil.findDocuments('users', { "email": req.body.email, "password": req.body.password }).catch((error) => console.error(error));
  }).catch((error) => console.error(error));

  if (users.length < 1) {
    return res.status(401).json({ message: 'Either username or password invalid!' });
  }

  res.redirect("/dashboard");
});

router.delete('/:id', async function (req, res) {
  console.log(req.params.id);

  res.json({ message: 'Deleted successfully!' });
});

router.get('/register', function (req, res) {
  res.render('register', {
    title: 'Register',
  });
});
