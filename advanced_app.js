let restify = require("restify");
let builder = require("botbuilder");

const connector = new builder.ChatConnector();

//Create bot
var bot = new builder.UniversalBot(connector);

//Setup restify server
const server = restify.createServer(); // create web server
server.post('/api/messages', connector.listen()); // handles posts (root on which the bot listens)

server.listen(process.env.port || process.env.PORT || 3978, '::', () => { // start listening on this port if not defined then use 3978
    console.log('Server up'); // when done log server
});

//Dialog handling
bot.dialog('/', [
    function (session){
        session.beginDialog('/askName');
    },
    function(session, results){
        session.send('Hello %s!', results.response);
    }
]);

bot.dialog('/askName', [
    function (session){
        builder.Prompts.text(session, 'Hi! What is your name?'); 
    },
    function(session, results){
        session.endDialogWithResult(results);
    }
]);