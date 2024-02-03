const crypto = require("crypto");
const tokenSecret = crypto.randomBytes(64).toString("hex");
console.log(tokenSecret);
