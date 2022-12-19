const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_KEY, // your AWS access id
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY, // your AWS access key
});

exports.Upload = async (file, type) => {
  try {
    const key = `${type}/${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: `${process.env.S3_BUCKET}`,
      Key: key,
      Region: process.env.S3_BUCKET_REGION,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const uploaded = await s3.upload(params).promise();
    return uploaded.Key;
  } catch (e) {
    console.log(e);
  }
};
