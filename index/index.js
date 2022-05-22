async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.log(error);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      document.getElementById("btnConnect").innerHTML = "연결됨";

    //   dash board 보이기
      document.getElementById("dashBoard").style.display = "block";

    } else {
      document.getElementById("btnConnect").innerHTML =
        "MetaMask를 설치해주세요";
    }
  }
  

//   for contract adress / abi
//   async function execute() {
//     if (typeof window.ethereum !== "undefined") {
//       contractAddress = "0x1905408Cc8DbCBC5B9137Fb5b0069581b2B43B82";
//       const abi = [
//         {
//           "inputs": [],
//           "stateMutability": "nonpayable",
//           "type": "constructor"
//         },
//         {
//           "anonymous": false,
//           "inputs": [
//             {
//               "indexed": false,
//               "internalType": "uint32",
//               "name": "groupID",
//               "type": "uint32"
//             },
//             {
//               "indexed": false,
//               "internalType": "address",
//               "name": "from",
//               "type": "address"
//             }
//           ],
//           "name": "alreadyJoined",
//           "type": "event"
//         },
//         {
//           "anonymous": false,
//           "inputs": [
//             {
//               "indexed": false,
//               "internalType": "uint32",
//               "name": "groupID",
//               "type": "uint32"
//             },
//             {
//               "indexed": false,
//               "internalType": "address",
//               "name": "from",
//               "type": "address"
//             }
//           ],
//           "name": "notMember",
//           "type": "event"
//         },
//         {
//           "anonymous": false,
//           "inputs": [],
//           "name": "outOfLimit",
//           "type": "event"
//         },
//         {
//           "inputs": [],
//           "name": "createGroup",
//           "outputs": [
//             {
//               "internalType": "uint32",
//               "name": "",
//               "type": "uint32"
//             }
//           ],
//           "stateMutability": "nonpayable",
//           "type": "function"
//         },
//         {
//           "inputs": [
//             {
//               "internalType": "uint32",
//               "name": "groupID",
//               "type": "uint32"
//             }
//           ],
//           "name": "deposit",
//           "outputs": [],
//           "stateMutability": "payable",
//           "type": "function",
//           "payable": true
//         },
//         {
//           "inputs": [
//             {
//               "internalType": "uint32",
//               "name": "groupID",
//               "type": "uint32"
//             }
//           ],
//           "name": "withdraw",
//           "outputs": [
//             {
//               "internalType": "uint256",
//               "name": "balance",
//               "type": "uint256"
//             }
//           ],
//           "stateMutability": "payable",
//           "type": "function",
//           "payable": true
//         },
//         {
//           "inputs": [
//             {
//               "internalType": "uint32",
//               "name": "groupID",
//               "type": "uint32"
//             }
//           ],
//           "name": "joinGroup",
//           "outputs": [
//             {
//               "internalType": "bool",
//               "name": "",
//               "type": "bool"
//             }
//           ],
//           "stateMutability": "nonpayable",
//           "type": "function"
//         },
//         {
//           "inputs": [],
//           "name": "getGroupID",
//           "outputs": [
//             {
//               "internalType": "uint32[10]",
//               "name": "groups",
//               "type": "uint32[10]"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function",
//           "constant": true
//         },
//         {
//           "inputs": [
//             {
//               "internalType": "uint32",
//               "name": "groupID",
//               "type": "uint32"
//             }
//           ],
//           "name": "getGroupMembers",
//           "outputs": [
//             {
//               "internalType": "address[10]",
//               "name": "members",
//               "type": "address[10]"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function",
//           "constant": true
//         }
//       ];

//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);
//       try {
//         await contract.store(42);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       document.getElementById("executeButton").innerHTML =
//         "Please install MetaMask";
//     }
//   }
  
//   module.exports = {
//     connect,
//     execute,
//   };