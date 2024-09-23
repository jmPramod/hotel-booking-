import express from "express"

const app=express()

app.get("/",(req,res)=>{

    res.send("hai")
})
app.listen(5300,()=>{
    console.log("server is running ");
    
})