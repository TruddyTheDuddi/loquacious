/**
 * Full AJAX request with specified caught xhttp changes
 * @param {FormData} dataToSend A full FormData with all info needed
 * @param {string} URL Path to the file (currently not absolute)
 * @param {object} objectToChange Object to pass for the onSuccess if not null, else immediate change
 * @param {function} onSuccess Function to be called when request over
 * @param {function} onProgress Function to be called when event progress is triggered
 * @param {function} onError Function to be called when event progress is triggered
 */
function ajaxLoader(dataToSend, URL, objectToChange, onSuccess, onProgress, onError){
    var xhttp = new XMLHttpRequest();

    console.log("oof");

    xhttp.onreadystatechange = function(){ 
        if (this.readyState == 4 && this.status == 200) {

            if(onSuccess !== null) {
                onSuccess(objectToChange, xhttp.responseText);
            } else {
                objectToChange.innerHTML = xhttp.responseText;
            }

        }
    }

    // Setting fuctions for each case
    if(onError !== null)
        xhttp.addEventListener("error", onError);

    if(onProgress !== null)
        xhttp.addEventListener("progress", onProgress);

    xhttp.open("POST", URL);
    xhttp.send(dataToSend);

    //return xhttp;
}


function ajaxOnlyButtom(t, URL){
    t.disabled = "true";
    var boxHolder = t.closest("#buttonParent"); // Select the module box

    var dataToSend = new FormData();
    boxHolder.querySelector("#output").innerHTML = "Loading... Please wait";

    ajaxLoader(dataToSend, URL, boxHolder.querySelector("#output"), null, null, null);
}

function oneInputOutputAjax(t, URL){
    t.disabled = "true";
    var parentBox = t.closest("#oneInputParent"); // Select the module box

    var input = encodeURIComponent(parentBox.querySelector("#input").value.trim()); // Encodes data

    var dataToSend = new FormData();
    dataToSend.append("input", input);

}

