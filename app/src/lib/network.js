export function getJSON (url) {
  return new Promise((resolve, reject) => {
    let xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open('get', url, true);
    xhr.onreadystatechange = () => {
      let status;
      let data;

      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = JSON.parse(xhr.responseText);
          resolve && resolve(data);
        } else {
          reject && reject(status);
        }
      }
    };
    xhr.send();
  })
}

export function post (url, data) {
  return new Promise((resolve, reject) => {
    let xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open('post', url, true);
    xhr.onreadystatechange = () => {
      let status;
      let data;

      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;

        if (xhr.responseText) {
          data = JSON.parse(xhr.responseText);
        }

        let response = {
          status,
          data
        }

        if (status == 200) {
          resolve && resolve(response);
        } else {
          reject && reject(response);
        }
      }
    };
    xhr.send(data);
  })
}
