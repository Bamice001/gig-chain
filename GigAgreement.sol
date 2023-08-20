// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobAgreement {
    address public employer;
    address public jobSeeker;
    address public gigsChainAddress;
    uint256 public agreedPayment;
    uint256 public agreedDays;
    uint256 public agreementTimestamp;
    bool public termsFinalized;
    bool public jobCompleted;
    bool public paymentReleased;

   // event TermsFinalized(uint256 indexed payment, uint256 indexed days);
    event JobCompleted();
    event PaymentReleased(uint256 amount);

    constructor(address _jobSeeker, address _gigsChainAddress, uint256 _agreedPayment, uint256 _agreedDays) {
        employer = msg.sender;
        jobSeeker = _jobSeeker;
        gigsChainAddress = _gigsChainAddress;
        agreedPayment = _agreedPayment;
        agreedDays = _agreedDays;
        agreementTimestamp = block.timestamp;
        termsFinalized = false;
        jobCompleted = false;
        paymentReleased = false;
    }

    modifier onlyEmployer() {
        require(msg.sender == employer, "Only the employer can perform this action");
        _;
    }

    modifier onlyJobSeeker() {
        require(msg.sender == jobSeeker, "Only the job seeker can perform this action");
        _;
    }

    modifier paymentNotReleased() {
        require(!paymentReleased, "Payment has already been released");
        _;
    }

    function finalizeTerms() public onlyEmployer {
        require(!termsFinalized, "Terms have already been finalized");
        //Might AAdd additional logic
        
        termsFinalized = true;
      //  emit TermsFinalized(agreedPayment, agreedDays);
    }

    function completeJob() public onlyJobSeeker {
        require(termsFinalized, "Terms must be finalized before job completion");
        require(!jobCompleted, "Job has already been completed");
        
        // Additional logic for job completion
        
        // Check if the agreed days have passed
        require(block.timestamp >= agreementTimestamp + agreedDays * 1 days, "Agreed days haven't passed yet");
        
        jobCompleted = true;
        emit JobCompleted();
    }

    function releasePayment() public onlyEmployer paymentNotReleased {
        require(jobCompleted, "Job must be completed before releasing payment");
        
        // Additional logic for payment release
        
        // Transfer funds to the job seeker
        payable(jobSeeker).transfer(agreedPayment);
        
        // Transfer 3% of agreed payment to GigsChainAddress
        payable(gigsChainAddress).transfer((agreedPayment * 3) / 100);
        
        paymentReleased = true;
        emit PaymentReleased(agreedPayment);
    }

}


// 1,142,475