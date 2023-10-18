const {
  async
} = require("@firebase/util");
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
      message : error.message
    });
  }
};

const getAction = async (req, res) => {
  const action = req.params.action;

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
  } else if (action == actionType.outcome) {
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

const getAll = async (req, res) => {
  try {
    const users = await userService.getdata();
    if(!users){
      return res.status(404).json({message : "user does not exits"})
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "controller error"
    });
  }
}
const deleteALL = async (req, res) => {
  try {
    const users = await userService.getdata()
    if (!users) {
    
      return res.status(404).json({message : "don't have data to delete"})
    }
    await userService.deleteALL()
    return res.status(200).json({
      message: "All document delete successfully"
    })

  }  catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "controller error"
    });
  }
}
module.exports = {
  createData,
  getAction,
  getAll,
  deleteALL
};