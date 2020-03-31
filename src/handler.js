const { pathOr } = require('ramda');
const { getFileGlobalUrl, getFilesAddresses } = require('./components/s3');
const { composite, getFilePositions } = require('./components/file-composer');

const { plants, stands } = require('./components/positions');
const { BASE_FILENAME, BASE_FILE_FOLDER, PLANTS_FOLDER, STANDS_FOLDER } = process.env;

const generate = async event => {
  try {
    const percentage = pathOr(100, ['queryStringParameters', 'percentage'], event);
    const baseFile = getFileGlobalUrl(BASE_FILE_FOLDER, BASE_FILENAME);

    const standsBuffer = await generateBuffer({ percentage, imageFolder: STANDS_FOLDER, positions: stands, baseFile });
    const compositeBuffer = await generateBuffer({
      percentage,
      imageFolder: PLANTS_FOLDER,
      positions: plants,
      baseFile: standsBuffer,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="garden.png"',
      },
      body: compositeBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 500,
        message: error,
      }),
    };
  }
};

const generateBuffer = async ({ percentage, imageFolder, positions: { POSITION_MAP, POSITION_ORDER }, baseFile }) => {
  const plantsFiles = await getFilesAddresses(imageFolder);
  const plantsParams = {
    images: plantsFiles,
    percentage,
    positionOrder: POSITION_ORDER,
    positionMap: POSITION_MAP,
  };
  const plantsFilesPositions = getFilePositions(plantsParams);
  return composite(baseFile, plantsFilesPositions);
};

module.exports = { generate };
