const POSITION_NAMES = {
  HAND: 'hand',
  BACK: 'back',
  GROUND_SHELF: 'ground-shelf',
  SHELF: 'shelf',
};

const POSITION_ORDER = [POSITION_NAMES.HAND, POSITION_NAMES.BACK, POSITION_NAMES.GROUND_SHELF, POSITION_NAMES.SHELF];

const POSITION_MAP = {
  [POSITION_NAMES.HAND]: { positions: [{ X: 350, Y: 450 }], images: ['06.png', '11.png', '05.png'] },
  [POSITION_NAMES.BACK]: {
    positions: [
      { X: 0, Y: 800 },
      { X: 110, Y: 800 },
    ],
    images: ['06.png', '11.png'],
  },
  [POSITION_NAMES.GROUND_SHELF]: {
    positions: [
      { X: 530, Y: 800 },
      { X: 660, Y: 800 },
      { X: 660, Y: 700 },
      { X: 660, Y: 600 },
      { X: 660, Y: 500 },
    ],
    images: ['02.png', '03.png', '04.png', '05.png', '07.png', '08.png', '09.png'],
  },
  [POSITION_NAMES.SHELF]: {
    positions: [
      { X: 128, Y: 110 },
      { X: 194, Y: 110 },
      { X: 238, Y: 110 },
    ],
    images: ['01.png', '02.png', '03.png', '04.png', '05.png', '07.png', '08.png', '09.png', '10.png'],
  },
};

module.exports = {
  POSITION_ORDER,
  POSITION_MAP,
};
