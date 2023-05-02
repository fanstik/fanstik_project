// function createAjax() {
//     var xhr = null;
//     if (window.XMLHttpRequest) {
//         xhr = new window.XMLHttpRequest();
//     } else {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     return xhr;
// }

// function getValStr(dataObj) {
//     var arr = [];
//     for (var key in dataObj) {
//         arr.push(key + "=" + dataObj[key])
//     }
//     var datas = arr.join("&");
//     return datas;
// }

// function getajax(options) {
//     var xhr = createAjax();

//     if (types == 'get') {

//         xhr.open(options.type, options.url, true);
//         xhr.send(null);
//     } else if (types == "post") {
//         var datas = getValStr(options.data);
//         xhr.open(options.type, options.url, true);
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//         xhr.send(datas);
//     } else {
//         console.log("传输方式错误");
//     }

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var str = JSON.parse(xhr.responseText);
//             console.log(str);
//         }
//     }
// }

function getajax(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error(xhr.statusText));
                // new Error(xhr.statusText)
            }
        }
        xhr.onerror = function () {
            reject(new Error(xhr.statusText))
        }
        xhr.responseType = 'json';
    })
}

function postajax(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.statusText));
            }
        }
        xhr.onerror = function () {
            reject(new Error(xhr.statusText))
        }
        xhr.responseType = 'json';
    })
}
