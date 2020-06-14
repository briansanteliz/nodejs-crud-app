const { Router } = require("express");
const passport = require("passport");
const {deslogueado, loguado} = require('../lib/protected')
const router = Router();

//RUTAS DE REGISTRO
router.get("/registro", loguado, (req, res) => {
  res.render("auth/registro");
});
router.post(
  "/registro",loguado, 
  passport.authenticate("local.registro", {
    successRedirect: "/perfil",
    failureRedirect: "/registro",
    failureFlash: true, //habilidad mensajes de flash
  })
);

router.get("/perfil", deslogueado, (req, res) => {
  res.render('perfil');
  console.log(req.user)
}); // FIN RUTAS DE REGISTRO

//RUTAS DE LOGIN
router.get('/login',loguado, (req,res)=>{
  res.render('auth/login')
})

router.post('/login', loguado,(req,res, next)=>{
  passport.authenticate('local.login', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
})//FIN RUTAS DE LOGIN


//RUTA DE LOGOUT
router.get('/logout', (req,res)=>{
  req.logOut() // meotodo de passport para elimina la session del servidor
  res.redirect('/login')
})
module.exports = router;
