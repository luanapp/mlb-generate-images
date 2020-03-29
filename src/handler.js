const { pathOr } = require('ramda');
const { getFileGlobalUrl, getFilesAddresses } = require('./components/s3');
const { composite, getFilePositions } = require('./components/file-composer');

const { plants, stands } = require('./components/positions');
const { BASE_FILENAME, BASE_FILE_FOLDER, PLANTS_FOLDER, STANDS_FOLDER } = process.env;

const generate = async event => {
  const percentage = pathOr(100, ['queryStringParameters', 'percentage'], event);
  const baseFile = getFileGlobalUrl(BASE_FILE_FOLDER, BASE_FILENAME);

  const standsFiles = await getFilesAddresses(STANDS_FOLDER);
  const standsParams = {
    images: standsFiles,
    percentage,
    positionOrder: stands.POSITION_ORDER,
    positionMap: stands.POSITION_MAP,
  };
  const standFilesPositions = getFilePositions(standsParams);
  const standsBuffer = await composite(baseFile, standFilesPositions);

  const plantsFiles = await getFilesAddresses(PLANTS_FOLDER);
  const plantsParams = {
    images: plantsFiles,
    percentage,
    positionOrder: plants.POSITION_ORDER,
    positionMap: plants.POSITION_MAP,
  };
  const plantsFilesPositions = getFilePositions(plantsParams);
  const compositeBuffer = await composite(standsBuffer, plantsFilesPositions);

  return {
    statusCode: 200,
    headers: { 'Content-type': 'application/png' },
    body: compositeBuffer.toString('base64'),
    isBase64Encoded: true,
  };
};

module.exports = { generate };
