/* Global Variables */
var measures = ["bust", "neck", "waist", "hip", "arm", "leg"]
var user_measures = {}; //will be stored in chrome.local.storage
var user_unit = localStorage.getItem("unit");
var user_size = "";

/* Navigating between pages */
document.getElementById("size").addEventListener("click", size);
document.getElementById("measure").addEventListener("click", measure);
function size () {
    window.location.href = "size.html";
}
function measure () {
    window.location.href = "measure.html";
}

/* Proving Local Storage Concept */
document.getElementById("unit").innerHTML = user_unit;
for (let i = 0; i < measures.length; i++) {
    if(localStorage.getItem(measures[i]) != null){
        document.getElementById(measures[i]).innerHTML = localStorage.getItem(measures[i]);
        user_measures[measures[i]] = localStorage.getItem(measures[i]);
    }
}

chrome.storage.local.set({ user_measures }, () => {
    console.log(user_measures);
});

chrome.storage.local.get(['user_size'], (result) => {
    user_size = result['user_size'];
    console.log(result);
    console.log("Size Recommendation is: "+user_size);
    document.getElementById("usermeasurement").innerHTML = "Your size recommendation is: "+user_size;
});