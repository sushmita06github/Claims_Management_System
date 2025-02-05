module.exports = {
  validateClaimData: (data) => {
      if (!data.policyId) {
          throw new Error("Policy ID is required");
      }
      if (!data.amount || data.amount <= 0) {
          throw new Error("Claim amount must be greater than zero");
      }
      if (!data.dateFiled) {
          throw new Error("Claim filing date is required");
      }
      if (!data.status) {
          throw new Error("Status is required");
      }
  }
};