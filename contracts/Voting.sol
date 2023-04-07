// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Voting {

    address payable public owner;
    uint public totalVotes;
    uint public registrationStartTime;
    uint public votingStartTime;
    uint public winnerIndex;
    string public WinnerName;
    uint public winnerVotes;
    address public WinnerAddress;


    struct Candidate {
        string name;
        uint votes;
        bool isRegistered;
    }


    mapping (address => Candidate) public candidates;
    address[] public candidateAddresses;
    string[] public cadidatesNames;


    event RegistrationStarted(uint startTime, uint endTime);
    event VotingStarted(uint startTime, uint endTime);
    event CandidateRegistered(string name);
    event VoteSubmitted(address voter, string candidateName, uint votes);
    event Winner(address winnerAddress, string winnerName, uint winnerVotes);


    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier duringRegistration() {
        require(
            block.timestamp >= registrationStartTime &&
            block.timestamp < registrationStartTime + 1 minutes,
            "Registration is not currently open"
        );
        _;
    }

    modifier duringVoting() {
        require(
            block.timestamp >= votingStartTime &&
            block.timestamp < votingStartTime + 1 minutes,
            "Voting is not currently open"
        );
        _;
    }
    
    function open() public onlyOwner {
        require(registrationStartTime == 0 && votingStartTime == 0, "Voting is already open.");
        registrationStartTime = block.timestamp;
        votingStartTime = registrationStartTime + 1 minutes;
        emit RegistrationStarted(registrationStartTime, registrationStartTime + 1 minutes);
        emit VotingStarted(votingStartTime, votingStartTime + 1 minutes);
    }


    function contains(string[] memory array, string memory _name) internal pure returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (keccak256(bytes(array[i])) == keccak256(bytes(_name))) {
                return true;
            }
        }
        return false;
    }

    function registerCandidate(string memory _name) public payable duringRegistration {
        require(!candidates[msg.sender].isRegistered, "You have already registered as a candidate");
        require(!contains(cadidatesNames, _name), "The name already exists");  
        candidates[msg.sender] = Candidate(_name, 0, true);
        candidateAddresses.push(msg.sender);
        cadidatesNames.push(_name);
        emit CandidateRegistered(_name);
    }

    function getCandidates() public view returns(string[] memory) {
        return cadidatesNames;
    }

    function vote(address candidate) public payable duringVoting {
        require(candidates[candidate].isRegistered, "Invalid candidate address");
        require(msg.value > 0, "Voting requires a non-zero amount of eth.");
        candidates[candidate].votes += msg.value;
        totalVotes += msg.value;
        
        emit VoteSubmitted(msg.sender, candidates[candidate].name, msg.value);
    }

    function determineWinner() public onlyOwner {
        require(block.timestamp > votingStartTime + 1 minutes, "Voting is still open"); // 투표시간 지나야함.
        uint winningVoteCount = 0;
        for(uint i=0; i<candidateAddresses.length; i++) {
            if(candidates[candidateAddresses[i]].votes > winningVoteCount) {
                winningVoteCount = candidates[candidateAddresses[i]].votes;
                winnerIndex = i;
            }
        }
        WinnerAddress = candidateAddresses[winnerIndex];
        string memory winnerName = candidates[WinnerAddress].name;
        winnerVotes = candidates[WinnerAddress].votes;
        WinnerName = candidates[WinnerAddress].name;
        emit Winner(WinnerAddress, winnerName, winnerVotes);
    }

    function getWinnerInfo() public view returns (Candidate memory) {
        return candidates[WinnerAddress];
    }

    function withdraw() public onlyOwner {
        require(block.timestamp > votingStartTime, "Voting is still open");
        owner.transfer(address(this).balance);
    }

    function close() public onlyOwner{
        registrationStartTime = 0;
        votingStartTime = 0;    
        for (uint i = 0; i < candidateAddresses.length; i++) {
            delete candidates[candidateAddresses[i]];
        }
        candidateAddresses = new address[](0);
        totalVotes = 0;
        winnerIndex = 0;
        WinnerName = "";
        cadidatesNames = new string[](0);
        
    }
}