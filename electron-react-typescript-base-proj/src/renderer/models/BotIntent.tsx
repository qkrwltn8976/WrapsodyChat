import { BotCommand } from "./BotCommand";

export type BotIntent = {
    botUserId: string,
    catalog: boolean,
    catalogOrder: number,
    createdAt: number,
    groupId: number,
    intentType: number,
    name: string,
    nameCode: string,
    updatedAt: number,
    commands?: BotCommand[]
}