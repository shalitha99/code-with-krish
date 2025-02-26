const express = require('express');
//calling the function
const {getMinNumber} = require(`./util.js`)
const {getMaxNumber} = require(`./util.js`)
const {getAvgNumber} = require(`./util.js`)
const {getCount} = require(`./util.js`)
const {getSort} = require(`./util.js`)

const app = new express();
const port = 3000;
const greeting={message: "hello node"}

app.get('/number/min', (req,res)=>{

    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const result = getMinNumber(num1,num2);
    res.status(result.status).json(result.data);

    // if(num1=='NaN')
    // console.log(`console ${num1} with ${num2} as num1<num2 $(num1<num2)`);

    // if(isNaN(num1) || isNaN(num2)){
    //     res.status(400).json({error: 'both values must be number'})
    // }else{
    //     res.json({min: num1 > num2 ? num2 : num1});
    // }
    //console.log(`{min: num1 ? }`);
    // req.parameters
    // res.json(greeting)
});

app.get('/number/max', (req,res)=>{

    const num3 = parseFloat(req.query.num3);
    const num4 = parseFloat(req.query.num4);
    const num5 = parseFloat(req.query.num5);
    const num6 = parseFloat(req.query.num6);
    const num7 = parseFloat(req.query.num7);

    const result = getMaxNumber(num3, num4, num5, num6, num7);
    res.status(result.status).json(result.data);
});

app.get('/number/avg', (req,res)=>{

    const result = getAvgNumber(req.query.numbers);
    res.status(result.status).json(result.data);
});

app.get('/number/sort', (req,res)=>{

    const result = getSort(req.query.numbers,req.query.type);
    res.status(result.status).json(result.data);
});

app.get('/number/count', (req,res)=>{

    const result = getCount(req.query.numbers,req.query.search);
    res.status(result.status).json(result.data);
});

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});