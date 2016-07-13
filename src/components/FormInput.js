import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styles from './css/FormInput.css';
import { connect } from 'react-redux';
import { updateMessageState, addMessage } from '../actions'

class FormInput extends React.Component {
    static get childContextTypes() {
        return { muiTheme: React.PropTypes.object };
    }
    getChildContext(){
        return {  muiTheme: getMuiTheme()};
    }

    constructor(props) {
        super(props);
        this.state = {
            value:  "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
        this.props.onUpdateMessage(e.target.value);
    };
    send(e){
        e.preventDefault();

        if(!this.state.value=="") {
            this.props.onAddMessage();
            this.setState({
                value: "",
            });
        }
    }

    render() {
        return (
            <div className={styles.formPosition}>
                <TextField
                    hintText="message"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <FloatingActionButton onClick={this.send}>
                    <ChatBubble />
                </FloatingActionButton>
            </div>
        );
    }
}

FormInput.propTypes = {
    value: React.PropTypes.string,
}
FormInput.defaultProps = {
    messageHandler:function(){},
    handleChange:function(){},
}

let mapDispatchToProps = (dispatch) => {
    return {
        onUpdateMessage: (value) => dispatch(updateMessageState(value)),
        onAddMessage : () => dispatch(addMessage()),
    };
}

FormInput = connect(undefined, mapDispatchToProps)(FormInput);

export default FormInput;