import camelcaseKeys from './camelcase-keys/index';
import 'whatwg-fetch';

const Bingo = {};
const baseUrl = 'http://localhost:4000/api';

Bingo.getSong = id => {
  const url = `${baseUrl}/songs/${id}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.song);
    });
  });
};

Bingo.getArtist = id => {
  const url = `${baseUrl}/artists/${id}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.artist);
    });
  });
};

Bingo.getUser = user_id => {
  const url = `${baseUrl}/users/${user_id}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      //console.log('jsonResponse.user: ', jsonResponse.user);
      return camelcaseKeys(jsonResponse.user);
    });
  });
};

Bingo.getTiles = cardId => {
  const url = `${baseUrl}/tiles/${cardId}`;
  //console.log('url: ', url);
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.tile);
    });
  });
};

Bingo.createCard = card => {
  const url = `${baseUrl}/cards`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({card: card})
  };
  //console.log('body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('card error');
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('card saved');
      return camelcaseKeys(jsonResponse.card);
    });
  });
};

Bingo.createTile = tile => {
  const url = `${baseUrl}/tiles`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tile: tile })
  };

  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('tile error');
      return new Promise(resolve => resolve(null));
    };

    return response.json().then(jsonResponse => {
      console.log('tile saved');
      return camelcaseKeys(jsonResponse.tile);
    });
  });
}

Bingo.createUser = user => {
  const url = `${baseUrl}/users`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: user})
  };
  //console.log('body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('user error');
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('user saved');
      return camelcaseKeys(jsonResponse.user);
    });
  });
};

Bingo.updateUser = user => {
  const url = `${baseUrl}/users/:(${user.userId})/:(${user.cardId})`;
  console.log('url: ', url);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: user})
  };

  console.log('updateUser body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('user update error');
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('user updated');
      return camelcaseKeys(jsonResponse.user);
    });
  });
};

export default Bingo;
