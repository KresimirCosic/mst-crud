// React
import React, { Component } from "react";
// MobX React
import { inject, observer } from "mobx-react";

const Home = inject("TodoStore")(
  observer(
    class Home extends Component {
      handleTodoSubmit = event => {
        event.preventDefault();
        console.log("New Todo submitted.");
      };

      render() {
        const { TodoStore } = this.props;

        return (
          <div className="crud-container">
            <div className="input-container">
              <form onSubmit={this.handleTodoSubmit}>
                <input id="todoInput" type="text" placeholder="Todo" />
                <input id="todoSubmit" type="submit" value="Add" />
              </form>
            </div>
            <h1>
              {TodoStore.todosCompleted} / {TodoStore.todosTotal}
            </h1>
            <ul>
              {TodoStore.todos.map((todo, i) => (
                <li key={i}>
                  <div className="single-todo animated bounceIn">
                    <h4>
                      {todo.name} ({todo.id})
                      <button className="deleteTodo">X</button>
                    </h4>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      }
    }
  )
);

export default Home;
