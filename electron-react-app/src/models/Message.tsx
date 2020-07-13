export type Message = {
    id: string; // 메시지 ID
    sendUserId: string; // 보낸 유저 ID
    recvConvoId: string; // 받는 대화 ID
    title?: string; // 메시지 제목
    body: string; // 메시지 본문
    type?: number // 메시지 유형 ???
    parent_message_id?: number; // 부모 메시지 ID
    createdAt: number; // 메시지 생성 일시
    updatedAt: number; // 메시지 수정 일시
  };
  
//   export type IState = Message[];