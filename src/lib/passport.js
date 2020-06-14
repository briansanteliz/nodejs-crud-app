const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database");
const helpers = require("./helpers");

//creando la autenticacion con passport y obteniendo los campos del form
passport.use(
  "local.registro",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;
      const usuario = {
        username,
        password,
        fullname,
      };
      //encript la contraseña
      usuario.password = await helpers.encrypPassword(password);
      //guardon el usario
      const query = await db.query("INSERT INTO users SET ?", [usuario]);
      usuario.id = query.insertId; //agregando el id
      return done(null, usuario); //retorna error como null y recibee el obj user
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user.id) //agrega el id a la bd
});

passport.deserializeUser(async(id, done)=>{
  const resul = await db.query('SELECT * FROM users WHERE ID = ? ', [id])
  done(null, resul[0])
})