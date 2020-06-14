const { Router } = require("express");
const router = Router();
const pool = require("../database");
const {deslogueado } = require('../lib/protected')

router.get("/add", deslogueado ,(req, res) => {
  res.render("links/add");
});
router.post("/add", deslogueado, async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = { title, url, description };
  await pool.query("INSERT INTO links set ?", [newLink]);
  req.flash('guardado', 'Dato Guardado Exitosamente!')
  res.redirect("/links");
});
router.get("/", deslogueado, async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

router.get("/delete/:id", deslogueado, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  req.flash('guardado', 'Dato Eliminado Exitosamente!')
  res.redirect("/links");
});
/* envia a una vista con el form de editar basado en el id */
router.get("/edit/:id", deslogueado, async (req, res) => {
  const { id } = req.params;
  const update = await pool.query("SELECT * FROM links WHERE ID = ?", [id]);
  res.render("links/edit", { update: update[0] }); //obten el primer indice del array
});
/* Recibe los datos del formulario de editar */
router.post("/edit/:id", deslogueado, async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newLink = { title, description, url };
  await pool.query("UPDATE links set ? WHERE ID = ?", [newLink, id]);
  req.flash('guardado', 'Dato Actualizado Exitosamente!')
  res.redirect("/links");
});

module.exports = router;
