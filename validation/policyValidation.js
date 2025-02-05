module.exports = {
  validatePolicyData: (data) => {
      if (!data.policyNumber) {
          throw new Error("Policy number is required");
      }
      if (!data.coverageAmount || data.coverageAmount <= 0) {
          throw new Error("Coverage amount must be greater than zero");
      }
      if (!data.policyholderId) {
          throw new Error("Policyholder ID is required");
      }
      if (!data.startDate) {
          throw new Error("Start date is required");
      }
      if (!data.endDate) {
          throw new Error("End date is required");
      }
  }
};