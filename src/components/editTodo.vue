<script setup>
import {ref} from "vue";

const emit = defineEmits(["changeTodo","updateEditText"]);

const props = defineProps({
    text: String
});

function changeTodoChild() {
    emit("changeTodo")
}

</script>

<template>
    <div>
      <input type="text" class="text-todo" :value="text" @input="emit('updateEditText',$event.target.value)">
      <button @click="changeTodoChild()">Düzenle</button>
    </div>
</template>