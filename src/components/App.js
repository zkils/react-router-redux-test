import React from 'react'
import { Link, browserHistory } from 'react-router'
import Header from './Header'
import Footer from './Footer'

class App extends React.Component{
    constructor(props){
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleHomeButton = this.handleHomeButton.bind(this);
        this.handleSettingButton = this.handleSettingButton.bind(this);
    }
    handleBackButton(){
        console.log("Back");
        browserHistory.goBack();
    }
    handleHomeButton(){
        console.log("Home");
        browserHistory.push('/');
    }
    handleSettingButton(){
        console.log("Setting");
    }
    render(){
        return (
            <div>
                <Header onClickBack={this.handleBackButton} onClickHome={this.handleHomeButton} />
                <br />
                <div>
                    Links:
                    {'  /  '}
                    <Link to="/">Home</Link>
                    {'  /  '}
                    <Link to="/foo">Foo</Link>
                    {'  /  '}
                    <Link to="/bar">Bar</Link>
                </div>
                <div>
                    <button onClick={() => browserHistory.push('/foo')}>Go to /foo....</button>
                    <br />
                    <button onClick={() => browserHistory.push('/bar')}>Go to /bar....</button>

                </div>
                <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
                <Footer settingBtnStatus={true} onClickSetting={this.handleSettingButton} />
            </div>
        )
    }
}

export default  App;

//
// export default function App({ children }) {
//     return (
//         <div>
//             <Header/>
//             <br />
//             <div>
//                 Links:
//                 <br/>
//                 <Link to="/">Home</Link>
//                 <br/>
//                 <Link to="/foo">Foo</Link>
//                 <br/>
//                 <Link to="/bar">Bar</Link>
//
//             </div>
//             <div>
//                 <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
//             </div>
//             <div style={{ marginTop: '1.5em' }}>{children}</div>
//             <Footer/>
//         </div>
//     )
// }
