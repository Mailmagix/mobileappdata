const express = require('express');
const Image = require('../models/image');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const fs = require('fs');
const allowProfileLevel = require('../middleware/checkProfileLevel');


const checkProfileLevel = require('../middleware/checkProfileLevel');

const storage = multer.diskStorage({
  destination: './temp', // Save uploaded files to the 'temp' directory
  filename: (req, file, cb) => {
    // Generate a unique file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();
    cb(null, `${uniqueSuffix}.${ext}`);
  }
});

const upload = multer({ storage });



const s3 = new S3Client({
  region: process.env.aws_bucket_region,
  credentials: {
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_key
  }
});

const bucketName = process.env.aws_bucket_name;

const imageRoutes = express.Router();

imageRoutes.get('/:_id', verifyToken, checkProfileLevel, async(req,res) => {
    const { _id } = req.params;
    try {
        const image = await Image.findById(_id);
    
        if (!image) {
          console.error('No such Image');
          return res.status(404).send('Image not found');
        }

        res.status(200).json({
          title: image.title,
          category: image.category,
          tags: image.tags,
          level: image.level,
          content: image.content});

    } catch(err) {
        return res.status(400).send(err);
    }
});

imageRoutes.get('/',verifyToken, checkProfileLevel, async (req, res) => {
  try {
     const bucketName = 'images-emotionally';

     // Prepare the parameters for listing objects in the bucket
     const params = {
       Bucket: bucketName
     };
 
     // Call the listObjectsV2 method to get the list of objects in the bucket
     const response = await s3.send(new GetObjectCommand(params));
 
     // Extract the image URLs from the response
     const imageUrls = response.Contents.map(object => {
       return `https://${bucketName}.s3.amazonaws.com/${object.Key}`;
     });
    const images = await Image.find();
    res.status(200).send(images);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

imageRoutes.post('/registerImage', verifyToken, checkProfileLevel, upload.single('image'),async (req, res) => {
  const { title, topic,category,categoryPic, tags, level } = req.body;
  try {
    // Get the path of the uploaded file
    const filePath = req.file.path;
    console.log("filePath:",filePath);
    // Convert image to JPEG format and compress to 80%
    const convertedImageBuffer = await sharp(filePath)
      .jpeg({ quality: 20 })
      .toBuffer();

    // Upload the converted image to S3 bucket
    const uploadParams = {
      Bucket: bucketName,
      Key: `converted-${req.file.filename}`, // Specify a key for the uploaded file
      Body: convertedImageBuffer
    };
    
    const imageUrl = `https://${bucketName}.s3.amazonaws.com/${uploadParams.Key}`;
    
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.aws_bucket_name,
      Key: uploadParams.Key,
      Body: convertedImageBuffer,
    });
    
    


    // Send the PutObjectCommand using s3.send()
    s3.send(putObjectCommand)
      .then((response) => {
        console.log('Object uploaded successfully',response);

      })
      .catch((error) => {
        console.error('Error uploading object:', error);
      });

    // Delete the temporary file

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
      console.log('File deleted successfully');
      }
    });

    
    

    // Create a new image
    const newImage = new Image({ title, topic,category, categoryPic,tags, level,content: imageUrl});

    // Save the article to the database
    await newImage.save();

    return res.status(201).send('Image registered successfully');
  } catch (error) {
    console.error('Error registering image:', error);
    return res.status(500).send('Internal Server Error');
  }
});

imageRoutes.patch('/:_id', verifyToken, checkProfileLevel, async (req, res) => {
    const { _id } = req.params;
    const updatedData = req.body;
  
    try {
      // Find the image by ID
      const image = await Image.findById(_id);
  
      if (!image) {
        console.error('No such image');
        return res.status(404).send('Image not found');
      }
  
      // Update the image's information with the new data
      Object.assign(image, updatedData);
  
      // Save the updated article to the database
      await image.save();
  
      return res.status(200).send('Image updated successfully');
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).send('Internal Server Error');
    }
  });

imageRoutes.delete('/:_id', verifyToken, checkProfileLevel, async (req, res) => {
    const { _id } = req.params;
  
    try {
      // Find the image by ID and delete it
      const deletedImage = await Image.findByIdAndDelete(_id);
  
      if (!deletedImage) {
        console.error('No such image');
        return res.status(404).send('Image not found');
      }
  
      return res.status(200).send('Image deleted successfully');
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).send('Internal Server Error');
    }
  });




module.exports = imageRoutes;