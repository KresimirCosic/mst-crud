// MobX State Tree
import { types } from "mobx-state-tree";

let nextId = 0;

// Single todo model
const Todo = types
  .model("Todo", {
    id: types.number,
    name: types.string,
    completed: false
  })
  .actions(self => ({
    toggle() {
      self.completed = !self.completed;
    }
  }));

// Todo list model
const TodoList = types
  .model({
    todos: types.array(Todo)
  })
  .actions(self => ({
    addTodo(name) {
      self.todos.push({ id: nextId, name: name });
      nextId++;
    },
    removeTodo(id) {
      const index = self.todos.map(todo => todo.id).indexOf(id);
      self.todos.splice(index, 1);
    }
  }))
  .views(self => ({
    get todosTotal() {
      return self.todos.length;
    },
    get todosCompleted() {
      return self.todos.filter(todo => todo.completed).length;
    },
    get todosProgress() {
      return (
        self.todos.filter(todo => todo.completed).length / self.todos.length
      );
    }
  }));

export default TodoList;
