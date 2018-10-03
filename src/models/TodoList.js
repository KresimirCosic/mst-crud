// MobX State Tree
import { types } from "mobx-state-tree";

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
      const nextId = self.todos.length;
      self.todos.push({ id: nextId, name: name });
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
