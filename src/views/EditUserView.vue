<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers } from '../composables/useUsers';
import UserForm from '../components/UserForm.vue';

const route = useRoute();
const router = useRouter();
const { users, updateUser } = useUsers();

const userId = route.params.id;
const editingUser = ref(null);

// Find user by ID when component mounts
onMounted(() => {
    const user = users.value.find(u => u.id === parseInt(userId));
    if (user) editingUser.value = { ...user };
});

const handleUpdate = (updatedUser) => {
    updateUser(updatedUser);
    router.push('/');
};
</script>

<template>
    <RouterLink :to="'/'">

        <button class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700  ml-5 cursor-pointer">
            Back to Form
        </button>

    </RouterLink>
    <div class="max-w-xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Edit User</h2>
        <UserForm v-if="editingUser" :user="editingUser" :onSave="handleUpdate" />
        <p v-else class="text-red-500">User not found.</p>
    </div>
</template>
