'use client'

import React, { useState, useEffect } from 'react'

const MintNFTComponent: React.FC = () => {
  const [iframeHeight, setIframeHeight] = useState('750px')

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight
      const newHeight = Math.max(750, viewportHeight * 0.9) // 90% of viewport height, minimum 750px
      setIframeHeight(`${newHeight}px`)
    }

    handleResize() // Set initial height
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <iframe
        src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x4de4F5eCad3d6B145450467d6B592b58F6aB7F6f&chain=%7B%22name%22%3A%22Metis+Sepolia+Testnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F59902.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22tMetis%22%2C%22symbol%22%3A%22tMETIS%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22metis-sepolia%22%2C%22chainId%22%3A59902%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22metis-sepolia-testnet%22%7D&clientId=e4d51769fcc92b76042b7b13f041e01e&theme=dark&primaryColor=purple"
        width="100%"
        height={iframeHeight}
        style={{ maxWidth: '100%', border: 'none', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
        title="Mint MetilLearn NFT"
      />
    </div>
  )
}

export default MintNFTComponent