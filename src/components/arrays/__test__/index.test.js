const { shuffle } = require('../index');

describe('When shuffling and array', () => {
  it("shouldn't keep its order", () => {
    const array = [1, 4, 320, 9, 12];
    shuffle(array);

    expect(array).not.toEqual([1, 4, 320, 9, 12]);
  });
});
