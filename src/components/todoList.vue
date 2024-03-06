<script setup>

defineProps({
    todos: Array
})

const emit = defineEmits(["editTodo","completeTask","remove"])

function editTodoChild(todo) {
    emit("editTodo",todo);
}

function completeTaskChild(todo) {
    emit("completeTask",todo);
}

function removeTaskChild(todo) {
    emit("remove",todo);
}

</script>

<template>
    <div class="todo-item" v-for="todo in todos" :key="todo">
      {{todo.task}}
      <div>
        <button @click="editTodoChild(todo)">Düzenle</button>
        <button @click="completeTaskChild(todo)">{{ todo.completed ? "Tamamlandı" : "Tamamlanmadı" }}</button>
        <button class="red-btn" @click="removeTaskChild(todo)">X</button>
      </div>
    </div>
</template>