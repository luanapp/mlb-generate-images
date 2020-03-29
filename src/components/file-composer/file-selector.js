const { shuffle } = require('../arrays');

const selectFiles = (quantity, positionOrder, positionMap) => {
  const files = [];
  const currentFiles = new Set();

  let currentQty = 0;

  positionOrder.forEach(positionName => {
    const images = shuffle(positionMap[positionName].images.slice());

    positionMap[positionName].positions.every(position => {
      if (currentQty + 1 > quantity) {
        return false;
      }

      let nextImg = images.pop();
      while (currentFiles.has(nextImg) && images.length > 0) {
        nextImg = images.pop();
      }

      if (!!!nextImg) {
        return false;
      }

      files.push({ image: nextImg, position });
      currentFiles.add(nextImg);
      currentQty += 1;

      return true;
    });
  });

  return files;
};

const getFilePositions = ({ images, percentage, positionOrder, positionMap }) => {
  const fileNameKey = toFilenameKey(images);
  return selectFiles(Math.ceil((percentage * images.length) / 100), positionOrder, positionMap).map(
    ({ image, position }) => {
      return { image: fileNameKey[image], position };
    }
  );
};

const toFilenameKey = (files = []) => {
  return files.reduce((result, file) => Object.assign(result, { [getFilename(file)]: file }, {}), {});
};

const getFilename = file => {
  return file.replace(/^.*[\\\/]/, '');
};

module.exports = {
  getFilePositions,
};
