const listPage = document.getElementById('list-page');
const homePage = document.getElementById('home');
const yourListTitle = document.getElementById('your-list-nav-title');
const homeTitle = document.getElementById('nav-title');
const body = document.getElementById('body');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const completionButton = document.getElementById('completionButton');

document.documentElement.style.setProperty('--before', "none");

// Make this in the html
const listItemModal = document.getElementById('listItemModal');
const modalText = document.getElementById('modalText');


window.onload = function() {
    readData();
    attachClickListeners();
};


function attachClickListeners() {
    var elements = document.querySelectorAll('[list-item]');
    for(var i in elements) {
        (elements[i]).onclick = function(event) {
            let target = event.target || event.srcElement;
            itemClicked(target, target.innerHTML);
        };
    }

    var completedElements = document.querySelectorAll('[completed-list-item]');
    for(var i in completedElements) {
        (completedElements[i]).onclick = function(event) {
            let target = event.target || event.srcElement;
            completedItemClicked(target, target.innerHTML);
        };
    }
}

// function addListItem(item) {

//     attachClickListeners();
// }

function itemClicked(element, innerHTML) {
    console.log("I have been clicked! My inner HTML: " + innerHTML);
    modalText.innerHTML = innerHTML;
    listItemModal.style.display = 'flex';
    document.documentElement.style.setProperty('--before', "block");
    modalTitle.innerHTML = 'task:';
    completionButton.innerHTML = 'add to completed';
    completionButton.style.background = 'rgb(49, 201, 128)';
}

function completedItemClicked(element, innerHTML) {
    console.log("I have been clicked! My inner HTML: " + innerHTML);
    modalText.innerHTML = innerHTML;
    listItemModal.style.display = 'flex';
    document.documentElement.style.setProperty('--before', "block");
    modalTitle.innerHTML = 'completed task:';
}

closeModal.addEventListener("click", function(){
    document.documentElement.style.setProperty('--before', "none");
    listItemModal.style.display = 'none';
})

function showList(list) {
    listPage.style.display = list;
    if (listPage.style.display === 'flex') {
        homePage.style.display = 'none';
        yourListTitle.style.display = 'block';
        homeTitle.style.display = 'none';
    }
}

function hideList(home) {
    listPage.style.display = home;
    if (listPage.style.display === 'none') {
        homePage.style.display = 'flex';
        yourListTitle.style.display = 'none';
        homeTitle.style.display = 'block';
    }
}

// Local DB Code
//
// jwt Local Storage sample code
// 
// STRINGS to store data locally, ARRAYS to manipulate data in JS
//


//
var listItemArray = new Array();
// var ageArray = new Array();
var mainNdx = 0;

function readData() {
    console.log("readData called");
    // Does this browser support local storage?
    if (typeof (Storage) !== "undefined") {
      // Read data from local storage
      listItemStr = localStorage.kpd_listItems;
      // ageStr = localStorage.jwt_Ages;
      ndxStr = localStorage.kpd_Ndx;
  
      console.log("listItemStr is .. " + listItemStr);
      // console.log("ageStr is .. " + ageStr);
      console.log("ndxStr is .. " + ndxStr);
  
      if (typeof (listItemStr) !== "undefined") {
        // Convert data string into array
        listItemArray = listItemStr.split(",");
      //   ageArray = ageStr.split(",");
        // Convert Ndx string into integer
        mainNdx = parseInt(ndxStr);


        // Display data screen
        // listItem.value = listItemArray[mainNdx];

        listTestListingItems = document.getElementById('listData');

        // listItemArray.forEach(logItems);

        // function logItems(item) {
        //     listTestListingItems.innerHTML = item;
        // }

        listItemArray.forEach((item)=>{
            let li = document.createElement("li");
            li.innerText = item;
            listTestListingItems.appendChild(li);
            // li.nodeType(listItem);
            li.setAttribute("list-item", "");
            })

        // age.value = ageArray[mainNdx];
        // ndx_result.value = mainNdx;
      } else {
        // Initize data if it is empty/invalid
        listItem.value = "";
      //   age.value = 0;
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
    listItemArray.push(listItem.value);
    // ageArray.push(age.value);
    // Increment array index number
    mainNdx = listItemArray.length - 1;
    // Convert arrays into data strings
    listItemStr = listItemArray.join();
    // ageStr = ageArray.join();
    // save data strings to local storage
    localStorage.kpd_listItems = listItemStr;
    // localStorage.jwt_Ages = ageStr;
    localStorage.kpd_Ndx = mainNdx;
    //
    ndx_result.value = mainNdx;
    alert('List item ADDED.')
  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
}

// NOT USED
function displayNextRec() {
  if (mainNdx < (listItemArray.length - 1)) {
    // Increment array index number
    mainNdx++;
    // Update form fields with new values
    listItem.value = listItemArray[mainNdx];
    // age.value = ageArray[mainNdx];
    ndx_result.value = mainNdx;
    // Save current index to local storage
    localStorage.kpd_Ndx = mainNdx;
  }
}

// NOT USED
function displayPrevRec() {
  if (mainNdx > 0) {
    // Decrement array index number
    mainNdx--;
    // Update web form fields with new values
    listItem.value = listItemArray[mainNdx];
    // age.value = ageArray[mainNdx];
    ndx_result.value = mainNdx;
    // Save current index to local storage
    localStorage.kpd_Ndx = mainNdx;
  }
}

function removeData() {
  console.log("removeData called");
  if (typeof (Storage) !== "undefined") {
    if (confirm('Are you sure you want to remove ALL records?')) {
      localStorage.removeItem("kpd_listItems");
    //   localStorage.removeItem("jwt_Ages");
      localStorage.removeItem("kpd_Ndx");
      // Initize data if it is empty/invalid
      listItem.value = "";
      age.value = 0;
      ndx_result.value = 0;
      // Clear arrays
      listItemArray = [];
    //   ageArray = [];
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











// WORK AREA 

function deleteitem() {

}


function removeData() {
    console.log("removeData called");
    if (typeof (Storage) !== "undefined") {
      if (confirm('Are you sure you want to remove ALL records?')) {
        localStorage.removeItem("kpd_listItems");
      //   localStorage.removeItem("jwt_Ages");
        localStorage.removeItem("kpd_Ndx");
        // Initize data if it is empty/invalid
        listItem.value = "";
        age.value = 0;
        ndx_result.value = 0;
        // Clear arrays
        listItemArray = [];
      //   ageArray = [];
        mainNdx = 0;
      }
    } else {
      // Sorry! No Web Storage support..
      alert('This browser does NOT support local storage');
    }
  }

  function attachClickListeners() {
    var elements = document.querySelectorAll('[list-item]');
    for(var i in elements) {
        (elements[i]).onclick = function(event) {
            let target = event.target || event.srcElement;
            itemClicked(target, target.innerHTML);
        };
    }

    var completedElements = document.querySelectorAll('[completed-list-item]');
    for(var i in completedElements) {
        (completedElements[i]).onclick = function(event) {
            let target = event.target || event.srcElement;
            completedItemClicked(target, target.innerHTML);
        };
    }
}


// working here 

function itemClicked(element, innerHTML) {
    console.log("I have been clicked! My inner HTML: " + innerHTML);
    modalText.innerHTML = innerHTML;
    listItemModal.style.display = 'flex';
    document.documentElement.style.setProperty('--before', "block");
    modalTitle.innerHTML = 'task:';
    completionButton.innerHTML = 'add to completed';
    completionButton.style.background = 'rgb(49, 201, 128)';

    let currentHTML = innerHTML;
    console.log('Here is the current HTML: ' + currentHTML)

    betterHTML = currentHTML.replaceAll('<br>', '');
    console.log('The better inner html of this item is: ' + betterHTML);

    // If a string contains <br>, the index is -1
    // If array includes string that contains

    let indexOfListItem = listItemArray.indexOf(betterHTML);
    
    // str.replace(/[\r\n]/gm, '');

    console.log('The index of this item is: ' + indexOfListItem);

    if (listItemArray.includes(currentHTML)) {
        console.log('yeeeees');
    } else {
        console.log('noooooope');
    }

    // const itemMatch = listItemArray.find(element => {
    //     if (element.match(currentHTML)) {
    //       console.log('Matches!');
            
    //       console.log(listItemArray.indexOf({
    //         currentHTML
    //       }));
    //     } else {
    //         console.log('No Match.');
    //     }
    //   });
    
}

function completedItemClicked(element, innerHTML) {
    console.log("I have been clicked! My inner HTML: " + innerHTML);
    modalText.innerHTML = innerHTML;
    listItemModal.style.display = 'flex';
    document.documentElement.style.setProperty('--before', "block");
    modalTitle.innerHTML = 'completed task:';
    completionButton.innerHTML = 'delete completed task';
    completionButton.style.background = '#FF7474';
}

// END OF WORK AREA