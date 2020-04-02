const counter = positionMap => {
  return Object.values(positionMap).flatMap(value => value.positions).length;
};

module.exports = counter;
