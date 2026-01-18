<script>
import { useTodosStore } from "@/stores/todos.js";

export default {
  setup() {
    const todosStore = useTodosStore();

    return { todosStore };
  },
  props: ["todos"],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.todosStore.total / 10);
    },
    visiblePage() {
      if (this.pageTotal > 1) {
        const delta = 2;
        const current = +this.todosStore.params.page;

        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, current - delta); i <= Math.min(this.pageTotal - 1, current + delta); i++) {
          range.push(i)
        }

        if (current - delta > 1) {
          rangeWithDots.push(1, '...')
        } else {
          rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (current + delta < this.pageTotal - 1) {
          rangeWithDots.push('...', this.pageTotal)
        } else if (this.pageTotal > 1) {
          rangeWithDots.push(this.pageTotal)
        }

        return rangeWithDots

      }
      return []
    },
  },
  methods: {
    newPage(page) {
      if (page !== this.todosStore.params.page && page !== '...') {
        this.todosStore.params.page = page;
      }
    },
  },
};
</script>

<template>
  <section
    v-if="visiblePage.length !== 0"
    class="flex justify-center items-center mt-6"
  >
    <button
        @click="newPage( 1)"
        :disabled="todosStore.params.page - 1 === 0"
        :class="(todosStore.params.page - 1 === 0)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
        class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      <<
    </button>
    <button
        @click="newPage(todosStore.params.page - 1)"
        :disabled="todosStore.params.page - 1 === 0"
        :class="(todosStore.params.page - 1 === 0)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
        class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      <
    </button>
    <div class="p-1" v-for="page in visiblePage" :key="page">
      <button
        @click="newPage(page)"
        :disabled="isLoading"
        class="transition duration-300 ease-in  text-white dark:text-black text-2xl font-normal flex items-center justify-center"
        :class="{ 'scale-120': (+todosStore.params.page === page), 'cursor-pointer hover:scale-120': page !== '...' && (+todosStore.params.page !== page) }"
      >
        {{ page }}
      </button>
    </div>

    <button
      @click="newPage(todosStore.params.page + 1)"
      :disabled="todosStore.params.page === pageTotal"
      :class="(todosStore.params.page === pageTotal)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
      class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      >
    </button>
    <button
        @click="newPage(pageTotal)"
        :disabled="todosStore.params.page === pageTotal"
        :class="(todosStore.params.page === pageTotal)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
        class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      >>
    </button>
  </section>
</template>
