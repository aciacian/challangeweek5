const express = require("express");
const db = require("./models");
const app = express();
const carRoutes = require("./routes/carRoutes")
var bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

app.use("/api/v1/cars",carRoutes)

app.get("/",async(req,res)=>{
    const data = await db.Car1.findAll();
    res.render("index",{data});
})

app.get("/add-car",(req,res)=>{
    res.render("add-car");
})

app.post('/addnewcar',async (req, res) => {

    try {
    
        console.log(JSON.stringify(req.body.nama));
        console.log(JSON.stringify(req.body.hargasewa));
        console.log(JSON.stringify(req.body.ukuran));
        console.log(JSON.stringify(req.body.urlfoto));
     
        const user = await new db.Car1(req.body) // here is where I was getting req.body as undefined before using body-parser
        
        user.save().then(() => {
            res.status(200).send('<script>alert("Add Sukses");window.location.href="/"</script>')
        }).catch((error) => {
           // res.status(400).send(error)
           
        })
        //res.redirect('/add-car?status=ok')
        
    
    
    } catch(error) {
    
    console.error(error)
    
    }
    
    })

    app.get('/update-car/:id', (req, res) => {  
        db.Car1.findAll({
            where: {
                id: req.params.id
            }
            })
            .then((result) => {
                if (result) {
                    res.render('update-car.ejs',{
                    id:req.params.id,
                    nama: result[0].nama, 
                    ukuran: result[0].ukuran,
                    hargasewa: result[0].hargasewa,
                    urlfoto: result[0].urlfoto
                });
                   resolve(result);
                }
            }).catch(error => {
               // reject(error);
            });  
        //var id = req.params.id; 
  
          

           console.log(req.params.id);
        });

app.post('/updatedata/:id', async (req, res, next) => {
    const id = req.params.id;

    db.Car1.update(req.body, {
      where: { id: id}
    })
      .then(num => {
        if (num == 1) {
            res.status(200).send('<script>alert("Update Sukses");window.location.href="/"</script>')
          
        } else {
            console.log(req.body.nama);
          res.send({
            message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Car with id=" + id
        });
      });
      
});


app.post('/delete-car/:id', function(req, res){
    db.Car1.destroy({
        where: {
            id: req.params.id
        }
        })
        .then( () => {
            //res.status(200).send();
            res.status(200).send('<script>alert("Hapus Sukses");window.location.href="/"</script>');
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
        //res.redirect('/')
 });


app.listen(100,()=>{ //create server
    console.log('server running on port 100');
}) ;