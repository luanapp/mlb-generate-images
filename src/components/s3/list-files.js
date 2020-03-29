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
    const fileKeys = await getFileKeys(AWS_S3_BUCKET, prefix);
    return fileKeys.map(fileKey => `https://${AWS_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com/${fileKey}`);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getFileGlobalUrl = (folder, filename) => {
  return `https://${AWS_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com/${folder}/${filename}`;
};

module.exports = {
  getFileGlobalUrl,
  getFilesAddresses,
};
