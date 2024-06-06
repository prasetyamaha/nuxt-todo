import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    editTodo(state, updatedTodo) {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        Vue.set(state.todos, index, updatedTodo);
      }
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    toggleComplete(state, id) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit("addTodo", todo);
    },
    editTodo({ commit }, updatedTodo) {
      commit("editTodo", updatedTodo);
    },
    deleteTodo({ commit }, id) {
      commit("deleteTodo", id);
    },
    toggleComplete({ commit }, id) {
      commit("toggleComplete", id);
    },
  },
  getters: {
    todos: (state) => state.todos,
    filteredTodos: (state) => (filter) => {
      if (filter === "completed") {
        return state.todos.filter((todo) => todo.completed);
      } else if (filter === "incomplete") {
        return state.todos.filter((todo) => !todo.completed);
      } else {
        return state.todos;
      }
    },
  },
});
