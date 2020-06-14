const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const mysqlSession = require('express-mysql-session')
const hbslibs = require("./lib/handlebars");
const passport = require('passport')
//routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const linksRoutes = require("./routes/links");

//Key DB
const {database} = require('./keys')

//init
const app = express();
require('./lib/passport'); //require passport 

//settings
app.set("port", process.env.PORT || 2000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: hbslibs,
  })
);
app.set("view engine", "hbs");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'thisasimplesecretstringtothesessiones',
  resave:false,
  saveUninitialized:false,
  store: new mysqlSession(database)
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Variables Locals
app.use((req, res, next) => {
  res.locals.guardado = req.flash('guardado');
  res.locals.error = req.flash('error')
  next();
});
//Routes
app.use(indexRoutes);
app.use(authRoutes);
app.use("/links", linksRoutes);

//Start the server
const init = async () => {
  await app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
};
init();
