class SearchEngineContent {
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
    var text = document.createElement("div");
    text.style.color = "red";
    text.classList.add("top-right-d");

    position == 0 ? (text.innerHTML += "-") : (text.innerHTML += position);
    div.appendChild(text);
    return div;
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
      relleno.classList.add("col-sm-8");
      divrow.appendChild(relleno);

      divrow.appendChild(this.createIcon(args[2], existOne));
      divrow.appendChild(this.createIcon(args[3], existTwo));

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
}
class BingEngineContent extends SearchEngineContent {
  getOrganicElement(result) {
    return result.firstChild.firstChild;
  }
  getResultUrl(result) {
    return result.firstChild.firstChild.getAttribute("href");
  }
}
class DuckDuckGoEngineContent extends SearchEngineContent {
  getOrganicElement(result) {
    return result.childNodes[3];
  }
  getResultUrl(result) {
    return result.childNodes[3].childNodes[1].getAttribute("href");
  }
}

class Result {
  consultarSitio() {
    return document.location["origin"];
  }

  addIcons(args) {
    var engineContent;
    if (args[4] == "rc") {
      engineContent = new GoogleEngineContent();
    } else {
      if (args[4] == "b_algo") {
        engineContent = new BingEngineContent();
      } else {
        engineContent = new DuckDuckGoEngineContent();
      }
    }
    console.log("argumentos: ", args);
    engineContent.addIconsForResults(args);
  }

  engineResults(args) {
    console.log("Llego el peer: ", args.peer);
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
