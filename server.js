var spawn = require('child_process').spawn;

spawn('twitter-proxy');

console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');
