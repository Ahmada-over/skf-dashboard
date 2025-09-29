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
 import { ref } from 'vue'

const toggle = ref(null)
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
        <v-row justify="space-between">
            <v-col class="me-auto" cols="auto">
                <p class="text-h6">Explication</p>
            </v-col>
                <v-spacer></v-spacer>
            <v-col>
              <v-row>
                <v-btn-toggle v-model="toggle" class="me-5" color="#FAC1D9">
                  <v-btn>
                    Mois
                  </v-btn>
                  <v-btn>
                    Année
                  </v-btn>
                  <v-btn>
                    Jour
                  </v-btn>
                </v-btn-toggle> 
                <v-btn variant="outlined" class="principal">
                  <v-icon>mdi-download</v-icon>
                    Export
                  </v-btn>
              </v-row>
            </v-col>
        </v-row>
        </v-container>  
           <div class="pa-5">
              <Line :data="chartData" :options="chartOptions" />
           </div> 
    </v-card>

</template>
