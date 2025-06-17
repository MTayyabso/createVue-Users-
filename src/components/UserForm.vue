<script setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps({
    user: Object,
    onSave: Function
});

const localUser = ref(props.user ? { ...props.user } : { name: '', email: '' });
const error = ref({ name: '', email: '' });

const handleSubmit = () => {
    let hasError = false;
    error.value = { name: '', email: '' };

    if (!localUser.value.name.trim()) {
        error.value.name = 'Name is required';
        hasError = true;
    }

    if (!localUser.value.email.trim()) {
        error.value.email = 'Email is required';
        hasError = true;
    }

    if (hasError) return;

    props.onSave(localUser.value);
    localUser.value = { name: '', email: '' };
    error.value = { name: '', email: '' };
};

watch(() => props.user, (newUser) => {
    if (newUser) {
        localUser.value = { ...newUser };
        error.value = { name: '', email: '' };
    }
});

watch(() => localUser.value.name, (val) => {
    if (val.trim()) error.value.name = '';
});

watch(() => localUser.value.email, (val) => {
    if (val.trim()) error.value.email = '';
});
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white dark:bg-gray-700 p-4 rounded shadow">
        <!-- Name Input -->
        <div>
            <input v-model="localUser.name" placeholder="Name" type="text"
                class="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                :class="error.name ? 'border-red-500' : 'border-gray-300'" />
            <p v-if="error.name" class="text-red-500 text-sm mt-1">{{ error.name }}</p>
        </div>

        <!-- Email Input -->
        <div>
            <input v-model="localUser.email" placeholder="Email" type="email"
                class="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                :class="error.email ? 'border-red-500' : 'border-gray-300'" />
            <p v-if="error.email" class="text-red-500 text-sm mt-1">{{ error.email }}</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            {{ user ? 'Update' : 'Add' }} User
        </button>
    </form>
</template>
