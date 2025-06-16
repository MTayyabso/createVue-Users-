<script setup>
import { ref, watch, onMounted, provide } from 'vue';


const isDark = ref(false);


onMounted(() => {
    const saved = localStorage.getItem('darkMode');
    isDark.value = saved === 'true';
});


watch(isDark, (newVal) => {
    localStorage.setItem('darkMode', newVal);
});


provide('darkMode', isDark);


const toggleDark = () => {
    isDark.value = !isDark.value;

};
</script>

<template>

    <div :class="{ dark: isDark }">
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">

            <button @click="toggleDark"
                class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                {{ isDark ? "Light Mode" : "Dark Mode" }}
            </button>

            <router-view />
        </div>
    </div>
</template>