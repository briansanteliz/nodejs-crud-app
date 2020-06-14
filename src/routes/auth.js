const { Router } = require("express");
const passport = require("passport");
const router = Router();

//RUTAS DE REGISTRO
router.get("/registro", (req, res) => {
  res.render("auth/registro");
});
router.post(
  "/registro",
  passport.authenticate("local.registro", {
    successRedirect: "/perfil",
    failureRedirect: "/registro",
    failureFlash: true, //habilidad mensajes de flash
  })
);

router.get("/perfil", (req, res) => {
  res.send("desde perfil");
}); // FIN RUTAS DE REGISTRO

//RUTAS DE LOGIN
router.get('/login', (req,res)=>{
  res.render('auth/login')
})

router.post('/login', (req,res, next)=>{
  passport.authenticate('local.login', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
})
module.exports = router;
