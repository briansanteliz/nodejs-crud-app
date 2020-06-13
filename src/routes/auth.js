const {Router} = require('express')
const router = Router();

router.get('/registro', (req,res)=>{
    res.render('auth/registro')
  
})
router.post('/registro', (req,res)=>{
    res.send('Enviando')
})

module.exports = router