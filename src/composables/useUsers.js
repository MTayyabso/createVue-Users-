import { ref, watch } from "vue";

const users = ref([]);
const search = ref("");
const filteredUsers = ref([]);
const isFetched = ref(false);

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  users.value = data;
  filteredUsers.value = data;
  isFetched.value = true;
};

watch(search, (newVal) => {
  console.log("Search Term:", newVal);
  filteredUsers.value = users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(newVal.toLowerCase()) ||
      user.email.toLowerCase().includes(newVal.toLowerCase())
  );
});

export function useUsers() {
  if (!isFetched.value) fetchUsers();

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    users.value.push(newUser);
    filteredUsers.value = users.value;
  };

  const updateUser = (updated) => {
    const index = users.value.findIndex((u) => u.id === updated.id);
    if (index !== -1) {
      users.value[index] = updated;
      filteredUsers.value = users.value;
    }
  };

  const deleteUser = (id) => {
    users.value = users.value.filter((user) => user.id !== id);
    filteredUsers.value = users.value;
  };

  return {
    users: filteredUsers,
    search,
    addUser,
    updateUser,
    deleteUser,
  };
}
