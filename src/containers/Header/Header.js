
import React from 'react';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';
import styles from './Header.css';
import SvgIcon from '../../components/Icon/SvgIcon';
/**
 * Header Component
 * @extends React.Component *
 * @example
 * <Header />
 * or
 * <Header>
 *     <SvgIcon />
 *     <Button />
 * </Header>
 */
class Header extends React.Component{
    constructor(props){
        super(props);
    }

    _onClickBack(){
        this.props.onClickBack();
    }
    _onClickHome(){
        this.props.onClickHome();
        //AppManager.home();
    }

    /**
     * Render [Button]{@link Button} and Icon is included
     * @see Button
     * @returns {XML}
     */
    render(){
        const buttonData=[
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
                    <TextBox > !! </TextBox>
                    </Button>

            </div>
        );
    }
}
Header.defaultProps ={
    onClickBack: function(){ }
}

export default Header;
