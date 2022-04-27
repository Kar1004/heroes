const express = require('express')
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser"); 
const port = 3300;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Heros')

// app.use(express.static('public'))
app.use(cors())
app.use(morgan('tiny'))
// app.use(express.json())


const HerosSchema = new mongoose.Schema ({
    slug: String,
	name: String,
	power: [String],
	color: String,
	isAlive: Boolean,
	age: Number,
	image: String
})


const heroModel = mongoose.model('Heros', HerosSchema);

app.get('/' ,function (req ,res , next) {
    res.send("hello")
    
})


app.get('/heros' ,function(req,res,next){
    heroModel.find()
    .exec()
    .then( heros => {
    res.json(heros)
})

})


app.get('/heroes/:slug',function(req,res,next){
    const slug = req.params.slug;
  
  const heroes =  heroModel.find({slug}).exec().then((Heros)=>{
      console.log("heroes",Heros);
      res.json(Heros)
  })

})

app.get('/heroes/:slug/powers',function(req,res,next){
    const slug = req.params.slug;

    heroModel.find({slug}).exec().then((Heros)=>{
      console.log("heroes",Heros);
      res.json(Heros[0].power)
  })

})

app.post('/heroes',function(req,res,next){
  
  
  const heroes =  heroModel.find({slug}).exec().then((Heros)=>{
      console.log("heroes",Heros);
      res.json(Heros)
  })



// heroModel.insertMany(

//     [
//         {
//                     slug: "iron-man",
//             name: "Iron Man",
//             power: ["money"],
//             color: "red",
//             isAlive: true,
//             age: 46,
//             image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
//         },
//         {
//                     slug: "thor",
//             name: "Thor",
//             power: ["electricty", "worthy"],
//             color: "blue",
//             isAlive: true,
//             age: 300,
//             image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
//         },
//         {
//                     slug: "dardevil",
//             name: "Daredevil",
//             power: ["blind"],
//             color: "red",
//             isAlive: false,
//             age: 30,
//             image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
//         }
//     ]

// )


app.listen(port , function() {
    console.log('the server is started at' , port);
})