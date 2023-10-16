import { Canister, query, text, update, Void } from 'azle';

interface MessageLikes {
    message: string;
    likes: string;
}

const messages: { [messageId: string]: MessageLikes } = {};

export default Canister({
    getMessage: query([text], text, (messageId) => {
        return messages[messageId] ? messages[messageId].message : '';
    }),

    getLikes: query([text], text, (messageId) => {
        return messages[messageId] ? messages[messageId].likes : '0';
    }),

    setMessage: update([text, text], Void, (messageId, newMessage) => {
        messages[messageId] = { message: newMessage, likes: '0' };
    }),

    updateMessage: update([text, text], Void, (messageId, updatedMessage) => {
        if (messages[messageId]) {
            messages[messageId].message = updatedMessage;
        }
    }),

    deleteMessage: update([text], Void, (messageId) => {
        if (messages[messageId]) {
            delete messages[messageId];
        }
    }),

    addLike: update([text], text, (messageId) => {
        if (messages[messageId]) {
            messages[messageId].likes = (parseInt(messages[messageId].likes) + 1).toString();
            return messages[messageId].likes;
        } else {
            return 'Mensaje no encontrado';
        }
    })
});
