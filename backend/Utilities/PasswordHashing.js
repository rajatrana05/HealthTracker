const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = async (password, hashedPassword) => {
    // console.log(hashPassword(password) + " ::::::::::::::::::::::::: " + String(hashedPassword).trim() +":::::::::::::"+ await bcrypt.compare(password, hashedPassword));
  return await bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
