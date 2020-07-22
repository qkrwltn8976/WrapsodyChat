export type Attachment = {
    attachmentId : number,
    attachmentOrder : number,
    attachmentType : number
    createdAt : number,
    messageId : number,
    title? : string,
    updatedAt : number,
    uri? : string,
    payload?: any
}