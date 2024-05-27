// services/users.js

import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const getAllUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getUser = async (userId) => {
  const res = await axios.get(`${baseUrl}/${userId}`);
  return res.data;
};

export default {
  getAllUsers,
  getUser,
};
