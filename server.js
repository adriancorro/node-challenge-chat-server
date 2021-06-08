const express = require("express");
const cors = require("cors");
const e = require("express");

const app = express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};



//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.post('/messages', (req, res)  =>   {

  if(req.body.from && req.body.text  ){
    const msg = {timeSmap: new Date(), ...req.body}
    req.body.id = messages.length 
    //messages.push(req.body )  will do the push without the timeSent
    messages.push(msg )
    return  res.sendStatus(200);
  }else{
    return res.sendStatus(400);
  }
})


app.get('/messages', (req, res)  =>   {
 return  res.send(messages ) 
} )

app.get('/messages/search', (req, res)  =>   {
  //http://localhost:3000/messages/search?text=Welcome
  const containsText = req.query.text.toLowerCase()
  const matches = messages.filter((m) => m.text.toLowerCase().includes(containsText))

  if(matches.length){
    res.send(matches)
  }else{
    res.sendStatus(400)
  }

 } )

 app.get('/messages/latest', (req, res)  =>   {
  //http://localhost:3000/messages/latest
  
  let latestMessages = messages.slice(Math.max(messages.length - 10, 0))
  res.send(latestMessages);

 } )

app.get('/messages/:id', (req, res)  =>   {
  let idMessage = req.params.id
  let messagesFind = messages.find(e => e.id == idMessage) 

  if(messagesFind){
    res.send(messagesFind);
  }else{
    res.sendStatus(400);
  }
})



app.delete('/messages/:id', (req, res)  =>   {
  let idMessage = req.params.id
  let messagesFindIndex = messages.findIndex(e => e.id == idMessage) 

  if(messagesFindIndex !== -1){
    messages.splice(messagesFindIndex, 1)
    res.sendStatus(200)
  }else{
    res.sendStatus(400);
  }
})

app.put('/messages/:id', (req, res)  =>   {
  let idMessage = req.params.id
  let messagesFindIndex = messages.findIndex(e => e.id == idMessage) 

  if(messagesFindIndex !== -1){
    const newMessage = {...messages[messagesFindIndex], ...req.body}
    messages[messagesFindIndex]  = newMessage
    res.sendStatus(200)
  }else{
    res.sendStatus(400);
  }
})

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html" );
});

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
