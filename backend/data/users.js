import bcrypt from "bcryptjs";
const User = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jhon Doe",
    email: "jhon@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default User;
