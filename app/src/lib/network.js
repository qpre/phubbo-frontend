export function getJSON(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('get', url, true);
    xhr.onreadystatechange = () => {
      let status;
      let data = {};

      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;
        if (status == 200) {
          try {
            data = JSON.parse(xhr.responseText);
          } catch (e) {
            data = {};
          }

          resolve && resolve(data);
        } else {
          reject && reject(status);
        }
      }
    };

    xhr.send();
  });
}

export function post(url, raw) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('post', url, true);
    xhr.onreadystatechange = () => {
      let status;
      let data;

      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;

        try {
          data = JSON.parse(xhr.responseText);
        } catch (e) {
          data = {};
        }

        let response = {
          status,
          data,
        };

        if (status == 200) {
          resolve && resolve(response);
        } else {
          reject && reject(response);
        }
      }
    };

    if (raw) {
      raw = JSON.stringify(raw);
    }

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(raw);
  });
}
