<template>
  <div class="container">
    <div class="action-container">
      <ul class="action-menu row d-flex">
        <li class="action-item col-4 list-group-item d-flex align-items-center justify-content-center" @click="checkActions(0, `Income`)">Income</li>
        <li class="action-item col-4 list-group-item d-flex align-items-center justify-content-center" @click="checkActions(1, `Expense`)">Expenses</li>
        <li class="action-item col-4 list-group-item d-flex align-items-center justify-content-center" @click="getUsers()">All</li>
      </ul>
    </div>
    <div class="pie-chart d-flex flex-column flex-sm-row align-items-center justify-content-center">
        <PieChart :income="incomePercent" :expense="expensePercent"/>
        <img src="../assets/img/meme-no-money.png" v-if="incomePercent < expensePercent">
        <img src="../assets/img/meme-have-money.png" v-if="incomePercent > expensePercent">
    </div>
    <div class="transaction-container d-flex align-items-center justify-content-center row">
      <div class="col-10" v-if="totalVisible">
        <div class="d-flex justify-content-between align-items-center mt-3 border-bottom border-top pb-3 pt-3">
          <h2 class="ps-5">Transaction History</h2>
          <CreateData class="pe-5"/>
        </div>
        <div class="transaction-box p-2 pt-3">
          <div v-for="transaction in sortedData" :key="transaction.id" class="transaction-list d-sm-flex justify-content-between align-items-center">
            <p class="fw-bold title">{{ transaction.description}}</p>
            <div class="money-box d-flex flex-column align-items-sm-end">
              <p v-if="(transaction.actions === 0)" class="plus text-sm-end"><span>+{{ transaction.price}}</span> Kip</p>
              <p v-else class="minus text-sm-end"><span>-{{ transaction.price}}</span> Kip</p>
              <p class="date text-start text-sm-end">Date: {{ transaction.time }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-10" v-if="transactionVisible">
        <div class="d-flex justify-content-between align-items-center mt-3 border-bottom border-top pb-3 pt-3">
          <h2 >{{ checkTitle }}</h2>
          <CreateData />
        </div>
        <div class="transaction-box p-2 pt-3">
          <div v-for="transaction in sortedData" :key="transaction.id" class="transaction-list d-sm-flex justify-content-between align-items-center">
            <p class="fw-bold">{{ transaction.description}}</p>
            <div class="money-box d-flex flex-column align-items-sm-end">
              <p v-if="(transaction.actions === 0)" class="plus text-sm-end"><span>+{{ transaction.price}}</span> Kip</p>
              <p v-else class="minus text-sm-end"><span>-{{ transaction.price}}</span> Kip</p>
              <p class="date text-start text-sm-end">Date: {{ transaction.time }}</p>
            </div>
          </div>
        </div>
      </div>
      <DeleteData />
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      transactions: [],
      transactionVisible : false,
      totalVisible : true,
      checkTitle: '',
      total: [],
      incomePercent: 0,
      expensePercent: 0
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {

    // Get all data
    async getUsers() {
      this.totalVisible = true
      this.transactionVisible = false
      try {
        const response = await axios.get("http://localhost:3020/api/getAll");
        this.transactions = response.data;
        console.log(this.transactions);
        this.sumMoney(this.transactions)
      } catch (error) {
        console.log(error);
      } 
    },

    sumMoney(transaction){
      this.total = transaction.reduce((accumulator, currentValue) => {
        if (currentValue.actions === 0) {
            accumulator.income += currentValue.price;
        } else {
            accumulator.expense += currentValue.price;
        }
        return accumulator;
      }, { income: 0, expense: 0 });
      this.incomePercent = parseFloat(((this.total.income / (this.total.expense + this.total.income)) * 100).toFixed(2))
      this.expensePercent = parseFloat(((this.total.expense / (this.total.expense + this.total.income)) * 100).toFixed(2))
    },

    // Get Income and Expense data
    async checkActions(action, title) {
      this.totalVisible = false
      this.transactionVisible =  true
      this.checkTitle = title
      try {
        const response = await axios.get(`http://localhost:3020/api/getAction/${action}`);
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleEvent(playload){
      this.dialog = playload
    }
  },
  computed: {
    sortedData(){
      return this.transactions.sort((a, b) => b.id - a.id)
    }
  }
};
</script>

<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans Lao', sans-serif;
    font-family: 'Noto Sans Lao Looped', sans-serif;
  }
  .action-item{
    padding: 20px 0;
    cursor: pointer;
    border: 1px solid black;
  }
  .container{
    max-width: 100%;
    padding: 20px;
  }
  .transaction-box{
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .transaction-list{
    box-shadow: 0 2px 5px 3px rgb(0, 0, 0, 0.3);
    padding: 20px 10px;
    margin-bottom: 20px;
    border-radius: 5px;
  }
  .plus span{
    color: #2ecc71;
  }
  .minus span{
    color: red;
  }
  .money-box{
    width: 150px;
  }
  .date{
    width: 140px;
    font-size: 12px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  img{
    max-width: 250px;
  }
</style>