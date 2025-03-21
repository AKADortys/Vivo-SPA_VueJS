<template></template>

<script setup>
import { ref, onMounted } from 'vue'
import VivoBack from "@/services/VivoBack.js";

const user = ref({})
const errorMessage = ref('')

onMounted(async () =>{
    try {
        user.value = await VivoBack.
    } catch (error) {
        errorMessage.value = error.message
    }

})
</script>
