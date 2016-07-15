import React from 'react';
import { connect } from 'react-redux';
import { setCheckOption } from '../actions/sampleActions';

class Bar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked:false,
        }
        this.onUpdateOption = this.onUpdateOption.bind(this);
    }
    onUpdateOption(){
        this.setState({checked:!this.state.checked});
        this.props.onUpdateOption(this.state.checked);

    }
    render(){
        return(
            <div>
                <h1>Page-3</h1>
                <input type="checkbox" onChange={this.onUpdateOption} style={{zoom:5}}/>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onUpdateOption : (value) => dispatch(setCheckOption(value))
    };
}

Bar = connect(undefined,mapDispatchToProps)(Bar);

export default Bar;
