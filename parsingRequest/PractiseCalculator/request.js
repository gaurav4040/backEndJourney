const sumRequestHandler= require('./sum');

const requestHandler=(req,res)=>{
    console.log(req.url,req.method);
    if(req.url==='/'||req.url.toLowerCase()==='/home'){
        res.setHeader('Content-Type','text/html');
             res.write(`<html>
                <head><title>practice set</title><head>
                <body>
                    <h1>welcome to calculator </h1>
                    <a href="/calculator">go to calculator</a>
                </body>
             </html>`
            );
        return res.end();
    }else if(req.url.toLowerCase()==='/calculator'){
        res.setHeader('Content-Type','text/html');
             res.write(`<html>
                <head><title>practice set</title><head>
                <body>
                    <h1>here is the calculator </h1>
                    <form action="/calculator-result" method="POST">
                    <input type="text" placeholder="First Num" name="first" />
                    <input type="text" placeholder="second Num" name="second" />
                    <input type="submit" value="sum">
                    </form>
                </body>
             </html>`
            );
        return res.end();        
    }else if(req.url.toLowerCase()==='/calculator-result'&&req.method==='POST'){
        return sumRequestHandler(req,res);
    }
    res.setHeader('Content-Type','text/html');
             res.write(`<html>
                <head><title>practice set</title><head>
                <body>
                    <h1>404 page does not exist</h1>
                    <a href="/home">go to Home</a>
                </body>
             </html>`
            );
        return res.end();

}

module.exports=requestHandler;