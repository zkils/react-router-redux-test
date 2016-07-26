

//TODO have to remove
const a = () => {
    let tmp = [];
    for( let i= 0 ; i <10 ; i++ ){
        tmp.push({name:"K"+i, value:i});
    }
    return tmp;
}


/**
 * init state for reducer
 * Add initial state for each reducer
 */
export default {
    sample:{
        checked:false,
        //sampleList: [{name:"1",value:100},{name:"2",value:100},{name:"3",value:100},{name:"4",value:100},{name:"5",value:100},{name:"6",value:100},{name:"7",value:100},{name:"8",value:100}, {name:"9",value:100},{name:"10",value:100}],
        sampleList:a()
    },
    asyncSample:{
        players:[]
    }

}


