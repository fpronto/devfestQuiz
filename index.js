const mqtt = require('mqtt');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config.json'));
const client  = mqtt.connect(config.url);
 
client.on('connect', () => {
  client.subscribe('#', (err) => {});
});
 
client.on('message', (topic, message) => {
  const parsedMsg = JSON.parse(message);

  if (topic === 'question' && parsedMsg.message_type === 'round_end') {
    console.log(message.toString());
  }
  if (topic === 'question' && parsedMsg.message_type === 'round_start') {
    console.log(message.toString());
    const sendObj = {
      message_type: 'round_answer',
      question_id: parsedMsg.question_id,
      user_id: config.user_id,
      user_token: config.user_token,
      answer: 0
    };
    
    //publish 3x
    for (let i = 0; i < config.num_requests; i++) {
      for (let j = 0; j < config.num_answers; j++) {
        sendObj.answer = j;
        client.publish('answer', JSON.stringify(sendObj));
      }
    }
  }
});


