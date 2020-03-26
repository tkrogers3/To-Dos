import React from 'react';

class Clear extends React.Component {
constructor(props) { 
    super(props);
    this.handleClick= this.handleClick.bind(this);


}

handleClick(e){
    this.props.parentFunction()
}

render () {
    return(
    
        
            <div className="row mx-auto pb-3 justify-content-end">
            <button type="button " onClick={this.handleClick} className="btn bg-danger font-weight-bold text-white ">Clear</button>
        </div>
    )
}
}

export default Clear 