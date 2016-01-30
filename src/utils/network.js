export function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', url, true);
    xhr.onreadystatechange = () => {
      let status;
      let data = {};

      if (xhr.readyState === 4) { // `DONE`
        status = xhr.status;
        if (status === 200) {
          try {
            data = JSON.parse(xhr.responseText);
          } catch (e) {
            data = {};
          }

          if (resolve) resolve(data);
        } else {
          if (reject) reject(status);
        }
      }
    };

    xhr.send();
  });
}

export function post(url, dataObj = null) {
  let dataStr = '';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('post', url, true);
    xhr.onreadystatechange = () => {
      let status;
      let data;

      if (xhr.readyState === 4) { // `DONE`
        status = xhr.status;

        try {
          data = JSON.parse(xhr.responseText);
        } catch (e) {
          data = {};
        }

        const response = {
          status,
          data,
        };

        if (status === 200) {
          if (resolve) resolve(response);
        } else {
          if (reject) reject(response);
        }
      }
    };

    if (dataObj) {
      dataStr = JSON.stringify(dataObj);
    }

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(dataStr);
  });
}
