import { createStore } from 'vuex'

const todoStore = createStore({
    state () {
      return {
        todos: []
      }
    },
    getters:{
      getTodos(state){
        return state.todos;
      },
      getTodosByCount:(state)=>(x)=>{
        return state.todos.slice(0,x);
      }
    },
    actions:{
         addTodo(context,todo){
          context.commit("addTodo",todo)

         },
         changeTask(context,todoItem){
           context.commit("changeTask",todoItem)
         },
         deleteTask(context,todoItem){
            context.commit("deleteTask",todoItem)
         },
        kaydet(context,todoItem){
            context.commit("kaydet",todoItem)
         },

    },

    // todoları değiştimrk istediğimiz zaman mutationları kullanırız
    mutations: {
      addTodo (state,todo) {
        state.todos=[...state.todos,todo]
      },
      changeTask(state,todoItem){

            state.todos = state.todos.map((todo) => {
            if(todo.task == todoItem.task) {
              todo.completed = !todo.completed;
            }
            return todo;
        })
      },
      deleteTask(state,todoItem){
        state.todos = state.todos.filter(function (t) {
            return t.task != todoItem.task
        });
      },
      kaydet(state,todoItem){
        state.todos=todoItem;
      }

    }
  });
//   bizim 4 tane temel yapımız var getters,state,mutations, action
//   state:ref değişkenlerimiz
//   getters:state erişmek için kullandığımız yapımız
//   mutations:stateleri değiştirmemiz için gerekli olan yapımız
//   action:istek attığımız yer 

  export default todoStore;