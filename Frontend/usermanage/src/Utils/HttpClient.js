const BASE_URL = "";

function get(endpoint, params) {
  return request(endpoint, params);
}

function post(endpoint, params, maskToken) {
  return request(endpoint, params, maskToken, "POST");
}

function put(endpoint, params, maskToken) {
  return request(endpoint, params, maskToken, "PUT");
}

function Delete(endpoint, params) {
  return request(endpoint, params, null, "DELETE");
}

const formdata = async (url, method, object_get = {}) => {
  const config = {
    method: method,
  };
  let apiUrl = BASE_URL + url;

  const data = new FormData();

  //console.log('object_get', object_get);

  let objArray = Object.keys(object_get);

  objArray.forEach((element) => {
    //console.log('object_get[element]', object_get[element]);
    data.append(element, object_get[element]);
  });
  //console.log('data9999', data);

  if (method != "GET") {
    config["body"] = data;
  }

  return fetch(apiUrl, config).then((response) => response.json());
};
async function request(
  endpoint,
  params = null,
  maskToken = null,
  method = "GET"
) {
  // let token = await AuthService.getToken();
  let url = BASE_URL + endpoint;
  if (maskToken !== null) {
    token = maskToken;
  }
  const config = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // 'Authorization': token
      // 'Access-Control-Allow-Origin': "https://app.omcab.in",
      // 'Authorization': 'Bearer ' + token,
    },
  };

  if (method != "GET") {
    config["body"] = JSON.stringify(params);
  }
  // console.log(url, config);
  return fetch(url, config).then((response) => response.json());
}

async function upload(url, method, file, object_get = {}, tokenCustom = null) {
  //   console.log("File///", file.path);

  let apiUrl = BASE_URL + url;

  let headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    // 'Authorization': token
    // 'Access-Control-Allow-Origin': "https://devcab.herokuapp.com",
    // 'Authorization': 'Bearer ' + login_status,
  };

  // console.log("apiUrl",apiUrl);
  const data = new FormData();
  let get_originalname = await getOriginalname(file.path);
  // console.log('get_originalname', get_originalname);
  data.append("image", {
    uri: file.path,
    type: file.mime,
    name: get_originalname,
  });

  let objArray = Object.keys(object_get);

  objArray.forEach((element) => {
    data.append(element, object_get[element]);
  });

  return fetch(apiUrl, {
    headers,
    method: "post",
    body: data,
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}

async function multiupload(
  url,
  method,
  file,
  object_get = {},
  tokenCustom = null
) {
  let login_status = await AuthService.getToken();
  if (tokenCustom !== null) {
    login_status = tokenCustom;
  }

  let apiUrl = BASE_URL + url;

  let headers = {
    Accept: "application/json",
    Authorization: "Bearer " + login_status,
  };

  let allFile = [];

  const data = new FormData();

  file.forEach((element) => {
    data.append("file", {
      uri: element.url,
      type: "image/jpeg",
      name: "image",
    });
    // allFile.push(element.url);
  });

  return fetch(apiUrl, {
    headers,
    method: "post",
    body: data,
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}

export default {
  get,
  post,
  put,
  Delete,
  formdata,
  upload,
  multiupload,
};
