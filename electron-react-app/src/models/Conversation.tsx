export type Conversation = {
    convoId: string; // 대화방 ID
    convoType: string; // 대화 유형
    roomType: string; // 대화방 유형
    name: string; // 대화방 이름
    readAt: string; // 마지막으로 읽은 시간
    unread: number; // 읽지 않은 메시지 수
    memberCount: number; // 대화에 참여중인 유저 수
    notificationType: string; // 대화 알람 유형
    latestMessage: string // 마지막 메시지 유형
    latestMessageAt: string // 마지막 메시지 시간
    createdAt: string; // 대화 생성 일시
    updatedAt: string; // 대화 수정 일시
};
