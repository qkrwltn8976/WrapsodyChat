export type DocInfo = {
    convoId: string; // 대화방 ID
    name: string; // 대화방 이름
    owner: string; // 방장 유저 ID
    type: string; // 대화방 유형
    updatedAt: string; // 멤버초대 -> updatedAt
    createAt: string; // 대화방 생성 -> createdAt
    permission
  };