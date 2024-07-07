const express = require('express')
const database = require("./config/database")
var path = require('path');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")
const systemConfig = require("./config/system/system")

var bodyParser = require('body-parser')

var methodOverride = require('method-override')

require("dotenv").config();

database.connect();

const app = express()
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`))

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))

//tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//end tinyMCE

// flash
app.use(cookieParser('abcsdsbd'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

app.locals.prefixAdmin = systemConfig.prefixAdmin;

const port = process.env.PORT

route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example listening on port ${port}`)
})