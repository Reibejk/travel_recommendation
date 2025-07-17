let searchBtn = document.getElementById('search');
let clearBtn = document.getElementById('clear');
const searchDiv = document.getElementById('searchDisplay');


function showRecommendation(event) {
    event.preventDefault();
    const text = document.getElementById('searchText').value.trim().toLowerCase();
    // const searchDiv = document.createElement('div');
    searchDiv.innerHTML = ''; // Clear previous results

    fetch('https://reibejk.github.io/travel_recommendation/travel.json')
        .then(response => response.json())
        .then(data => {
            let items = [];

            if (text === 'country' || text === 'countries') {
                data.countries.forEach(country => {
                    items.push(...country.cities);
                });
            } else if (text === 'beach' || text === 'beaches') {
                items = data.beaches;
            } else if (text === 'temple' || text === 'temples') {
                items = data.temples;
            }
            if (!items || items.length === 0) {
                mainDiv.innerHTML = '<p>No items found for this category</p>';
                return;
            }

            items.slice(0, 2).forEach(item => {
                const itemDiv = document.createElement('div');
            item.className = 'item';

                const img = document.createElement('img');
                img.src = item.imageUrl;
                img.alt = item.name;

                const h2 = document.createElement('h2');
                h2.textContent = item.name;

                const p = document.createElement('p');
                p.textContent = item.description;

                itemDiv.appendChild(img);
                itemDiv.appendChild(h2);
                itemDiv.appendChild(p);
                itemDiv.appendChild(hr);

                searchDiv.appendChild(itemDiv);
            });
        })
        .catch(error => {
            console.error('Could not fetch or render the data', error);
            searchDiv.innerHTML = '<p>Error loading data.</p>';
        });
}

searchBtn.addEventListener('click', showRecommendation);

clearBtn.addEventListener('click', () => {
    document.getElementById('searchText').value = '';
    searchDiv.innerHTML = '';
});
