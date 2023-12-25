const darkMode = document.getElementById('dark');
const flagImage = document.getElementById('flag-image');
const countryName = document.getElementById('country-name');
const countryDetail1 = document.querySelector('.country-deltail1 ul');
const countryDetail2 = document.querySelector('.country-detail2 ul');
const countryBorder = document.querySelector('.border-country ul');
const back = document.querySelector('.back');

back.addEventListener('click', () => {
  window.location.href = 'index.html';
});
darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

async function fetchApiData() {
  try {
    const apiData = await JSON.parse(window.localStorage.getItem('apiData'));
    const latLang = await JSON.parse(window.localStorage.getItem('latlang'));

    getCountryDetail(apiData, latLang);
  } catch (err) {
    console.error(err);
  }
}

function getCountryDetail(apiData, latLang) {
  const result = apiData.filter((country) => {
    return country.latlng[0] === latLang[0] && country.latlng[1] === latLang[1];
  });
  console.log(result[0]);

  displayCountryData(result[0], apiData);
}

function displayCountryData(result, data) {
  flagImage.setAttribute('src', `${result.flags.png}`);
  countryName.textContent = `${result.name.common}`;

  countryDetail1.innerHTML = `<li><span>Native Name:</span> 
  ${result.name.nativeName}</li>
                              <li><span>Population:</span> ${result.population.toLocaleString()}</li>
                              <li><span>Region:</span> ${result.region}</li>
                              <li><span>Sub Region:</span> ${
                                result.subregion
                              }</li>
                              <li><span>Capital:</span> ${result.capital}</li>`;

  countryDetail2.innerHTML = `<li><span>Top Level Domain:</span>
  ${result.tld}</li>
                              <li><span>Currencies:</span> ${getCurrency(
                                result.currencies
                              )}</li>
                              <li><span>Languages:</span>${Object.values(
                                result.languages
                              )}</li>`;

  countryBorder.innerHTML = `${getBorder(result.borders, data)}`;

  localStorage.removeItem('latLang');
}

function getCurrency(currObj) {
  for (const ele in currObj) {
    return currObj[ele].name;
  }
  return '';
}

function getBorder(codeBorder, data) {
  if (codeBorder === undefined) {
    return '';
  }
  let boderName = [];
  for (let i = 0; i < codeBorder.length; i++) {
    const name = data.reduce((border, curr) => {
      if (curr.cca3 === codeBorder[i]) {
        border.push(curr.name.common);
      }

      return border;
    }, []);
    boderName.push(name);
  }
  return boderName;
}

fetchApiData();
