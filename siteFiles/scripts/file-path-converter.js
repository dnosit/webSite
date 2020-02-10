// VARS
// var exampleWin = "\Dan\Arc\Teach\Other\APCSSci\2015\Resoucres\Yr7\"
// var exampleLinux = "/Dan/Arc/Teach/Other/APCSSci/2015/Resoucres/Yr7/" 

// Copy input from user
function copyInput() {
    var copyText = document.querySelector("#pathInput");
    copyText.select();
    document.execCommand("copy");
  }

document.querySelector("#copy").addEventListener("click", copy);


// Convert the file path
function convertPath() {

}

// Display the output on screen 


// Copy output to users clipboard on click
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


