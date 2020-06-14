module.exports = {
  //creando un middleware para proteger las rutas
  deslogueado(req, res, next) {
    //si esta autenticado tiene permiso de acceder a las rutas
    if (req.isAuthenticated()) {
      return next();
    } else {
      //sino redireccion al login
      return res.redirect("/login");
    }
  },
  //este metodo se ejecuta cuandl el usuario esta logueado, no se mostrara
  //las rutas de registro y login.
  loguado(req, res, next) {
    //si esta autenticado tiene permiso de acceder a las rutas
    if (!req.isAuthenticated()) {
      return next();
    } else {
      //sino redireccion al login
      return res.redirect("/perfil");
    }
  },
};
