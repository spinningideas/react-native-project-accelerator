/*
	Encapsulates all outbound http communication from the application to get/set data
	and forms	the basic building block and adaptor for http requests made by the application.
	Also provides way to set auth headers needed by some requests
*/
const HttpClient = () => {
  const fetchResponseHandler = (response) => {
    // Wraps fetch response and traps most errors and returns raw response as well.
    // Ensures consisten response in form of:
    // {data: [PAYLOADRETURNED_MAY_BE_JSON], code: response.status, response: response }
    if (response.ok) {
      return response
        .json()
        .then((json) => {
          // the status was ok and there is a json body
          return Promise.resolve({ data: json, code: response.status, response: response });
        })
        .catch((err) => {
          // the status was ok but there is no json body
          return Promise.resolve({ data: response, code: response.status, response: response });
        });
    } else {
      return response
        .json()
        .catch((err) => {
          // the status was not ok and there is no json body
          return Promise.resolve({ data: response.statusText, code: response.status, response: response });
        })
        .then((json) => {
          // the status was not ok but there is a json body
          return Promise.resolve({ data: json.error.message, code: response.status, response: response });
        });
    }
  };

  // Modern fetch based methods to put into full use
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const getDataAuthenticated = async (url, token) => {
    return await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      return fetchResponseHandler(response);
    });
  };

  const getData = async (url) => {
    return await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => {
      return fetchResponseHandler(response);
    });
  };

  const postData = async (url, data = {}, token) => {
    let postHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    if (token && token.length) {
      postHeaders['Authorization'] = 'Bearer ' + token;
    }
    return await fetch(url, {
      method: 'POST',
      headers: postHeaders,
      body: JSON.stringify(data)
    }).then((response) => {
      return fetchResponseHandler(response);
    });
  };

  return {
    getData,
    getDataAuthenticated,
    postData
  };
};

export default HttpClient;
