<template>
  <div
    :class="[
      'min-h-screen flex flex-col items-center',
      {
        'bg-gray-100 text-gray-900': theme === 'light',
        'bg-gray-900 text-gray-100': theme === 'dark',
      },
    ]"
  >
    <div class="w-full max-w-2xl p-6 mx-auto relative">
      <h1 class="text-3xl font-bold mb-6">Todo List</h1>
      <TodoForm @saveTodo="addTodo" />
      <div class="flex items-center justify-between mt-6">
        <div class="flex items-center space-x-4">
          <label for="filter" class="text-lg">Filter:</label>
          <select
            id="filter"
            v-model="filter"
            @change="filterTodos"
            class="border rounded p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <button
          @click="sortTodos"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort
        </button>
      </div>
      <div v-for="todo in filteredTodos" :key="todo.id" class="mt-4">
        <TodoItem
          :todo="todo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
          @toggleComplete="toggleComplete"
        />
      </div>
      <button
        @click="toggleTheme"
        class="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded transform transition-transform duration-500"
        :class="{ 'rotate-180': theme === 'dark' }"
      >
        🌗
      </button>
    </div>
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoItem from "./components/TodoItem.vue";

export default {
  components: {
    TodoForm,
    TodoItem,
  },
  data() {
    return {
      todos: [],
      filter: "all",
      theme: "light",
      currentTodo: null,
      filteredTodos: [],
    };
  },
  methods: {
    addTodo(todo) {
      if (this.currentTodo) {
        const index = this.todos.findIndex((t) => t.id === this.currentTodo.id);
        this.$set(this.todos, index, { ...this.currentTodo, ...todo });
        this.currentTodo = null;
      } else {
        this.todos.push({ ...todo, id: Date.now(), completed: false });
      }
      this.filterTodos();
    },
    editTodo(todo) {
      this.currentTodo = todo;
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.filterTodos();
    },
    toggleComplete(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
      this.filterTodos();
    },
    filterTodos() {
      if (this.filter === "completed") {
        this.filteredTodos = this.todos.filter((todo) => todo.completed);
      } else if (this.filter === "incomplete") {
        this.filteredTodos = this.todos.filter((todo) => !todo.completed);
      } else {
        this.filteredTodos = this.todos;
      }
    },
    sortTodos() {
      this.filteredTodos = this.filteredTodos.sort((a, b) =>
        a.date.localeCompare(b.date)
      );
    },
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", this.theme === "dark");
    },
  },
  created() {
    console.log("App component created");
    this.filterTodos();
  },
};
</script>

<style>
@import "tailwindcss/tailwind.css";

/* Ensure text color is always black */
input,
textarea {
  background-color: var(--background-color);
  color: black;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
