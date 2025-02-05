module.exports = {
  validatePolicyholderData: (data) => {
      if (!data.name) {
          throw new Error("Name is required");
      }
      if (!data.email) {
          throw new Error("Email is required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { // Basic email validation
          throw new Error("Invalid email format");
      }
      if (!data.phone) {
          throw new Error("Phone is required");
      } else if (!/^\d{10}$/.test(data.phone)) { // Basic 10-digit phone validation
          throw new Error("Invalid phone number format");
      }
  }
};