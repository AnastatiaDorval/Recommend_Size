/* Navigating between pages */
document.getElementById("size").addEventListener("click", size);
document.getElementById("measure").addEventListener("click", measure);

function size () {
    window.location.href = "size.html";
}

function measure () {
    window.location.href = "measure.html";
}

/* ALL THE MEASURES! */
var measures = ["bust", "neck", "waist", "hip", "arm", "leg"]

/* Proving Local Storage Concept */
document.getElementById("unit").innerHTML = localStorage.getItem("unit");
for (let i = 0; i < measures.length; i++) {
    if(localStorage.getItem(measures[i]) != null){
        document.getElementById(measures[i]).innerHTML = localStorage.getItem(measures[i]);
    }   
}