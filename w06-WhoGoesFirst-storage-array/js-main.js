
// jwt Local Storage sample code
// 
// STRINGS to store data locally, ARRAYS to manipulate data in JS
//


//
var firstNameArray = new Array();
var ageArray = new Array();
var mainNdx = 0;

function readData() {
  console.log("readData called");
  // Does this browser support local storage?
  if (typeof (Storage) !== "undefined") {
    // Read data from local storage
    firstNamesStr = localStorage.jwt_FirstNames;
    ageStr = localStorage.jwt_Ages;
    ndxStr = localStorage.jwt_Ndx;

    console.log("firstNamesStr is .. " + firstNamesStr);
    console.log("ageStr is .. " + ageStr);
    console.log("ndxStr is .. " + ndxStr);

    if (typeof (firstNamesStr) !== "undefined") {
      // Convert data string into array
      firstNameArray = firstNamesStr.split(",");
      ageArray = ageStr.split(",");
      // Convert Ndx string into integer
      mainNdx = parseInt(ndxStr);
      // Display data screen
      firstName.value = firstNameArray[mainNdx];
      age.value = ageArray[mainNdx];
      ndx_result.value = mainNdx;
    } else {
      // Initize data if it is empty/invalid
      firstName.value = "";
      age.value = 0;
      mainNdx = 0;
    }
  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
}

function writeData() {
  console.log("writeData called");
  if (typeof (Storage) !== "undefined") {
    // Add data to array
    firstNameArray.push(firstName.value);
    ageArray.push(age.value);
    // Increment array index number
    mainNdx = firstNameArray.length - 1;
    // Convert arrays into data strings
    firstNamesStr = firstNameArray.join();
    ageStr = ageArray.join();
    // save data strings to local storage
    localStorage.jwt_FirstNames = firstNamesStr;
    localStorage.jwt_Ages = ageStr;
    localStorage.jwt_Ndx = mainNdx;
    //
    ndx_result.value = mainNdx;
    alert('Record ADDED.')
  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
}

function displayNextRec() {
  if (mainNdx < (firstNameArray.length - 1)) {
    // Increment array index number
    mainNdx++;
    // Update form fields with new values
    firstName.value = firstNameArray[mainNdx];
    age.value = ageArray[mainNdx];
    ndx_result.value = mainNdx;
    // Save current index to local storage
    localStorage.jwt_Ndx = mainNdx;
  }
}

function displayPrevRec() {
  if (mainNdx > 0) {
    // Decrement array index number
    mainNdx--;
    // Update web form fields with new values
    firstName.value = firstNameArray[mainNdx];
    age.value = ageArray[mainNdx];
    ndx_result.value = mainNdx;
    // Save current index to local storage
    localStorage.jwt_Ndx = mainNdx;
  }
}

function removeData() {
  console.log("removeData called");
  if (typeof (Storage) !== "undefined") {
    if (confirm('Are you sure you want to remove ALL records?')) {
      localStorage.removeItem("jwt_FirstNames");
      localStorage.removeItem("jwt_Ages");
      localStorage.removeItem("jwt_Ndx");
      // Initize data if it is empty/invalid
      firstName.value = "";
      age.value = 0;
      ndx_result.value = 0;
      // Clear arrays
      firstNameArray = [];
      ageArray = [];
      mainNdx = 0;
    }
  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
}

function editCurrentRec() {
  // Incomplete, Edit current array item and then update local storage
  //
}

