import React from 'react'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import express from 'express';
import fs from 'fs';
import App from '../src/App.js';

const PORT = 7000;
const app = express();

const serverRenderer = (req, res, next)=> 
// read index.html file and returns text contents of index.html file
fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=>{
    if(err){
        console.log(err);  
        return res.status(500).send("Error happended");
    }
    //replace mounting point(root div) from index.html file with contents of our rendered application
    //uses renderToString function that can we used on server to generate the staticmark up
    return res.send(data.replace('<div id="root"></div>',`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`));
});
app.use('^/$', serverRenderer);

//specify the folder which will serve static files
app.use(express.static(path.resolve(__dirname,'..','build')))

// to launch express application
app.listen(PORT, ()=> console.log(`App launched on ${PORT}`));