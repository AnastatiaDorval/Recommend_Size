document.getElementById("popup").addEventListener("click", home);
document.getElementById("measure").addEventListener("click", measure);

function home () {
    window.location.href = "popup.html"
}

function measure () {
    window.location.href = "measure.html"
}

/* List of Stores */
var stores = ["gap", "h&m", "zara", "uniqlo"];
var stores_selected = [];

/* Displaying Items Based on what we check */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof(localStorage.getItem("stores_selected")) != undefined){
        var selected_stores = localStorage.getItem("stores_selected").split(",");
    }
    else {
        var selected_stores = [];
    }
    for (let i = 0; i < selected_stores.length; i++){
        var checkbox = document.getElementById(selected_stores[i]);
        checkbox.checked = true;
        stores_selected.push(selected_stores[i]);
    }
    //adding and remvoing stores from stores_selected
    document.getElementById("gap").addEventListener('change', function () {
        if (document.getElementById("gap").checked){
            stores_selected.push("gap");
            localStorage.setItem("stores_selected", stores_selected);
        } else {
            for (let i = 0; i < stores_selected.length; i++){
                if (stores_selected[i] == "gap"){
                    stores_selected.splice(i, 1);
                }
            }
            localStorage.setItem("stores_selected", stores_selected);
        }
    });
    document.getElementById("h&m").addEventListener('change', function () {
        if (document.getElementById("h&m").checked){
            stores_selected.push("h&m");
            localStorage.setItem("stores_selected", stores_selected);
        } else {
            for (let i = 0; i < stores_selected.length; i++){
                if (stores_selected[i] == "h&m"){
                    stores_selected.splice(i, 1);
                }
            }
            localStorage.setItem("stores_selected", stores_selected);
        }
    });
    document.getElementById("zara").addEventListener('change', function () {
        if (document.getElementById("zara").checked){
            stores_selected.push("zara");
            localStorage.setItem("stores_selected", stores_selected);
        } else {
            for (let i = 0; i < stores_selected.length; i++){
                if (stores_selected[i] == "zara"){
                    stores_selected.splice(i, 1);
                }
            }
            localStorage.setItem("stores_selected", stores_selected);
        }
    });
    document.getElementById("uniqlo").addEventListener('change', function () {
        if (document.getElementById("uniqlo").checked){
            stores_selected.push("uniqlo");
            localStorage.setItem("stores_selected", stores_selected);
        } else {
            for (let i = 0; i < stores_selected.length; i++){
                if (stores_selected[i] == "uniqlo"){
                    stores_selected.splice(i, 1);
                }
            }
            localStorage.setItem("stores_selected", stores_selected);
        }
    });
    
    //adding functionality to next and back buttons
    var next = document.getElementById("next");
    var back = document.getElementById("back");
    next.addEventListener('click', function () {
        //hide next button
        next.style.visibility = "hidden";
        document.getElementById("selected").style.visibility = "visible";
        for (let i = 0; i < stores.length; i++) {
            //hiding checkboxes and labels for all stores
            var checkbox = document.getElementById(stores[i]);
            var label = document.getElementById(stores[i]+"-label");
            checkbox.style.visibility = "hidden";
            label.style.visibility = "hidden";
            if(stores_selected.includes(stores[i])){
                var store = stores[i];
                console.log("Changing: "+store);
                //displaying selected store questions
                document.getElementById(store+"-selected").style.visibility = "visible";
                document.getElementById(store+"-shirt-label").style.visibility = "visible";
                var select_shirt = document.getElementById(store+"-shirt");
                select_shirt.style.visibility = "visible";
                document.getElementById(store+"-pants-label").style.visibility = "visible";
                var select_pants = document.getElementById(store+"-pants");
                select_pants.style.visibility = "visible";
                //displaying selected store question options
                var shirt_options = document.getElementsByClassName(store+"-shirt-option");
                for (let j = 0; j < shirt_options.length; j++){
                    if(localStorage.getItem(store+"-shirt-size") == shirt_options.item(j).textContent){
                        shirt_options.item(j).selected = true;
                    }
                    shirt_options.item(j).style.visibility = "visible";
                }
                var pants_options = document.getElementsByClassName(store+"-pants-option");
                for (let j = 0; j < pants_options.length; j++){
                    if(pants_options.item(j).textContent == localStorage.getItem(store+"-pants-size")){
                        pants_options.item(j).selected = true;
                    }
                    pants_options.item(j).style.visibility = "visible";
                }
            }
        }
        //displaying back button
        back.style.visibility = "visible";
    });

    back.addEventListener('click', function() {
        //redisplaying next button
        next.style.visibility = "visible";
        document.getElementById("selected").style.visibility = "hidden";
        for (let i = 0; i < stores.length; i++) {
            //redisplaying checkboxes and labels
            var checkbox = document.getElementById(stores[i]);
            var label = document.getElementById(stores[i]+"-label");
            checkbox.style.visibility = "visible";
            label.style.visibility = "visible";
            //hiding questions for stores that were selected
            if(stores_selected.includes(stores[i])){ 
                document.getElementById(stores[i]+"-selected").style.visibility = "hidden";
                document.getElementById(stores[i]+"-shirt-label").style.visibility = "hidden";
                document.getElementById(stores[i]+"-shirt").style.visibility = "hidden";
                document.getElementById(stores[i]+"-pants-label").style.visibility = "hidden";
                document.getElementById(stores[i]+"-pants").style.visibility = "hidden";
                //hiding each option in the question
                const shirt_options = document.getElementsByClassName(stores[i]+"-shirt-option");
                for (let j = 0; j < shirt_options.length; j++){ 
                    shirt_options.item(j).style.visibility = "hidden";
                }
                const pants_options = document.getElementsByClassName(stores[i]+"-pants-option");
                for (let j = 0; j < pants_options.length; j++){
                    pants_options.item(j).style.visibility = "hidden";
                }
            }
        }
        //hiding back button
        back.style.visibility = "hidden";
    });

    //saving the sizes that are selected
    document.getElementById("gap-shirt").addEventListener('change', function () {
        const shirt_options = document.getElementsByClassName("gap-shirt-option");
        var name = "gap-shirt-size";
        for (let k = 0; k < shirt_options.length; k++){
            //save selected option
            if(shirt_options.item(k).selected){
                localStorage.setItem(name, shirt_options.item(k).textContent);
            }
        } 
    });
    document.getElementById("gap-pants").addEventListener('change', function () {
        const pants_options = document.getElementsByClassName("gap-pants-option");
        var name = "gap-pants-size";
        for (let k = 0; k < pants_options.length; k++){
            //save selected option
            if(pants_options.item(k).selected){
                localStorage.setItem(name, pants_options.item(k).textContent);
            }
        }
    });
    document.getElementById("h&m-shirt").addEventListener('change', function () {
        const shirt_options = document.getElementsByClassName("h&m-shirt-option");
        var name = "h&m-shirt-size";
        for (let k = 0; k < shirt_options.length; k++){
            //save selected option
            if(shirt_options.item(k).selected){
                localStorage.setItem(name, shirt_options.item(k).textContent);
            }
        } 
    });
    document.getElementById("h&m-pants").addEventListener('change', function () {
        const pants_options = document.getElementsByClassName("h&m-pants-option");
        var name = "h&m-pants-size";
        for (let k = 0; k < pants_options.length; k++){
            //save selected option
            if(pants_options.item(k).selected){
                localStorage.setItem(name, pants_options.item(k).textContent);
            }
        }
    });
    document.getElementById("zara-shirt").addEventListener('change', function () {
        const shirt_options = document.getElementsByClassName("zara-shirt-option");
        var name = "zara-shirt-size";
        for (let k = 0; k < shirt_options.length; k++){
            //save selected option
            if(shirt_options.item(k).selected){
                localStorage.setItem(name, shirt_options.item(k).textContent);
            }
        } 
    });
    document.getElementById("zara-pants").addEventListener('change', function () {
        const pants_options = document.getElementsByClassName("zara-pants-option");
        var name = "zara-pants-size";
        for (let k = 0; k < pants_options.length; k++){
            //save selected option
            if(pants_options.item(k).selected){
                localStorage.setItem(name, pants_options.item(k).textContent);
            }
        }
    });
    document.getElementById("uniqlo-shirt").addEventListener('change', function () {
        const shirt_options = document.getElementsByClassName("uniqlo-shirt-option");
        var name = "uniqlo-shirt-size";
        for (let k = 0; k < shirt_options.length; k++){
            //save selected option
            if(shirt_options.item(k).selected){
                localStorage.setItem(name, shirt_options.item(k).textContent);
            }
        }
    });
    document.getElementById("uniqlo-pants").addEventListener('change', function () {
        const pants_options = document.getElementsByClassName("uniqlo-pants-option");
        var name = "uniqlo-pants-size";
        for (let k = 0; k < pants_options.length; k++){
            //save selected option
            if(pants_options.item(k).selected){
                localStorage.setItem(name, pants_options.item(k).textContent);
            }
        }
    });
});