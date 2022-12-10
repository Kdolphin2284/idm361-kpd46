const listPage = document.getElementById('list-page');
const homePage = document.getElementById('home');
const yourListTitle = document.getElementById('your-list-nav-title');
const homeTitle = document.getElementById('nav-title');
const body = document.getElementById('body');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');

document.documentElement.style.setProperty('--before', "none");

// Make this in the html
const listItemModal = document.getElementById('listItemModal');
const modalText = document.getElementById('modalText');


window.onload = function() {
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

function addListItem(item) {
    // add list item however.
    //  ...
    // 
    attachClickListeners();
}

function itemClicked(element, innerHTML) {
    console.log("I have been clicked! My inner HTML: " + innerHTML);
    modalText.innerHTML = innerHTML;
    listItemModal.style.display = 'flex';
    document.documentElement.style.setProperty('--before', "block");
    modalTitle.innerHTML = 'task:';
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