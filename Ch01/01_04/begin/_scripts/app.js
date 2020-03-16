'use strict';

// const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?auth-id=3377004542077807&candidates=10&match=invalid&street=86%20Frontage%20Road&street2=&city=Belmont&state=MA';
const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?auth-id=3377004542077807&candidates=10';
const smartyInit = {
    headers: {
        'Content-Type': 'application/json',
        Host: 'us-street.api.smartystreets.com',
    },
};
const nps = 'https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=9SMjAXxMbVpMYIpG6lEHNRVbh9haR7GHbzfUItEu';
const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipField = document.querySelector('#zip');
const parkThumb = document.querySelector('#specials h2 img');
const parkSection = document.querySelector('#specials');
const parkName = document.querySelector('#specials h2 a');
const parkDesc = document.querySelector('#specials p');



const smartyUpdateUISuccess = function(parsedData) {
    // const parsedData = JSON.parse(data);
    // console.log(parsedData);
    const zip = parsedData[0].components.zipcode;
    const plus4 = parsedData[0].components.plus4_code;
    zipField.value = (zip + '-' + plus4);
};
const smartyUpdateUIError = function(error) {
    console.log(error);
};
const npsUpdateUISuccess = function(parsedData) {
    // const parsedData = JSON.parse(data);
    console.log(parsedData);
    const number = Math.floor(Math.random() * parsedData.data.length);
    parkName.textContent = parsedData.data[number].fullName;
    parkName.href = parsedData.data[number].url;
    parkDesc.textContent = parsedData.data[number].description;
    parkThumb.src = 'https://www.nps.gov/common/commonspot/templates/assetsCT/images/branding/logo.png';
    parkSection.classList.remove('hidden');
};
const npsUpdateUIError = function(error) {
    console.log(error);
};

// const responseMethod = function(httpRequest, succeed, fail) {
//     if (httpRequest.readyState === 4) {
//         if (httpRequest.status === 200) {
//             succeed(httpRequest.responseText);
//         } else {
//             fail(httpRequest.status + ': ' + httpRequest.responseText);
//         }
//     }
// }

// const createRequest = function(url, succeed, fail) {
//     const httpRequest = new XMLHttpRequest(url);
//     httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest, succeed, fail))
//     httpRequest.open('GET', url);
//     httpRequest.send();
// };

const handleErrors = function(response) {
    if(!response.ok) {
        throw (response.status + ': ' + response.statusText);
    }
    return response.json();
}

const createRequest = function(url, succeed, fail, init) {
    fetch(url, init)
        .then((response) => handleErrors(response))
        .then((data) => succeed(data))
        .catch((error) => fail(error));
};

const checkCompletion = function () {
    if (addressField.value !== '' &&
        cityField.value !== '' &&
        stateField.value !== '') {
            const requestUrl = smartyUrl +
                '&street=' + addressField.value +
                '&city=' + cityField.value +
                '&state=' + stateField.value;
            createRequest(requestUrl, smartyUpdateUISuccess, smartyUpdateUIError, smartyInit);
    }
}

// createRequest(smartyUrl);
// createRequest(nps, npsUpdateUISuccess, npsUpdateUIError);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);
window.addEventListener('DOMContentLoaded', () => {
    createRequest(nps, npsUpdateUISuccess, npsUpdateUIError);
});