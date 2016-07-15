import React from 'react'
import { Link,  IndexLink } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends React.Component{
    constructor(props){
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleHomeButton = this.handleHomeButton.bind(this);
        this.handleSettingButton = this.handleSettingButton.bind(this);
    }
    handleBackButton(){
        console.log("Back");
        this.props.history.goBack();
    }
    handleHomeButton(){
        console.log("Home");
        this.props.history.push("/");
    }
    handleSettingButton(){
        console.log("Setting");
    }
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
            <div>
                <Header onClickBack={this.handleBackButton} onClickHome={this.handleHomeButton} />
                <br />
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
