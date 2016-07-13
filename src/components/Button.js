/**
 * Created by krinjadl on 2016-06-14.
 */
import React from 'react';
import styles from './css/Button.css';
import classNames from 'classnames/bind';
import shallowCompare from 'react-addons-shallow-compare';

let cx = classNames.bind(styles);

class Button extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pressed:false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.renderChild = this.renderChild.bind(this);
    }
    componentDidMount(){

    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }
    handleClick(){
        this.props.onClick();
    }
    handleDown(){
        this.setState({
            pressed:true
        });
    }
    handleRelease(){
        this.setState({
            pressed:false
        });

    }
    renderChild(children){
        return React.Children.map(children, child =>{

            if(typeof(child.type) == 'function'){
                return React.cloneElement(child,{
                    tbText:"",
                    style: {
                        display: 'inline-block',
                    }
                })
            }else {
                return child;
            }
        })
    }
    render(){
        let btnClass = this.props.className + " "+cx({
                obButton:true,
                obButtonEnabled:this.props.enable,
                obButtonPressed:this.state.pressed,
                obButtonDisabled: (!this.props.enable),
            });

        if(this.props.enable){
            return(
                <button onClick={this.handleClick}
                        onMouseDown={this.handleDown}
                        onMouseUp={this.handleRelease}
                        onMouseOut={this.handleRelease}
                        className={btnClass}
                >
                    {this.renderChild(this.props.children)}

                    <span className={styles.obButtonLabel}>{this.props.label}</span>

                </button>
            )
        }else{
            return(
                <button
                    className={ btnClass }>
                    {this.props.children}
                    {this.props.label}

                </button>
            )
        }
    }
};

Button.defaultProps = {
    label:'Button',
    enable:true,
    show:true,
    onClick:function(){}
}

export default Button
