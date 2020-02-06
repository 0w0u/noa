module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run() {
    let client = this.client;
    try {
    } catch (e) {
      client.err({
        type: 'event',
        name: 'event',
        error: e
      });
    }
  }
};
