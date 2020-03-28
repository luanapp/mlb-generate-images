const { pathOr } = require('ramda');
const { getBaseFileAddress, getFilesAddresses } = require('./s3');
const { composite } = require('./file-composer');

const generate = async event => {
  const percentage = pathOr(100, ['queryStringParameters', 'percentage'], event);
  const baseFile = getBaseFileAddress();
  const otherFiles = await getFilesAddresses();
  const compositeFile = composite(baseFile, otherFiles, percentage);

  return {
    statusCode: 200,
    headers: { 'Content-type': 'application/pdf' },
    body: compositeFile.toString('base64'),
    isBase64Encoded: true,
  };
};

module.exports = generate;
