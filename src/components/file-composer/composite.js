const { BLEND_SOURCE_OVER, read } = require('jimp');
const moment = require('moment');
const {
  COMPOSITE_FILE: { FILENAME_PREFIX, FILE_EXTENSION, FOLDER },
} = require('./constants');
const { selectRandomElements } = require('../arrays');

const composite = async (baseImage = '', images = [], percentage = 100) => {
  const currentDate = moment().format('YYYY-MM-DD');
  const finalFilename = `${FOLDER}/${FILENAME_PREFIX}-${currentDate}.${FILE_EXTENSION}`;
  const images = selectRandomElements(images, Math.round((percentage * images.length) / 100));

  try {
    const baseJimp = await read(baseImage);
    const jimps = Promise.all(images.map(async image => await read(image)));

    (await jimps).forEach(async jp =>
      baseJimp.composite(jp, 0, 0, {
        mode: BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5,
      })
    );
    baseJimp.writeAsync(finalFilename);

    return finalFilename;
  } catch (error) {
    console.error('Error while composing files', error);
    return null;
  }
};

module.exports = composite;
