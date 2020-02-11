// VARS
// var exampleWin = "C:\Dan\Arc\Teach\Other\APCSSci\2015\Resoucres\Yr7\"
// escaped/encoded using encodeURIComponent() below 
// path = "C%3A%5CDan%5CArc%5CTeach%5COther%5CAPCSSci%5C2015%5CResoucres%5CYr7%5C"
// forward slash encoding = %2F 
// var exampleLinux = "/Dan/Arc/Teach/Other/APCSSci/2015/Resoucres/Yr7/" 

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


// Windows --> Linux file path
function convertPathWindows(path) {
    // skip over the special char from string 

    
    // Add drive mount to start of file path 
    if (i<=1 && path.charAt(0) == "C") {
        // internal drive
        // example linux and windows equivalent: /  and  C:\
        // change only first two chars C & :
        let newChar = ""; 
    }
    else {
        // external drive
        // example linux and windows equivalent: /mnt/d/  and  D:\
        // add mount 
        let newPath += "mnt%2F";
        // change case of drive letter and add
        newPath += currenChar.toLowerCase(); 
    }
    // Add the rest of the chars 
    if (currentChar =="%" && path.charAt(i+1) =="5" && path.charAt(i+2) == "C") {  // current char is \
        newChar = '%2F'; // change to /
        // skip over the special char from string 
        i += 3; 
    }
    // otherwise keep char same
    else {
        newChar = currentChar;
    }
}


// Linux --> Windows file path
function convertPathLinux(path) {
    let newPath = "";
    // swap the slashes (back/forward) 
    if (currentChar =="/") {
        newPath += '\\';
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
        newPath = convertPathLinux(path)
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
