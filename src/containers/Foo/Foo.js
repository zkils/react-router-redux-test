import React from 'react'
import { connect } from 'react-redux'
import { fetchPlayersAsync  } from '../../actions/asyncActions';

/**
 * Foo Component
 * @extends React.Component
 * @example
 * <Bar >
 */
class Foo extends React.Component{
    constructor(props){
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
    }

    /**
     * get Player list
     */
    onClickButton(){
        this.props.onUpdatePlayer();
    }

    render() {
        let ulStyle = {
            display: 'inline-block'
        }
        return (
            <div>
                <h1>Page 2</h1>
                <button onClick={this.onClickButton}>get player</button>

                <ul style={ulStyle}>
                    {
                        this.props.sampleList.map((obj, i)=> {
                            return (
                                <li key={i}>{obj.name} // {obj.value}</li>
                            )
                        })
                    }
                </ul>
                <ul style={ulStyle}>
                    {
                        this.props.playerList.map((obj, i)=> {
                            return (
                                <li key={i}>{obj.name} // {obj.number}</li>

                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
  return {
      sampleList: state.sampleReducer.sampleList,
      playerList: state.getPlayers.players
  }
}
let mapDispatchToProps = (dispatch) => {
    return{
        onUpdatePlayer : () =>dispatch(fetchPlayersAsync())
    };
}

Foo = connect(mapStateToProps, mapDispatchToProps)(Foo);

export default Foo;
