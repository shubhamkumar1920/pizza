const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const StatusController = require('../app/http/controllers/admin/statusController')

// Middlewares
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')

function initRoutes(app) {
    app.get('/',homeController().index)

    app.get('/cart',cartController().index)
    
    app.post('/update-cart',cartController().update)

    app.get('/login',guest,authController().login)

    app.post('/login',authController().postLogin)

    app.get('/register',guest,authController().register)

    app.post('/logout',authController().logout)

    app.post('/register',authController().postRegister)

    // Customer routes
    app.post('/orders',auth,orderController().store)

    app.get('/customer/orders',auth,orderController().index)

    app.get('/customer/orders/:id',auth,orderController().show)

    // Admin routes
    app.get('/admin/orders',admin,AdminOrderController().index)

    app.post('/admin/order/status',admin,StatusController().update)

}
module.exports = initRoutes