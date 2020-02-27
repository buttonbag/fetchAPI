'use strict';

// const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?auth-id=3377004542077807&candidates=10&match=invalid&street=86%20Frontage%20Road&street2=&city=Belmont&state=MA';
const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?auth-id=3377004542077807&candidates=10';
const nps = 'https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=9SMjAXxMbVpMYIpG6lEHNRVbh9haR7GHbzfUItEu';
const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipField = document.querySelector('#zip');


const updateUISuccess = function(data) {
    console.log(data);
};
const updateUIError = function(data) {
    console.log(data);
};

const responseMethod = function(httpRequest) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            updateUISuccess(httpRequest.responseText);
        } else {
            updateUIError(httpRequest.status + ': ' + httpRequest.responseText);
        }
    }
}

const createRequest = function(url) {
    const httpRequest = new XMLHttpRequest(url);
    httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest))
    httpRequest.open('GET', url);
    httpRequest.send();
};

const checkCompletion = function () {
    if (addressField.value !== '' &&
        cityField.value !== '' &&
        stateField.value !== '') {
            const requestUrl = smartyUrl +
                '&street=' + addressField.value +
                '&city=' + cityField.value +
                '&state=' + stateField.value;
            createRequest(requestUrl);
    }
}

// createRequest(smartyUrl);
createRequest(nps);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);