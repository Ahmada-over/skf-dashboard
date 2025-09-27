<template>
    <v-sparkline
    :model-value="value"
    type="bar"
    color="#50CD89"
    smooth="5"
    line-width="5"
    stroke-linecap="round"
    />
</template>
<script setup lang="ts">
const value: number[] = [0, 2, 5, 1, 8, 2, 9, 0];
</script>
