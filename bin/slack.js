

var RtmClient = require('slack-client').RtmClient;
var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, {logLevel: 'error'});
rtm.start();
var RTM_EVENTS = require('slack-client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  if (message.text.indexOf('gunda') !== -1) {
    rtm.sendMessage('Jag lysnar!', message.channel);
    rtm.sendMessage('Titta hva jag hittad!\n' + answers[0].answer, message.channel);
  }
});
