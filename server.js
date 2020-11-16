const http = require('http');

const todos = [
  {
    id: 1,
    name : 'Deepak'
  },
  {
    id: 2,
    name : 'Deepak'
  },
  {
    id: 3,
    name : 'Deepak'
  },
  {
    id: 4,
    name : 'Deepak'
  },
  {
    id: 5,
    name : 'Deepak'
  },
]
const server = http.createServer((req,res)=>{
  const {headers, url, method,body} = req;
  // console.log( headers,url,method);
  // res.setHeader('Content-Type', 'text/plain');
  // res.setHeader('Content-Type', 'text/html');
  // res.statusCode = 404;
  console.log(req.headers)

  res.setHeader('Content-Type', 'application/json');
  // res.writeHead(404,{
  //   'Content-Type': 'application/json'
  // })

  let body1 = [];
  req.on('data', chunk =>{
    body1.push(chunk);
  }).on('end',()=>{
    body1 = Buffer.concat(body1).toString();
    console.log(body1);
  })

  res.write('Hello')
  res.write('Hello Again')
  res.end(JSON.stringify({
    success : true,
    data: todos
  }));
});

const PORT = 5000;
server.listen(PORT, ()=>{
  console.log(`server is running at port ${PORT}`);
})