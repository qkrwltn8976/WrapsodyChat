export type Room = {
    convoId: string; // 대화방 ID
    name: string; // 대화방 이름
    subject?: string; // 대화방 주제
    owner: string; // 방장 유저 ID
    type: string; // 대화방 유형
    dept?: string; // 대화방 부서
    createdAt: string; // 대화방 생성 일시
    updatedAt: string; // 대화방 수정 일시
  };
  
//   export type IState = Message[];