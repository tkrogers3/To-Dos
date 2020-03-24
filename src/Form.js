import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6 offset-3">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter a To-Do item." aria-label="To-Do" aria-describedby="button-addon2" />
              <div className="input-group-append">
                <button className="btn btn-danger" type="button" id="button-addon2">Add To-Do</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;