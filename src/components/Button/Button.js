import React from 'react';
import styles from './Button.css';
import classNames from 'classnames/bind';
import shallowCompare from 'react-addons-shallow-compare';

let cx = classNames.bind(styles);

/**
 * Button Component
 * @extends React.Component
 * @example
 * <Button label={"label"} enable={true} onClick={func} />
 *
 * <Button>
 *     <Icon>
 *     <span>
 * </Button>
 */
class Button extends React.Component{
    /**
     * 생성자
     * @param {Object} props
     */
    constructor(props){
        super(props);
        /**
         * @type {boolean}
         * @property {boolean} pressed button press status
         */
        this.state={
            pressed:false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.renderChild = this.renderChild.bind(this);
    }

    /**
     * Check prop and state for performance
     * @param nextProps
     * @param nextState
     * @returns {bool}
     */
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    /**
     * Handle click call cb
     * @example
     * <Button onClick={handleBackButton} />
     */
    handleClick(){
        this.props.onClick();
    }
    /**
     * Handling button Down
     * change state on button pressed
     */
    handleDown(){
        this.setState({
            pressed:true
        });
    }
    /**
     * Handling button release
     * change state on button release
     */
    handleRelease(){
        this.setState({
            pressed:false
        });

    }
    /**
     * Render Children
     * if child is function - staless component return react element else just return
     * @param children
     * @returns {React.Component}
     */
    renderChild(children){
        return React.Children.map(children, child =>{ //It can check by child.type.name
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
    /**
     * Render nodes
     * @returns {XML}
     * @example
     * let result = MyClass.bar();
     * console.log(result);
     */
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
    /**
     * propTypes form parent Component
     * @property {string} label button label
     * @property {bool} enable button status
     * @property {func} onClick onclick event cb
     */
    static get propTypes() {
        return {
            label : React.PropTypes.string,
            enable : React.PropTypes.bool,
            onClick : React.PropTypes.func,
        };
    }
};

Button.defaultProps = {
    label:'Button',
    enable:true,
    show:true,
    onClick:function(){}
}


export default Button
