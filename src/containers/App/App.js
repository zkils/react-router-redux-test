import React from 'react'
import { Link,  IndexLink } from 'react-router'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
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
    }

    /**
     * back to previous page
     */
    handleBackButton(){
        this.props.history.goBack();
    }

    /**
     * back to home
     */
    handleHomeButton(){
        console.log("Home");
        this.props.history.push("/");
    }

    /**
     * popup side menu
     */
    handleSettingButton(){
        console.log("Setting");
    }

    /**
     * render app container
     * @returns {XML}
     */
    render(){
        let linkStyle = {
            position:'absolute',
            top: '80px',
            left: '200px',
        }
        let btnsStyle = {
            position:'absolute',
            top: '80px',
            left: '400px',
        }
        return (
            <div className={styles.app}>
                <Header onClickBack={this.handleBackButton} onClickHome={this.handleHomeButton} />
                <div style={linkStyle}>
                    Links:
                    {'  /  '}
                    <IndexLink to="/">Home</IndexLink>
                    {'  /  '}
                    <Link to="/foo">Foo</Link>
                    {'  /  '}
                    <Link to="/bar">Bar</Link>
                </div>
                <div style={btnsStyle}>
                    <button onClick={() => this.props.history.push('foo')}>Go to /foo</button>
                    <br />
                    <button onClick={() => this.props.history.push('bar')}>Go to /bar</button>
                </div>
                <br />
                <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
                <Footer settingBtnStatus={true} onClickSetting={this.handleSettingButton} />
            </div>
        )
    }
}

export default  App;
