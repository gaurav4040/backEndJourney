 const http = require('http');
 const fs = require('fs');
 
 const server=http.createServer(
     (req,res)=>{
         console.log(req.url,req.method,req.headers);
 
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
            fs.writeFileSync('user.txt','gaurav Jangra');
            res.statusCode=302;
            res.setHeader('Location','/');
         }
         res.setHeader('Content-Type','text/html');
         res.write('<html>');
         res.write('<head><title>Complete Coding</title><head>');
         res.write('<body><h1>Like/share/subscribe</h1></body>');
         res.write('</html>');
         return res.end();
     });
 
 const PORT = 3030;
 server.listen(PORT,()=>{
     console.log(`server is running on http:://localhost:${PORT}`)
 }); 