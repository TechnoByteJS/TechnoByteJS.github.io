// Project JS apiLoader ver 1.3
apiLoader = {
    version: "1.3",
    host: "/jsappapi/",
    defaultApi: "2.4"
};

const loadScript = src => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = resolve
      script.onerror = reject
      script.src = src
      document.head.append(script)
    })
}

if(!localStorage.allowCustomApi) {
    localStorage.allowCustomApi="false";
}
if(localStorage.allowCustomApi=="true") {
    if(!localStorage.apiName) {
        localStorage.apiName=apiLoader.defaultApi;
    }
    if(!localStorage.apiHost) {
        localStorage.apiHost=apiLoader.host;
    } else {
        apiLoader.host = localStorage.apiHost;
    }
} else {
    localStorage.removeItem("apiName");
    localStorage.removeItem("apiHost");
}

loadScript('/lib/jquery-3.6.0.min.js')
  .then(() => loadScript('/lib/jquery-ui.min.js'))
  .then(() => {
    if(localStorage.allowCustomApi=="true") {
        $('head').append('<script src="' + apiLoader.host + localStorage.apiName + '/main.js"></script>');
        console.warn("Custom API is enabled.")
    } else {
        $('head').append('<script src="' + apiLoader.host + apiLoader.defaultApi + '/main.js"></script>');
    }
  })
  .catch(() => alert('Something went wrong.'))

// Fix launcher spelling mistake
if (localStorage.getItem("laucher") !== null) {
    localStorage.launcher = localStorage.laucher;
    localStorage.removeItem("laucher");
}