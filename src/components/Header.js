/**
 * Created by krinjadl on 2016-06-14.
 */
import React from 'react';
import Button from './Button';
import TextBox from './TextBox';
import styles from './css/Header.css';
import SvgIcon from './SvgIcon';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    // shouldComponentUpdate(nextProps, nextState){
    //     return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    // }
    _onClickBack(){
        this.props.onClickBack();

    }
    _onClickHome(){
        this.props.onClickHome();
        //AppManager.home();
    }
    render(){
        const buttonData=[
            // {label:"Back", onClick:this._onClickBack.bind(this)},
            // {label:"Home", onClick:this._onClickHome.bind(this)}
            { onClick:this._onClickBack.bind(this),label:"Back"},
            {onClick:this._onClickHome.bind(this),label:"Home"},
        ];

        return (
            <div>
                <Button label={buttonData[0].label} iconName={buttonData[0].iconName}  className={styles.floatElement} onClick={buttonData[0].onClick} >
                    <SvgIcon  >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                    </SvgIcon>
                </Button>
                <TextBox className={styles.title} tbText={this.props.title} ></TextBox>
                <Button label={buttonData[1].label} iconName={buttonData[1].iconName} onClick={buttonData[1].onClick} className={styles.floatElement} >
                    <TextBox >  </TextBox>
                    </Button>

            </div>
        );
    }
}
Header.defaultProps ={
    onClickBack: function(){ }
}

export default Header;
