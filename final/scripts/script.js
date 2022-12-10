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
  completionButton.innerHTML = 'delete from completed';
  completionButton.style.background = '#FF7474';
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



var listItemArray = new Array();
var mainNdx = 0;

var completedItemsArray = new Array();
var secondNdx = 0;



function readData() {
    console.log("readData called");

    // Does this browser support local storage?
    if (typeof (Storage) !== "undefined") {
      // Read data from local storage
      listItemStr = localStorage.kpd_listItems;
      ndxStr = localStorage.kpd_Ndx;
      completedItemStr = localStorage.kpd_completedListItems;
      completedNdxStr = localStorage.kpd_secondNdx;
  
      console.log("listItemStr is .. " + listItemStr);
      console.log("ndxStr is .. " + ndxStr);

      console.log("completedItemStr is .. " + completedItemStr);
      console.log("completedNdxStr is .. " + completedNdxStr);
  
      if (typeof (listItemStr) !== "undefined") {
        listItemArray = listItemStr.split(",");
        
        mainNdx = parseInt(ndxStr);

        listTestListingItems = document.getElementById('listData');

        // Creating html list of array items
        listItemArray.forEach((item)=>{
          if(!item) {
            return;
          } else {
            let li = document.createElement("li");
            li.innerText = item;
            listTestListingItems.appendChild(li);
            li.setAttribute("list-item", "");
          }
          })
      } else {
        // Initize data if it is empty/invalid
        listItem.value = "";
        mainNdx = 0;
      }

      if (typeof (completedItemStr) !== "undefined") {
        completedItemsArray = completedItemStr.split(",");
        secondNdx = parseInt(completedNdxStr);
        completedListData = document.getElementById('completedListData');

        // Creating html list of completed array items
        completedItemsArray.forEach((item)=>{
          if(!item) {
            return;
          } else {
            let li = document.createElement("li");
            li.innerText = item;
            completedListData.appendChild(li);
            li.setAttribute("completed-list-item", "");
          }
        })

      } else {
        // Initize data if it is empty/invalid
        completedItemStr = "";
        secondNdx = 0;
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
    let listItemString = listItem.value;
    listItemString = listItemString.replace(/(\r\n|\n|\r)/gm, " ");
    console.log('The added value is: ' + listItemString);
    listItemArray.push(listItemString);

    // Increment array index number
    mainNdx = listItemArray.length - 1;

    // Convert arrays into data strings
    listItemStr = listItemArray.join();

    // save data strings to local storage
    localStorage.kpd_listItems = listItemStr;
    localStorage.kpd_Ndx = mainNdx;
  } else {
    // Sorry! No Web Storage support..
  }
}



// NOT USED
function removeData() {
  console.log("removeData called");
  if (typeof (Storage) !== "undefined") {
    if (confirm('Are you sure you want to remove ALL records?')) {
      localStorage.removeItem("kpd_listItems");
      localStorage.removeItem("kpd_Ndx");

      // Initize data if it is empty/invalid
      listItem.value = "";
      age.value = 0;
      ndx_result.value = 0;
      listItemArray = [];
      mainNdx = 0;
    }
  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
}



function addDataToCompleted() {
  let completedData = modalText.innerHTML;
  console.log('The added value is: ' + completedData);

    completedItemsArray.push(completedData);

    secondNdx = completedItemsArray.length - 1;
    completedItemStr = completedItemsArray.join();

    localStorage.kpd_completedListItems = completedItemStr;
    localStorage.kpd_secondNdx = secondNdx;
}



function deleteListData() {
  // find specific array value
  listDataLocation = listItemArray.indexOf(modalText.innerHTML);
  console.log(listDataLocation);

  listItemArray.splice(listDataLocation, 1);
  console.log('splicing worked');
  console.log(listItemArray);

  localStorage.kpd_listItems = listItemArray;
}



function deleteCompletedData() {
  // find specific array value
  completedListDataLocation = completedItemsArray.indexOf(modalText.innerHTML);
  console.log(completedListDataLocation);

  completedItemsArray.splice(completedListDataLocation, 1);
  console.log('splicing worked');
  console.log(completedItemsArray);

  localStorage.kpd_completedListItems = completedItemsArray;
}



function workWithData() {
  if(completionButton.innerHTML === "add to completed") {
    addDataToCompleted();
    console.log('Added data to completed items list. The innerHTML of the confirm button is: add to completed');

    deleteListData();
    console.log('Deleted current item from your list');

    window.location.reload();
  } else {
    deleteCompletedData();
    console.log('Deleting from completed immediately.');

    window.location.reload();
  }
}