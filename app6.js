var express=require("express")
var mysql=require("mysql")
var body=require("body-parser")
const helmet = require('helmet')
var session = require('express-session')
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
	con.query("select * from mem",(e,a)=>{
		res.render("index3",{a:a})
	})
})
app.post("/",(req,res)=>{
	// res.json(req.body)
	let name=req.body.name
	let email=req.body.email
	let contact=req.body.contact
	let city=req.body.city
	let university=req.body.university
	

	let sql1=`select * from mem where city='${city}'`
	let sql2=`insert into 
		mem(name,email,contact,city,university)
		values("${name}","${email}","${contact}","${city}","${university}")

		`

	con.query(sql1,(e1,d1)=>{
		if(d1.length>0)
		{
			res.json({message:`cannot add ${name} already registered`})
		}
		else
		{
			con.query(sql2,(e2,d2)=>{
				if(e2){res.json(e2)}
				else{
				res.redirect("/")
					
				}
			})
		}
	})	
	


})

app.get("/delete/:id",(req,res)=>{
	// res.json(req.params)
	let id=req.params.id
	let sql=`delete from mem where id=${id}`

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
	let sql=`select * from mem where id=${id}`

	con.query(sql,(e,d)=>{
		res.render("edit-form2",{a:d})
	})
})

app.post("/update",(req,res)=>{
	// res.json(req.body)
	let id=req.body.id
	let name=req.body.name
	let email=req.body.email
	let contact=req.body.contact
	let city=req.body.city
	let university=req.body.university
	

	let sql=`update details set
	
	name='${name}',
	email='${email}',
	contact='${contact}',
	city='${city}',
	university='${university}',
	
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
app.listen(3444,()=>console.log("server running"))