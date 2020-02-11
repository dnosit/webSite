
// var exampleWin = "C:\Dan\Arc\Teach\Other\APCSSci\2015\Resoucres\Yr7\"
// escaped/encoded using encodeURIComponent() below 
// path = "C%3A%5CDan%5CArc%5CTeach%5COther%5CAPCSSci%5C2015%5CResoucres%5CYr7%5C"
// "/" = %2F 
// var exampleLinux = "/Dan/Arc/Teach/Other/APCSSci/2015/Resoucres/Yr7/" 

// ------------ VARS ----------------
const fwdSlash = "%2F"; 
const backSlash = "%5C"; 

/*
// Copy input from user
function copyInput() {
    var copyText = document.querySelector("#pathInput");
    // encode to change slashes to hex codes 
    encodeURIComponent(copyText.select());
    document.execCommand("copy");
  }
document.querySelector("#copy").addEventListener("click", copy);



// input data encoded with encodeURIComponent 
function onclick(event) {
    output3.value = encodeURIComponent(input.value);
  }

// https://www.the-art-of-web.com/javascript/escape/
*/

// Windows --> Linux file path
function convertPathWindows(path) {
    let newPath = fwdSlash; 
    // add mount if needed (otherwise just forward slash on linux)
    if (path.charAt(0) != "C") {
        // EXTERNAL DRIVE - eg linux & windows equivalent: /mnt/d/  and  D:\ 
        newPath += "mnt" + fwdSlash; 
        // change case of drive letter and add
        newPath += currenChar.toLowerCase(); 
    } 
    for (i=2;i<path.length;i++) {
        currentChar = path.charAt(i);
        // if not backslash char
        if ((currentChar != "%" && path.charAt(i+1) !="5" && path.charAt(i+2) != "C") || 
        (currentChar != "5" && path.charAt(i+1) !="C" && path.charAt(i-1) != "%")     ||
        (currentChar != "C" && path.charAt(i-2) !="%" && path.charAt(i-1) != "5")   ) {
            // normal char - simply add
            newPath += currentChar;
        }
        // Add slash only once for each of "%5C"
        else if (currentChar == "%") {  
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


// Convert the file path
function convertPaths(path) {
    let newPath = ""
    // Windows --> Linux file path
    if (path.charAt(1) == "%" && path.charAt(2) == "3" && path.charAt(3) == "A" ) { // %3A == ":" 
        newPath = convertPathWindows(path)
    }
    // Linux --> Windows file path
    else {
        newPath = convertPathLinux(path);
    }
    return newPath; 
}

// 
// TEMP 
console.log(decodeURIComponent(convertPaths(path)));
// 





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


function main() {
    copyInput()
    convertPaths(path)
    returnFilePath()
}
