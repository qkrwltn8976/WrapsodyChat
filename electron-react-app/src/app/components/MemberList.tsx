import * as React from 'react';

interface Props{
    memberListType: string;
}

class MemberList extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }
    render(){
        const { memberListType } = this.props;
        if(memberListType == 'chat'){
            return(
                <div>

                </div>

            );
        }else if(memberListType == 'select'){
            return(
                <div>
                    
                </div>
            );
        }else if(memberListType == 'selected'){
            return(
                <div>

                </div>
            );
        }
    }
}

export default MemberList;