const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    console.log(input);
    console.log(resultDiv.value);
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if (input === 'country' || input === 'countries') {
                const idx = 0;
                const dest = data.countries[idx].cities;
                generateText(dest);
                document.getElementById('destinationInput').value = '';
            } else if (input === 'beach' || input === 'beaches') {
                const dest = data.beaches; // list of 2
                generateText(dest);
                document.getElementById('destinationInput').value = '';
            } else if (input === 'temple' || input === 'temples') {
                const dest = data.temples; // list of 2
                generateText(dest);
                document.getElementById('destinationInput').value = '';
            } else {
                resultDiv.innerHTML = 'Destination not found.';
                document.getElementById('destinationInput').value = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });

    function generateText(dest) {
        if (dest) {
            dest.forEach(destination => {
                resultDiv.innerHTML += `<img src="${destination.imageUrl}" alt="hjh">`;
                resultDiv.innerHTML += `<h2>${destination.name}</h2>`;
                resultDiv.innerHTML += `<p>${destination.description}</p>`;
            });
        } else {
            resultDiv.innerHTML = 'Destination not found.';
        }
    }
}

function resetResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    document.getElementById('destinationInput').value = '';
}

btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', resetResult);