// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MonthlyJobAgreement {
    address public employer;
    address public jobSeeker;
    address public gigsChainAddress;
    uint256 public monthlyPayment;
    uint256 public agreedDurationMonths;
    uint256 public agreementStartTimestamp;
    uint256 public lastPaymentTimestamp;
    bool public termsFinalized;
    bool public jobCompleted;
    bool public paymentReleased;

    event TermsFinalized(uint256 payment, uint256 durationMonths);
    event JobCompleted();
    event PaymentReleased(uint256 amount);

    constructor(
        address _jobSeeker,
        address _gigsChainAddress,
        uint256 _monthlyPayment,
        uint256 _agreedDurationMonths
    ) {
        employer = msg.sender;
        jobSeeker = _jobSeeker;
        gigsChainAddress = _gigsChainAddress;
        monthlyPayment = _monthlyPayment;
        agreedDurationMonths = _agreedDurationMonths;
        agreementStartTimestamp = block.timestamp;
        lastPaymentTimestamp = agreementStartTimestamp;
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

        // Additional logic for finalizing terms (e.g., escrow mechanism, conditions)

        termsFinalized = true;
        emit TermsFinalized(monthlyPayment, agreedDurationMonths);
    }

    function completeJob() public onlyJobSeeker {
        require(termsFinalized, "Terms must be finalized before job completion");
        require(!jobCompleted, "Job has already been completed");

        // Additional logic for job completion

        // Calculate the number of completed months
        uint256 elapsedMonths = (block.timestamp - agreementStartTimestamp) / (30 days);

        require(elapsedMonths >= agreedDurationMonths, "Agreed duration months not completed yet");

        jobCompleted = true;
        emit JobCompleted();
    }

    function releasePayment() public onlyEmployer paymentNotReleased {
        require(jobCompleted, "Job must be completed before releasing payment");

        // Calculate the number of months since the last payment
        uint256 monthsSinceLastPayment = (block.timestamp - lastPaymentTimestamp) / (30 days);

        require(monthsSinceLastPayment >= 1, "Not enough time has passed since the last payment");

        // Calculate the amount to transfer for the current month
        uint256 paymentAmount = monthlyPayment * monthsSinceLastPayment;

        // Update the last payment timestamp
        lastPaymentTimestamp += monthsSinceLastPayment * (30 days);

        // Transfer funds to the job seeker
        payable(jobSeeker).transfer(paymentAmount);

        // Transfer 3% of payment to GigsChainAddress
        payable(gigsChainAddress).transfer((paymentAmount * 3) / 100);

        paymentReleased = true;
        emit PaymentReleased(paymentAmount);
    }
}

