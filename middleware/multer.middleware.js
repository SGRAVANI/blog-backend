// import multer from 'multer';
// import path from 'path';

// // storage engine
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, './public/uploads/'); // Directory to store the uploaded files
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //To generate unique file name 
// //   }
// // });
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, 
//     fileFilter: function (req, file, cb) {
//       // Allow only images
//       const fileTypes = /jpeg|jpg|png|gif/;
//       const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//       const mimeType = fileTypes.test(file.mimetype);
  
//       if (extname && mimeType) {
//         return cb(null, true);
//       } else {
//         cb(new Error('Only images are allowed!'));
//       }
//     }
//   });
//   export {upload}