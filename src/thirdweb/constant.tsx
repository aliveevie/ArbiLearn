import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { SmartWalletOptions } from "thirdweb/wallets";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
	throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
	clientId: clientId,
});

export const chain =  defineChain(1088);
export const editionDropAddress = process.env.NEXT_PUBLIC_EDITION_DROP;
// @ts-ignore
export const editionDropTokenId = 0n;

export const editionDropContract = getContract({
    // @ts-ignore
	address: editionDropAddress,
	chain,
	client,
});


export const accountAbstraction: SmartWalletOptions = {
	chain,
	sponsorGas: true,
};
