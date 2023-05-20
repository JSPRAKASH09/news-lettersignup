const express=require("express");
const bosyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bosyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(process.env.PORT||3000,function(){
    console.log("Server Started");
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})


app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;

    var data ={
        members :[
            {
                email_address :email,
                status :"subscribed",
                merge_fields :{
                    FNAME :firstname,
                    LNAME:lastname
                }
            }
        ]
    };
     
    const jsondata=JSON.stringify(data);
    const url= "https://us21.api.mailchimp.com/3.0/lists/202c7b0a44";
    const options={
        method:"POST",
        auth:"jsprakash:b7ca84f101794bab25c341e45ae3260a-us212"
    }

   const request= https.request(url,options,function(response){
       
      if (response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }

     response.on("data",function(data){
  
        console.log(JSON.parse(data))
    })
    })
    
    console.log(firstname,lastname,email);

request.write(jsondata);
request.end();
});

app.post("/failure",function(req,res){
        res.redirect("/");
    });

// api keys
// b7ca84f101794bab25c341e45ae3260a-us21

// audience id 202c7b0a44