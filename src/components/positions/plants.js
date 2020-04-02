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
      { X: 0, Y: 800, centralized: false },
      { X: 110, Y: 800, centralized: false },
    ],
    images: ['06.png', '11.png'],
  },
  [POSITION_NAMES.GROUND_SHELF]: {
    positions: [
      { X: 560, Y: 743, centralized: true },
      { X: 705, Y: 755, centralized: true },
      { X: 705, Y: 675, centralized: true },
      { X: 705, Y: 590, centralized: true },
      { X: 705, Y: 510, centralized: true },
    ],
    images: ['02.png', '03.png', '04.png', '07.png', '08.png', '09.png'],
  },
  [POSITION_NAMES.SHELF]: {
    positions: [
      { X: 515, Y: 196, centralized: true },
      { X: 616, Y: 196, centralized: true },
      { X: 721, Y: 196, centralized: true },
    ],
    images: ['01.png', '02.png', '03.png', '04.png', '05.png', '07.png', '08.png', '09.png', '10.png'],
  },
};

module.exports = {
  POSITION_ORDER,
  POSITION_MAP,
};
