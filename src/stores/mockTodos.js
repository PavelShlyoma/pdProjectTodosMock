import { defineStore } from "pinia";

export const useTodosMockStore = defineStore("mockTodos", {
  state: () => ({
    todos: [],
    total: '',
  }),
  actions: {
    getAllTotal(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getAllTodos() {
      const array = [];
      for (let i = 1; i <= this.total; i++) {
        const obj = {};
        obj.id = i;
        obj.text = "Example text";
        obj.is_complete = Math.round(Math.random()) !== 0;
        obj.created_at = new Date().toISOString().slice(0, 20);
        array.push(obj);
      }
      return array;
    },
    getPageTodos(page, todos) {
      const array = [];
      for (let i = page * 10 - 10; i <= page * 10; i++) {
        if (todos[i] !== undefined) {
          array.push(todos[i]);
        }
      }
      return array;
    },
    getFilteredTodos(filter) {
      if (filter === "all") {
        return this.todos
      } else if (filter === "complete") {
        return this.todos.filter((item) => item.is_complete === true)
      } else {
        return this.todos.filter((item) => item.is_complete === false)
      }
    },
    pathTodoElement(id, complete) {
      const index = this.todos.findIndex((todo) => todo.id === +id);
      this.todos[index].is_complete = complete;
    },
    putTodoElement(id, complete, text) {
      const index = this.todos.findIndex((todo) => todo.id === +id);
      this.todos[index].is_complete = complete;
      this.todos[index].text = text;
      this.todos[index].created_at = new Date().toISOString().slice(0, 20);
    },
    deleteTodoElement(id) {
      const index = this.todos.findIndex((todo) => todo.id === +id);
      this.todos.splice(index, 1);
    },
  }
});
