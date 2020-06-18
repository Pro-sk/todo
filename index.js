const mongoose = require('mongoose');
var mongo = require('mongodb')
var http = require('http');
var os = require('os');
var dns = require('dns');
const net = require('net');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');


mongoose.connect('mongodb+srv://sundar:sAniBhai7208@@todo-0l4te.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
});

const todo = new mongoose.Schema({
    task: {type:String},
    date:Date
  });

const Todo = mongoose.model('Todo', todo);
const app = express();
const server = http.createServer(app);
server.listen(process.env.PORT||5000);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.get('/',function(req,res){
    const fetchTask = Todo.find({},function(err,data){
    const newData = data;
    res.render('index',{data:newData});
    });
})
app.post('/',urlencodedParser,function(req,res){
    const task = new Todo({task:req.body.task,date:Date.now()});
    task.save(function (err, data) {
    if (err) return console.error(err);
    const fetchTask = Todo.find({},function(err,data){
        const newData = data;
        res.render('index',{data:newData});
    });
  });
})

app.delete('/',urlencodedParser,function(req,res){
    var myquery = {_id: new mongo.ObjectId(req.body.id)};
    db.collection("todos").deleteOne(myquery,function(err,data){

    });
    const fetchTask = Todo.find({},function(err,data){
        const newData = data;
        res.render('index',{data:newData});
    });

})

app.get('/about',function(req,res){
    const data = {
        title:'About us Page'
    };
    res.render('about',{data:data});
})








// fs.stat('index.txt',(err,data)=>{
//     console.log(data.isFile());
//     console.log(data.isDirectory());
//     console.log(data);
// })

// fs.open('index.txt','r',(err,data)=>{
//     fs.readFile('index.txt',(err,data)=>{
//         console.log(data.toString());
//     })
// });


// const cipher = crypto.createCipher('aes192', 'a password');  
// var encrypted = cipher.update('Hello JavaTpoint', 'utf8', 'hex');  
// cipher.update()
// encrypted += cipher.final('hex');  
// console.log(encrypted); 

// const decipher = crypto.createDecipher('aes192', 'a password');  
// var encrypted = '4ce3b761d58398aed30d5af898a0656a3174d9c7d7502e781e83cf6b9fb836d5';  
// var decrypted = decipher.update(encrypted, 'hex', 'utf8');  
// decrypted += decipher.final('utf8');  
// console.log(decrypted);  

// var secret = 'my name';
// const hash = crypt.createHmac('sha256',secret).update('Welcome to JavaTpoint').digest('hex');  ;
// console.log(hash);
// const client = net.connect(54074,()=>{
//     console.log("Connected successfully");
// });
// console.log(dns.getServers());
// dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {  
//     console.log(hostname, service);  
// });
// dns.resolve4(os.hostname(),(err,add)=>{
//     if(err)
//     {
//         throw err;
//     }
//     add.forEach(a=>{
//         console.log(a);
//         dns.(a,(err,hostnames)=>{
//             console.log(`The reverse for this ${a} is = %s`,hostnames);
//         });
//     })
// })

// http.createServer(function(req,res){

//     // console.log("Hello World");
//     // // setTimeout(()=>{
//     // //     console.log('Hello World');
//     // // },1000);
//     // console.log(os.hostname());
//     // console.log(os.tmpdir());
//     // console.log(os.type());
//     // console.log("os.networkInterfaces(): \n",os.networkInterfaces()); 
// }).listen(8081);