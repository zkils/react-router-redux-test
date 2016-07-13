import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
           <div>
               <h1>Page 1</h1>
               <div>
                   Bar checked state is....
                   {(this.props.checked) ? "Checked" : "non checked"}

               </div>
           </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        checked : state.sampleReducer.checked
    };
}

Home = connect(mapStateToProps)(Home);

export default Home;
