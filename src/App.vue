<script setup>
import { ref, watch, onBeforeMount,computed} from "vue";
import addInput from "./components/todoInput.vue";
import todoList from "./components/todoList.vue";
import editTodoComponent from "./components/editTodo.vue";
import {useStore} from "vuex";
const myStore=useStore();




const todoGetir=computed(
  function(){
    return myStore.getters.getTodos;
  }
)



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
myStore.dispatch("changeTask",todoItem);
}

function removeTask(todoItem) {
myStore.dispatch("deleteTask",todoItem)
}

watch(()=>myStore.getters.getTodos,() => {
  localStorage.setItem("gorevler",JSON.stringify(myStore.getters.getTodos));
},{deep:true})

onBeforeMount(() => {
  myStore.dispatch("kaydet",JSON.parse(localStorage.getItem("gorevler")) ?? []) 
})


function todoEkle(yenitodo) {
  myStore.dispatch("addTodo",yenitodo)
  // dispatch bir aksiyon tetikler
}


function setNewValueForEditText(newValue) {
  editText.value = newValue;
}

</script>

<template>

  <addInput @guncelle="todoEkle($event)" />
  
  <div>
    <todoList :todos="todoGetir" @editTodo="editTodo($event)" @completeTask="completeTask($event)" @remove="removeTask($event)" />
    <editTodoComponent @changeTodo="changeTodo()" :text="editText" @updateEditText="setNewValueForEditText($event)"  />
  </div>


{{ todoGetir }}
</template>