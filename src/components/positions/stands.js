const POSITION_NAMES = {
  GROUND1: 'ground1',
  GROUND2: 'ground2',
  SHELF: 'shelf',
};

const POSITION_ORDER = [POSITION_NAMES.GROUND2, POSITION_NAMES.GROUND1, POSITION_NAMES.SHELF];

const POSITION_MAP = {
  [POSITION_NAMES.GROUND1]: {
    positions: [{ X: 614, Y: 800 }],
    images: ['ground1.png'],
  },
  [POSITION_NAMES.GROUND2]: {
    positions: [{ X: 530, Y: 800 }],
    images: ['ground2.png'],
  },
  [POSITION_NAMES.SHELF]: {
    positions: [{ X: 455, Y: 210 }],
    images: ['shelf.png'],
  },
};

module.exports = {
  POSITION_ORDER,
  POSITION_MAP,
};
