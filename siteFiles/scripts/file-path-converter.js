
// var exampleWin = "C:\Dan\Arc\Teach\Other\APCSSci\2015\Resoucres\Yr7\"
// escaped/encoded using encodeURIComponent() below 
// path = "C%3A%5CDan%5CArc%5CTeach%5COther%5CAPCSSci%5C2015%5CResoucres%5CYr7%5C"
// var exampleLinux = "/Dan/Arc/Teach/Other/APCSSci/2015/Resoucres/Yr7/" 
// escaped/encoded using encodeURIComponent() below 
// path = "%2FDan%2FArc%2FTeach%2FOther%2FAPCSSci%2F2015%2FResoucres%2FYr7%2F"
// Resources & useful things on the topic: 
// https://www.the-art-of-web.com/javascript/escape/


// ------------ VARS ----------------
const fwdSlash = "%2F"; 
const backSlash = "%5C"; 



// Windows --> Linux file path
function convertPathWindows(path) {
    let newPath = ""; 
    // add mount if needed (otherwise just forward slash on linux)
    if (path.charAt(0) != "C") {
        // EXTERNAL DRIVE - eg linux & windows equivalent: /mnt/d/  and  D:\
        newPath += fwdSlash + "mnt"; 
        // change case of drive letter and add
        newPath += path.charAt(0).toLowerCase(); 
    }
    let skipCharsCounter = 0;
    for (i=4;i<path.length;i++) { // loop starts after Drive letter and %3A = ":" 
        currentChar = path.charAt(i);
        // if not backslash char
        if (currentChar != "%" && path.charAt(i+1) !="5" && path.charAt(i+2) != "C" && skipCharsCounter == 0) {
            // normal char - simply add
            newPath += currentChar;
        }
        // Add slash only once for each of "%5C"
        else if (skipCharsCounter > 0) {  
            skipCharsCounter -= 1; 
        }
        else { 
            skipCharsCounter = 2; // 2 more chars after this one
            newPath += fwdSlash; 
        }
    }
    return newPath; 
}


// Linux --> Windows file path
function convertPathLinux(path) {
    let newPath = "";
    currentChar = "placeholder"
    // swap the slashes (back/forward) 
    if (currentChar =="placeholder") {
        newPath += 'placeholder';
    }
    // otherwise keep char same
    else {
        newPath += currentChar;
    }
    return newPath; 
}

// output new file path
function outputPath(path) {
    // Update output with converted path
    document.getElementById("textOutput").value = decodeURIComponent(path); 
    
    var outputNew = document.getElementById("textOutput").value;
    console.log("Output var outputPath value: " + outputNew);

    // once user has copied data 
    // document.forms[0].reset();  // clear form for next entry 
    // document.querySelector('form').reset(); // alternate clear-form method same as above
}


// Convert the file path
function convertPath(event) { // event passed by event listener click
    event.preventDefault(); // to stop form from submitting
    // Also encodes URI component 
    let path = encodeURIComponent(document.getElementById('textInput').value);
    let newPath = ""
    // Windows --> Linux file path
    if (path.charAt(1) == "%" && path.charAt(2) == "3" && path.charAt(3) == "A" ) { // %3A == ":" 
        newPath = convertPathWindows(path);
        outputPath(newPath); 
    }
    // Linux --> Windows file path
    else if (path.charAt(0) == "%" && path.charAt(1) =="5" && path.charAt(2) == "C") {
        newPath = convertPathLinux(path);
        outputPath(newPath); 
    }
    else {
        // notify use to please enter a valid, full file path 
        // error message 
        console.log("There has been an error.")
    }
}

function copyPath() {

}

// EVENT LISTENERS 
// check for button click to convert 
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buttonInput').addEventListener('click', convertPath);
});


/*
// check for button click to copy converted path text
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buttonOutput').addEventListener('click', copyPath);
});
*/



// HELP, IMPROVEMENTS, FURTHER READING: 
// https://www.the-art-of-web.com/javascript/escape/
// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f 
// http://www.javascriptkit.com/javatutors/copytoclipboard.shtml 
// FORM VALIDATION: https://www.w3schools.com/jsref/prop_text_value.asp 


/*

// Display output & allow users copy on click
function returnFilePath() {
    // Get text field
    var copyText = document.getElementById("filePathOutput");
    // Select text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile
    // Copy text in text field
    document.execCommand("copy");
    // Alert - text copied
    alert("Copied File Path: " + copyText.value);
  } 

*/ 