const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../aws/client");

const setSignedUrl = async (key) => {
  const getObjectParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return imageUrl;
};
module.exports = setSignedUrl;
