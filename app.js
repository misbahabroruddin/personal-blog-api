const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
// const { profile } = require('./models');
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get('/ping', function (req, res) {
  res.send('pong');
});

// app.post('/upload', async function (req, res) {
//   const { name, data } = req.files.foo;
//   console.log(name);
//   console.log(data);
//   await profile.create({
//     image_path: name,
//     image: data,
//   });

//   res.status(201).json({ message: 'Success' });
// });

// app.get('/image/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const image = await profile.findByPk(id);

//     if (!image) {
//       return res.status(404).json({ message: 'Image not found.' });
//     }
//     console.log(image.image);
//     // res.setHeader('Content-Type', image.image);
//     res.end(image.image);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error retrieving image.' });
//   }
// });

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
