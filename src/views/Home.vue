<script setup>
import { ref } from 'vue';
import { useUsers } from '../composables/useUsers';
import UserForm from '../components/UserForm.vue';

const { users, search, addUser, updateUser, deleteUser } = useUsers();



</script>
<template>
    <div class="max-w-3xl mx-auto space-y-6">
        <!-- Search Box -->
        <input v-model="search" placeholder="Search users..."
            class="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600" />





        <UserForm :onSave="addUser" />


        <!-- User List  -->
        <transition-group name="fade" tag="ul" class="space-y-4">
            <li v-for="user in users" :key="user.id"
                class="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow flex justify-between items-center">
                <router-link :to="`/user/${user.id}`" class="font-semibold hover:underline">
                    {{ user.name }}
                </router-link>
                <div class="space-x-2">
                    <router-link :to="`/edit/${user.id}`">
                        <button class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition">
                            Edit
                        </button>
                    </router-link>
                    <button @click="deleteUser(user.id)"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
                        Delete
                    </button>
                </div>
            </li>
        </transition-group>


    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>