const contractAddress = "0x425180500861c9f117d493aFD237488aEaa65fca";
const contractABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "contractAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "projectStarter", "type": "address" }, { "indexed": false, "internalType": "string", "name": "projectTitle", "type": "string" }, { "indexed": false, "internalType": "string", "name": "projectDesc", "type": "string" }], "name": "groupCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }], "name": "createGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getMyGroup", "outputs": [{ "internalType": "address[10]", "name": "", "type": "address[10]" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "getMyGroupCount", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "address", "name": "groupAddress", "type": "address" }, { "internalType": "uint8", "name": "seat", "type": "uint8" }], "name": "updateMyGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const groupABI = [{"inputs": [{"internalType": "address payable","name": "owner","type": "address"},{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "desc","type": "string"},{"internalType": "address","name": "_GroupManager","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "groupAddress","type": "address"},{"indexed": false,"internalType": "address","name": "from","type": "address"}],"name": "alreadyJoined","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint32","name": "groupID","type": "uint32"},{"indexed": false,"internalType": "address","name": "from","type": "address"}],"name": "notMember","type": "event"},{"anonymous": false,"inputs": [],"name": "outOfLimit","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "address","name": "to","type": "address"}],"name": "transferAdmit","type": "event"},{"inputs": [],"name": "deposit","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "requestWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "agree","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "cancelRequest","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getDetails","outputs": [{"internalType": "address payable","name": "owner","type": "address"},{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "desc","type": "string"},{"internalType": "uint256","name": "balance","type": "uint256"},{"internalType": "address[10]","name": "membersResponse","type": "address[10]"},{"internalType": "address","name": "currentRequester","type": "address"},{"internalType": "bool","name": "isCurrentRaising","type": "bool"},{"internalType": "uint256","name": "currentRequestAmount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "joinGroup","outputs": [{"internalType": "bool","name": "result","type": "bool"}],"stateMutability": "nonpayable","type": "function"}];
var web3;
var managerContract;
var addresses;

window.onload = load_first;
async function load_first() {
  
  web3 = new Web3(Web3.providers.HttpProvider("http://localhost:7545")) 
      || new Web3("wss://mainnet.infura.io/ws/v3/e3fbfedc03444eb6b1491a84cf06eb02");

  managerContract = new web3.eth.Contract(contractABI, contractAddress);
  addresses = await web3.eth.getAccounts();
  getTBodyFromGetMyGroup();
}

async function createGroup() {
  var groupTitle = document.getElementById('title').value;
  var groupDescription = document.getElementById('description').value; 

  var createGroupGas = await managerContract.methods.createGroup(groupTitle , groupDescription).estimateGas();
  var tx = await managerContract.methods.createGroup(groupTitle , groupDescription).send({from: addresses[0], gas: createGroupGas});

  console.log(tx.transactionHash);
  getTBodyFromGetMyGroup();
}

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    var metamaskAddr;
    try {
      metamaskAddr = await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    document.getElementById("btnConnect").innerHTML = "연결됨";


    //   dash board 보이기
    document.getElementById("dashBoard").style.display = "block";
    document.getElementById("myAddress").innerText = "내 주소: " + metamaskAddr;

  } else {
    document.getElementById("btnConnect").innerHTML =
      "MetaMask를 설치해주세요";
  }
}

function getTBodyFromGetMyGroup() {
    managerContract.methods.getMyGroup().call(async (err, res) => {
      var innerHtml = await Promise.all(
            res.map(async (e) => {
                    if (e == 0) {
                        return;
                    } else {
                        var balance = await web3.eth.getBalance(e);
                        let group = new web3.eth.Contract(groupABI, e);
                        let details = await group.methods.getDetails().call();

                        return "<tr>" +
                            "<th scope=\"row\">" + details.name + "</th>" +   // 이름
                            "<td>" + details.desc + "</td>" +
                            "<td>Ipsum</td>" +                 // 기간
                            "<td>" + balance + "</td>" +                 // 금액
                            "<td><div id=\"btnDetail\" onclick=\"location.href='/detail?g=" + e + "'\" style=\"cursor: pointer;\">그룹 세부정보</div></td>" +
                            "</tr>";
                    }
                }
            ));

          document.getElementById('dashBoardBody').innerHTML = innerHtml.join('')
    })
}
