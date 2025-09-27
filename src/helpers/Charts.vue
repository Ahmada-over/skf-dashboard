<!-- <template>
    <v-card class="pa-5">
        <v-sparkline
        type="trend"
        smooth="12"
        line-width="1"
        :labels="labels"
        stroke-linecap="round"
        auto-draw
        :model-value="data"
        >
        </v-sparkline>
    </v-card>

</template>
<script setup lang="ts">

const labels: string[] = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
const data: number[] = [12, 34, 56, 78, 90, 23, 45, 67, 89, 10, 32, 54]
</script> -->

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const chartData = {
  labels: ["JAN", "FEB", "MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
  datasets: [
    {
      label: "Vendu",
      data: [5, 10, 3, 5, 1, 7, 8, 6, 4, 9, 2, 11],
      borderColor: "#FAC1D9",
      backgroundColor: "#FAC1D9",
      tension: 0.3
    },
    {
      label: "Revenue",
      data: [2, 6, 4, 8, 3, 7, 5, 9, 1, 6, 4, 8],
      borderColor: "#D9D9D9",
      backgroundColor: "#D9D9D9",
      tension: 0.3
    }
  ]
};

const chartOptions = { responsive: true, maintainAspectRatio: false };
</script>

<template>
    <v-card>
      <v-container>    
        <v-row>
            <v-col>
                <p class="text-h6">Explication</p>
            </v-col>
            <v-col></v-col>
        </v-row>
        </v-container>  
           <div class="pa-5">
              <Line :data="chartData" :options="chartOptions" />
           </div> 
    </v-card>

</template>
