/**
 * Created by krinjadl on 2016-06-15.
 */
import React from 'react';

class TextBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={this.props.className} style={this.props.style} >{this.props.tbText}</div>
        );
    }
}

export default TextBox

