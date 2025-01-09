import React, { useState } from 'react';
import styles from '../../../styles/NFTCard.module.css';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { contract } from '@/thirdweb/contract';
import { sendTransaction } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { useSendTransaction } from 'thirdweb/react';
import { useActiveAccount } from "thirdweb/react"
import MetisPopup from '@/components/metis-popup';



interface NFTCardProps {
  name: string;
  image: StaticImageData;
  description: string;
  price: string;
  isFree: boolean;
  address: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ name, image, description, price, isFree, address }) => {
  const { mutate: sendTransaction } = useSendTransaction();

  const [metisPopupOpen, setMetisPopupOpen] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  const account = useActiveAccount();

  const handleMintOrBuy = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      if (isFree) {

        setMetisPopupOpen(true);
        setIsTransactionPending(true);
       
      //   const transaction = claimTo({
      //     contract, // Your thirdweb contract instance
      //     to: address, // Wallet address of the receiver
      //     quantity: 1n, // Quantity as BigInt
      //     // Optionally specify `from` for allowlist drops
      //     from: address, 
      //   });

      //   await sendTransaction({ transaction, account });

       
      //   // You can add a success message or modal here
       } else {
      //   // Handle paid NFTs logic here
       }
    } catch (error) {
      console.error("Error minting NFT:", error);
      setMetisPopupOpen(false);
      setIsTransactionPending(false);
      // You can add an error message or modal here
    }
  };

  const handleClose = () => {
    setMetisPopupOpen(false);
  };

  return (
    <>
   
    <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image src={image} alt={name} className={styles.image} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.description}>{description}</p>
            <div className={styles.footer}>
              <span className={styles.price}>{isFree ? 'Free' : `${price} METIS`}</span>
              <button
                className={styles.button}
                onClick={handleMintOrBuy}
              >
                {isFree ? 'Mint' : 'Buy'}
              </button>
            </div>
          </div>
      </div>
      {metisPopupOpen && (
        <MetisPopup
        isOpen={metisPopupOpen}
        onClose={handleClose}
        onConfirmMint={() => {
          setIsMinted(true);
          setMetisPopupOpen(false);
        }}
        />
      )}
    </>
  );
};

export default NFTCard;