import React from 'react'
import { connect } from 'react-redux'

class Foo extends React.Component{
  render(){
      return (
          <div>
              <h1>Page 2</h1>
              <ul>
                  {this.props.sampleList.map((obj, i)=> {
                      return (
                          <li key={i}>{obj.name} // {obj.value}</li>
                      )
                  })}
              </ul>
          </div>

      )
  }
}

let mapStateToProps = (state) => {
  return {
    sampleList : state.sampleReducer.sampleList
  };
}

Foo = connect(mapStateToProps)(Foo);

export default Foo;
