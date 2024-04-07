const Journal = require("../models/journal");
const User = require("../models/user");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 
const { S3Client, PutObjectCommand,DeleteObjectCommand,GetObjectCommand,DeleteObjectsCommand,ListObjectsCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const journalRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


const s3 = new S3Client({
    region: process.env.aws_bucket_region, // Replace with your desired AWS region
    credentials: {
      accessKeyId: process.env.aws_access_key,
      secretAccessKey: process.env.aws_secret_key,
    },
  });
  

const upload = multer({
    storage: multer.memoryStorage(),
});

async function createFoldersInS3(userId, journalId) {
  const folders = [
    `${userId}`,            // User folder
    `${userId}/journals`,   // Journals folder
    `${userId}/journals/${journalId}`, // Journal ID folder
    `${userId}/journals/${journalId}/audio`, // Audio folder
    `${userId}/journals/${journalId}/image`, // Image folder
    `${userId}/journals/${journalId}/video`, // Video folder
    // `${userId}/journals/${journalId}/text`,
  ];
  for (const folder of folders) {
    const params = {
      Bucket: 'user-emotionally', // Replace with your S3 bucket name
      Key: folder + '/',
    };
    try {
      await s3.send(new PutObjectCommand(params));
    } catch (error) {
      console.error(`Error creating S3 folder: ${error.message}`);
    }
  }
}
  
journalRoutes.post('/registerJournal', verifyToken, checkProfileLevel, upload.array('content', 20), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      console.log("No Such User");
      return res.status(400).send("No User");
    }

    const currentDate = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Kolkata',
    };

    const journalCreationDate = currentDate.toLocaleString('en-IN', options);

    const userId = req.user.userId;
    const journalId = uuidv4();
    await createFoldersInS3(userId, journalId);

    const textContents = req.body.content; 

    for (let i = 0; i < textContents.length; i++) {
      const textContent = textContents[i];
      const key = `${userId}/journals/${journalId}/text/plain${i + 1}.txt`; // Append the counter
      const uploadParams = {
        Bucket: 'user-emotionally',
        Key: key,
        Body: textContent,
        ContentType: 'text/plain',
      };
      await s3.send(new PutObjectCommand(uploadParams));

      const textUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

      const newJournal = new Journal({
        type: 'text',
        journalCreationDate,
        userId: userId,
        url: textUrl,
        key: key,
        text: textContent,
        journalId: journalId,
      });

      await newJournal.save();
      if (!user.journalsId.includes(journalId)) {
        user.journalsId.push(journalId);
      }
    }

    for (const file of req.files) {
      if (file.mimetype === 'text/plain') {
        // Handle plain text upload and store it in the 'text' field
        const textContent = file.buffer.toString(); // Convert the buffer to a string

        const newJournal = new Journal({
          type: 'text',
          journalCreationDate,
          userId: userId,
          text: textContent, // Store plain text content in the 'text' field
          journalId: journalId,
        });

        await newJournal.save();
        if (!user.journalsId.includes(journalId)) {
          user.journalsId.push(journalId);
        }
      } else {
        // Handle media uploads (audio, image, video)
        const mediaType = file.mimetype.split('/')[0];
        const key = `${userId}/journals/${journalId}/${mediaType}/${file.originalname}`;
        const uploadParams = {
          Bucket: 'user-emotionally',
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        await s3.send(new PutObjectCommand(uploadParams));

        const Url = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

        const newJournal = new Journal({
          type: mediaType,
          journalCreationDate,
          userId: userId,
          key: key,
          url: Url,
          journalId: journalId,
        });

        await newJournal.save();
        if (!user.journalsId.includes(journalId)) {
          user.journalsId.push(journalId);
        }
      }
    }

    await user.save();

    return res.status(201).send('Journals registered successfully');
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Internal server down");
  }
});



journalRoutes.get('/:journalsId', verifyToken, checkProfileLevel, async (req, res) => {
  try {
    const journals = await Journal.find({ journalId: req.params.journalsId });

    if (!journals || journals.length === 0) {
      console.error('No such journals');
      return res.status(404).send('Journals not found');
    }

    // Create an object where the type is the key and the urls are in an array
    const typeUrls = {};

    journals.forEach((journal) => {
      if (!typeUrls[journal.type]) {
        typeUrls[journal.type] = [];
      }
      typeUrls[journal.type].push(journal.url);
    });

    res.status(200).json(typeUrls);

  } catch (err) {
    return res.status(400).send(err);
  }
});





journalRoutes.put('/:_id', verifyToken, checkProfileLevel, upload.array('content', 20), async (req, res) => {
  try {
    const journal = await Journal.findById(req.params._id);
    let type ="";
    if (!journal) {
      console.error('No such journal');
      return res.status(404).send('Journal not found');
    }

    // Delete the existing S3 object (folder)
    const userId = journal.userId;
    const journalId = journal.journalId;
    const originalKey = journal.key;
    const keyToDelete = journal.key;
    const deleteFolderParams = {
      Bucket: 'user-emotionally',
      Key: keyToDelete,
    };
    await s3.send(new DeleteObjectCommand(deleteFolderParams));

     // Update S3 object with new content
     const textContents = req.body.content;
     if(textContents){
     const key = originalKey;
     const uploadParams = {
       Bucket: 'user-emotionally',
       Key: key,
       Body: textContents, // Store the text content as a single string
       ContentType: 'text/plain',
     };
     await s3.send(new PutObjectCommand(uploadParams));
     journal.text= textContents;
    }

    for (const file of req.files) {
      if (file.mimetype === 'text/plain') {
        // Handle text content from uploaded files
        const textContent = file.buffer.toString();
        const key = `${userId}/journals/${journalId}/text/plain${textContents.length + 1}.txt`;
        const uploadParams = {
          Bucket: 'user-emotionally',
          Key: key,
          Body: textContent,
          ContentType: 'text/plain',
        };
        type = uploadParams.ContentType;
        await s3.send(new PutObjectCommand(uploadParams));
        journal.key = `${userId}/journals/${journalId}/text/plain${textContents.length + 1}.txt`;
        journal.url = `https://${uploadParams.Bucket}.s3.amazonaws.com/${journal.key}`;
        journal.type = type;
      } else {
        // Handle media content
        const mediaType = file.mimetype.split('/')[0];
        const key = `${userId}/journals/${journalId}/${mediaType}/${file.originalname}`;
        const uploadParams = {
          Bucket: 'user-emotionally',
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        type = uploadParams.ContentType;
        await s3.send(new PutObjectCommand(uploadParams));
        journal.key = `${userId}/journals/${journalId}/${mediaType}/${file.originalname}`;
        journal.url = `https://${uploadParams.Bucket}.s3.amazonaws.com/${journal.key}`;
        journal.type = type;
    

      }
    }

    

    // Save the updated journal document
    await journal.save();

    return res.status(200).send('Journal updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});




journalRoutes.delete('/:journalsId', verifyToken, async (req, res) => {
  const { journalsId } = req.params;
  try {
    const deletedJournals = await Journal.deleteMany({ journalId: journalsId });

    if (deletedJournals.deletedCount === 0) {
      console.error('No such Journals');
      return res.status(404).send('Journals not found');
    }
    const userId = req.user.userId;
    const key = `${userId}/journals/${journalsId}/`;
    
    const folderStructure = ['audio', 'video', 'text', 'image'];

    const deleteObjectsInFolder = async (folderName) => {
      const folderKey = `${key}${folderName}/`;
      const listObjectsParams = {
        Bucket: "user-emotionally",
        Prefix: folderKey,
      };
      const { Contents } = await s3.send(new ListObjectsCommand(listObjectsParams));

      if (Contents.length > 0) {
        const objectsToDelete = Contents.map(({ Key }) => ({ Key }));
        const deleteObjectsParams = {
          Bucket: "user-emotionally",
          Delete: {
            Objects: objectsToDelete,
          },
        };
        await s3.send(new DeleteObjectsCommand(deleteObjectsParams));
      }
    };

    // Delete objects in each subfolder
    for (const folderName of folderStructure) {
      await deleteObjectsInFolder(folderName);
    }

    // Now that the subfolders are empty, delete them
    for (const folderName of folderStructure) {
      const folderKey = `${key}${folderName}/`;
      const deleteFolderParams = {
        Bucket: "user-emotionally",
        Delete: {
          Objects: [
            { Key: folderKey },
          ],
          Quiet: false,
        },
      };
      await s3.send(new DeleteObjectsCommand(deleteFolderParams));
    }

    // Finally, delete the parent folder
    const deleteParentFolderParams = {
      Bucket: "user-emotionally",
      Delete: {
        Objects: [
          { Key: key },
        ],
        Quiet: false,
      }
    };
    await s3.send(new DeleteObjectsCommand(deleteParentFolderParams));

    // Remove journalsId from the user's journalsId array in the User collection
    const user = await User.findOne({ _id: userId });

    if (user) {
      user.journalsId = user.journalsId.filter(id => id !== journalsId);
      await user.save();
    }

    return res.status(200).send('Journals and associated folders deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});



journalRoutes.delete('/', async (req, res) => {
  try {
    // Delete all documents in the Journal collection
    const deleteResult = await Journal.deleteMany({});

    // Check the delete result
    if (deleteResult.deletedCount > 0) {
      res.status(200).json({ message: 'All journals have been deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No journals found to delete.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting journals.', error: error.message });
  }
});






module.exports= journalRoutes;