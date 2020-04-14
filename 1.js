

var express=require("express")
var mysql=require("mysql")
var body=require("body-parser")
var con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"login_form"
})
var app=express()
app.set("view engine","ejs")
app.use(body.urlencoded({extended:false}))





