const { async } = require("@firebase/util");
const userService = require("../service/userService.js");
const actionType = {
  income: 0,
  outcome: 1
}
const createData = async (req, res) => {
  try {
    const {
      price,
      actions,
      time,
      description
    } = req.body; // Assuming you send data in the request body
    const newData = await userService.createData(price, actions, time, description);
    return res.status(200).json(newData);
  } catch (error) {
    console.error('Error creating data:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const getAction = async (req, res) => {
  const  action  = req.params.action;
  
  if (action == actionType.income) {
    try {
      const users = await userService.getallDataByIncome(action);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: "server error"
      });
    }
  } 
  else if (action == actionType.outcome){
    try {
      const users = await userService.getallDataByOutcome(action);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: "server error"
      });
    }
  } 
  
  
};

const getAll = async ()=>{
  try {
    const users = await userService.getadata();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "server error"
    });
  }
}

module.exports = {
  createData,
  getAction,
  getAll
};