var express=require("express")
const helmet = require('helmet')
var session = require('express-session')
var mysql=require("mysql")
var url=require("url")
const path = require('path');
const router = express.Router();
var body=require("body-parser")
const { check, validationResult } = require('express-validator');
var con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"login_form"
})
var app=express()
app.set("view engine","ejs")
app.use(body.urlencoded({extended:false}))
app.use(helmet())
app.set('trust proxy', 1) 
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))



app.get("/",(req,res)=>{
	con.query("select * from details",(e,a)=>{
		res.render("index",{a:a})
	})
})
app.get('/project1', function (req, res) {
  res.sendFile(__dirname + '/project1.html')
})
app.post("/",[
  check('name').isLength({ min: 3 }),
  check('email').isEmail(),
    check('contact').isNumeric(),
    check('contact').isLength({ min: 10}),
check('username').isLength({ min: 3 }),
  check('password').isLength({ min: 6})

],(req,res)=>{

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

	// res.json(req.body)
	let name=req.body.name
	let email=req.body.email
	let contact=req.body.contact
	let username=req.body.username
	let password=req.body.password
	

	let sql1=`select * from details where username='${username}'`
	let sql2=`insert into 
		details(name,email,contact,username,password)
		values("${name}","${email}","${contact}","${username}","${password}")

		`

	con.query(sql1,(e1,d1)=>{
		if(d1.length>0)
		{
			res.json({message:`cannot add ${username} already registered`})
		}
		else
		{
			con.query(sql2,(e2,d2)=>{
				if(e2){res.json(e2)}
				else{

					
					
			res.redirect("/project1")
				}
			})
		}
	})	
		
	})	




app.get("/delete/:id",(req,res)=>{
	// res.json(req.params)
	let id=req.params.id
	let sql=`delete from details where id=${id}`

	con.query(sql,(e,d)=>{
		if(!e){
			res.redirect("/")
		}
		else
		{
			res.json(e)
		}
	})
})
app.get("/edit/:id",(req,res)=>{
	let id=req.params.id
	let sql=`select * from details where id=${id}`

	con.query(sql,(e,d)=>{
		res.render("edit-form",{a:d})
	})
})

app.post("/update",(req,res)=>{
	// res.json(req.body)
	let id=req.body.id
	let name=req.body.name
	let email=req.body.email
	let contact=req.body.contact
	let username=req.body.username
	let password=req.body.password
	

	let sql=`update details set
	
	name='${name}',
	email='${email}',
	contact='${contact}',
	username='${username}',
	password='${password}',
	
	where id=${id}
	`
	con.query(sql,(e,d)=>{
		if(!e){
			res.redirect("/")
		}
		else
		{
			res.json(e)
		}
	})

})
app.listen(3500,()=>console.log("server running"))