const { BLEND_EXCLUSION, BLEND_DESTINATION_OVER, MIME_PNG, read } = require('jimp');
const { getFileBuffer } = require('../s3');

const composite = async (base, filePositions = []) => {
  try {
    const jimps = getFileJimps(filePositions);

    const baseJimp = await read(base);
    (await jimps).forEach(async jp => {
      const position = jp.position;
      baseJimp.composite(jp.jimp, jp.position.X, position.Y - jp.jimp.bitmap.height, {
        mode: BLEND_EXCLUSION | BLEND_DESTINATION_OVER,
        opacityDest: 1,
        opacitySource: 1,
      });
    });

    return baseJimp.getBufferAsync(MIME_PNG);
  } catch (error) {
    console.error('Error while composing files', error);
    return null;
  }
};

const getFileJimps = positions => {
  return Promise.all(
    positions.map(async ({ image, position }) => {
      const imageBuffer = await getFileBuffer(image);
      const jimp = await read(imageBuffer);
      return {
        fileName: image,
        jimp,
        position,
      };
    })
  );
};

module.exports = composite;
