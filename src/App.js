import React from 'react';
import './App.css';
import Title from './Title';



class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  


  }

  componentDidMount(){ // newList - local storage stores new item
    //get the items from Local Storage- if items are not null and not undefined, JSON.parse
    //then pass the data to the new list.
    //If there is no data, assign an empty array.
    //setState items to the new list
    //Was this an issue due to this.localStorage instead of window.localStorage? Array is clear and no issues.
     let newList= JSON.parse(window.localStorage.getItem('lsList')) || []; 
    
     this.setState(
    {
    items: newList //Original items array is now newList
      }
      );
      
  console.log("the component did mount")
  
    }
  
    componentDidUpdate(){  //take new items and stringify them to be stored in new array
  
      window.localStorage.setItem('lsList', JSON.stringify(this.state.items));
  
      console.log("the component did update")
    }
  

  render() { 
    return (
      <div>

        <div className=" container bg mX-auto">
          <div className="row m-5">
            <div className="container mt-5">
              <div className="container main mx-auto p-5">
                <Title />
              
              <TodoList items={this.state.items} />
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
                    <button type="button" className="btn btn-primary m-1">To-Do's</button>
                <button type="button" className="btn btn-secondary m-1">All Items</button>
                <button type="button" className="btn btn-success m-1">Completed</button>

                  </div>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });

  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      // this.setState
    };
    this.setState((state => ({
      items: state.items.concat(newItem),
      text: ''
    }
    )),()=> console.log("This", this.state)
    )
    
  }
}
// Clear All Button


//Select All Button

//Delete individual tasks


class TodoList extends React.Component {
  // updateLocalStorage () {}
  render() {
    return (
      <div>
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}  </li>


        ))}

      </ul>
     
</div>
    );
  }


}

export default TodoApp;
