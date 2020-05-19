let { ShardingManager } = require('discord.js'),
  manager = new ShardingManager('./index.js', { token: require('./config.js').token, totalShards: 'auto' });
manager.spawn();
manager.on('shardCreate', (shard) => console.log(`Shard #${shard.id} ejecutado`));
