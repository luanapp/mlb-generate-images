const S3 = require('aws-sdk/clients/s3');
const { AWS_REGION, AWS_S3_BUCKET, AWS_S3_BASE_FILENAME, AWS_S3_BASE_FILE_FOLDER, AWS_S3_PLANTS_FOLDER } = process.env;

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
      MaxKeys: 10,
    };
    const s3Objects = await s3.listObjectsV2(param).promise();
    return s3Objects.Contents.map(object => object.Key);
  } catch (error) {
    throw new Error('s3.listObjectsV2 failed');
  }
};

const getFilesAddresses = async () => {
  try {
    const fileKeys = await getFileKeys(AWS_S3_BUCKET, AWS_S3_PLANTS_FOLDER);
    return fileKeys.map(fileKey => `https://${AWS_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com/${fileKey}`);
  } catch (error) {
    console.warn(error);
    return [];
  }
};

const getBaseFileAddress = () => {
  return `https://${AWS_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com/${AWS_S3_BASE_FILE_FOLDER}/${AWS_S3_BASE_FILENAME}`;
};

module.exports = {
  getBaseFileAddress,
  getFilesAddresses,
};
