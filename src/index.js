const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const hbslibs = require("./lib/handlebars");

//routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const linksRoutes = require("./routes/links");


//init
const app = express();

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
app.use(express.static(path.join(__dirname, 'public')))

//Variables Locals
app.use((req, res, next) => {
  next();
});
//Routes
app.use(indexRoutes);
app.use(authRoutes);
app.use('/links', linksRoutes);

//Start the server
const init = async () => {
  await app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
};
init();
