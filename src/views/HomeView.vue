<script>
import { useTodosStore } from "@/stores/todos.js";
import todoList from "@/components/todoList.vue";
import { useAuthStore } from "@/stores/auth.js";
import addTodoBarComp from "@/components/addTodoBar.vue";
import pagination from "@/components/pagination.vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRoute } from 'vue-router';

export default {
  components: {
    todoList,
    addTodoBarComp,
    pagination,
  },
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const route = useRoute();

    const todosStore = useTodosStore();
    const authStore = useAuthStore();

    return { todosStore, authStore, isDark, toggleDark, route, };
  },
  data() {
    return {
      selectCompleted: "all",
      editTodoBar: false,
      addTodoBar: false,
    };
  },
  watch: {
    'todosStore.params': {
      handler() {
        this.todosStore.getTodos();
        this.$router.push({ query: this.todosStore.params });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getSelectedTodos() {
      this.todosStore.params.complete = this.selectCompleted;
    },
  },
  mounted() {
    const page = this.route.query.page;
    if (page) {
      this.todosStore.params.page = page;
    }
    const complete = this.route.query.complete;
    if (complete) {
      this.todosStore.params.complete = complete;
    }
  },
};
</script>

<template>
  <section>
    <div class="bg-black dark:bg-white flex justify-between flex-col">
      <button
          @click="addTodoBar = !addTodoBar"
          class="text-white max-w-80 mx-auto text-xl font-normal bg-gray-600 dark:bg-gray-800 p-4 rounded-md m-4 transition duration-300 ease-in cursor-pointer hover:scale-110">
        {{ $t('home.add.label') }}
      </button>
      <div class="p-8">
        <div
          v-if="todosStore.todos === null"
          class="flex items-center justify-center flex-col h-full gap-5 max-w-7xl mx-auto"
        >
          <img
            class="w-50 h-50 md:w-72 md:h-72"
            src="../.././src/assets/images/empty-home.png"
            alt=""
          />
          <h3 class="text-white dark:text-black text-3xl font-normal">
            {{ $t('home.empty.message.title') }}
          </h3>
          <p class="text-white dark:text-black text-2xl font-normal">
            {{ $t('home.empty.message.text') }}
          </p>
        </div>

        <div class="container px-2 sm:px-6 md:px-8 mx-auto" v-else>
          <select
            @change="getSelectedTodos"
            class="text-white bg-gray-600 dark:bg-gray-800 p-1 rounded m-2 transition duration-300 ease-in cursor-pointer hover:scale-120"
            v-model="selectCompleted"
          >
            <option class="text-white" value="all">{{ $t('home.select.all') }}</option>
            <option class="text-white" value="complete">
              {{ $t('home.select.complete') }}
            </option>
            <option class="text-white" value="uncomplete">
              {{ $t('home.select.unComplete') }}
            </option>
          </select>
          <todo-list :todos="todosStore.todos" />
          <pagination> </pagination>
        </div>
      </div>
    </div>
    <add-todo-bar-comp
        v-if="addTodoBar"
        @cancel-add-todo-bar="addTodoBar = !addTodoBar"
    ></add-todo-bar-comp>
  </section>
</template>
