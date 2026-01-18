<script>
import Header from "@/components/header.vue";

export default {
  name: "defaultLayout",
  components: { Header },
}
</script>

<template>
  <main class="bg-black dark:bg-white h-full">
    <Header></Header>
    <router-view />
  </main>
</template>
