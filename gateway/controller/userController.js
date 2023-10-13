const userService = require("../service/userService.js");

const createData = async (req, res) => {
  try {
    const { price, actions, time } = req.body; // Assuming you send data in the request body
    const newData = await userService.createData(price, actions, time);
    return res.status(200).json(newData);
  } catch (error) {
    console.error('Error creating data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getallData = async (req, res) => {
  try {
    const users = await userService.getallData();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "server error" });
  }
};



module.exports = {
  createData,
  getallData,

};
