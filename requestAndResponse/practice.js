const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if(req.url.toLowerCase()=='/home'){
    res.write('<h1>welcome to home</h1>');
    return res.end();
  }else if(req.url.toLowerCase()=='/men'){
    res.write('<h1>welcome to men section</h1>');
    return res.end();
  }else if(req.url.toLowerCase()=='/women'){
    res.write('<h1>welcome to women section</h1>');
    return res.end();
  }else if(req.url.toLowerCase()=='/kids'){
    res.write('<h1>welcome to kids section</h1>');
    return res.end();
  }else if(req.url.toLowerCase()=='/cart'){
    res.write('<h1>welcome to cart</h1>');
    return res.end();
  }
  res.write(`
        <html lang="en">
        <head><title>DukaanPe</title></head>
            <body>
                <head>
                    <nav>
                        <ul>
                            <li><a href="/Home">Home</a></li>
                            <li><a href="/Men">Men</a></li>
                            <li><a href="/Women">Women</a></li>
                            <li><a href="/Kids">Kids</a></li><li><a href="/cart">🛒</a></li>
                        </ul>
                    </nav>
                </head>
            </body>
        </html>
        `);
  res.end();
});

server.listen(3000, () => {
  console.log("server is running on http:://localhost:3000");
});
