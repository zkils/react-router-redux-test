
import React from 'react';
import baseTheme from './theme/baseTheme';

class SvgIcon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //pressed:false,
            hovered:false,
        }
        this._handleMouseLeave = this._handleMouseLeave.bind(this);
        this._handleMouseEnter = this._handleMouseEnter.bind(this);
        this._setStyle = this._setStyle.bind(this);

    }
    _setStyle(){
        let onColor = this.props.color ? this.props.color : '#00bcd4';
        let offColor = this.props.hoverColor ? this.props.hoverColor : '#e0e0e0';
        let style={
            display: 'inline-block',
            fill: this.state.hovered ? onColor : offColor,
            height: 24,
            width: 24,
            userSelect: 'none',
        }
        return style;
    }
    _handleMouseLeave(e){
        this.setState({
            hovered:false,
        })
    }
    _handleMouseEnter(e){
        this.setState({
            hovered:true,
        })
    }
    render(){
        return (
            <svg onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave} style={this._setStyle()} onClick={this.props.onClick} viewBox={this.props.viewBox}>
                {this.props.children}
            </svg>
        )
    }
}
export default SvgIcon;

SvgIcon.defaultProps = {
    onClick: function onClick() {},
    viewBox: '0 0 24 24'
};