import camelcaseKeys from './camelcase-keys/index';
import 'whatwg-fetch';

const Bingo = {};
const baseUrl = 'http://localhost:3306/api';

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

Bingo.matchSong = campaignId => {
  const url = `${baseUrl}/rds/${campaignId}`;
  //console.log('url: ', url);
  return fetch(url).then(response => {
    if (!response.ok) {
      console.log('getSong error');
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      //console.log('getSong successful');
      return camelcaseKeys(jsonResponse.rds);
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
  console.log('body: ', fetchOptions.body);
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

Bingo.completeUser = user => {
  const url = `${baseUrl}/users/${user.id}`;
  //console.log('url: ', url);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: user})
  };

  //console.log('completeUser body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('user update error');
      //console.log('response: ', response);
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('user updated');
      return camelcaseKeys(jsonResponse.user);
    });
  });
};

Bingo.submitArtist = tile => {
  const url = `${baseUrl}/tiles/${tile.id}/artist`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tile: tile})
  };

  //console.log('completeUser body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('tile update error');
      //console.log('response: ', response);
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('tile artist updated');
      return camelcaseKeys(jsonResponse.tile);
      //return jsonResponse.tile;
    });
  });
}

Bingo.correctSubmission = tile => {
  const url = `${baseUrl}/tiles/${tile.id}/correct`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tile: tile})
  };

  //console.log('completeUser body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('tile update error');
      //console.log('response: ', response);
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('tile correct artist updated');
      return camelcaseKeys(jsonResponse.tile);
      //return jsonResponse.tile;
    });
  });
}

Bingo.wrongSubmission = tile => {
  const url = `${baseUrl}/tiles/${tile.id}/wrong`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tile: tile})
  };

  //console.log('completeUser body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('tile wrong update error');
      //console.log('response: ', response);
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('tile wrong updated');
      return camelcaseKeys(jsonResponse.tile);
      //return jsonResponse.tile;
    });
  });
}

Bingo.resetUser = user => {
  const url = `${baseUrl}/users/${user.id}/reset`;
  //console.log('url: ', url);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: user})
  };

  //console.log('completeUser body: ', fetchOptions.body);
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      console.log('user reset error');
      //console.log('response: ', response);
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('user reset');
      return camelcaseKeys(jsonResponse.user);
    });
  });
};

Bingo.resetCard = card => {
  const url = `${baseUrl}/cards/reset`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

Bingo.resetTile = tile => {
  const url = `${baseUrl}/tiles/reset`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

export default Bingo;
