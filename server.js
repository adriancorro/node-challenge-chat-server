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
  req.body.id = messages.length 
  messages.push(req.body )
  return res.send(messages)
})


app.get('/messages', (req, res)  =>   {
 return  res.send(messages ) 
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
