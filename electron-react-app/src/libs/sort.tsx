import { Conversation } from 'src/models/Conversation';

export function sortConvos(convos: Conversation[]) {
    for (var outer = convos.length - 1; outer > 0; --outer) {
        for (var inner = 0; inner < outer; ++inner) {
            let prev = convos[inner].latestMessageAt ? convos[inner].latestMessageAt : 0;
            let next = convos[inner + 1].latestMessageAt ? convos[inner+1].latestMessageAt : 0;

            if (prev < next) {
                var tmp : any = convos[inner]
                convos[inner] = convos[inner + 1]
                convos[inner + 1] = tmp
            } 
        }
    }
    return convos;
}