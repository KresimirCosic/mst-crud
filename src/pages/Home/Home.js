// React
import React, { Component } from "react";
// MobX React
import { inject, observer } from "mobx-react";
// Components
import Todo from "./Todo";

const Home = inject("TodoStore")(
  observer(
    class Home extends Component {
      handleTodoSubmit = event => {
        event.preventDefault();
        if (this.todoInputValue.value !== "") {
          this.props.TodoStore.addTodo(this.todoInputValue.value);
        }
        this.todoInputValue.value = "";
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
                <div
                  id="progress-bar-complete"
                  style={{ width: TodoStore.todosProgress * 100 + "%" }}
                />
                <div
                  id="progress-bar-incomplete"
                  style={{ width: (1 - TodoStore.todosProgress) * 100 + "%" }}
                />
                <div className="cf" />
                <h1>
                  Status: {TodoStore.todosCompleted} / {TodoStore.todosTotal}{" "}
                  completed
                </h1>
                <div className="multi-controls-container">
                  <button
                    className="btn-control"
                    onClick={TodoStore.toggleAllComplete}
                  >
                    Mark all as <strong>completed</strong>
                  </button>
                  <button
                    className="btn-control"
                    onClick={TodoStore.toggleAllIncomplete}
                  >
                    Mark all as <strong>incompleted</strong>
                  </button>
                  <button className="btn-control" onClick={TodoStore.toggleAll}>
                    Toggle all (<strong>reverse</strong>)
                  </button>
                  <button
                    className="btn-control"
                    onClick={TodoStore.deleteAllWhichAreCompleted}
                  >
                    Delete all <strong>completed</strong>
                  </button>
                  <button
                    className="btn-control"
                    onClick={TodoStore.deleteAllWhichAreIncompleted}
                  >
                    Delete all <strong>incompleted</strong>
                  </button>
                </div>
              </div>
              <ul>
                {TodoStore.todos.map(todo => (
                  <Todo key={todo.id} todo={todo} />
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
