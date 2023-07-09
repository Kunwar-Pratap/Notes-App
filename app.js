notesShow();
let addNoteBtn = document.getElementById('addNoteBtn');
addNoteBtn.addEventListener('click', function (e) {
    let noteText = document.getElementById('noteText');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesData = [];
    }
    else {
        notesData = JSON.parse(notes);
    }
    notesData.push(noteText.value);
    localStorage.setItem('notes', JSON.stringify(notesData));
    noteText.value = "";
    notesShow();
});

function notesShow() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesData = [];
    }
    else {
        notesData = JSON.parse(notes);
    }
    let html = "";
    notesData.forEach(function (element, index) {

        html += `
        <div class="card my-2 mx-2 noteDock" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Note ${index + 1}</h5>
        <p class="card-text">${element}</p>
        <button class="btn btn-info" id="${index}"onclick="deleteNote(this.id)">Delete Note</button>
        </div>
        </div>
        `;
    });
    
    let notesElmnt = document.getElementById('notes');
    if (notesData.length != 0) {
        notesElmnt.innerHTML = html;
    }
    else {
        notesElmnt.innerHTML = `<p class="text-danger">There is nothing to show. Please add a note</p>` 
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesData = [];
    }
    else {
        notesData = JSON.parse(notes);
    }
    notesData.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesData));
    notesShow();
}

let searchVal = document.getElementById('searchVal');
searchVal.addEventListener('input', function () {
    let inputVal = searchVal.value.toLowerCase();
    let noteDocks = document.getElementsByClassName('noteDock');
    Array.from(noteDocks).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0].innerText;
        if (cardText.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
});

const thisYear = document.querySelector('#thisYear');

const getYear = () => {
    const thisYear = new Date().getFullYear();
    return thisYear;
}

thisYear.textContent = getYear();