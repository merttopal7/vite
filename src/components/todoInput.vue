<script setup>
import { ref } from 'vue';
const text = ref("");


const emit = defineEmits(['guncelle']);


function addTodoChild() {
  if(!text.value) return;
  let task = {
    task: text.value,
    completed: false
  };
  emit('guncelle',task);
  text.value = "";
}


</script>

<template>
    <div>
        <input v-model="text" class="text-todo" @keydown.enter="addTodoChild" />
        <button @click="addTodoChild">Ekle</button>
    </div>
</template>