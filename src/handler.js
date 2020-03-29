const { pathOr } = require('ramda');
const { getFileGlobalUrl, getFilesAddresses } = require('./components/s3');
const { composite } = require('./components/file-composer');

const { BASE_FILENAME, BASE_FILE_FOLDER, PLANTS_FOLDER } = process.env;

const generate = async event => {
  const percentage = pathOr(100, ['queryStringParameters', 'percentage'], event);
  const baseFile = getFileGlobalUrl(BASE_FILE_FOLDER, BASE_FILENAME);
  const otherFiles = await getFilesAddresses(PLANTS_FOLDER);
  const compositeBuffer = await composite(baseFile, otherFiles, percentage);

  return {
    statusCode: 200,
    headers: { 'Content-type': 'application/png' },
    body: compositeBuffer.toString('base64'),
    isBase64Encoded: true,
  };
};

module.exports = { generate };
