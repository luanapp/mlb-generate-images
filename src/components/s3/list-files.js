const S3 = require('aws-sdk/clients/s3');
const { AWS_REGION, AWS_S3_BUCKET } = process.env;

const s3 = new S3({
  apiVersion: 'latest',
  region: AWS_REGION,
});

const getFileKeys = async (bucket, prefix) => {
  try {
    const param = {
      Bucket: bucket,
      Prefix: prefix,
      Delimiter: '/',
      MaxKeys: 50,
    };
    const s3Objects = await s3.listObjectsV2(param).promise();
    return s3Objects.Contents.map(object => object.Key).filter(key => !key.endsWith('/'));
  } catch (error) {
    throw new Error('s3.listObjectsV2 failed');
  }
};

const getFilesAddresses = async prefix => {
  try {
    return getFileKeys(AWS_S3_BUCKET, prefix);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getFileBuffer = async fileKey => {
  const obj = await s3.getObject({ Bucket: AWS_S3_BUCKET, Key: fileKey }).promise();
  return obj.Body;
};

const getFileGlobalUrl = (folder, filename) => {
  return `https://${AWS_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com/${folder}/${filename}`;
};

module.exports = {
  getFileBuffer,
  getFileGlobalUrl,
  getFilesAddresses,
};
