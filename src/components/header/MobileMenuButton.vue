<template>
  <button
    @click="$emit('click')"
    class="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
  >
    <MenuIcon v-if="!isOpen" />
    <CloseIcon v-else />
  </button>
</template>

<script setup lang="ts">
import MenuIcon from "@/components/icons/MenuIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

interface Props {
  isOpen?: boolean;
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
});

defineEmits<{
  click: [];
}>();
</script>
