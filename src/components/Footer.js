
import React from 'react';
import Button from './Button';
import styles from './css/Footer.css';


class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = { }
    }
    _onClickApps(){

    }
    _onClickSetting(){
        this.props.onClickSetting();
    }
    render(){
        let buttonData=[
            // {label:"Apps", onClick:this._onClickApps.bind(this), subClassName:styles.appsButton,status:this.props.appsBtnStatus},
            // {label:"Setting", onClick:this._onClickSetting.bind(this), subClassName:styles.settingButton, status:this.props.settingBtnStatus}

            {label:"Apps", onClick:this._onClickApps.bind(this), subClassName:styles.appsButton,status:this.props.appsBtnStatus },
            {label:"Setting", onClick:this._onClickSetting.bind(this), subClassName:styles.settingButton, enable:false}

        ];

        return (
            <div className={styles.footerBody}>
                <Button label={buttonData[0].label} onClick={buttonData[0].onClick} className={buttonData[0].subClassName} iconName={buttonData[0].iconName}  />
                <Button label={buttonData[1].label} onClick={buttonData[1].onClick} className={buttonData[1].subClassName} enable={this.props.settingBtnStatus} iconName={buttonData[1].iconName}/>
            </div>
        );
    }
}

Footer.defaultProps={
}

export default Footer;
