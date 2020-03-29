const { POSITION_ORDER, POSITION_MAP } = require('./constants');
const { shuffle } = require('../arrays');

const selectFiles = quantity => {
  const files = [];
  const currentFiles = new Set();

  let currentQty = 0;

  POSITION_ORDER.forEach(positionName => {
    const images = shuffle(POSITION_MAP[positionName].images.slice());

    POSITION_MAP[positionName].positions.every(position => {
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

      console.log(`position name: ${positionName}; images: ${images}, selected: ${nextImg}`);
      files.push({ image: nextImg, position });
      currentFiles.add(nextImg);
      currentQty += 1;

      return true;
    });
  });

  return files;
};

module.exports = {
  selectFiles,
};
