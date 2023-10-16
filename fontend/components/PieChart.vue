<template>
    <div>
      <canvas id="pieChart" class="piechart"></canvas>
      <p>{{ total }}</p>
    </div>
</template> 

<script setup>
import { Chart, registerables } from "chart.js";
import { ref, onMounted } from "vue"
import { parse } from "vue/compiler-sfc";

const pieChartData = ref({
    type: "pie",
    data: {
      labels: ["Expense", "Income"],
      datasets: [
        {
          data: [70, 70],
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
  });

const data = ref([])

const total =ref()

onMounted(() => {
    const ctx = document.getElementById("pieChart");
    Chart.register(...registerables);
    new Chart(ctx, pieChartData.value);
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
                accumulator.expens += currentValue.price;
            }
            return accumulator;
        }, { income: 0, expens: 0 });
        console.log(data.value);    
    })
    .catch((err) => {
        console.log(err);
    })
}
</script>

<style scoped>
    
</style>