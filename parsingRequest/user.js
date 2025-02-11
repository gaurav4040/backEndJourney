
 const fs = require('fs');
 
 const requestHandler=(req,res)=>{
         console.log(req.url,req.method);
 
         if(req.url==='/'){
             res.setHeader('Content-Type','text/html');
             res.write('<html>');
             res.write('<head><title>Complete Coding</title><head>');
             res.write('<body><h1>Enter your details : </h1>');
             res.write('<form action="/submit-details" method="POST">');
             res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
             res.write('<label for="male">Male</label>')
             res.write('<input type="radio" name="gender" id="male" value="male" />')
             res.write('<label for="female">Female</label>')
             res.write('<input type="radio" name="gender" id="female" value="female" />')
             res.write('<br><input type="submit" value="submit">');
             res.write('</form');


             res.write('</body>');
             res.write('</html>');
             return res.end();
         }
         else if(req.url.toLowerCase()==="/submit-details"&&req.method=="POST"){
            const body=[];
            req.on('data',chunk=>{
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end',()=>{
                const fullBody=Buffer.concat(body).toString();
                console.log(fullBody);
                const params = new URLSearchParams(fullBody);
                // const bodyObject={};
                // for(const [key,value] of params.entries()){
                //     bodyObject[key]=value;
                // }
                const bodyObject=Object.fromEntries(params);
                console.log(bodyObject)
                fs.writeFileSync('user.txt',JSON.stringify(bodyObject));
            });
            

            res.statusCode=302;
            res.setHeader('Location','/');
         }
         res.setHeader('Content-Type','text/html');
         res.write('<html>');
         res.write('<head><title>Complete Coding</title><head>');
         res.write('<body><h1>Like/share/subscribe</h1></body>');
         res.write('</html>');
         return res.end();
     };

     module.exports = requestHandler;
 
 