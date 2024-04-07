const mongoose = require('mongoose');
const express = require('express');
const Country = require('../models/country');
const utilRoutes = express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');

utilRoutes.get('/',  async(req,res)=>{
    try{
        const countries= await Country.find();
        res.status(200).send(countries);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
    
})

module.exports= utilRoutes;