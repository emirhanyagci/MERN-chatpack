const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../aws/client");

const setSignedUrl = async (key) => {
  if (!key) return null;
  const getObjectParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const expiresIn =
    Number(process.env.SIGNED_URL_EXPIRES_IN_SEC) > 0
      ? Number(process.env.SIGNED_URL_EXPIRES_IN_SEC)
      : 900;
  const imageUrl = await getSignedUrl(s3, command, { expiresIn });
  return imageUrl;
};
module.exports = setSignedUrl;
