const sumRequestHandler=(req,res)=>{
    const body=[];
    req.on('data',(chunk)=>{
        body.push(chunk);
    });
    req.on('end',()=>{
        const fullBody= Buffer.concat(body).toString();
        const params = new URLSearchParams(fullBody);
        const bodyObj = Object.fromEntries(params);
        const result = Number(bodyObj.first)+Number(bodyObj.second);
        res.setHeader('Content-Type','text/html');
        res.write(`<html>
           <head><title>practice set</title><head>
           <body>
               <h1>your sum is ${result}</h1>
               <a href="/home">go to Home</a>
           </body>
        </html>`
       );
    return res.end();
    })
}
module.exports=sumRequestHandler;