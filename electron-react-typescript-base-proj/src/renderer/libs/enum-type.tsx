export enum MSG {
    USER = 'user',
    SYSTIME = 'systemTime',
    SYSETR = 'systemEnter'
}

export enum ConvoType {
    BOT = 2,
    DEP = 2,
    DOC = 1,
    IC = 3,
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

export enum Attachment {
    FILE = 0,
    IMAGE = 1,
    VIDEO = 2,
    SOUND = 3,
    SCRAP = 4,
    ACTION = 5,
}

export enum Command {
    BOOKMARK_START = 5,
    BOOKMARK_STOP = 6,
    BOOKMARK_NAME = 7,
    DEADLINE = 10
}