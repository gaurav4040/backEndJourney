const http = require('http');


const server=http.createServer(
    (req,res)=>{
        console.log(req.url,req.method,req.headers);

        if(req.url==='/'){
            res.setHeader('Content-Type','text/html');
            res.write('<html>');
            res.write('<head><title>Complete Coding</title><head>');
            res.write('<body><h1>Welcome Home</h1></body>');
            res.write('</html>');
            return res.end();
        }else if(req.url==='/products' ){
            res.setHeader('Content-Type','text/html');
            res.write('<html>');
            res.write('<head><title>Complete Coding</title><head>');
            res.write('<body><h1>Checkout new products</h1></body>');
            res.write('</html>');
            return res.end();
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