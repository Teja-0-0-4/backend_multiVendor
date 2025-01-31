const express = require('express');
const { addFirm } = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const firmController = require('../controllers/firmController');

const router = express.Router();

router.post('/add-firm', verifyToken, addFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type',"image/jpeg");
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

router.delete("/firmId",firmController.deleteFirmById);

module.exports = router;
