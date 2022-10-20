
const db = require("./../models");

const getAllData = async (req,res) =>{
    const allDataCars = await db.carlist.findAll()
    return res.json({message:"all data cars", data: allDataCars})
}

const addData = async(req,res)=>{
    const {nama, hargasewa, ukuran, urlfoto, createdate, updatedate} = req.body;
    const responAdd = await db.carlist.create({nama:nama, hargasewa:hargasewa, ukuran:ukuran, urlfoto:urlfoto, createdate:createdate, updatedate:updatedate});
    return res.json({message:"data successfully",data: responAdd})
}

const filterType = async (req, res) => {
    const ukuran = req.params.ukuran
    const nama = req.params.nama

    const query = req.query.q
    const items = await db.carlist.findAll({
        where: {
            ukuran: query
        }
    })

    res.render('index', {
       nama,
       ukuran,
       items,
       query
    })
}
module.exports = {addData,getAllData,filterType};