const getFactoryAddress = (chainId) => {
  if (chainId === 5) {
    // Goerli
    return "0x377022d8ACb2eBDC7283724DaaD0CEAA6fAd8F84";
  }
  if (chainId === 69) {
    // Optimism Kovan
    return "0x4C0a36F7f46893d01CF7F3541fcB171e7A4bF148";
  }
  if (chainId === 137) {
    // Polygon
    return "0x314dE0B249D94241FB9601D77439aEB5870B2dA2";
  }
  if (chainId === 80001) {
    // Polygon Mumbai
    return "0xC9aeCad048713F7f58F0276f39de1126f6d4f288";
  }
  if (chainId === 421611) {
    // Arbitrum Rinkeby
    return "0xbae835d4C2f0670cA9395915Cb01239E18b2AbE5";
  }
  return "0x000000000000000000000000000000000000dEaD";
};

export default getFactoryAddress;
