module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run(oldMessage, newMessage) {
    let client = this.client;
    if (oldMessage === newMessage) return;
    if (oldMessage.content === newMessage.content) return;
    try {
      client.emit('message', newMessage);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'messageUpdate',
        error: e
      });
    }
  }
};
