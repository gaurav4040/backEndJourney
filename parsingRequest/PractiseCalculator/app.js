const http=  require('http');
const requestHandler=require('./request');

const server=http.createServer(requestHandler);

const PORT=3000;

server.listen(PORT,()=>{
    console.log(`server is on http:://localhost${PORT}`);
})