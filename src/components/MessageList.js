/**
 * Created by krinjadl on 2016-06-30.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styles from './css/MessageList.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {deleteMessage,itemSelected } from '../actions';


class MessageList extends React.Component{
    static get childContextTypes() {
        return { muiTheme: React.PropTypes.object };
    }
    getChildContext(){
        return {  muiTheme: getMuiTheme()};
    }

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            selectedItemIndex:0
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteListItem = this.deleteListItem.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

    }
    handleOpen(){
        this.setState({open: true});
    }
    handleClose(){
        this.setState({open: false});
    }
    handleTouchTap(i){
        this.handleOpen();
        this.setState({
            selectedItemIndex:i
        });
        this.props.onSelectedItem(i);
    }
    deleteListItem(){
        this.handleClose();
        this.props.onDeleteMessage();

    }
  
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.deleteListItem}
            />,
        ];
        // console.log(this.props.messageList);
        return(
            <div className={styles.messageListWrapper}>
                <List>
                    {this.props.messageList.map((msg,i)=>{
                        return (
                            <div key={i}>
                                <ListItem
                                    leftIcon={<CommunicationEmail color={indigo500} />}
                                    rightIcon={<CommunicationChatBubble />}
                                    primaryText={msg}
                                    secondaryText={"key : " +i}
                                    onClick={this.handleTouchTap.bind(this,i)}
                                />
                                <Divider />
                            </div>
                        )
                    })}

                </List>
                <Dialog
                    title="Dialog For Delete"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    key - {this.state.selectedItemIndex}  item will be deleted.

                </Dialog>

            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        messageList: state.msgReducer.messageList,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onDeleteMessage: () => dispatch(deleteMessage()),
        onSelectedItem: (selectedItemIndex) => dispatch(itemSelected(selectedItemIndex)),
    }
}

MessageList = connect(mapStateToProps,mapDispatchToProps)(MessageList);

export default MessageList;