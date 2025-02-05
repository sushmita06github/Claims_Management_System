module.exports = class Policy {
    constructor(id, policyholderId, policyNumber, coverageAmount, startDate, endDate) {
      this.id = id;
      this.policyholderId = policyholderId;
      this.policyNumber = policyNumber;
      this.coverageAmount = coverageAmount;
      this.startDate = startDate;
      this.endDate = endDate;
    }
};