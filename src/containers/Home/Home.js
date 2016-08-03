import React from 'react';
import { connect } from 'react-redux';
import { Link,  IndexLink } from 'react-router';

class Home extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        let linkStyle = {
            position:'absolute',
            top: '80px',
            left: '200px',
        }
        return(
           <div>
               <h1>Page Home</h1>
               <div style={linkStyle}>
                   Links:
                   {'  /  '}
                   <IndexLink to="/">Home</IndexLink>
                   {'  /  '}
                   <Link to="/foo">Foo</Link>
                   {'  /  '}
                   <Link to="/bar">Bar</Link>
               </div>
           </div>
        )
    };
};

let mapStateToProps = (state) => {
    return {
        checked : state.sampleReducer.checked
    };
};

Home = connect(mapStateToProps)(Home);

export default Home;
