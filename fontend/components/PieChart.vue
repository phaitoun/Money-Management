<template>
  <div>
    <canvas id="pieChart"></canvas>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { ref, onMounted, defineProps, watch } from "vue";

const props = defineProps({
  income: {
    type: Number,
    default: null,
  },
  expense: {
    type: Number,
    default: null,
  },
});

const pieChartData = ref(null);
let chartInstance;

onMounted(() => {
  const ctx = document.getElementById("pieChart");
  Chart.register(...registerables);

  pieChartData.value = {
    type: "pie",
    data: {
      labels: ["Expense", "Income"],
      datasets: [
        {
          data: [0, 0],
          backgroundColor: ["rgb(255, 0, 0)", "#2ecc71"],
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
  };

  chartInstance = new Chart(ctx, pieChartData.value);

  watch(
    [() => props.income, () => props.expense],
    ([income, expense]) => {
      if (income !== 0 || expense !== 0) {
        pieChartData.value.data.datasets[0].data = [expense, income];
      } else {
        pieChartData.value.data.datasets[0].data = [50, 50];
      }
      chartInstance.update();
    },
    { immediate: true }
  );
});
</script>

<style>
</style>
