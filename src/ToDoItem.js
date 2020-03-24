import React from 'react';

class ToDo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3 pb-2">
            <div className="input-group mx-auto">
              <div className="input-group-prepend k">
                <div className="input-group-text bg-dark">
                  <input type="checkbox" className=" bg-dark" aria-label="Checkbox for following text input" placeholder="To-Do Item will go here. Dont allow Text Input though." />
                </div>
              </div>
              <input type="text" items={this.state.items}  className="form-control" disabled="{true}" aria-label="Text input with checkbox" />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ToDo;