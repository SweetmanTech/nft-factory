const getFactoryAddress = (chainId) => {
  if (chainId === 4) {
    // Rinkeby
    return "0xbae835d4C2f0670cA9395915Cb01239E18b2AbE5";
  }
  return "0x000000000000000000000000000000000000dEaD";
};

export default getFactoryAddress;
