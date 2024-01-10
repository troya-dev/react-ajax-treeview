const apiBaseUrl = "https://dummyjson.com/";

const getHeaders = () => {
  const result = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return result;
};

const apiCall = (requestMethod, requestUrl, requestData) => {
  return new Promise((resolve, reject) => {
    fetch(apiBaseUrl + requestUrl, {
      method: requestMethod,
      headers: getHeaders(),
      body: requestData ? JSON.stringify(requestData) : null,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

const api = {
  get: (url) => apiCall("GET", url),

  post: (url, data) => apiCall("POST", url, data),

  put: (url, data) => apiCall("PUT", url, data),

  patch: (url, data) => apiCall("PATCH", url, data),

  delete: (url) => apiCall("GET", url),
};

export default api;
