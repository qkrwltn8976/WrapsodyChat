import { createStore, bindActionCreators } from 'redux';
import { sendNotification } from './renderer/libs/notification';
import { remote } from 'electron';
import { Action } from 'history';

export default createStore(function (state: any, action: any) {
    console.log("---------------store----------------")
    console.log(state)
    
    if (state === undefined && action.type != "selectedList") {
        return { tempMembers: [] }
    }
    if (action.type === "setOldMembers") {
        return { ...state, oldMembers: action.oldMembers }
    }
    if (action.type === "clickMember") {
        let idx, idx2;
        idx = state.tempMembers.findIndex(obj => obj.userId === action.newMember[0].userId)
        idx2 = state.oldMembers.findIndex(obj => obj.userId === action.newMember[0].userId)
        if (idx == -1 && idx2 == -1) {
            return { ...state, tempMembers: state.tempMembers.concat(action.newMember) }
        }
        if (idx > -1) {
            state.tempMembers.splice(idx, 1)
            return { ...state, tempMembers: state.tempMembers }
        }
    }
    if (action.type === 'clickDept' && action.childNodes != undefined && action.childNodes.length > 0) {
        action.childNodes.map(node => {
            if (node.type === "user") {
                let idx, idx2;
                idx = state.tempMembers.findIndex(obj => obj.userId === node.value)
                idx2 = state.oldMembers.findIndex(obj => obj.userId === node.value)
                if (idx == -1 && idx2 == -1) {
                    state.tempMembers = state.tempMembers.concat([{ "userId": node.value, "userName": node.columnText, "password": null }])
                }
                if (idx > -1) {
                    state.tempMembers.splice(idx, 1)
                }
            }
        })
        return { ...state, tempMembers: state.tempMembers }
    }

    if (action.type === 'setMembers') {
        return { ...state, members: action.members }
    }

    if (action.type === 'addMembers') {
        console.log("-----------------store에서 addMembers----------------------------")
        console.log(state)
        if (state.members != undefined && state.members.length > 0) {
            state.members = state.members.concat(action.members)
            console.log(state.members)
        }
        console.log("..................................")
        return { ...state, members: state.oldMembers.concat() }
    }

    if (action.type === 'setElectron') {
        return { ...state, electron: action.electron}
    }

    if (action.type === 'setConvoList') {
        return { ...state, convos: action.convos }
    }

    if (action.type === 'setConvo') {
        return { ...state, convo: action.convo }
    }

    if (action.type === 'setMsgs') {
        return {...state, msgs: action.msgs }
    }

    if (action.type === 'recvMsg') {
        const index = state.convos.findIndex(convo => convo.convoId === action.msg.recvConvoId),
            convos = state.convos // important to create a copy, otherwise you'll modify state outside of setState call
        convos[index].latestMessage = action.msg.body;
        if (action.msg.sendUserId !== "admin") {
            if (state.electron.isBrowserOpened(convos[index].browserId)) {
                // 윈도우 창이 열려있는 경우 
                convos[index].unread = 0;
            }
            else {
                // 윈도우 창이 닫혀있는 경우 안읽은 메세지 카운트 증가, notificiation 전송
                convos[index].unread += 1;
                if (convos[index].notificationType === 1) {
                    var win = remote.getCurrentWindow()
                    sendNotification('새로운 메세지가 도착했습니다', action.msg.sendUserId, action.msg.body || action.msg.messageId);
                    win.once('focus', () => win.flashFrame(false))
                    win.flashFrame(true)
                }

            }
        }
        convos[index].latestMessageAt = action.msg.updatedAt;
        return { ...state, convos: convos }
        // this.setState({ convos: convos });
    }

    // 위로 스크롤 해 메세지 가져오는 경우
    if(action.type === 'getMsgsBackward') {
        return { ...state, msgs: action.msgs.concat(state.msgs) }
    }
    if(action.type === 'setDocName'){
        return { ...state, docName: action.docName }
    }
    if(action.type === 'setSyncInfo'){
        let nodeList = [];
        action.syncInfo.checkoutAuthList.user.map(member =>{
            nodeList.push({"name": member.userName, "id" : member.userId, "status": "select", "type": "user"})
        })
        action.syncInfo.viewAuthList.user.map(member => {
            nodeList.push({"name": member.userName, "id" : member.userId, "status": "select", "type": "user"})
        })
        action.syncInfo.checkoutDeptAuthList.dept.map(dept=>{
            nodeList.push({"name": dept.deptName, "id": dept.deptCode, "hasChildren": true, "isExpanded": false, "status": "select", "type":"dept"})
        })
        action.syncInfo.viewDeptAuthList.dept.map(dept=>{
            nodeList.push({"name": dept.deptName, "id": dept.deptCode, "hasChildren": true, "isExpanded": false, "status": "select", "type":"dept"})
        })
        console.log("-----------------nodeList-----------------------")
        console.log(nodeList)
        return {
            ...state, 
            master : action.syncInfo.master,
            viewAuthAllUsers: action.syncInfo.viewAuthAllUsers,
            nodeList: nodeList
        }
    }

    return state;
})

