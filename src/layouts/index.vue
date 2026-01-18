<template>
  <component :is="layoutComponent"></component>
</template>

<script>
import defaultLayout from '../layouts/components/default.vue'
import authLayout from '../layouts/components/auth.vue'

export default {
  name: "layout",
  components: { defaultLayout, authLayout },
  computed: {
    layoutComponent() {
      return `${this.layoutType}Layout`;
    },

    routeHaveLayoutType() {
      return this.$route.meta && 'layout' in this.$route.meta;
    },
    layoutType() {
      if (this.routeHaveLayoutType) {
        return this.$route.meta.layout;
      }
      return "default";
    },
  }
}
</script>