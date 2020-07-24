class PopUp {
  peers = 0;
  peersActuales = 0;
  apariciones = {
    google: [0, 0, 0, 0, 0],
    bing: [0, 0, 0, 0, 0],
    duckDuckGo: [0, 0, 0, 0, 0],
  };
  cantApariciones = {
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
        var elementInsideDiv1 = document.createElement("span");
        elementInsideDiv1.textContent = " | Posicion promedio: ";
        var elementInsideDiv2 = document.createElement("span");
        elementInsideDiv2.textContent = 0;
        elementInsideDiv2.className = "posicionPromedio";
        var elementInsideDiv3 = document.createElement("span");
        elementInsideDiv3.textContent = " ( ";
        var elementInsideDiv4 = document.createElement("span");
        elementInsideDiv4.textContent = 0;
        elementInsideDiv4.className = "aparicionesPeers";
        var elementInsideDiv5 = document.createElement("span");
        elementInsideDiv5.textContent = " de ";
        var elementInsideDiv6 = document.createElement("span");
        elementInsideDiv6.textContent = 0;
        elementInsideDiv6.className = "peers";
        var elementInsideDiv7 = document.createElement("span");
        elementInsideDiv7.textContent = " ) ";
        p.appendChild(elementInsideDiv1);
        p.appendChild(elementInsideDiv2);
        p.appendChild(elementInsideDiv3);
        p.appendChild(elementInsideDiv4);
        p.appendChild(elementInsideDiv5);
        p.appendChild(elementInsideDiv6);
        p.appendChild(elementInsideDiv7);
        div.appendChild(p);
      }
    }
  }

  popUpResultsPeerContent(args) {
    console.log(args);
  }

  obtengoDatosPeers(args) {
    this.peersActuales += 1;
    this.peers += 1;
    args = args[0];
    var engines = {
      google: 0,
      bing: 1,
      duckDuckGo: 2,
    };
    console.log(args);
    for (var key in args) {
      for (var i = 1; i < 6; i++) {
        if (args[key][i - 1] != 0) {
          this.cantApariciones[key][i - 1] += 1;
        }
        this.apariciones[key][i - 1] =
          this.apariciones[key][i - 1] + args[key][i - 1];
        if (this.cantApariciones[key][i - 1] == 0) {
          var promedio = 0
        } else {
          var promedio = ~~(this.apariciones[key][i - 1] / this.cantApariciones[key][i - 1])
        }
        var div = document.getElementById(i);
        div.getElementsByClassName("peers")[
          engines[key]
        ].textContent = this.peers;
        div.getElementsByClassName("posicionPromedio")[
          engines[key]
        ].textContent = promedio;
        div.getElementsByClassName("aparicionesPeers")[
          engines[key]
        ].textContent = this.cantApariciones[key][i - 1];
      }
    }
  }
}

var pageManager = new PopUp();
chrome.tabs.query({
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