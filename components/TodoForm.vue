<template>
  <div>
    <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div class="mb-4">
        <input type="text" v-model="title" placeholder="Title" required class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black" />
      </div>
      <div class="mb-4">
        <textarea v-model="description" placeholder="Description" class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black"></textarea>
      </div>
      <div class="mb-4 flex space-x-4">
        <input type="date" v-model="date" class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black" />
        <input type="time" v-model="time" class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black" />
      </div>
      <div class="mb-4">
        <input type="text" v-model="place" placeholder="Place" class="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black" />
      </div>
      <div class="text-right">
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded" :disabled="!isFormValid">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      date: '',
      time: '',
      place: ''
    };
  },
  computed: {
    isFormValid() {
      return this.title && this.description && this.date && this.time && this.place;
    }
  },
  methods: {
    submitForm() {
      console.log('Form submitted');
      this.$emit('saveTodo', {
        title: this.title,
        description: this.description,
        date: this.date,
        time: this.time,
        place: this.place
      });
      this.resetForm();
    },
    resetForm() {
      this.title = '';
      this.description = '';
      this.date = '';
      this.time = '';
      this.place = '';
    }
  }
};
</script>
