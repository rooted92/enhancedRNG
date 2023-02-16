const MakeCards = (array, inject) => {
    console.log(array);
    array.map(group => {
        let count = 1;
        let ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush';
        let cardHeader = document.createElement('div');
        cardHeader.className = 'card-header'
        cardHeader.textContent = `Group ${count}`;
        let card = document.createElement('div');
        card.className = 'card m-2';
        card.style = 'width: 18rem;';
        card.append(cardHeader, ul);
        count++;
        group.map(person => {
            let li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = person;
            ul.append(li);
        });
        inject.append(card);
    });
}

{/* <div class="card m-2" style="width: 18rem;">
    <div class="card-header">
        Featured
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
    </ul>
</div> */}

export { MakeCards };