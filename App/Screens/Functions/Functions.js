// Calculate Pool Volume Function
const parseInput = (number) => {
  number = parseFloat(number);
  if (isNaN(number)) number = 0;
  return number;
};
function calculatePoolVolume(
  width = 0,
  Length = 0,
  DepthStart = 0,
  DepthEnd = 0,
  poolTypeId = 1
) {
  Length = parseInput(DepthStart);
  width = parseInput(DepthStart);
  DepthStart = parseInput(DepthStart);

  let Volume = Length * width * DepthStart;
  if (poolTypeId === 2 || poolTypeId === "OVERFLOW") {
    balanceTank = parseInput(balanceTank);
    if (!balanceTank === 0) {
      balanceTank = Volume * 0.2;
    }
    Volume = Volume + balanceTank;
  } else if (poolTypeId === 3 || poolTypeId === "SKIMMER.Other") {
    Walls = (Length + width) * 2 * 1.3 * 1.1;
    Floor = Length * width;
    totalSize = Walls + Floor;
    priceOF = 25.8;
    totalPrice = totalSize * priceOF;
    extraPrice = 350.0;
    finalPrice = totalPrice + extraPrice;
  } else if (poolTypeId === 4 || poolTypeId === "OVERFLOW.Other") {
    Walls = (Length + width) * 2 * 1.3 * 1.1;
    Floor = Length * width;
    totalSize = Walls + Floor;
    priceOF = 25.8;
    totalPrice = totalSize * priceOF;
    extraPrice = 350.0;
    extraSize = 2;
    pipeSize = width + Length + extraSize;
    pipePrice = 40;
    finalPrice = pipeSize + pipePrice + totalPrice + extraPrice;
  }
  return Volume;
}

export default {
  calculatePoolVolume,
};
