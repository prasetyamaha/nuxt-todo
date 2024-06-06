<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between">
    <div>
      <h2 class="text-xl font-bold">{{ todo.title }}</h2>
      <p>{{ todo.description }}</p>
      <p>{{ todo.date }} at {{ todo.time }}</p>
      <p>{{ todo.place }}</p>
    </div>
    <div class="flex items-center space-x-2">
      <button @click="$emit('toggleComplete', todo.id)" :class="['px-4 py-2 rounded', { 'bg-green-500': todo.completed, 'bg-red-500': !todo.completed }]">
        {{ todo.completed ? 'Completed' : 'Incomplete' }}
      </button>
      <button @click="$emit('editTodo', todo)" class="px-4 py-2 rounded bg-blue-500 text-white">Edit</button>
      <button @click="$emit('deleteTodo', todo.id)" class="px-4 py-2 rounded bg-red-500 text-white">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>
