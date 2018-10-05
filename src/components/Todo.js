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
        ],
        editting: false
      };

      blockOverflow = () => {
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
      };

      unblockOverflow = () => {
        const body = document.querySelector("body");
        body.style.overflow = "visible";
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

      handleTodoUpdate = event => {
        event.preventDefault();
        if (this.newNameInput.value !== "") {
          this.props.todo.updateName(this.newNameInput.value);
        }
        this.closeEditPrompt();
      };

      openEditPrompt = () => {
        this.setState({
          editting: true
        });
        this.blockOverflow();
        window.scrollTo(0, 0);
      };

      closeEditPrompt = () => {
        this.setState({
          editting: false
        });
        this.unblockOverflow();
      };

      render() {
        const { todo } = this.props;

        return (
          <React.Fragment>
            <li>
              <div
                className={"single-todo animated " + this.getAppropriateClass()}
              >
                <h4 className="todo-name">{todo.name}</h4>
                <div className="controls-container">
                  <button className="edit-button" onClick={this.openEditPrompt}>
                    <i className="fas fa-edit" />
                  </button>
                  <button className="completed-state" onClick={todo.toggle}>
                    {todo.completed ? (
                      <i className="fas fa-check green animated infinite pulse" />
                    ) : (
                      <i className="fas fa-times red animated infinite pulse" />
                    )}
                  </button>
                  <button
                    className="delete-todo"
                    onClick={this.handleRemoveTodo}
                  >
                    X
                  </button>
                </div>
              </div>
            </li>

            {this.state.editting ? (
              <React.Fragment>
                <div className="editting-container">
                  <form onSubmit={this.handleTodoUpdate}>
                    <h2>Previous name:</h2>
                    <p>
                      <strong>{todo.name}</strong>
                    </p>
                    <input
                      ref={inp => (this.newNameInput = inp)}
                      type="text"
                      placeholder="Change to..."
                      className="update-input"
                    />
                    <input
                      type="reset"
                      className="cancel-edit"
                      onClick={this.closeEditPrompt}
                      value="Cancel"
                    />
                    <input
                      className="update-edit"
                      value="Update"
                      type="submit"
                    />
                  </form>
                </div>

                <div className="overlay" onClick={this.closeEditPrompt} />
              </React.Fragment>
            ) : null}
          </React.Fragment>
        );
      }
    }
  )
);

export default Todo;
