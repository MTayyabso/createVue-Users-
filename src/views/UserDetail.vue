<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUsers } from '../composables/useUsers';

const route = useRoute();
const { users } = useUsers();
const user = ref(null);


const id = parseInt(route.params.id);


const localUser = users.value.find(u => u.id === id);
if (localUser) {
    user.value = localUser;
} else {

    console.log("error");

}

</script>

<template>
    <div v-if="user" class="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 class="text-2xl font-bold">{{ user.name }}</h2>
        <p class="text-gray-600 dark:text-gray-300">{{ user.email }}</p>
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">
        User not found.
    </div>
</template>