"use client";

import { useEffect } from 'react';
// import { BrowserProvider, Contract, ContractEventPayload } from 'ethers';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    ethereum?: import('ethers').Eip1193Provider;
  }
}

// const useContractListener = () => {
//   useEffect(() => {
//     if (!window.ethereum) {
//       console.error('Ethereum provider not found');
//       return;
//     }

//     const setupContract = async () => {
//       try {
//         const provider = new BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "0xDefaultContractAddress";
//         const abi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || '[]');
//         const contract = new Contract(contractAddress, abi, signer);

//         // Listen to the "TransactionCompleted" event
//         contract.on('TransactionCompleted', (from: string, to: string, amount: bigint, event: ContractEventPayload) => {
//           toast.success(`Transaction Completed: ${amount.toString()} tokens sent from ${from} to ${to}`);
//         });

//         // Cleanup function to remove the event listener
//         return () => {
//           contract.removeAllListeners('TransactionCompleted');
//         };
//       } catch (error) {
//         console.error('Error setting up contract listener:', error);
//       }
//     };

//     setupContract();
//   }, []);
// };



// Simulate a contract event after a delay this is a mock function and can be deleted after the real function is implemented.
const useContractListener = () => {
  useEffect(() => {
    // Simulate a contract event after a delay
    const simulateContractEvent = setTimeout(() => {
      const mockEvent = {
        from: "0x1234567890abcdef",
        to: "0xabcdef1234567890",
        amount: BigInt(100),
      };

      // Trigger a notification
      toast.success(
        `Transaction Completed: ${mockEvent.amount.toString()} tokens sent from ${mockEvent.from} to ${mockEvent.to}`
      );
    }, 3000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(simulateContractEvent);
  }, []);
};

export default useContractListener;