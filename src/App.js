import React from 'react';
import './App.css';
import Title from './Title';
import Clear from './Clear';


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      view: 'current'

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.updateView = this.updateView.bind(this)

  }



  componentDidMount() { // newList - local storage stores new item
    //get the items from Local Storage- if items are not null and not undefined, JSON.parse
    //then pass the data to the new list.
    //If there is no data, assign an empty array.
    //setState items to the new list
    //Was this an issue due to this.localStorage instead of window.localStorage? Array is clear and no issues.
    let newList = JSON.parse(window.localStorage.getItem('lsList')) || [];

    this.setState(
      {
        items: newList //Original items array is now newList
      }
    );

    console.log("the component did mount")

  }

  componentDidUpdate() {  //take new items and stringify them to be stored in new array

    window.localStorage.setItem('lsList', JSON.stringify(this.state.items));

    console.log("the component did update")
  }


  updateView(e) {
    //create a new variable that = to state view
    // if event target id = button id, set newView to button id.
    // set state to the current to the view targeted by button
    let newView = this.state.view;
    if (e.target.id === "all") {
      newView = "all"
    }
    else if (e.target.id === "done") {
      newView = "done"
    }
    else if (e.target.id === "current") {
      newView = "current"
    }
  
    this.setState({
      view: newView,
    });
  }


    render(){

      let newView = this.state.items;

      if (this.state.view === "current") {
        newView = this.state.items.filter(item => item.checked === false);
      } else if (this.state.view === "done") {
        newView = this.state.items.filter(item => item.checked === true);
      } else if (this.state.view === "all") {
        newView = this.state.items;
      }


      return (
        <div>

          <div className=" container mX-auto">

            <div className="container mt-5">
              <div className="container main mx-auto p-5">
                <Title />
                <Clear parentFunction={this.clear.bind(this)} />

                <TodoList items={newView}
                  handleCheck={this.handleCheck}
                //updateView
                />
                <form onSubmit={this.handleSubmit}>
                  <input className="input-group mb-3"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.text}
                    placeholder="Enter a new item"

                  />
                  <div className="input-group-append mx-auto justify-content-center">
                    <button className="bg-secondary text-white m-1 justify-content-left">
                      Add Task #{this.state.items.length + 1}
                    </button>
                    <div></div>
                    <button type="button" id="current" onClick={this.updateView} className="btn btn-primary m-1">To-Do's</button>
                    <button type="button" id="all" onClick={this.updateView} className="btn btn-secondary m-1">All Items</button>
                    <button type="button" id="done" onClick={this.updateView} className="btn btn-success m-1">Completed</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      );
    }

    handleChange(e) {
      this.setState({ text: e.target.value });

    }

    ////Handle check with (event.target)
    handleCheck(e) {
      /*create variable (itemChecked)= map through item array looking at
    each object to change item if  id equals e.target.id*/
      let itemChecked = this.state.items.map((item) => {
        if (Number(e.target.id) === item.id) {
          // update items checked status.
          item.checked = e.target.checked
        }
        return item;
      });

      //update the state- map returns new array.
      this.setState({
        items: itemChecked
      })
    }





    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text.length === 0) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now(),
        checked: false,
        // this.setState
      };
      this.setState((state => ({
        items: state.items.concat(newItem),
        text: ''
      }
      )), () => console.log("This", this.state)
      )

    }

    //   deleteItem(e){
    //     e.preventDefault();
    //   let arr= this.state.items.filter((item)) => {
    //     if (Number(e.target.id === item.id) {
    // item.clear.

    //     }
    //   }
    //}

    clear() {
      this.setState({
        items: []
      });

    }

  }


class TodoList extends React.Component {

  render() {



    return (
      <div>

        {this.props.items.map(item => (

          <div key={item.id} className="input-group mb-3">
            <div className="input-group-prepend" >
              <div className="input-group-text" id="checking">
                <input type="checkbox" checked={item.checked} id={item.id} onChange={this.props.handleCheck} className="inputWhite" aria-label="Checkbox for following text input" />
              </div>
            </div>
            <input type="text" value={item.text} id="disabled" disabled className="form-control" aria-label="Text input with checkbox" />
            <div className="input-group-append">
              <span className="btn btn-danger">Delete</span>
            </div>
          </div>

        ))}
      </div>
    );
  }

}

export default TodoApp;

