// React
import React, { Component } from "react";
// MobX React
import { inject, observer } from "mobx-react";
// Components
import TodoItemView from "./TodoItemView";

const Home = inject("TodoStore")(
  observer(
    class Home extends Component {
      handleTodoSubmit = event => {
        event.preventDefault();
        if (this.todoInputValue.value !== "") {
          this.props.TodoStore.addTodo(this.todoInputValue.value);
        }
      };

      render() {
        const { TodoStore } = this.props;

        return (
          <div className="crud-container">
            <div className="input-container">
              <form onSubmit={this.handleTodoSubmit}>
                <input
                  ref={inp => (this.todoInputValue = inp)}
                  id="todoInput"
                  type="text"
                  placeholder="Todo"
                />
                <input id="todoSubmit" type="submit" value="Add" />
              </form>
            </div>
            <div className="todos-container">
              <div id="progress-container">
                <h1>
                  {TodoStore.todosCompleted} / {TodoStore.todosTotal}
                </h1>
              </div>
              <ul>
                {TodoStore.todos.map(todo => (
                  <TodoItemView key={todo.id} todo={todo} />
                ))}
              </ul>
            </div>
          </div>
        );
      }
    }
  )
);

export default Home;
