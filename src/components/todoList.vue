<script>
import { useTodosStore } from "@/stores/todos.js";
import editTodoBarComp from "@/components/editTodoBar.vue";

export default {
  setup() {
    const todosStore = useTodosStore();
    return { todosStore };
  },
  components: {
    editTodoBarComp,
  },
  props: ["todos"],
  data() {
    return {
      editTodoBar: false,
      editTodoElement: "",
      isLoading: false,
    };
  },
  methods: {
    openTodo(todo) {
      this.editTodoBar = !this.editTodoBar;
      this.editTodoElement = todo;
    },
    patchTodoElement(todo, completed) {
      this.isLoading = true;
      this.todosStore
        .patchTodos({
          id: todo.id,
          complete: completed,
        })
        .then(() => {
          todo.is_complete = !todo.is_complete;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<template>
  <section class="flex flex-col gap-2 max-w-5xl mx-auto">
    <button
      :class="{ 'opacity-50': todo.is_complete }"
      class="bg-gray-600 dark:bg-gray-800 flex gap-3 items-center rounded-2xl p-2 transition duration-300 ease-in cursor-pointer hover:scale-101"
      v-for="todo in todos"
      :key="todo.id"
      @click="openTodo(todo)"
    >
      <font-awesome-icon
        @click.stop="patchTodoElement(todo, 'true')"
        :disabled="isLoading"
        v-if="todo.is_complete === false"
        class="text-white text-2xl font-normal transition duration-300 ease-in cursor-pointer hover:scale-120"
        icon="fa-solid fa-check"
      />
      <font-awesome-icon
        @click.stop="patchTodoElement(todo, 'false',)"
        :disabled="isLoading"
        v-else
        class="text-white text-2xl font-normal transition duration-300 ease-in cursor-pointer hover:scale-120"
        icon="fa-solid fa-xmark"
      />
      <div class="flex flex-col gap-1 w-full">
        <div class="text-xl font-normal text-white text-left">
          {{ todo.text }}
        </div>
        <div class="text-xl font-normal text-white flex justify-between">
          <div>{{ todo.created_at.slice(0, 10) }}</div>
          <div>{{ todo.created_at.slice(11, -1) }}</div>
        </div>
      </div>
    </button>
    <edit-todo-bar-comp
      :todo="editTodoElement"
      v-if="editTodoBar"
      @cancel-edit-todo-bar="editTodoBar = !editTodoBar"
    ></edit-todo-bar-comp>
  </section>
</template>
