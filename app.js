console.log("hi zuni")

let tokenWali = require('jsonwebtoken');


let myExpress = require('express');

let mreiApp = myExpress();
mreiApp.get('/abc',function(req,res){
    // let users = [
    //     {
    //         name:"ali"
    //     },
    //     {
    //         name:"aliya",
    //     },
    //     {
    //         name:"alina",
    //     },
    // ];
    

    
    res.json(users);
})

mreiApp.use(myExpress.json());
let users = [];


//Post, create
//Put,update
//get, recieve
//Delete,del

mreiApp.post('/create-user', function(req, res){

    users.push(req.body);
    console.log(req.body)
    res.end("data chal agya");

});
mreiApp.delete('/user-delete', function(req, res){

    users = users.filter(user=>user.id != req.query.anc);
    
    res.json({success:true})

    console.log(req.query.anc);

});
mreiApp.put('/user-update', function(req, res){

    let userIndex = users.findIndex(user=>user.id == req.body.id);
    users[userIndex] = req.body;

    res.json({
        success:true
    })

}) 
mreiApp.get('/user-lao', function(req, res){

    let userMilgya = users.find(user=> user.id == req.query.id);
    res.json(userMilgya);
 
 });  

 
 
 mreiApp.post('/session-check', async (req, res)=>{


    tokenWali.verify(req.body.token, "apple sweet", function(err, dataObj){

    if(dataObj){

            let user = users.find(user=>user.id == dataObj.userKiId);

            res.json(user);
            console.log(true)
        }

    })


});

 mreiApp.post('/login',function(req, res){

    let userMilgya = users.find(user =>user.name == req.body.name && user.password == req.body.password);
    if(userMilgya){

        tokenWali.sign( {userKiId:userMilgya.id}, "apple sweet", {expiresIn:"2d"},function(err, myToken){

            res.json({
                userMilgya,
                myToken
            });
            

        });

    }
    res.json(userMilgya)
 });


 
mreiApp.use(myExpress.static('./server/build'))
mreiApp.listen(3040, function(){
    console.log("znui")
})