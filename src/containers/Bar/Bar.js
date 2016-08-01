import React from 'react';
import { connect } from 'react-redux';
import { setCheckOption } from '../../actions/sampleActions';
import { FormattedMessage, FormattedNumber, injectIntl, FormattedDate} from 'react-intl';

/**
 * Bar Component
 * @extends React.Comppnent
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
        //console.log(this.props.intl);

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
                <br />
                <FormattedMessage id="app.greeting" defaultMessage="Hello!!" />
                <br />
                <FormattedNumber value={100110} />
                <br />
                <FormattedDate
                    value={this.props.intl.now()}
                    year='numeric'
                    month='long'
                    day='numeric'
                    weekday='long'
                />

            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onUpdateOption : (value) => dispatch(setCheckOption(value)),
    };
}

Bar = connect(undefined,mapDispatchToProps)(Bar);

export default injectIntl(Bar);
