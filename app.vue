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
        <div class="flex items-center space-x-4">
          <label for="sort" class="text-lg">Sort by:</label>
          <select
            id="sort"
            v-model="sortCriteria"
            @change="sortTodos"
            class="border rounded p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="status">Status</option>
          </select>
        </div>
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
    <Modal v-if="isEditModalVisible" :todo="currentTodo" @saveTodo="addTodo" @close="closeEditModal" />
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoItem from "./components/TodoItem.vue";
import Modal from "./components/Modal.vue";

export default {
  components: {
    TodoForm,
    TodoItem,
    Modal
  },
  data() {
    return {
      todos: [],
      filter: "all",
      sortCriteria: "date",
      theme: "light",
      currentTodo: null,
      filteredTodos: [],
      isEditModalVisible: false
    };
  },
  methods: {
    addTodo(todo) {
      todo.date = this.formatDate(todo.date);
      const index = this.todos.findIndex(t => t.id === todo.id);
      if (index !== -1) {
        this.todos.splice(index, 1, todo);
      } else {
        this.todos.push({ ...todo, completed: false });
      }
      this.saveTodos();
      this.isEditModalVisible = false;
      this.filterTodos();
    },
    editTodo(todo) {
      this.currentTodo = todo;
      this.isEditModalVisible = true;
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveTodos();
      this.filterTodos();
    },
    toggleComplete(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
      this.saveTodos();
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
      this.sortTodos();
    },
    sortTodos() {
      if (this.sortCriteria === "date") {
        this.filteredTodos.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (this.sortCriteria === "title") {
        this.filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortCriteria === "status") {
        this.filteredTodos.sort((a, b) => a.completed - b.completed);
      }
    },
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      localStorage.setItem('theme', this.theme);
    },
    closeEditModal() {
      this.isEditModalVisible = false;
      this.currentTodo = null;
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadTodos() {
      const todos = JSON.parse(localStorage.getItem('todos'));
      if (todos) {
        this.todos = todos;
      }
    },
    loadTheme() {
      const theme = localStorage.getItem('theme');
      if (theme) {
        this.theme = theme;
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  },
  mounted() {
    this.loadTodos();
    this.loadTheme();
    this.filterTodos();
  }
};
</script>

<style scoped>
body {
  transition: background-color 0.3s, color 0.3s;
}
</style>
