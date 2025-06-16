<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({ user: Object });
const emit = defineEmits(['save']);

const localUser = ref(props.user ? { ...props.user } : { name: '', email: '' });
const error = ref('');

const handleSubmit = () => {
    if (!localUser.value.name || !localUser.value.email) {
        error.value = 'Name and Email are required!';
        return;
    }
    emit('save', localUser.value);
    localUser.value = { name: '', email: '' };
    error.value = '';
};

watch(() => props.user, (newUser) => {
    if (newUser) localUser.value = { ...newUser };
});
</script>
<template>
    <form @submit.prevent="handleSubmit" class="space-y-3 bg-white dark:bg-gray-700 p-4 rounded shadow">
        <input v-model="localUser.name" placeholder="Name"
            class="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600" />

        <input v-model="localUser.email" placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600" />

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            {{ user ? 'Update' : 'Add' }} User
        </button>
    </form>
</template>
