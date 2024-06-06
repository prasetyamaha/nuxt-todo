<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-lg w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Edit Todo</h2>
        <button @click="$emit('close')" class="text-red-500">Close</button>
      </div>
      <TodoForm :todo="todo" @saveTodo="saveTodo" />
    </div>
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue';

export default {
  components: {
    TodoForm,
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    saveTodo(todo) {
      this.$emit('saveTodo', todo);
      this.$emit('close');
    }
  }
};
</script>
