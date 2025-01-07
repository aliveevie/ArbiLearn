import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import ProfileSection from "@/app/sections/profile";

export const client = createThirdwebClient({   clientId: "e4d51769fcc92b76042b7b13f041e01e"});

export function  ConnectThirdWebWallet() {
  return (
      <div>
         <ConnectButton client={client} />
      </div>
  );
}
