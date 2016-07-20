import React from 'react';
import { connect } from 'react-redux';
import { setCheckOption } from '../../actions/sampleActions';

/**
 * Bar Component
 * @extends React.Compnent
 * @example
 * <Bar >
 */
class Bar extends React.Component{
    /**
     *
     * @param props
     */
    constructor(props){
        super(props);
        /**
         * State for checkbox
         * @type {{checked: boolean}}
         */
        this.state = {
            checked:false,
        }
        this.onUpdateOption = this.onUpdateOption.bind(this);
    }

    /**
     * Dispatch checkbox option
     */
    onUpdateOption(){
        this.setState({checked:!this.state.checked});
        this.props.onUpdateOption(this.state.checked);
    }

    /**
     * Render Bar page
     * @returns {XML}
     */
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
