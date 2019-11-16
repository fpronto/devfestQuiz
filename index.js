const mqtt = require('mqtt');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config.json'));
const client  = mqtt.connect(config.url);
 
client.on('connect', () => {
  client.subscribe('#', () => {});
});
 
client.on('message', (topic, message) => {
  const parsedMsg = JSON.parse(message);
  if (topic === 'question') {
    switch (parsedMsg.message_type) {
      case 'round_start':
          const sendObj = {
            message_type: 'round_answer',
            question_id: parsedMsg.question_id,
            user_id: config.user_id, // this doesn't change
            user_token: config.user_token, // this is changing for every login, needs a fix
            answer: 0
          };
          
          //publish 3x
          for (let i = 0; i < config.num_requests; i++) {
            for (let j = 0; j < config.num_answers; j++) {
              sendObj.answer = j;
              client.publish('answer', JSON.stringify(sendObj));
            }
          }
      default:
        console.log(message.toString());
        break;
    }
  }
});


