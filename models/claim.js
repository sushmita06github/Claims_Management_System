module.exports = class Claim {
    constructor(id, policyId, amount, status, dateFiled) {
      this.id = id;
      this.policyId = policyId;
      this.amount = amount;
      this.status = status;
      this.dateFiled = dateFiled;
    }
};