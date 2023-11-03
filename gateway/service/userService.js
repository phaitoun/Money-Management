const { firestore } = require('../db');
const TimeRecord = new Date();

const actionType = {
  income: 0,// in
  outcome: 1 // out
}
let currentId = 0;


const createData = async (price, actions, time, description) => {
  const users = []

  if (actions == actionType.income)
  {
    currentId++
    const docRef = await firestore.collection('Money').add({
      description,
      price,
      actions,
      time,
      TimeRecord,
      id: currentId
      
    }); // Replace with your Firestore collection name
    const doc = await docRef.get();
    return {
      id: doc.id,
      ...doc.data()
    };
  }
  else if (actions == actionType.outcome)
  {
    currentId++
    const docRef = await firestore.collection('Money').add({
      description,
      price,
      actions,
      time,
      TimeRecord,
      id: currentId
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
  const users = []

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
  const users = []

  const outcomeQuery = await firestore.collection('Money').where('actions', '==', actionType.outcome).get();

  outcomeQuery.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  })
  return users;
}
const getdata = async () => {
  const users = []
 
  const QueryAll = (await firestore.collection('Money').get());
  if(QueryAll.empty){
    return null;
  }
  QueryAll.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  })
  return users;
}
const deleteALL = async () => {
  try {
    currentId = 0
    const usersRef = firestore.collection('Money');
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return null; // No users found
    }

    // Delete all user documents
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // Return a success message or any other desired response
    return {
      message: 'All users deleted successfully'
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createData,
  getallDataByIncome,
  getallDataByOutcome,
  getdata,
  deleteALL

};