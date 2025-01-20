"use client";

import type React from "react";
import { claimTo, getNFT, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import {
	ConnectButton,
	MediaRenderer,
	TransactionButton,
	useActiveAccount,
	useReadContract,
} from "thirdweb/react";
import {
	accountAbstraction,
	client,
	editionDropContract,
	editionDropTokenId,
} from "./constant";


import Link from "next/link";

const GaslessHome: React.FC = () => {
	const smartAccount = useActiveAccount();
	
	const { data: nft, isLoading: isNftLoading } = useReadContract(getNFT, {
		contract: editionDropContract,
		tokenId: editionDropTokenId,
	});

	const { data: ownedNfts } = useReadContract(getOwnedNFTs, {
		contract: editionDropContract,
		address: smartAccount?.address!,
		queryOptions: { enabled: !!smartAccount },
	});

	console.log(ownedNfts)

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
				Sponsored Transactions
			</h1>
			<ConnectButton
				client={client}
				accountAbstraction={accountAbstraction}
				connectModal={{
					size: "compact",
				}}
			/>
			<div className="flex flex-col">
				{isNftLoading ? (
					<div className="w-full mt-24">Loading...</div>
				) : (
					<>
						{nft ? (
							<MediaRenderer
								client={client}
								src={nft.metadata.image}
								style={{ width: "100%", marginTop: "10px" }}
							/>
						) : null}
						{smartAccount ? (
							<>
								<p className="font-semibold text-center mb-2">
									You own {ownedNfts?.[0]?.quantityOwned.toString() || "0"}{" "}
									Kittens
								</p>
								<TransactionButton
									transaction={() =>
										claimTo({
											contract: editionDropContract,
											tokenId: editionDropTokenId,
											to: smartAccount.address,
                      // @ts-ignore
											quantity: 1n,
										})
									}
									onError={(error) => {
										alert(`Error: ${error.message}`);
									}}
									onTransactionConfirmed={async () => {
										alert("Claim successful!");
									}}
								>
									Claim!
								</TransactionButton>
							</>
						) : (
							<p
								style={{
									textAlign: "center",
									width: "100%",
									marginTop: "10px",
								}}
							>
								Login to claim this Kitten!
							</p>
						)}
					</>
				)}
			</div>
			<Link href={"/"} className="text-sm text-gray-400 mt-8">
				Back to menu
			</Link>
		</div>
	);
};

export default GaslessHome;