const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://devfest.whitesmith.co/mosquitto')
 
client.on('connect', () => {
  client.subscribe('#', (err) => {
    if (!err) {
      // client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', (topic, message) => {
  // message is Buffer
  const parsedMsg = JSON.parse(message);
  if (topic == "question" && parsedMsg.message_type === 'round_start') {
    console.log(topic);
    console.log(message.toString());
    const sendObj = {
      message_type: "round_answer",
      question_id: parsedMsg.question_id,
      user_id: 48,
      user_token: "6f4844bb3545466ac13f026b54de68a5607eca9f",
      answer: 0
    };
    
    //publish 4x
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        sendObj.answer = j;
        client.publish('answer', JSON.stringify(sendObj));
      }
    }
  }
});


