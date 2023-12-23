const cardsContainer = document.getElementById('cards-container');
const filter = document.querySelector('.filter');
const filterText = filter.querySelector('.filter-text');
const filterOption = filter.querySelector('#filter-option');
const seachInput = document.querySelector('#search-input');
const darkMode = document.querySelector('#dark-mode');
let region = [];

function cards(data) {
  for (let i = 0; i < data.length; i++) {
    // card div
    let createDiv = document.createElement('div');
    createDiv.className = 'card';

    // card image
    let cardImage = document.createElement('img');
    cardImage.classList.add('card-image');
    cardImage.id = `img-${i}`;
    cardImage.setAttribute('src', `${data[i].flags.png}`);

    createDiv.appendChild(cardImage);

    //card content
    let cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    createDiv.appendChild(cardContent);

    //card unoderList
    let cardDescLisst = document.createElement('ul');
    cardDescLisst.innerHTML = `<li><h2>${data[i].name.common}</h2></li>
      <li><span>Population: </span>${data[i].population.toLocaleString()}</li>
      <li><span>Region: </span><span class="region">${
        data[i].region
      }</span></li>
      <li><span>Capital: </span>${data[i].capital}</li>`;
    cardContent.appendChild(cardDescLisst);

    cardsContainer.appendChild(createDiv);

    if (!region.includes(data[i].region)) {
      region.push(data[i].region);
    }
  }
  region.sort();
  createFilterOption(region);
}

function createFilterOption(region) {
  region.forEach((ele) => {
    const optionLi = document.createElement('li');
    optionLi.classList.add('option');
    optionLi.innerHTML = `${ele}`;
    filterOption.appendChild(optionLi);
  });
  const options = filterOption.querySelectorAll('.option');

  options.forEach((li) => {
    li.addEventListener('click', () => {
      let selectedOption = li.innerHTML;
      filterText.innerHTML = selectedOption;
      filterByRegion(selectedOption);
    });
  });
}

function filterByRegion(region) {
  console.log(region);

  const node = cardsContainer.childNodes;

  node.forEach((ele) => {
    ele.style.display = 'block';
    const cardContent = ele.querySelector(
      '.card-content ul li:nth-child(3) .region'
    ).innerHTML;

    if (region != cardContent) {
      ele.style.display = 'none';
    }
  });
}

async function fetchData() {
  try {
    let data = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital'
    );
    data = await data.json();
    cards(data);
  } catch (err) {
    console.log(err);
  }
}

fetchData();

filter.addEventListener('click', (e) => {
  filter.classList.toggle('active');
});

seachInput.addEventListener('keyup', () => {
  let input = seachInput.value.toUpperCase();

  const node = cardsContainer.childNodes;

  node.forEach((ele) => {
    let cardContent = ele.querySelector(
      '.card-content ul li:nth-child(1) h2'
    ).innerHTML;
    cardContent = cardContent.toUpperCase();
    console.log(input);
    // console.log(cardContent);
    if (cardContent.indexOf(input) > -1) {
      ele.style.display = 'block';
    } else {
      ele.style.display = 'none';
    }
  });
});

darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
