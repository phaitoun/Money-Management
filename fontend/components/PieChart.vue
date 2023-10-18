
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

  watch(
    [() => props.income, () => props.expense],
    ([income, expense]) => {
      if (income !== null && expense !== null) {
        pieChartData.value = {
          type: "pie",
          data: {
            labels: ["Expense", "Income"],
            datasets: [
              {
                data: [expense, income],
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

        if (chartInstance) {
          chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, pieChartData.value);
      }
    },
    { immediate: true }
  );
});

</script>

<style>
</style>
  