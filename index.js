'use strict';

function displayResult(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            ` <li>
                <p>${responseJson[i].name}</p>
                <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
             </li>`
        );
        $('#results').removeClass('hidden');
    }
}

function getRepo(searchTerm) {
    fetch(`https://api.github.com/users/${searchTerm}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResult(responseJson))
    .catch(err=> {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
        console.log(err);
    })
    
}

function watchForm() {
$('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepo(searchTerm);
});
}

$(watchForm);