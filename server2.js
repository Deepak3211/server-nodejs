const http = require('http');
const todos = [
  {
    id: 1,
    name : 'Deepak'
  },
  {
    id: 2,
    name : 'Kaushal'
  },
  {
    id: 3,
    name : 'John'
  },
  {
    id: 4,
    name : 'Rock'
  },
  {
    id: 5,
    name : 'Smith'
  },
]
const server = http.createServer((req,res)=>{
  const {method, url} = req;
  let body = [];
  req.on('data', test =>{
    body.push(test)
  })
  .on('end',()=>{
    body = Buffer.concat(body).toString();
    
    let status = 404;
    const response = {
      success: false,
      data: null
    }
    if(method === 'GET' && url === '/todos'){
      status = 200;
      response.success = true;
      response.data = todos;
    }
    else if (method === 'POST' && url === '/todos'){
     const {id,name} =  JSON.parse(body);
     if(!id || !name){
       status = 400;
     }
     else{

       todos.push({id,name});
       status = 201;
       response.success = true;
       response.data = todos;
     }
    }
    res.writeHead(status,{
      'Content-Type': 'Application/json',
      'X-Powered-By': 'Node.js'
  
    });
    res.end(JSON.stringify(response));
  });

});
const PORT = 5000;
server.listen(PORT, ()=>{
  console.log(`server is running at port ${PORT}`);
});