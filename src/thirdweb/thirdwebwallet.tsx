import { ConnectButton } from "thirdweb/react";

import {
	accountAbstraction,
	client
} from "./constant";


export function  ConnectThirdWebWallet() {
  return (
      <div>
         <ConnectButton client={client}
         	accountAbstraction={accountAbstraction}
           connectModal={{
             size: "compact",
           }}
         />
      </div>
  );
}
