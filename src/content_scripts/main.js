class SearchEngineContent {
  peerHeight = "60px";
  peerWidth = "60px";
  marginTop = "17px";
  fontSize = "100%";
  peersCompare = [];
  constructor() {
    if (this.constructor == SearchEngineContent) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  createIcon(srcImage, position) {
    var img = document.createElement("img");
    img.src = srcImage;
    img.style.height = "25px";
    img.style.width = "25px";
    var div = document.createElement("div");
    div.classList.add("col-sm-2");
    div.classList.add("container");
    div.appendChild(img);
    div.style.marginTop = "20px";
    var text = document.createElement("div");
    text.style.color = "red";
    text.classList.add("top-right-d");

    position == 0 ? (text.innerHTML += "-") : (text.innerHTML += position);
    div.appendChild(text);
    return div;
  }

  createPeersIcon() {
    var elementInsideSpan1 = document.createElement("span");
    elementInsideSpan1.textContent = "0";
    elementInsideSpan1.className = "result";
    var elementInsideSpan2 = document.createElement("span");
    elementInsideSpan2.textContent = " de ";
    var elementInsideSpan3 = document.createElement("span");
    elementInsideSpan3.textContent = "0";
    elementInsideSpan3.className = "peers"
    var divSpan = document.createElement("div");
    divSpan.style.marginTop = this.marginTop;
    divSpan.style.color = "#000";
    divSpan.appendChild(elementInsideSpan1);
    divSpan.appendChild(elementInsideSpan2);
    divSpan.appendChild(elementInsideSpan3);
    var span = document.createElement("span");
    span.style.backgroundColor = "#FFF";
    span.style.height = this.peerHeight;
    span.style.width = this.peerWidth;
    span.style.fontSize = this.fontSize;
    span.style.borderStyle = "solid";
    span.style.borderColor = "#000";
    span.style.borderRadius = "50%";
    span.style.display = "inline-block";
    span.appendChild(divSpan);
    var div = document.createElement("div");
    div.classList.add("col-sm-2");
    div.classList.add("container");
    div.appendChild(span);

    return div;
  }

  existsResult(result, element) {
    var exist = false;
    var compare = this.getResultUrl(element);
    if (compare) {
      compare = compare.split("https://").join("");
      compare = compare.split("http://").join("").trim();
    }
    if (result) {
      result = result.split("https://").join("");
      result = result.split("http://").join("").trim();
    }
    if ((result || compare) && result == compare) {
      exist = true;
    }
    return exist;
  }
  incrementPeerResult(args) {
    var results = document.getElementsByClassName(args.className);
    for (var i = 0; i < results.length; i++) {
      this.incrementPeers(results[i], "peers");
      console.log("EN EL HTML: ", this.getResultUrl(results[i]));
      var compare = this.getResultUrl(results[i]).split("https://").join("");
      compare = compare.split("http://").join("").trim();
      for (var key in args.results) {
        var peerCompare = args.results[key].split("https://").join("");
        peerCompare = peerCompare.split("http://").join("").trim();
        if (peerCompare == compare) {
          console.log("COINCIDE");
          this.incrementPeers(results[i], "result");
        }
      }
    }
  }

  takeResultPosition(results, element) {
    var position = 0;
    var exist = 0;
    for (var key in results) {
      console.log(this.getResultUrl(element));
      var compare = this.getResultUrl(element);
      if (compare) {
        compare = compare.split("https://").join("");
        compare = compare.split("http://").join("").trim();
      }
      var keyCompare = results[key];
      if (keyCompare) {
        keyCompare = keyCompare.split("https://").join("");
        keyCompare = keyCompare.split("http://").join("").trim();
      }
      position = position + 1;
      if ((keyCompare || compare) && keyCompare == compare) {
        exist = position;
      }
    }
    return exist;
  }

  addIconsForResults(args) {
    var results = document.getElementsByClassName(args[4]);
    for (var i = 0; i < results.length; i++) {
      var existOne = this.takeResultPosition(args[0], results[i]);
      var existTwo = this.takeResultPosition(args[1], results[i]);
      var divrow = document.createElement("div");
      divrow.classList.add("row");

      var relleno = document.createElement("div");
      relleno.classList.add("col-sm-6");
      divrow.appendChild(relleno);

      divrow.appendChild(this.createIcon(args[2], existOne));
      divrow.appendChild(this.createIcon(args[3], existTwo));
      divrow.appendChild(this.createPeersIcon(args[5]));

      var divcon = document.createElement("div");
      divcon.classList.add("container");
      divcon.appendChild(divrow);
      this.getOrganicElement(results[i]).appendChild(divcon);
    }
  }
}
class GoogleEngineContent extends SearchEngineContent {
  getOrganicElement(result) {
    return result.firstChild;
  }
  getResultUrl(result) {
    return result.firstChild.firstChild.getAttribute("href");
  }
  incrementPeers(result, className) {
    var spanVariable = result.firstChild.lastChild.getElementsByClassName(
      className
    )[0].textContent;
    spanVariable = (parseInt(spanVariable) + 1).toString();
    result.firstChild.lastChild.getElementsByClassName(
      className
    )[0].textContent = spanVariable;
  }
}
class BingEngineContent extends SearchEngineContent {
  peerHeight = "90px";
  peerWidth = "90px";
  marginTop = "27px";
  fontSize = "80%";

  getOrganicElement(domElement) {
    if (domElement.firstChild.firstChild.tagName == 'H2') {
      return domElement.firstChild.firstChild.firstChild;
    }
    return domElement.firstChild.firstChild;
  }
  getResultUrl(domElement) {
    if (domElement.firstChild.firstChild.tagName == 'H2') {
      return domElement.firstChild.firstChild.firstChild.getAttribute("href");
    }
    return domElement.firstChild.firstChild.getAttribute("href");
  }
  incrementPeers(result, className) {
    var spanVariable = result.firstChild.firstChild.getElementsByClassName(
      className
    )[0].textContent;
    spanVariable = (parseInt(spanVariable) + 1).toString();
    result.firstChild.firstChild.getElementsByClassName(
      className
    )[0].textContent = spanVariable;
  }
}
class DuckDuckGoEngineContent extends SearchEngineContent {
  getOrganicElement(result) {
    return result.childNodes[3];
  }
  getResultUrl(result) {
    return result.childNodes[3].childNodes[1].getAttribute("href");
  }
  incrementPeers(result, className) {
    var spanVariable = result.childNodes[3].getElementsByClassName(className)[0]
      .textContent;
    console.log(spanVariable);
    spanVariable = (parseInt(spanVariable) + 1).toString();
    result.childNodes[3].getElementsByClassName(
      className
    )[0].textContent = spanVariable;
  }
}

class Result {
  engineContent;

  consultarSitio() {
    return document.location["origin"];
  }

  addIcons(args) {
    if (args[4] == "rc") {
      this.engineContent = new GoogleEngineContent();
    } else {
      if (args[4] == "b_algo") {
        this.engineContent = new BingEngineContent();
      } else {
        this.engineContent = new DuckDuckGoEngineContent();
      }
    }
    console.log("argumentos: ", args);
    this.engineContent.addIconsForResults(args);
  }

  engineResults(args) {
    console.log("Llego el peer: ", args);
    this.engineContent.incrementPeerResult(args);
  }

  getString(sitio) {
    return document.getElementsByClassName(sitio)[0].getAttribute("value");
  }

  giveStringBack() {
    var sitio = pageManager.consultarSitio();
    if (sitio == "https://www.bing.com") {
      var data = document
        .getElementsByClassName("b_searchbox")[0]
        .getAttribute("value");
    } else if (sitio == "https://www.google.com") {
      var data = document
        .getElementsByClassName("gLFyf")[0]
        .getAttribute("value");
    } else {
      var data = document
        .getElementsByClassName("search__input")[0]
        .getAttribute("value");
    }
    browser.runtime.sendMessage({
      call: "popUpResults",
      args: data,
    });
  }
}

var pageManager = new Result();
var sitio = pageManager.consultarSitio();
if (sitio == "https://www.bing.com") {
  var busca = pageManager.getString("b_searchbox");
  browser.runtime.sendMessage({
    call: "retrieveSearchResults",
    args: [busca, "BingEngine"],
  });
} else if (sitio == "https://www.google.com") {
  var busca = pageManager.getString("gLFyf");
  browser.runtime.sendMessage({
    call: "retrieveSearchResults",
    args: [busca, "GoogleEngine"],
  });
} else {
  if (document.location == "https://duckduckgo.com/html/") {
    var busca = pageManager.getString("search__input");
    browser.runtime.sendMessage({
      call: "retrieveSearchResults",
      args: [busca, "DuckDuckGoEngine"],
    });
  } else {
    document.location.replace("https://duckduckgo.com/html/");
  }
}

//Listening for background's messages
browser.runtime.onMessage.addListener((request, sender) => {
  console.log("[content-side] calling the message: " + request.call);
  if (pageManager[request.call]) {
    pageManager[request.call](request.args);
  }
});