console.log('client.js sourced');

$( document ).ready( onReady );

// startup function
function onReady() {
    // console.log('DOM ready');
    // listener for add joke button
    $('#addJokeButton').on('click', submitJoke);
    // function to retrieve jokes (subfunction: render jokes to DOM)
    getJokes();
}

// function to retrieve jokes.
function getJokes() {
    // console.log('rendering jokes function working');
    $.ajax({
        method: 'GET',
        url: '/retrieveJokes'
    }).then(function(response) {
        // console.log('AJAX /retrieveJokes get Success!', response);
        // function to render jokes to DOM.
        render(response)
    }).catch(function() {
        alert('Request Failed. Try again later.')
    });
}

// actual DOM html code.
// not especially fancy or interesting version but does the needful.
function render(array) {
    $('#outputDiv').empty()
    $('#outputDiv').append(`
    <ul>
    `)
    for (joke of array) {
    $('#outputDiv').append(`
        <li>${joke.whoseJoke}</li>
        <li>${joke.jokeQuestion}</li>
        <li>${joke.punchLine}
    `)}
    $('#outputDiv').append(`
    </ul>
    `)
}

// function to take in joke and send to server.
function submitJoke() {
        // console.log('in postJoke')
        
        // object to hold outgoing joke.
        // can be wrapped in a if (whoseJoke&&etc) to prevent submission
        // of empty fields.
        let outGoingJoke = {
            whoseJoke: $('#whoseJokeIn').val(),
            jokeQuestion: $('#questionIn').val(),
            punchLine: $('#punchlineIn').val()
        }
        // console.log('outgoing Joke:', outGoingJoke)

        // actual posting of object to server.
        $.ajax({
            method: 'POST',
            url: '/jokeSubmit',
            data: outGoingJoke
        }).then(function(response) {
            console.log('joke submitted.')
            getJokes()
        }).catch(function() {
            alert('Your joke has failed to reach the server, possibly because it is not funny. Please try again later with a funnier joke.')
        })
}