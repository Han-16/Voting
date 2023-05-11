// 배포자 주소
const owner = '<address of Owner>';


// MetaMask와 연결하기 위한 함수
async function connectToMetaMask() {
    // MetaMask가 설치되어 있는지 확인
    if (typeof window.ethereum !== 'undefined') {
        try {
            // MetaMask 연결 요청
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // 연결 성공
            console.log('MetaMask와 연결되었습니다!');
        } catch (error) {
            // 연결 실패
            console.error(error);
        }
    } else {
        // MetaMask가 설치되지 않은 경우
        console.error('MetaMask를 설치해야 합니다!');
    }
}

// 페이지 로드 후 실행되는 함수
window.addEventListener('load', async () => {
    // 연결 버튼에 이벤트 리스너 추가
    const connectButton = document.getElementById('connect-button');
    connectButton.addEventListener('click', connectToMetaMask);
});



if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


// 배포한 후 스마트 컨트랙트 주소 기입
const contractAddress = '<address of Conract>';
const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "name", "type": "string" }], "name": "CandidateRegistered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "Nth", "type": "uint256" }], "name": "RegistrationStarted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "voter", "type": "address" }, { "indexed": false, "internalType": "string", "name": "candidateName", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "votes", "type": "uint256" }], "name": "VoteSubmitted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "Nth", "type": "uint256" }], "name": "VotingClosed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "Nth", "type": "uint256" }], "name": "VotingStarted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "WinnerAddress", "type": "address" }, { "indexed": false, "internalType": "string", "name": "WinnerName", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "winnerVotes", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "Nth", "type": "uint256" }], "name": "whoIsTheWinner", "type": "event" }, { "inputs": [], "name": "Nth", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "NthWinner", "outputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }, { "internalType": "bool", "name": "isRegistered", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WinnerAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WinnerName", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "candidateAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "candidates", "outputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }, { "internalType": "bool", "name": "isRegistered", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "candidatesNames", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "close", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "determineWinner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getCandidates", "outputs": [{ "internalType": "string[]", "name": "", "type": "string[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getWinnerInfo", "outputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }, { "internalType": "bool", "name": "isRegistered", "type": "bool" }], "internalType": "struct Voting.Candidate", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "open", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }], "name": "registerCandidate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "registrationStartTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "candidate", "type": "address" }], "name": "vote", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "votingStartTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "winnerIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "winnerVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];


const contract = new web3.eth.Contract(contractABI, contractAddress);


document.getElementById('openBtn').addEventListener('click', openVoting);
document.getElementById('closeBtn').addEventListener('click', closeVoting);
document.getElementById('withdrawBtn').addEventListener('click', withdrawFunds);
document.getElementById('determineBtn').addEventListener('click', determineWinner);
document.getElementById('registerBtn').addEventListener('click', registerCandidate);
document.getElementById('voteBtn').addEventListener('click', vote);


async function openVoting() {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.open().send({ from: owner });
        console.log('Voting opened:', result);
        var candidatetime = document.getElementById("candidatetime");
        candidatetime.style.display = "block";
        document.getElementById("registration-time").style.display = "block";

    } catch (error) {
        console.error('Error opening voting:', error);
    }
}

async function closeVoting() {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.close().send({ from: owner });
        console.log('Voting closed:', result);
        window.location.reload()
    } catch (error) {
        console.error('Error closing voting:', error);
    }
}

async function withdrawFunds() {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.withdraw().send({ from: owner });
        console.log('Funds withdrawn:', result);
    } catch (error) {
        console.error('Error withdrawing funds:', error);
    }
}

async function determineWinner() {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.determineWinner().send({ from: owner });
        const WinnerName = await contract.methods.WinnerName().call();
        const winner = document.getElementById('winner');
        winner.innerHTML = WinnerName;
        console.log("determineWinner : ", result);
    } catch (error) {
        console.error('Error determining winner:', error);
    }
}

async function registerCandidate() {
    const name = document.getElementById('nameInput').value;
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.registerCandidate(name).send({ from: accounts[0] });
        console.log('Candidate registered:', result);

    } catch (error) {
        console.error('Error registering candidate:', error);
    }
}

async function vote() {
    const address = document.getElementById('addressInput').value;
    const balance = document.getElementById('balanceInput').value;
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.vote(address).send({ from: accounts[0], value: web3.utils.toWei(balance) });
        console.log('Vote submitted:', result);
    } catch (error) {
        console.error('Error submitting vote:', error);
    }
}

async function updateVotingInfo() {
    try {
        var totalVotes = await contract.methods.totalVotes().call();
        totalVotes_ETH = await web3.utils.fromWei(web3.utils.toBN(totalVotes), 'ether');
        const nth = await contract.methods.Nth().call();
        document.getElementById('totalVotes').textContent = totalVotes_ETH + " ETH";
        document.getElementById('nth').textContent = nth;
    } catch (error) {
        console.error('Error getting voting info:', error);
    }
}

async function updateCandidatesList() {
    try {
        const candidates = await contract.methods.getCandidates().call();
        const candidatesList = document.getElementById('candidatesList');
        candidatesList.innerHTML = '';
        candidates.forEach((candidate) => {
            const candidateElement = document.createElement('p');
            candidateElement.textContent = candidate;
            candidatesList.appendChild(candidateElement);
        });
    } catch (error) {
        console.error('Error getting candidates list:', error);
    }
}

var vote_interval;

function displayRegistrationStartTime() {
    contract.methods.registrationStartTime().call(function (error, result) {
        if (!error) {
            var registrationStartTime = parseInt(result);
            var currentTime = Math.floor(Date.now() / 1000); // 현재 시간 가져오기
            var remainingTime = registrationStartTime + 60 - currentTime;
            document.getElementById('registration-time').textContent = remainingTime.toString();

            if (remainingTime == 0) {
                clearInterval(register_interval);
                var votingtime = document.getElementById("votingtime");
                votingtime.style.display = "block";
                document.getElementById("voting-time").style.display = "block";

                vote_interval = setInterval(displayVotingStartTime, 1000)
            }

        }
    });
}

function displayVotingStartTime() {
    contract.methods.votingStartTime().call(function (error, result) {
        if (!error) {
            var votingStartTime = parseInt(result);
            var currentTime = Math.floor(Date.now() / 1000); // 현재 시간 가져오기
            var remainingTime = votingStartTime + 60 - currentTime;
            document.getElementById('voting-time').textContent = remainingTime.toString();
            if (remainingTime == 0) {
                clearInterval(vote_interval);
            }
        }
    });
}

var register_interval = setInterval(displayRegistrationStartTime, 1000)

updateVotingInfo();
updateCandidatesList();
setInterval(updateVotingInfo, 1000);
setInterval(updateCandidatesList, 1000);

