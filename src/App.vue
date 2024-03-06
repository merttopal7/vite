<script setup>
import { ref, watch, onBeforeMount } from "vue";
import addInput from "./components/todoInput.vue";
import todoList from "./components/todoList.vue";
import editTodoComponent from "./components/editTodo.vue";
const text = ref("");
const editText = ref("");

const todos = ref([]);


let editTaskItem;
function editTodo(todoItem) {
  editTaskItem = todoItem;
  editText.value = todoItem.task;
}

function changeTodo() {
  todos.value = todos.value.map((todo) => {
      if(todo.task == editTaskItem.task) {
        todo.task = editText.value;
      }
      return todo;
  });
  editTaskItem = null;
  editText.value = "";
}



function completeTask(todoItem) {
  todos.value = todos.value.map((todo) => {
      if(todo.task == todoItem.task) {
        todo.completed = !todo.completed;
      }
      return todo;
  })
}

function removeTask(todoItem) {
  todos.value = todos.value.filter(function (t) {
      return t.task != todoItem.task
  });
}

watch(todos,() => {
  localStorage.setItem("gorevler",JSON.stringify(todos.value));
});

onBeforeMount(() => {
  todos.value = JSON.parse(localStorage.getItem("gorevler")) ?? [];
})


function todoGuncelle(yenitodo) {
  todos.value = [...todos.value,yenitodo];
}


function setNewValueForEditText(newValue) {
  editText.value = newValue;
}

</script>

<template>

  <addInput @guncelle="todoGuncelle($event)" />
  
  <div>
    <todoList :todos="todos" @editTodo="editTodo($event)" @completeTask="completeTask($event)" @remove="removeTask($event)" />
    <editTodoComponent @changeTodo="changeTodo()" :text="editText" @updateEditText="setNewValueForEditText($event)"  />
  </div>

</template>