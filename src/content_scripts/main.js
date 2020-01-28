class Result {
    consultarSitio() {
        console.log('Te encuentras en:', document.location['origin']);
        //document.querySelector("body").style["background-color"] = "yellow";
        //var div = this.createContainer("300px", window.innerHeight + "px", (window.innerWidth - 300) + "px", "0px");
        //document.body.appendChild(div);
        //console.log($('nav').children())
        return document.location['origin'];
    }

    retrieveSearch(res){
        console.log(res);
    }

    addIcons(im1, im2, elem){
        var resultados = document.getElementsByClassName(elem);
        for (var i=0; i < resultados.length; i++){
            if (elem == "result__body"){
                var res = resultados[i].childNodes[3];

                var img1 = document.createElement("img");
                img1.src = im1;
                img1.style.height = '25px';
                img1.style.width = '25px';
                var div1 = document.createElement("div");
                div1.classList.add("col-sm-2");
                div1.classList.add("container");
                div1.appendChild(img1);
                var tex1 = document.createElement("div");
                tex1.style.color = 'red';
                tex1.classList.add("top-right-d");
                tex1.innerHTML+="11";
                div1.appendChild(tex1);
                //res.appendChild(div1);

                var img2 = document.createElement("img");
                img2.src = im2;
                img2.style.height = '25px';
                img2.style.width = '25px';
                var div2 = document.createElement("div");
                div2.classList.add("col-sm-2");
                div2.classList.add("container");
                div2.appendChild(img2);
                var tex2 = document.createElement("div");
                tex2.style.color = 'red';
                tex2.classList.add("top-right-d");
                tex2.innerHTML+="22";
                div2.appendChild(tex2);
                //res.appendChild(div2);

                var divrow = document.createElement("div");
                divrow.classList.add("row");

                var relleno = document.createElement("div");
                relleno.classList.add("col-sm-8");
                divrow.appendChild(relleno);

                divrow.appendChild(div1);
                divrow.appendChild(div2);

                var divcon = document.createElement("div");
                divcon.classList.add("container");
                divcon.appendChild(divrow);

                res.appendChild(divcon);

            } else if (elem == "rc") {
                var res = resultados[i].firstChild;

                var img1 = document.createElement("img");
                img1.src = im1;
                img1.style.height = '30px';
                img1.style.width = '30px';
                var div1 = document.createElement("div");
                div1.classList.add("col-sm-2");
                div1.classList.add("container");
                div1.appendChild(img1);
                var tex1 = document.createElement("div");
                tex1.style.color = 'red';
                tex1.style.fontSize = 'large';
                tex1.classList.add("top-right-g");
                tex1.innerHTML+="11";
                div1.appendChild(tex1);
                //res.appendChild(div1);

                var img2 = document.createElement("img");
                img2.src = im2;
                img2.style.height = '25px';
                img2.style.width = '25px';
                var div2 = document.createElement("div");
                div2.classList.add("col-sm-2");
                div2.classList.add("container");
                div2.appendChild(img2);
                var tex2 = document.createElement("div");
                tex2.style.color = 'red';
                tex2.style.fontSize = 'large';
                tex2.classList.add("top-right-g");
                tex2.innerHTML+="22";
                div2.appendChild(tex2);
                //res.appendChild(div2);

                var divrow = document.createElement("div");
                divrow.classList.add("row");

                var relleno = document.createElement("div");
                relleno.classList.add("col-sm-8");
                divrow.appendChild(relleno);

                divrow.appendChild(div1);
                divrow.appendChild(div2);

                var divcon = document.createElement("div");
                divcon.classList.add("container");
                divcon.appendChild(divrow);

                res.appendChild(divcon);

            } else {
                var res = resultados[i].firstChild.firstChild;

                var img1 = document.createElement("img");
                img1.src = im1;
                img1.style.height = '30px';
                img1.style.width = '30px';
                var div1 = document.createElement("div");
                div1.classList.add("col-sm-2");
                div1.classList.add("container");
                div1.appendChild(img1);
                var tex1 = document.createElement("div");
                tex1.style.color = 'red';
                tex1.classList.add("top-right-b");
                tex1.innerHTML+="11";
                div1.appendChild(tex1);
                //res.appendChild(div1);

                var img2 = document.createElement("img");
                img2.src = im2;
                img2.style.height = '28px';
                img2.style.width = '28px';
                var div2 = document.createElement("div");
                div2.classList.add("col-sm-2");
                div2.classList.add("container");
                div2.appendChild(img2);
                var tex2 = document.createElement("div");
                tex2.style.color = 'red';
                tex2.classList.add("top-right-b");
                tex2.innerHTML+="22";
                div2.appendChild(tex2);
                //res.appendChild(div2);

                var divrow = document.createElement("div");
                divrow.classList.add("row");

                var relleno = document.createElement("div");
                relleno.classList.add("col-sm-8");
                divrow.appendChild(relleno);

                divrow.appendChild(div1);
                divrow.appendChild(div2);

                var divcon = document.createElement("div");
                divcon.classList.add("container");
                divcon.appendChild(divrow);

                res.appendChild(divcon);
            }

        }
        console.log(resultados);
    }

    createContainer(width, height, left, top) {
        var div = document.createElement("div");
        div.style.width = width;
        div.style.height = height;
        div.style.position = "fixed";
        div.style.background = "white";
        div.style.top = top;
        div.style.left = left;
        div.style.zIndex = this.getMaxZindex() + 1;

        div.onclick = function () {
            this.remove();
        }
        return div;
    }
    getMaxZindex() {
        return Array.from(document.querySelectorAll('body *'))
            .map(a => parseFloat(window.getComputedStyle(a).zIndex))
            .filter(a => !isNaN(a)).sort().pop();
    }
}

var pageManager = new Result();

//Listening for background's messages
browser.runtime.onMessage.addListener((request, sender) => {
    console.log("[content-side] calling the message: " + request.call);
    if (pageManager[request.call]) {
        pageManager[request.call](request.args);
    }
});