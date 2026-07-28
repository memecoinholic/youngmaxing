window.YOUNGMAXING_CONFIG = {
  name: "The Baby bryan",
  symbol: "YOUNGMAXING",
  tagline: "The Internet's Youngest Billionaire",
  xUrl: "https://x.com/youngmaxing_sol",
  contractAddress: "00000",
  get pumpUrl() {
    if (!this.contractAddress) return "https://swap.pump.fun/";
    return `https://swap.pump.fun/00000=${this.contractAddress}`;
  },
  get chartUrl() {
    if (!this.contractAddress) return "https://dexscreener.com/solana";
    return `https://dexscreener.com/solana/${this.contractAddress}`;
  },
  get chartEmbed() {
    if (!this.contractAddress) return "https://dexscreener.com/solana?embed=1&theme=dark&trades=0&info=0";
    return `https://dexscreener.com/solana/${this.contractAddress}?embed=1&theme=dark&trades=0&info=0`;
  },
};
