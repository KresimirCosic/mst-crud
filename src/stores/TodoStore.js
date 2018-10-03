// Models
import TodoList from "../models/TodoList";

const TodoStore = (window.TodoStore = TodoList.create({
  todos: []
}));

let todosPlaceholder = [];
const howManyTodos = 5;

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(res => {
    TodoStore.startFetching();
    return res.json();
  })
  .then(json => json.map(el => todosPlaceholder.push(el.title)))
  .then(data => {
    setTimeout(() => {
      for (let i = 0; i < howManyTodos; i++) {
        let randomTodoIndex = Math.floor(
          Math.random() * todosPlaceholder.length
        );
        setTimeout(() => {
          TodoStore.addTodo(todosPlaceholder[randomTodoIndex]);
        }, i * 100);
      }
      TodoStore.stopFetching();
    }, 1000);
  });

export default TodoStore;
