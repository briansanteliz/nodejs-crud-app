const { Router } = require("express");
const passport = require("passport");
const router = Router();

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
});

module.exports = router;
