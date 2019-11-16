var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://devfest.whitesmith.co/mosquitto')
 
client.on('connect', function () {
  client.subscribe('#', function (err) {
    if (!err) {
      // client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  const parsedMessage = JSON.parse(message);
  if(topic == "question" && parsedMessage.message_type === 'round_start'){
    console.log(topic);
    console.log(message.toString());
    //publish 4x
    const obj1 = {"message_type":"round_answer","question_id":parsedMessage.question_id,"user_id":48,"user_token":"6f4844bb3545466ac13f026b54de68a5607eca9f","answer":"0"};
    const obj2 = {"message_type":"round_answer","question_id":parsedMessage.question_id,"user_id":48,"user_token":"6f4844bb3545466ac13f026b54de68a5607eca9f","answer":"1"};
    const obj3 = {"message_type":"round_answer","question_id":parsedMessage.question_id,"user_id":48,"user_token":"6f4844bb3545466ac13f026b54de68a5607eca9f","answer":"2"};
    const obj4 = {"message_type":"round_answer","question_id":parsedMessage.question_id,"user_id":48,"user_token":"6f4844bb3545466ac13f026b54de68a5607eca9f","answer":"3"};
    
    for (let i = 0; i<5; i++) {
      client.publish('answer', JSON.stringify(obj1));
      client.publish('answer', JSON.stringify(obj2));
      client.publish('answer', JSON.stringify(obj3));
      client.publish('answer', JSON.stringify(obj4));
    }
    
  }
  //client.end()
})


