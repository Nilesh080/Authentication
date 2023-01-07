const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const { response } = require("express");
const { on } = require("events");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/" , function(req , res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    // console.log(firstName , lastName , email);
    const data = {
        members:[ {email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]   
  };
  const jasonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/7dae4f9704";

  const options = {
    method:"POST",
    auth: "nilesh080:b53c58025f0bdac56cb53ea1e488f696-us13"
  }

  const request = https.request(url , options , function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
     
    response.on("data" , function(data){
        console.log(JSON.parse(data));
    })

  });
  request.write(jasonData);
  request.end();


});
 
app.post("/failure" , function(req , res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 , function(req , res){
    console.log("Server is running on the port 3000");
});


// API Keys
// b53c58025f0bdac56cb53ea1e488f696-us13

// api id
// 7dae4f9704