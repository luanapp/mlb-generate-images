const { BLEND_EXCLUSION, BLEND_DESTINATION_OVER, MIME_PNG, read } = require('jimp');
const { selectFiles } = require('./file-selector');

const composite = async (baseImage = '', images = [], percentage = 100) => {
  try {
    const jimps = getFileJimps(images, percentage);

    const baseJimp = await read(baseImage);
    (await jimps).forEach(async jp => {
      const position = jp.position;
      baseJimp.composite(jp.jimp, jp.position.X, position.Y - jp.jimp.bitmap.height, {
        mode: BLEND_EXCLUSION | BLEND_DESTINATION_OVER,
        opacityDest: 1,
        opacitySource: 1,
      });
    });
    await baseJimp.writeAsync('file-dir/garden.png');

    return baseJimp.getBufferAsync(MIME_PNG);
  } catch (error) {
    console.error('Error while composing files', error);
    return null;
  }
};

const getFileJimps = (images, percentage) => {
  const fileNameKey = toFilenameKey(images);
  const filePositions = selectFiles(Math.round((percentage * images.length) / 100)).map(({ image, position }) => {
    return { image: fileNameKey[image], position };
  });

  return Promise.all(
    filePositions.map(async ({ image, position }) => {
      const jimp = await read(image);
      return {
        fileName: image,
        jimp,
        position,
      };
    })
  );
};

const toFilenameKey = (files = []) => {
  return files.reduce((obj, file) => Object.assign(obj, { [getFilename(file)]: file }));
};

const getFilename = file => {
  return file.replace(/^.*[\\\/]/, '');
};

module.exports = composite;
