class PopUp {
  peers;
  apariciones = {
    google: [0, 0, 0, 0, 0],
    bing: [0, 0, 0, 0, 0],
    duckDuckGo: [0, 0, 0, 0, 0],
  };

  obtengoDatos(args) {
    var engines = {
      0: "Google",
      1: "Bing",
      2: "DuckDuckGo",
    };
    for (var i = 1; i < 6; i++) {
      var div = document.getElementById(i);
      for (var j = 0; j < 3; j++) {
        var a = document.createElement("A");
        a.setAttribute("href", args[j][i - 1]);
        a.setAttribute("target", "_blank");
        a.textContent = i + " resultado de " + engines[j];
        var p = document.createElement("P");
        p.appendChild(a);
        div.appendChild(p);
      }
    }
  }

  popUpResultsPeerContent(args) {
    console.log(args);
  }

  obtengoDatosPeers(args) {
    this.peers = args.peers;
    args = args.result;
    var engines = {
      0: "google",
      1: "bing",
      2: "duckDuckGo",
    };
    for (var key in args) {
      for (var i = 1; j < 6; j++) {
        apariciones[key][i - 1] += 1;
        var valorPromedio = apariciones[key][i - 1] / peers;
        var div = document.getElementById(i);
        div.firstChild.innerHTML =
          "Posición promedio " +
          valorPromedio +
          " (" +
          apariciones[key][i - 1] +
          " de " +
          peers +
          ")";
      }
    }
  }
}

var pageManager = new PopUp();
chrome.tabs.query(
  {
    active: true,
    currentWindow: true,
  },
  function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      call: "giveStringBack",
    });
  }
);

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log("[content-side] calling the message: " + request.call);
  if (pageManager[request.call]) {
    pageManager[request.call](request.args);
  }
});
