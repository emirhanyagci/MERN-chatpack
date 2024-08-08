const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-providers");
const bucketRegion = process.env.AWS_BUCKET_REGION;

const s3 = new S3Client({
  credentials: fromEnv(),
  region: bucketRegion,
});

module.exports = s3;
