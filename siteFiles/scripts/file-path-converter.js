// Known Bugs: 
// Some paths convert incorrectly, presumably due to the decoding reading the path as a character 

// ------------ VARS ----------------
const fwdSlash = "%2F"; 
const backSlash = "%5C"; 
const colon = "%3A";

// Windows --> Linux file path
function convertPathWindows(path) {
    let newPath = ""; 
    // add mount if needed (otherwise just forward slash on linux)
    if (path.charAt(0) != "C") {
        // EXTERNAL DRIVE - eg linux & windows equivalent: /mnt/d/  and  D:\
        newPath += fwdSlash + "mnt" + fwdSlash; 
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
    let driveLetterIndex = -1; // -1 for internal linux path (no drive in path)
    let driveLetter = "C"; // default internal drive 
    // Add drive and prefix
    if (path.charAt(3) == "m" && path.charAt(4) == "n" && path.charAt(5) == "t")  {
        // EXTERNAL DRIVE - eg linux & windows equivalent: /mnt/d/  and  D:\
        driveLetterIndex = 9; 
        driveLetter = path.charAt(driveLetterIndex).toUpperCase();
    } // Otherwise INTERNAL DRIVE 
    // Add drive letter & Colon
    newPath += driveLetter + colon;
    // skip for slash
    let skipCharsCounter = 0;
    // Add slashes 
    for(i=driveLetterIndex+1;i<path.length;i++){
        // swap the slashes (back/forward) 
        if ((path.charAt(i) != "%" && path.charAt(i+1) != "2" && path.charAt(i+2) != "F") && skipCharsCounter == 0) { 
            // not slash - keep char same  NB: %2F = /
            newPath += path.charAt(i); 
        }
        else if (skipCharsCounter > 0) {
            skipCharsCounter -= 1;
        }
        else {
            // add swapped slash 
            newPath += backSlash; 
            // set chars to skip for this slash 
            skipCharsCounter = 2; 
        }
    }
    return newPath; 
}

// output new file path
function outputPath(path) {
    // Update output with converted path
    document.getElementById("textOutput").value = decodeURIComponent(path); 
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
    else if (path.charAt(0) == "%" && path.charAt(1) =="2" && path.charAt(2) == "F") {
        newPath = convertPathLinux(path);
        outputPath(newPath); 
    }
    else {
        // notify use to please enter a valid, full file path 
        // Temp error message for now: 
        console.log("There has been an error.")
    }
}

// EVENT LISTENERS 
// check for button click to convert 
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buttonInput').addEventListener('click', convertPath);
});



/*
// COPY FUNCTIONALITY 

// TO BE ADDED 

function copyPath() {

}

// check for button click to copy converted path text
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buttonOutput').addEventListener('click', copyPath);
});

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

// once user has copied data 
// document.forms[0].reset();  // clear form for next entry 
// document.querySelector('form').reset(); // alternate clear-form method same as above




// ------- HELP, IMPROVEMENTS, FURTHER READING  ------
// https://www.the-art-of-web.com/javascript/escape/
// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f 
// http://www.javascriptkit.com/javatutors/copytoclipboard.shtml 
// FORM VALIDATION: https://www.w3schools.com/jsref/prop_text_value.asp 
