const { firestore } = require('../db');
const TimeRecord = new Date();
const actionType = {
  income: 0,
  outcome: 1
}
const createData = async (price, actions, time, description) => {

  if (actions == actionType.income) {
    const docRef = await firestore.collection('Money').add({
      description,
      price,
      actions,
      time,
      TimeRecord
    }); // Replace with your Firestore collection name
    const doc = await docRef.get();
    return {
      id: doc.id,
      ...doc.data()
    };
  }
  else if(actions == actionType.outcome){
    const docRef = await firestore.collection('Money').add({
      description,
      price,
      actions,
      time,
      TimeRecord
    }); // Replace with your Firestore collection name
    const doc = await docRef.get();
    return {
      id: doc.id,
      ...doc.data()
    };
  }
  
  const doc = await docRef.get();
  return {
    id: doc.id,
    ...doc.data()
  };
};


const getallDataByIncome = async () => {
  try {


    
    const incomeQuery = await firestore.collection('Money').where('actions', '==', actionType.income).get();

    incomeQuery.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    })
    return users;
  } catch {
    return console.log("service error")
  }


};

const getallDataByOutcome = async () => {
  
  const outcomeQuery = await firestore.collection('Money').where('actions', '==', actionType.outcome).get();

  outcomeQuery.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  })
  return users;
}
const getadata = async ()=>{
  const QueryAll = await firestore.collection('Money').get();

  QueryAll.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  })
  return users;
}

module.exports = {
  createData,
  getallDataByIncome,
  getallDataByOutcome,
  getadata

};