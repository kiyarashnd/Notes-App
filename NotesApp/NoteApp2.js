const addButton = document.getElementById('addButton');
const section = document.getElementById('add-boxes');

const clearButton = document.getElementById('Clear');
clearButton.addEventListener('click', () => {
    localStorage.removeItem('notess');
    localStorage.removeItem('index');
    window.location.reload();
})

addButton.addEventListener('click', () => addNote(''));

//for set empty object in first load in local storage
if (localStorage.getItem('notess') === null) {
    let notesObject = {};
    localStorage.setItem('notess', JSON.stringify(notesObject))
    localStorage.setItem('index', 0);
}

//add note after every fire add button
function addNote(text) {

    const divMain = document.createElement('div');
    divMain.setAttribute('class', 'main');

    divMain.innerHTML = `<div class="nav">
    <button class="changeClr">Change color</button>
    <button class="Delete"><img src="trash.png" alt="Trash pic" class="trash"></button>
</div>
<div class="textarea">
    <textarea name="review" rows="10" cols="37"></textarea>
</div>`;

    const textarea = divMain.querySelector('textarea');
    const deleteButton = divMain.querySelector('.Delete')
    const changeclr = divMain.querySelector('.changeClr')

    textarea.value = text;

    section.appendChild(divMain);

    //set id for elements :
    let index = localStorage.getItem('index');
    index = Number(index);
    divMain.setAttribute('id', index);

    //after every change in localstorage this fucntion get notess in localstorage
    //parse that to object and update that textarea that we fire and save that in localstorage
    textarea.addEventListener('change', (event) => {
        const note = event.target;//note is textarea that we want change that

        notesObject = JSON.parse(localStorage.getItem('notess'));

        notesObject[index] = note.value;
        localStorage.setItem('notess', JSON.stringify(notesObject));

        index++;
        localStorage.setItem('index', index);
    });

    deleteButton.addEventListener('click', (event) => {
        const conf = confirm('are you sure you want delete this item?')
        if (conf) {
            let elementId = event.target.parentNode.parentNode.parentNode.getAttribute('id');

            const notes = JSON.parse(localStorage.getItem('notess'));
            //delete from object of localstorage
            delete notes[elementId];

            localStorage.setItem('notess', JSON.stringify(notes));

            //delete from elements
            divMain.remove();
        }
    });

    changeclr.addEventListener('click', changeColor);
}

//this 3 line code fire for every refresh in page
//and call afterReload function for every memeber in localstorage notess object:
const notes = JSON.parse(localStorage.getItem('notess'));
for (let note in notes)
    afterReload(notes[note], note)

function afterReload(text, index2) {
    let notesObject = {};

    const divMain = document.createElement('div');
    divMain.setAttribute('class', 'main');

    divMain.innerHTML = `<div class="nav">
    <button class="changeClr">Change color</button>
    <button class="Delete"><img src="trash.png" alt="Trash pic" class="trash"></button>
</div>
<div class="textarea">
    <textarea name="review" rows="10" cols="37"></textarea>
</div>`;

    const textarea = divMain.querySelector('textarea');
    const deleteButton = divMain.querySelector('.Delete')
    const changeclr = divMain.querySelector('.changeClr')

    textarea.value = text;

    textarea.addEventListener('change', (event) => {
        const note = event.target;//note is textarea that we want change that

        notesObject = JSON.parse(localStorage.getItem('notess'))//here notesObject is an object of localstorage

        notesObject[index2] = note.value;

        localStorage.setItem('notess', JSON.stringify(notesObject));
    });

    deleteButton.addEventListener('click', (event) => {
        const conf = confirm('are you sure you want delete this item?')
        if (conf) {
            let keyInLocalStorage = event.target.parentNode.parentNode.parentNode.getAttribute('id');

            const notes = JSON.parse(localStorage.getItem('notess'))
            delete notes[keyInLocalStorage];
            localStorage.setItem('notess', JSON.stringify(notes));

            divMain.remove();
        }
    });

    section.appendChild(divMain);

    //set id for elements :
    if (localStorage.getItem('notess') === null) {
        divMain.setAttribute('id', 0);
    }
    else {
        divMain.setAttribute('id', index2);
    }

    changeclr.addEventListener('click', changeColor);
}

//generate random color :
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//change background color of textarea
function changeColor(event) {
    const main = event.target.parentNode.parentNode;
    const bg = main.querySelector('textarea');
    bg.style.backgroundColor = randomRGB();
}

//for change color of add button when user scroll
document.addEventListener('scroll', scroll);

function scroll() {
    const navbar = document.getElementById('addButton');

    if (document.documentElement.scrollTop > navbar.clientHeight)
        navbar.classList.add('difColor');
    else
        navbar.classList.remove('difColor');
}