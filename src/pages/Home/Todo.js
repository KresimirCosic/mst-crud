// React
import React, { Component } from "react";
// MobX React
import { inject, observer } from "mobx-react";

const Todo = inject("TodoStore")(
  observer(
    class TodoItemView extends Component {
      state = {
        deleting: false,
        deletingClasses: [
          "zoomOut",
          "zoomOutLeft",
          "zoomOutRight",
          "bounceOut",
          "bounceOutLeft",
          "bounceOutRight"
        ]
      };

      getAppropriateClass = () => {
        const indexOfRandomClass = Math.floor(
          Math.random() * this.state.deletingClasses.length
        );
        return this.state.deleting
          ? this.state.deletingClasses[indexOfRandomClass]
          : "bounceIn";
      };

      handleRemoveTodo = () => {
        this.setState({
          deleting: true
        });
        setTimeout(() => {
          this.props.TodoStore.removeTodo(this.props.todo.id);
        }, 1000);
      };

      render() {
        const { todo } = this.props;

        return (
          <li>
            <div
              className={"single-todo animated " + this.getAppropriateClass()}
            >
              <h4 className="todo-name">{todo.name}</h4>
              <div className="controls-container">
                <button className="completed-state" onClick={todo.toggle}>
                  {todo.completed ? (
                    <i className="fas fa-check green animated infinite pulse" />
                  ) : (
                    <i className="fas fa-times red animated infinite pulse" />
                  )}
                </button>
                <button className="delete-todo" onClick={this.handleRemoveTodo}>
                  X
                </button>
              </div>
            </div>
          </li>
        );
      }
    }
  )
);

export default Todo;
