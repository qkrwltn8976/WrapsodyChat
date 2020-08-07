export type Conversation = {
    convoId: string; // 대화방 ID
    convoType: number; // 대화 유형
    roomType: number; // 대화방 유형
    name: string; // 대화방 이름
    readAt: number; // 마지막으로 읽은 시간
    unread: number; // 읽지 않은 메시지 수
    memberCount: number; // 대화에 참여중인 유저 수
    notificationType: number; // 대화 알람 유형
    latestMessage: string // 마지막 메시지 유형
    latestMessageAt: number // 마지막 메시지 시간
    createdAt: number; // 대화 생성 일시
    updatedAt: number; // 대화 수정 일시

    browserId?: number; // 브라우저 id
    bookmark?: string; // 북마크 상태 
    deadline?: string;  // 데드라인
};

