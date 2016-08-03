import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './App.css';

/**
 * App container
 * control all view component
 * @extends React.Component
 * @example
 * <App>
 *     <Header>
 *         <TextBox>Hello!</TextBox>
 *     </Header>
 *     <Foo />
 *     <Bar />
 *     <Footer />
 * </App>
 */
class App extends React.Component{
    /**
     * nothing comments..
     * @param props
     */
    constructor(props){
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleHomeButton = this.handleHomeButton.bind(this);
        this.handleSettingButton = this.handleSettingButton.bind(this);
    };

    /**
     * back to previous page
     */
    handleBackButton(){
        this.props.history.goBack();
    };

    /**
     * back to home
     */
    handleHomeButton(){
        console.log("Home");
        this.props.history.push("/");
    };

    /**
     * popup side menu
     */
    handleSettingButton(){
        console.log("Setting");
    };

    /**
     * render app container
     * @returns {XML}
     */
    render(){
        return (
            <div className={styles.app}>
                <Header
                    onClickBack={this.handleBackButton}
                    onClickHome={this.handleHomeButton}
                />
                <div>{this.props.children}</div>
                <Footer
                    settingBtnStatus={true}
                    onClickSetting={this.handleSettingButton}
                />
            </div>
        )
    };
};

export default  App;
