import {createStore} from 'redux';

export default createStore(function(state:any, action:any){
    console.log("store................................")
    console.log(state)
    console.log(action)
    if(state=== undefined && action.type != "selectedList"){
        return {tempMembers:[]}
    }
    if(action.type === "clickMember"){
        let idx;
        idx = state.tempMembers.findIndex( obj => obj.userId === action.newMember[0].userId)
        if(idx == -1){
            return {...state, tempMembers: state.tempMembers.concat(action.newMember)}
        }
        if(idx > -1){
            state.tempMembers.splice(idx,1)
            return {...state, tempMembers: state.tempMembers}
        }
    }
    if(action.type === 'clickDept' && action.childNodes != undefined && action.childNodes.length > 0){
        console.log("--------------------clickDept--------------------------")
        action.childNodes.map(node=>{
            if(node.type === "user"){
                let idx;
                idx = state.tempMembers.findIndex( obj => obj.userId === node.value)
                if(idx == -1){
                    state.tempMembers = state.tempMembers.concat([{"userId": node.value, "userName": node.columnText, "password": null }])
                }
                if(idx > -1){
                    state.tempMembers.splice(idx,1)
                }
            }
            console.log(state.tempMembers)
        })
        return {...state, tempMembers: state.tempMembers}
    }
    return state;
})

