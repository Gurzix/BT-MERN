const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_KEY;

// exports.s3Uploadv2 = async (file) => {
//   const s3 = new S3({
//     region,
//     accessKeyId,
//     secretAccessKey,
//   });

//   const params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: `uploads/${uuid()}-${file.originalname}`,
//     Body: file.buffer,
//   };

//   return await s3.upload(params).promise();
// };

exports.s3Uploadv2 = async (file) => {
  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
  });

  const params = file.map((file) => {
    return {
      Bucket: process.env.BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
