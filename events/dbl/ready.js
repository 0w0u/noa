module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run(hook) {
    let client = this.client;
    try {
      console.log(`¡Webhook listo! ${hook.path}`);
      let dblV = await client.dbl.getBot(client.config.botID);
      client.monthlyVotes = dblV.monthlyPoints;
      client.votes = dblV.points;
    } catch (e) {
      client.err({
        type: 'event',
        name: 'readyDBL',
        error: e,
      });
    }
  }
};
