<template>
    <div>
      <canvas id="pieChart" class="piechart"></canvas>
      <p>{{ total }}</p>
      <p>This {{ incomePercent }}</p>
      <p>This {{ expensePercent }}</p>
      <p>This {{ pieChartData.data.datasets[0].data }}</p>
    </div>
</template> 

<script setup>
import { Chart, registerables } from "chart.js";
import { ref, onMounted } from "vue";

const data = ref([])

const total = ref()

let incomePercent 
let expensePercent

const pieChartData = ref({
    type: "pie",
    data: {
      labels: ["Expense", "Income"],
      datasets: [
        {
          data: [ ],
          backgroundColor: [
            "rgb(255, 0, 0)",
            "#2ecc71",
          ],
          hoverOffset: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Transaction Chart",
        },
      },
    },
  })

onMounted(() => {
    getData()
})

function getData(){
    fetch('http://localhost:3020/api/getAll')
    .then((res) => res.json())
    .then((res) => {
        data.value = res
        total.value = data.value.reduce((accumulator, currentValue) => {
            if (currentValue.actions === 0) {
                accumulator.income += currentValue.price;
            } else {
                accumulator.expense += currentValue.price;
            }
            return accumulator;
        }, { income: 0, expense: 0 }); 
        incomePercent = ((total.value.income / (total.value.expense + total.value.income)) * 100).toFixed(2)
        expensePercent = ((total.value.expense / (total.value.expense + total.value.income)) * 100).toFixed(2)
        
        pieChartData.value.data.datasets[0].data = [parseFloat(expensePercent), parseFloat(incomePercent)]

        const ctx = document.getElementById("pieChart");
        Chart.register(...registerables);
        new Chart(ctx, pieChartData.value);
    })
    .catch((err) => {
        console.log(err);
    })
}
</script>

<style scoped>
    .piechart{
      width: 400px;
      height: 400px;
    }
</style>