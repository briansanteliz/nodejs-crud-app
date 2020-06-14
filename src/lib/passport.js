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
  done(null, user.id); //agrega el id a la bd
});

passport.deserializeUser(async (id, done) => {
  const resul = await db.query("SELECT * FROM users WHERE ID = ? ", [id]);
  done(null, resul[0]);
});

// AUTENTICACION PARA EL LOGIN

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const resul = await db.query("SELECT * FROM users WHERE username = ? ", [
        username,
      ]);
      //si el nombre de usuario existe
      if (resul.length > 0) {
        const user = resul[0];
        const comparePass = await helpers.comparePassword(
          password,
          user.password
        );
            //compara la contraseña
            if (comparePass) {
              done(null, user, req.flash('guardado', `Bienenido ${user.username}`));
            } else {
              done(null, false, req.flash('error', "La contraseña no es correcta"));
            }
        //si el nombre de  usuario NO existe
      } else {
        return done(null, false, req.flash('error', "El Nombre de usuario no existe."));
      }
    }
  )
);
