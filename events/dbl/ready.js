module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run(hook) {
    let client = this.client;
    try {
      console.log(`¡Webhook listo! ${hook.path}`);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'readyDBL',
        error: e
      });
    }
  }
};
