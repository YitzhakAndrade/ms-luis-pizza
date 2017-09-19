var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    //console.log(session)
    session.send("You said: %s", session.message.text);
});

// Add global LUIS recognizer to bot
var luisAppUrl = process.env.LUIS_APP_URL
bot.recognizer(new builder.LuisRecognizer(luisAppUrl));

bot.dialog('pedir pizza', function (session, args) {
	console.log('\n\n')
    console.log(args)
    if (args)
    	for (i in args.intent.entities)
    		console.log(args.intent.entities[i])
    console.log('\n\n')
    session.send('identifiquei que vc quer pedir pizza')
}).triggerAction({
    matches: 'pedir pizza'
});
