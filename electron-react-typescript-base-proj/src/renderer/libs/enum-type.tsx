export enum MSG {
    USER = 'user',
    SYSTIME = 'systemTime',
    SYSETR = 'systemEnter'
}

export enum ConvoType {
    BOT = 2,
    DEP = 2,
    DOC = 1,
    CREATE = 3,
    INVITE = 4,
}

export enum RoomType {
    BOT = 2,
    DOC = 3,
    DEP = 2,
}

export enum InfoHeaderType{
    BOT = 'bot',
    DOC = 'doc',
    DEP = 'dep',
    INVITE = 'inviteChatRoom',
    CREATE = 'createChatRoom',
    ETC = 'etc'
}
export enum HeaderType{
    CHAT = 'Document Chat Room',
    CREATE = 'Create Document Chat Room',
    INVITE = 'Invite',
    LIST = 'Wrapsody Chat',
}
export enum MemberListType{
    CHAT = 'chat',
    SELECT = 'select',
    SELECTED = 'selected'
}
export enum MsgType {
    SHORT = 'short',
    LONG = 'long'
}
export enum MsgSubtype {
    COMMAND = 'command',
    BOT = 'bot'
}
export enum SearchType{
    ROOM = "room",
    USER = "user"
}

export enum CIType{
    CREATE = 3,
    INVITE = 4,
}