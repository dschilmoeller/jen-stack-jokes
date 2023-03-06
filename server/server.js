const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = 5000;

// use bodyParser.urlencoded throughout the app with this:
app.use(bodyParser.urlencoded({ extended: true }));

let jokes = [
  {
    whoseJoke: "Danny",
    jokeQuestion: "Why do scuba divers fall backwards out of boats?",
    punchLine: "If they fell forwards they’d still be in the boat!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Two fish are in a tank. What did one fish say to the other?",
    punchLine: "Do you know how to drive this thing?"
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs!"
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "I went to the zoo the other day, it had one dog...",
    punchLine: "It was a shih tzu."
  }
];

// serve back static files
app.use(express.static('server/public'));

// GET listener to retrieve joke array.
app.get('/retrieveJokes', function(req, res) {
  // console.log('Yo Schwami retrieving jokes array');
  res.send(jokes);
})

// POST listener to receive new jokes.
app.post('/jokeSubmit', (req, res) => {
  // console.log('Receiving joke data', req.body)
  // object holding variable.
  let jokeToPush = {
    whoseJoke: req.body.whoseJoke,
    jokeQuestion: req.body.jokeQuestion,
    punchLine: req.body.punchLine
  }
  // add joke to exsiting array.
  jokes.push(jokeToPush);
  // don't forget to send a status update to the client or the render
  // will not run.
  res.send(201)
})

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); // end spin up server
