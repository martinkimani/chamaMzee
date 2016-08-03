
var path = require('path');
// Load controllers
var homeController = require('./controllers/home');
var groupController = require('./controllers/group');

module.exports = function(app) {
    app.get('/', homeController.index);

    app.post('/register', homeController.addUser);
    app.get('/users', homeController.users);
    app.get('/getUser/:id', homeController.getUser);
    app.put('/updateUser/:user_id', homeController.updateUser);
    app.post('/login', homeController.loginUser);
    app.get('/userGroups', restrict,groupController.userGroups);
    app.get('/user_detail', homeController.userDetail);
};

// restrict 
function restrict(req, res, next) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  if (req.session.user) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    req.session.error = 'Access denied!';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    //res.sendFile(path.join(__dirname, 'index.html')); 
    res.sendFile(path.join(__dirname, 'index.html'));
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
};
//// Landing page route
//router.get('/', homeController.index);
//router.post('/api/register', homeController.addUser);
//router.get('/api/users', homeController.users);
//router.get('/api/getUser/:id', homeController.getUser);
//router.put('/api/updateUser/:user_id', homeController.updateUser);
//router.post('/api/login', homeController.loginUser);
//router.get('/api/userGroups/:user_id',restrict, groupController.userGroups);