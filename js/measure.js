/* For navigating between pages */
document.getElementById("size").addEventListener("click", size);
document.getElementById("popup").addEventListener("click", home);

function size () {
    window.location.href = "size.html"
}

function home () {
    window.location.href = "popup.html"
}

/* Display Slider Value */
document.getElementById("bustSlider").oninput = function () {
    document.getElementById("bust-value").innerHTML = document.getElementById("bustSlider").value;
    localStorage.setItem("bust", document.getElementById("bustSlider").value);
}
document.getElementById("neckSlider").oninput = function () {
    document.getElementById("neck-value").innerHTML = document.getElementById("neckSlider").value;
    localStorage.setItem("neck", document.getElementById("neckSlider").value);
}
document.getElementById("waistSlider").oninput = function () {
    document.getElementById("waist-value").innerHTML = document.getElementById("waistSlider").value;
    localStorage.setItem("waist", document.getElementById("waistSlider").value);
}
document.getElementById("hipSlider").oninput = function () {
    document.getElementById("hip-value").innerHTML = document.getElementById("hipSlider").value;
    localStorage.setItem("hip", document.getElementById("hipSlider").value);
}

document.getElementById("armSlider").oninput = function () {
    document.getElementById("arm-value").innerHTML = document.getElementById("armSlider").value;
    localStorage.setItem("arm", document.getElementById("armSlider").value);
}

document.getElementById("legSlider").oninput = function () {
    document.getElementById("leg-value").innerHTML = document.getElementById("legSlider").value;
    localStorage.setItem("leg", document.getElementById("legSlider").value);
}

/* THE DIFFERENT MEASURES WE TAKE! */
var measures = ["bust", "neck", "waist", "hip", "arm", "leg"]

/* Switch between IN/CM and fetch stored values */
document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
    if(localStorage.getItem("unit") == "in"){
        checkbox.checked = true;
        for (let i = 0; i < measures.length; i++) {
            var slider = measures[i]+"Slider";
            var value = measures[i]+"-value";
            document.getElementById(slider).setAttribute("max", Math.round(150/2.54));
            if(localStorage.getItem(measures[i]) != null || localStorage.getItem(measures[i]) != 0){
                document.getElementById(slider).value = localStorage.getItem(measures[i]);
                document.getElementById(value).innerHTML = localStorage.getItem(measures[i]);
            }
        }
    }
    else{
        for (let i = 0; i < measures.length; i++) {
            var slider = measures[i]+"Slider";
            var value = measures[i]+"-value";
            document.getElementById(slider).setAttribute("max", 150);
            if(localStorage.getItem(measures[i]) != null || localStorage.getItem(measures[i]) != 0){
                document.getElementById(slider).value = localStorage.getItem(measures[i]);
                document.getElementById(value).innerHTML = localStorage.getItem(measures[i]);
            }
        }
    }

    checkbox.addEventListener('change', function () {
        for (let i = 0; i < measures.length; i++) {
            var slider = measures[i]+"Slider";
            var value = measures[i]+"-value";
            var max = document.getElementById(slider).getAttribute("max");
            var value2 = document.getElementById(value).innerHTML;
            if (checkbox.checked) {
                document.getElementById(slider).setAttribute("max", Math.round(max/2.54));
                document.getElementById(value).innerHTML = Math.round(value2/2.54);
                localStorage.setItem(measures[i], Math.round(value2/2.54))
                localStorage.setItem("unit", "in");
                console.log('Checked');
            } else {
                document.getElementById(slider).setAttribute("max", Math.round(max*2.54));
                document.getElementById(value).innerHTML = Math.round(value2*2.54);
                localStorage.setItem(measures[i], Math.round(value2*2.54))
                localStorage.setItem("unit", "cm");
                console.log('Not checked');
            }
        }
      
    });
});