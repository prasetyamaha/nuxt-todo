<template>
  <div>
    <form
      @submit.prevent="submitForm"
      class="bg-white dark:bg-gray-800 p-4 rounded shadow"
    >
      <div class="mb-4">
        <input
          type="text"
          v-model="title"
          placeholder="Title"
          required
          class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black"
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model="description"
          placeholder="Description"
          class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black"
        ></textarea>
      </div>
      <div class="mb-4 flex space-x-4">
        <input
          type="date"
          v-model="date"
          @input="validateDate"
          class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black"
        />
        <input
          type="time"
          v-model="time"
          class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black"
        />
      </div>
      <div class="mb-4">
        <input
          type="text"
          v-model="place"
          placeholder="Place"
          class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black"
        />
      </div>
      <div class="text-right">
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded"
          :disabled="!isFormValid"
        >
          {{ todo.id ? "Update" : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        date: "",
        time: "",
        place: "",
      }),
    },
  },
  data() {
    return {
      title: this.todo.title || "",
      description: this.todo.description || "",
      date: this.todo.date || "",
      time: this.todo.time || "",
      place: this.todo.place || "",
      dateError: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.title &&
        this.description &&
        this.date &&
        this.time &&
        this.place &&
        !this.dateError
      );
    },
  },
  watch: {
    todo: {
      handler(newTodo) {
        this.title = newTodo.title || "";
        this.description = newTodo.description || "";
        this.date = newTodo.date || "";
        this.time = newTodo.time || "";
        this.place = newTodo.place || "";
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    validateDate() {
      const year = this.date.split("-")[0];
      if (year.length > 4) {
        this.dateError = true;
        alert("The year cannot be more than 4 digits");
      } else {
        this.dateError = false;
      }
    },
    submitForm() {
      if (this.dateError) {
        alert("Please fix the errors before submitting.");
        return;
      }
      this.$emit("saveTodo", {
        title: this.title,
        description: this.description,
        date: this.date,
        time: this.time,
        place: this.place,
        id: this.todo.id || Date.now(),
        completed: this.todo.completed || false,
      });
      this.resetForm();
    },
    resetForm() {
      this.title = "";
      this.description = "";
      this.date = "";
      this.time = "";
      this.place = "";
    },
  },
};
</script>
