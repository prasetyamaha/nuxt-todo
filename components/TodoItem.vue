<template>
  <div
    :class="{
      'todo-item': true,
      'bg-white dark:bg-gray-800 p-4 rounded shadow': true,
      completed: todo.completed,
    }"
  >
    <h3 class="text-lg font-semibold mb-2">{{ todo.title }}</h3>
    <p class="mb-2">{{ todo.description }}</p>
    <p class="text-sm text-gray-500 mb-2">{{ todo.date }} {{ todo.time }}</p>
    <p class="text-sm text-gray-500 mb-2">{{ todo.place }}</p>
    <div class="flex space-x-4">
      <button
        @click="toggleComplete"
        class="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        {{ todo.completed ? "Mark Incomplete" : "Mark Complete" }}
      </button>
      <button
        @click="$emit('editTodo', todo)"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
      <button
        @click="$emit('deleteTodo', todo.id)"
        class="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  methods: {
    toggleComplete() {
      console.log("Toggle complete for todo", this.todo.id);
      this.$emit("toggleComplete", this.todo.id);
    },
  },
  created() {
    console.log("TodoItem component created");
  },
};
</script>

<style>
.todo-item.completed {
  text-decoration: line-through;
}
</style>
