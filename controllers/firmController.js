const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({storage:storage})


const addFirm = async(req,res)=>{
    
try{
    const {firmName,area,category,region,offer}= req.body;
    const image = req.file?req.file.filename:undefined;

    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        res.status(404).json({message:"vendor not found"})
    }
    const firm = new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor:vendor._id
    });
     
    await firm.save();
    vendor.firm.push(firm._id);
    await vendor.save();
    return res.status(200).json({message:"Firm added successfully"})

}catch(error){
   console.log(error);
   res.status(500).json("Internal server error")
}
}

const deleteFirmById = async(req,res)=>{
    try{
        const firmId = req.params.firmId;

        const deleteFirm = await Firm.findByIdAndDelete(firmId);
        if(!deleteFirm){
            return res.status(404).json({error:"No Firm found"})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = { 
    addFirm: [upload.single('image'), 
    addFirm],
    deleteFirmById
 };
