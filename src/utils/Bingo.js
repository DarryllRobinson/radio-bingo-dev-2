import camelcaseKeys from './camelcase-keys/index';
import 'whatwg-fetch';

const Bingo = {};
const baseUrl = 'http://localhost:4000/api';

/*Bingo.getSongs = () => {
  const url = `${baseUrl}/songs`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }

    return response.json().then(jsonResponse => {
      return jsonResponse.songs.map(song => camelcaseKeys(song));
    });
  });
};*/

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
      return camelcaseKeys(jsonResponse.user);
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
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('error');
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('saved');
      return camelcaseKeys(jsonResponse.card);
    });
  });
};

Bingo.createminiCard = minicard => {
  const url = `${baseUrl}/minicards`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({minicard: minicard})
  };
  //console.log('body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('error');
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('saved');
      return camelcaseKeys(jsonResponse.minicard);
    });
  });
};

Bingo.updateminiCard = minicard => {
  const url = `${baseUrl}/minicards/${minicard.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({minicard: minicard})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.minicard);
    });
  });
};

/*Bingo.updateSong = song => {
  const url = `${baseUrl}/songs/${song.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({song: song})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.song);
    });
  });
};

Bingo.restoreSong = song => {
  song.isCurrentSong = 1;
  const url = `${baseUrl}/songs/${song.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({song: song})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.song);
    });
  });
};

Bingo.deleteSong = id => {
  const url = `${baseUrl}/songs/${id}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};*/

export default Bingo;
