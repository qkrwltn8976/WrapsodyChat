import * as React from 'react';

interface Props{
    member: object;
}
// member객체가 넘어옴

class Member extends React.Component<Props>{
//     constructor(props: Props){
//         super(props);
//     }
//     render(){
//         const { member } = this.props;
//         return(
//             <li wrapmsgr-user-profile="member.userId">
//                 {/* <span className="user-photo  no-photo cyan" user="member.userId">{member.userName}</span> */}
//                 <span className="user-photo  { member.isPhoto } { member.photoColor }" user="member.userId">{member.userName}</span>
//                 <div className="ng-binding">{member.userId} ({member.userAccount})</div>
//                 <div className="sub-info ng-binding">{member.dept}</div>
//             </li>
//         );
       
    // }
}
export default Member;