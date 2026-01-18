<script>
import { useTodosStore } from "@/stores/todos.js";

export default {
  emits: ["cancelEditTodoBar"],
  props: ["todo"],
  setup() {
    const todosStore = useTodosStore();
    return { todosStore };
  },
  data() {
    return {
      textTodo: "",
      isLoading: false,
      complete: false,
      selectedOption: "unComplete",
    };
  },
  methods: {
    editTodoElement() {
      if (this.textTodo) {
        this.isLoading = true;
        this.complete = this.selectedOption !== "unComplete";
        this.todosStore
          .editTodos({
            id: this.todo.id,
            text: this.textTodo,
            is_complete: this.complete,
          })
          .then(() => {
            const index = this.todosStore.todos.findIndex(obj => obj.id === this.todo.id);
            this.todosStore.todos[index].text = this.textTodo;
            this.todosStore.todos[index].is_complete = this.complete;
          })
          .finally(() => {
            this.isLoading = false;
            this.$emit("cancelEditTodoBar");
          });
      }
    },
    deleteTodoElement() {
      this.isLoading = true;
      this.todosStore
        .deleteTodos({
          id: this.todo.id,
        })
        .then(() => {
          if (this.todosStore.params.page === 1) {
            this.todosStore.getTodos()
          } else {
            this.todosStore.params.page = 1;
          }
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit("cancelEditTodoBar");
        });
    },
  },
};
</script>

<template>
  <main
    @click.self="$emit('cancelEditTodoBar')"
    class="h-full fixed w-full inset-0 flex items-center justify-center flex-col p-2"
  >
    <form
        @submit.prevent="editTodoElement"
      class="bg-gray-300 dark:bg-gray-600 rounded-2xl max-w-xl w-full flex items-center justify-between"
    >
      <div class="flex flex-col">
        <h3 class="text-black dark:text-white font-normal p-3">{{ $t('home.edit.label.base') }}</h3>
        <input
          v-model="textTodo"
          class="text-black dark:text-white bg-gray-400 dark:bg-gray-500 font-normal p-3 rounded mt-2 border border-primary-400 m-3 w-100"
          id="text"
          type="text"
          :placeholder="$t('home.edit.placeholder')"
        />
        <div
          v-if="textTodo"
          class="text-black dark:text-white flex justify-between bg-gray-400 dark:bg-gray-500 font-normal p-3 rounded mt-2 border border-primary-400 m-3 w-100"
        >
          <input
              class="cursor-pointer"
            type="radio"
            id="complete"
            value="complete"
            v-model="selectedOption"
          />
          <label class="cursor-pointer" for="complete">{{ $t('home.edit.label.complete') }}</label>

          <input
              class="cursor-pointer"
            type="radio"
            id="unComplete"
            value="unComplete"
            v-model="selectedOption"
          />
          <label class="cursor-pointer" for="unComplete">{{ $t('home.edit.label.unComplete') }}</label>
        </div>
      </div>
      <div class="flex flex-col items-center p-3 gap-3">
        <button
          @click="textTodo = ''"
          type="button"
          class="text-black dark:text-white border rounded font-normal p-1 border-primary-400 transition duration-300 ease-in cursor-pointer hover:scale-120"
        >
          {{ $t('home.edit.button.reset') }}
        </button>
        <button
          @click="deleteTodoElement"
          :disabled="isLoading"
          type="button"
          class="text-black dark:text-white border rounded font-normal p-1 border-primary-400 transition duration-300 ease-in cursor-pointer hover:scale-120 flex items-center justify-center"
        >
          <svg
            v-if="isLoading"
            class="mr-3 size-5 animate-spin"
            viewBox="0 0 24 24"
          >
            <font-awesome-icon icon="fa-solid fa-circle-notch" /></svg
          >{{ $t('home.edit.button.delete') }}
        </button>
        <button
          :class="
            !textTodo
              ? 'cursor-default opacity-60'
              : 'transition duration-300 ease-in cursor-pointer hover:scale-120'
          "
          :disabled="!textTodo && isLoading"
          type="submit"
          class="text-black dark:text-white border rounded font-normal p-1 border-primary-400 flex items-center justify-center"
        >
          <svg
            v-if="isLoading"
            class="mr-3 size-5 animate-spin"
            viewBox="0 0 24 24"
          >
            <font-awesome-icon icon="fa-solid fa-circle-notch" /></svg
          >{{ $t('home.edit.button.submit') }}
        </button>
      </div>
    </form>
  </main>
</template>
