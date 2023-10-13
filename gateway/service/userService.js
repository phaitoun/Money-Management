const { firestore } = require('../db');

// Service to create a new document in Firestore
const createData = async (price, actions, time,description) => {
  const docRef = await firestore.collection('Money').add({
    description,
    price,
    actions,
    time
  }); // Replace with your Firestore collection name
  const doc = await docRef.get();
  return { id: doc.id,...doc.data() };
};


const getallData = async() =>{
  try{
    const users = []
    const snapshot = await firestore.collection('Money').get();
          snapshot.forEach((doc)=>{
            users.push({
              id:doc.id, ...doc.data()
            });
          })
    return users;
  }
  catch{
    return console.log("service error")
  }


};




module.exports = {
  createData,
  getallData,


};
