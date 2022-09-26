// Functions * -->

// ? * -->// Parse input
const parseInput = (number) => {
  number = parseFloat(number);
  if (isNaN(number)) number = 0;
  return number;
};

// ? * -->// Calculate Pool Volume Function

function calculatePoolVolume(
  type = true,
  width = 0,
  length = 0,
  depthStart = 0,
  depthEnd = undefined,
  balanceWidth = undefined,
  balanceLength = undefined,
  balanceDepth = undefined
) {
  let balanceTankVolume = 0;
  let volume = 0;
  let averageDepth = 0;
  let totalVolume = 0;

  length = parseInput(length);
  width = parseInput(width);
  depthStart = parseInput(depthStart);
  depthEnd ? (depthEnd = parseInput(depthEnd)) : undefined;
  depthEnd
    ? (averageDepth = (depthEnd + depthStart) / 2)
    : (averageDepth = depthStart);
  volume = length * width * averageDepth;
  totalVolume = volume;

  if (!type) {
    if (!balanceWidth && !balanceLength && !balanceDepth) {
      totalVolume = volume * 0.2;
      balanceTankVolume = `${totalVolume} \nnot given parameters defaults to 20% of pool volume`;
      return {
        totalVolume: Math.round(totalVolume * 100) / 100,
        volume: Math.round(volume * 100) / 100,
        balanceVolume: balanceTankVolume,
      };
    }
    balanceWidth = parseInput(balanceWidth);
    balanceLength = parseInput(balanceLength);
    balanceDepth = parseInput(balanceDepth);
    balanceTankVolume = balanceLength * balanceWidth * balanceDepth;
    totalVolume = volume + balanceTankVolume;
  }

  return {
    totalVolume: Math.round(totalVolume * 100) / 100,
    volume: Math.round(volume * 100) / 100,
    balanceVolume: isNaN(balanceTankVolume)
      ? Math.round(balanceTankVolume * 100) / 100
      : balanceTankVolume,
  };
}

function calculatePoolPerimeter(width, length) {
  const poolPerimeterValue = width + length * 2;
  const copingParameter = poolPerimeterValue + 4 * 0.3;
  return {
    copingParameter: copingParameter.toString(),
    poolPerimeterValue: poolPerimeterValue.toString(),
  };
}

export default {
  calculatePoolVolume,
  parseInput,
  calculatePoolPerimeter,
};

// } else if (poolTypeId === 3 || poolTypeId === "SKIMMER.Other") {
//   Walls = (Length + width) * 2 * 1.3 * 1.1;
//   Floor = Length * width;
//   totalSize = Walls + Floor;
//   priceOF = 25.8;
//   totalPrice = totalSize * priceOF;
//   extraPrice = 350.0;
//   finalPrice = totalPrice + extraPrice;
// } else if (poolTypeId === 4 || poolTypeId === "OVERFLOW.Other") {
//   Walls = (Length + width) * 2 * 1.3 * 1.1;
//   Floor = Length * width;
//   totalSize = Walls + Floor;
//   priceOF = 25.8;
//   totalPrice = totalSize * priceOF;
//   extraPrice = 350.0;
//   extraSize = 2;
//   pipeSize = width + Length + extraSize;
//   pipePrice = 40;
//   finalPrice = pipeSize + pipePrice + totalPrice + extraPrice;
// }
