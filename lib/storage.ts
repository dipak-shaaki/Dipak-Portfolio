
let messageStorage: any[] = [];

export const addMessage = (message: any) => {
    messageStorage.push({
        ...message,
        _id: Date.now().toString(),
        timestamp: new Date()
    });
    return message;
};

export const getMessages = () => {
    return messageStorage.sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
};

export const clearMessages = () => {
    messageStorage = [];
};
