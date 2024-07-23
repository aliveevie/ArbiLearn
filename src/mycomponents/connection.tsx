import { useAccount } from 'wagmi';



function Connecting() {

  const { address, isConnected, isDisconnected } = useAccount();

  if(isConnected){
    window.location.href = '../app/dashboard'
  }

  
  return <>
    <div>Hello!</div>
  </>
 
}


export default Connecting;
