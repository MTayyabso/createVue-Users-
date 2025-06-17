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
    <RouterLink :to="'/'">

        <button class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700  ml-5 cursor-pointer">
            Back to Form
        </button>

    </RouterLink>
    <div v-if="user" class="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 class="text-2xl font-bold"> Name : {{ user.name }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mt-2"> Email : {{ user.email }}</p>
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">
        User not found.
    </div>
</template>