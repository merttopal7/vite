import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTodoStore = defineStore('todo', () => {
    const todos = ref([]);
    
    watch(todos,() => {
        localStorage.setItem('todos',JSON.stringify(todos.value));
    },{deep:true});

    function syncronizeLocalStorage() {
        todos.value = JSON.parse(localStorage.getItem('todos') ?? '[]');
    }

    function addTodo(todoTask) {
        if(!todoTask) return alert("Görev Boş Olamaz !");
        todos.value = [...todos.value, {
            id: todos.value.length+1,
            message: todoTask,
            completed: false
        }];
    }

    function completeTodo(id) {
        const task = todos.value.find(i => i.id === id);
        if(task) task.completed = !task.completed;
    }

    function editTodo(id,message) {
        const task = todos.value.find(i => i.id === id);
        if(task) task.message = message;
    }

    function removeTodo(id) {
        todos.value = todos.value.filter(i => i.id !== id);
    }

    

    return { todos, addTodo, completeTodo, editTodo, removeTodo, syncronizeLocalStorage }
});