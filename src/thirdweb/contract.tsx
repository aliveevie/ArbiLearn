import {
    createThirdwebClient,
    getContract,
  } from "thirdweb";
  import { defineChain } from "thirdweb/chains";
  
  // create the client with your clientId, or secretKey if in a server environment
  const client = createThirdwebClient({
    clientId: "e4d51769fcc92b76042b7b13f041e01e",
  });
  
  // connect to your contract
export const contract = getContract({
    client,
    chain: defineChain(59902),
    address: "0x4de4F5eCad3d6B145450467d6B592b58F6aB7F6f",
  });
  