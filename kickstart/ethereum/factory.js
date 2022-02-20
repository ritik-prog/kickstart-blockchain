import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xc1Ee78A8D3520B937B1370780C760dAF24A839eD"
);

export default instance
