var express=require("express")
var mysql=require("mysql")
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




app.get("/",(req,res)=>{
	con.query("select * from details",(e,a)=>{
		res.render("index",{a:a})
	})
})
app.post("/",[
  check('name').isLength({ min: 3 }),
  check('email').isEmail(),
    check('contact').isNumeric(),
check('username').isLength({ min: 3 }),
 check('password').isLength({ min: 6 })

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
	
});
function hashing(){
	var s= password;
	var arr=[];
	arr= password.split();
	var m= a[3];
	a[0]=a[3];
	a[3]=m;
	var mypassword= arr.join();
	return mypassword;
}

	let sql1=`select * from details'`
	

	con.query(sql1,(e2,d2)=>{
				

					
					
			res.redirect("/")
				
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
app.listen(5000,()=>console.log("server running"))