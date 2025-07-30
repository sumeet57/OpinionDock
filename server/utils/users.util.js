import bcrypt from "bcrypt";

// password hashing and comparison utilities
export const hashPassword = (password) => {
  const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS) || 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

// timestamp utility with proper formatting
export const formatTimestamp = () => {
  const date = new Date();
  return date.toISOString().replace("T", " ").substring(0, 19);
};

// validations utilities
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
export const isValidPassword = (password) => {
  return (
    password.length >= 5 && /\d/.test(password) && /[a-zA-Z]/.test(password)
  );
};
export const isValidName = (fn, ln) => {
  return (
    typeof fn === "string" &&
    typeof ln === "string" &&
    fn.trim().length > 0 &&
    ln.trim().length > 0 &&
    fn.length <= 15 &&
    ln.length <= 15 &&
    /^[a-zA-Z]+$/.test(fn) &&
    /^[a-zA-Z]+$/.test(ln)
  );
};
