<script>
import { useTodosStore } from "@/stores/todos.js";
export default {
  emits: ["cancelAddTodoBar"],
  setup() {
    const todosStore = useTodosStore();
    return { todosStore };
  },
  data() {
    return {
      textTodo: "",
      isLoading: false,
    };
  },
  methods: {
    postTodoElement() {
      if (this.textTodo) {
        this.isLoading = true;
        this.todosStore
          .postTodos({
            text: this.textTodo,
          })
          .then(() => {
            if (this.todosStore.params.page === 1) {
              this.todosStore.getTodos()
            }
            this.todosStore.params.page = 1;
          })
          .finally(() => {
            this.isLoading = false;
            this.$emit("cancelAddTodoBar");
          });
      }
    },
  },
};
</script>

<template>
  <main
      @click.self="$emit('cancelAddTodoBar')"
      class="h-full fixed w-full inset-0 flex items-center justify-center flex-col p-2"
  >
    <form
        @submit.prevent="postTodoElement"
      class="bg-gray-300 dark:bg-gray-600 rounded-2xl max-w-xl w-full flex items-center justify-between"
    >
      <div class="flex flex-col">
        <h3 class="text-black dark:text-white font-normal p-3">{{ $t('home.add.label') }}</h3>
        <input
          v-model="textTodo"
          class="text-black dark:text-white bg-gray-400 dark:bg-gray-500 font-normal p-3 rounded mt-2 border border-primary-400 m-3 w-100"
          id="text"
          type="text"
          :placeholder="$t('home.add.placeholder')"
        />
      </div>
      <div class="flex flex-col items-center p-3 gap-3">
        <button
          @click="textTodo = ''"
          type="button"
          :disabled="!textTodo || isLoading"
          class="text-black dark:text-white border rounded font-normal p-1 border-primary-400 transition duration-300 ease-in cursor-pointer hover:scale-120"
        >
          {{ $t('home.add.reset') }}
        </button>
        <button
          :class="
            !textTodo
              ? 'cursor-default opacity-60'
              : 'transition duration-300 ease-in cursor-pointer hover:scale-120'
          "
          :disabled="!textTodo || isLoading"
          type="submit"
          class="text-black dark:text-white border rounded font-normal p-1 border-primary-400 flex items-center justify-center"
        >
          <svg
            v-if="isLoading"
            class="mr-3 size-5 animate-spin"
            viewBox="0 0 24 24"
          >
            <font-awesome-icon icon="fa-solid fa-circle-notch" /></svg
          >
          {{ $t('home.add.submit') }}
        </button>
      </div>
    </form>
  </main>
</template>

