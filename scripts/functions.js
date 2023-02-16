// Create card elements
const MakeCards = (array, inject) => {
    console.log(array);
    let count = 1;
    array.map(group => {
        let ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush';
        let cardHeader = document.createElement('div');
        cardHeader.className = 'card-header bg-dark'
        cardHeader.textContent = `Group ${count}`;
        let card = document.createElement('div');
        card.className = 'card m-2 bg-dark';
        card.style = 'width: 18rem;';
        card.append(cardHeader, ul);
        group.map(person => {
            let li = document.createElement('li');
            li.className = 'list-group-item text-success bg-dark';
            li.textContent = person;
            ul.append(li);
        });
        inject.append(card);
        count++;
    });
}
// Creates list item when new name added
const MakeListItemForEntry = (name, func, inject) => {
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn bg-danger';
    deleteBtn.innerHTML = `<i class="fa-solid fa-delete-left"></i>`;
    deleteBtn.id = 'deleteBtn';
    let p = document.createElement('p');
    p.textContent = name;
    p.className = 'mx-3';
    let nameContainer = document.createElement('div');
    nameContainer.className = 'nameContainer border border-success bg-dark d-flex justify-content-between p-2 mb-1';
    nameContainer.append(p, deleteBtn);
    inject.append(nameContainer);

    deleteBtn.addEventListener('click', function () {
        RemoveFromLocalStorage(name);
        inject.removeChild(nameContainer);
        func;
    });
}

const MakeListItemsForDropdown = (func, inject) => {
    let namesList = func;
    let listEmptyTxt = document.createElement('p');
    listEmptyTxt.textContent = 'List is currently empty, add names to the list.';
    listEmptyTxt.className = 'text-center text-danger my-3';
    if (namesList.length === 0) {
        inject.append(listEmptyTxt);
    }
    else {
        namesList.map(name => {
            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn bg-danger';
            deleteBtn.innerHTML = `<i class="fa-solid fa-delete-left"></i>`;
            deleteBtn.id = 'deleteBtn';
            let p = document.createElement('p');
            p.textContent = name;
            p.className = 'mx-3';
            let nameContainer = document.createElement('div');
            nameContainer.className = 'nameContainer border border-success bg-dark d-flex justify-content-between p-2 mb-1';
            nameContainer.append(p, deleteBtn);
            inject.append(nameContainer);

            deleteBtn.addEventListener('click', function () {
                RemoveFromLocalStorage(name);
                inject.removeChild(nameContainer);
                func;
            });
        });
    }
}

// Fisher-Yates Algorithm - attribution: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
// https://bost.ocks.org/mike/shuffle/
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export { MakeCards, MakeListItemForEntry, MakeListItemsForDropdown, shuffleArray };