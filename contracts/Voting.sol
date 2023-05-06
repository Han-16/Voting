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
    bool private whetherWithdraw;
    uint public Nth;

    struct Candidate {
        string name;
        uint votes;
        bool isRegistered;
    }

    mapping (address => Candidate) public candidates;
    mapping (uint => Candidate) public NthWinner;
    
    address[] public candidateAddresses;
    string[] public candidatesNames;

    event RegistrationStarted(uint startTime, uint endTime, uint Nth);
    event VotingStarted(uint startTime, uint endTime, uint Nth);
    event CandidateRegistered(string name);
    event VoteSubmitted(address voter, string candidateName, uint votes);
    event whoIsTheWinner(address WinnerAddress, string WinnerName, uint winnerVotes, uint Nth);
    event VotingClosed(uint Nth);

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
            "Registration isn't currently open"
        );
        _;
    }

    modifier duringVoting() {
        require(
            block.timestamp >= votingStartTime &&
            block.timestamp < votingStartTime + 1 minutes,
            "Voting isn't currently open"
        );
        _;
    }
    
    modifier isItClosed() {
        require(registrationStartTime == 0 && votingStartTime == 0, "Voting has not yet been closed.");
        _;
    }
    
    function open() public onlyOwner isItClosed {
        registrationStartTime = block.timestamp;
        votingStartTime = registrationStartTime + 1 minutes;
        Nth++;
        emit RegistrationStarted(registrationStartTime, registrationStartTime + 1 minutes, Nth);
        emit VotingStarted(votingStartTime, votingStartTime + 1 minutes, Nth);
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
        require(!candidates[msg.sender].isRegistered, "You've already registered as a candidate");
        require(!contains(candidatesNames, _name), "The name already exists");  
        candidates[msg.sender] = Candidate(_name, 0, true);
        candidateAddresses.push(msg.sender);
        candidatesNames.push(_name);
        emit CandidateRegistered(_name);
    }

    function getCandidates() public view returns(string[] memory) {
        return candidatesNames;
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
        NthWinner[Nth] = candidates[WinnerAddress];
        WinnerName = NthWinner[Nth].name;
        winnerVotes = NthWinner[Nth].votes;
        emit whoIsTheWinner(WinnerAddress, WinnerName, winnerVotes, Nth);
    }

    function getWinnerInfo() public view returns (Candidate memory) {
        return candidates[WinnerAddress];
    }

    function withdraw() public onlyOwner {
        require(block.timestamp > votingStartTime, "Voting is still open");
        owner.transfer(address(this).balance);
        whetherWithdraw = true;
    }

    function close() public onlyOwner {
        require(whetherWithdraw, "You didn't withdraw.");
        for (uint i = 0; i < candidateAddresses.length; i++) {
            delete candidates[candidateAddresses[i]];
        }
        registrationStartTime = 0;
        votingStartTime = 0;    
        totalVotes = 0;
        winnerIndex = 0;
        WinnerName = "";
        candidatesNames = new string[](0);
        whetherWithdraw = false;
        winnerVotes = 0;
        WinnerAddress = 0x0000000000000000000000000000000000000000;
        emit VotingClosed(Nth);
    }
}
