<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <!-- make this button work -->
  <button @click="count++">Count is: {{ count }}</button>
</template>