const getAddressLink = (activeChain, address) =>
  `${activeChain?.blockExplorers?.default?.url}/address/${address}`;

export { getAddressLink };
