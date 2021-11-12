const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const authRoute = require('./auth.route');
const deviceRoute = require('./device.route');
const actionRoute = require('./action.route');
const proxyRoute = require('./proxy.route');
const youtubeUrlRoute = require('./youtubeUrl.route');

const router = express.Router();

const apiRoutes = [
  {
    path: '/roles',
    route: deviceRoute,
  },
  {
    path: '/actions',
    route: actionRoute,
  },
  {
    path: '/proxys',
    route: proxyRoute,
  },
  {
    path: '/categories',
    route: youtubeUrlRoute,
  },
];

router.use('/auth', authRoute);

apiRoutes.forEach((route) => {
  router.use(route.path, authMiddleware, route.route);
});

module.exports = router;
