<template>
  <input type="text" class="text-todo" v-model="text" @keydown.enter="addTodo">
  <button @click="addTodo">Yeni Görev Ekle</button>
  <div>
      <ul>
          <li v-for="todo in todos" :key="todo.id">
              <h2>{{ todo.message }}</h2>
              <button @click="editTodo(todo)">Güncelle</button>
              <button @click="completeTodo(todo.id)">{{ todo.completed ? 'Tamamlandı' : 'Tamamlanmayı Bekliyor' }}</button>
              <button @click="deleteTodo(todo.id)">Sil</button>
          </li>
      </ul>
  </div>

  <input type="text" class="text-todo" v-model="editTodoHolder.message">
  <button @click="saveTodo">Düzenle</button>

</template>


<script setup>
import { computed, ref, reactive, onBeforeMount } from 'vue';
import { useTodoStore } from './stores/todoStore';

const todoStore = useTodoStore();

onBeforeMount(todoStore.syncronizeLocalStorage)

const todos = computed(() => todoStore.todos);

const text = ref("");
const editTodoHolder = reactive({
  id: 0,
  message: ""
});

function addTodo() {
  //NOT: Veri eklemeyi sağlar.
  todoStore.addTodo(text.value);
  text.value = "";
}

function completeTodo(id) {
  //NOT: Tamamlanmak istenen veriyi id parametresine göre tamamlar.
  todoStore.completeTodo(id);
}

function deleteTodo(id) {
  //NOT: Silinmek istenen veriyi id parametresine göre siler.
  todoStore.removeTodo(id);
}

function editTodo(todo) {
  editTodoHolder.message = todo.message;
  editTodoHolder.id = todo.id;
  //NOT: Reactive değerlerin .value özelliği olmaz.
}

function saveTodo() {
  //NOT: Güncellenmek istenen veriyi günceller.
  todoStore.editTodo(editTodoHolder.id,editTodoHolder.message);
  editTodoHolder.message = "";
  editTodoHolder.id = 0;
}


</script>