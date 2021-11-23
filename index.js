// console.log('Hello From Node.js...')

// const person = require('./person')
// console.log(person)

// const Person = require('./person');

// const person1 = new Person('John Doe', 30);

// person1.greeting();

// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('message', data => console.log('Called Listener', data));
// logger.log('Hello World');
// logger.log('Hi');
// logger.log('Hello');


const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
//     if (req.url === '/') {
       
//         fs.readFile(path.join(__dirname, 'about.html'), 
//         (err, content) => {
//             if(err) throw err;
//             res.writeHead(200, { 'Content-Type': 'text/html'});
//             res.end(content);

//         }
//     );

//         // res.writeHead(200, { 'Content-Type': 'text/html'});
//         // res.end('<h1>Home<h1>');
//     // console.log(req.url);
//     }
//     if (req.url === '/api/users') {
//     const users = [
//         { name: 'Bob Smith', age: 40},
//         { name: 'John Doe', age: 30}

//     ];
//     res.writeHead(200, { 'Content-Type': 'application/json'});
//     }

//     }
let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

let extname = path.extname(filePath);

let contentType = 'text/html';
switch(extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    case '.jpg':
        contentType = 'image/jpg';
        break;
}

fs.readFile(filePath, (err, content) => {
    if(err) {
        if(err.cod == 'ENOENT') {
            fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                res.writeHead(200, { 'Content-Type': 'text.html'}); 
                res.end(content, 'utf8');
            } )
        } else {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'contentType'}); 
        res.end(content, 'utf8');
    }
});
// console.log(filePath);
// res.end()
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));