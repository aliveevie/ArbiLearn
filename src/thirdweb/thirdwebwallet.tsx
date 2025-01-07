import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";

export const client = createThirdwebClient({ clientId: "e4d51769fcc92b76042b7b13f041e01e" });

export function  ConnectThirdWebWallet() {
  return (
   
      <ConnectButton client={client} />
  
  );
}
