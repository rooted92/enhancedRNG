const SaveToLocalStorage = (name) => {
    let names = GetNames();

    if(!names.includes(name)){
        names.push(name);
        localStorage.setItem('Names', JSON.stringify(names));
    }
}

const GetNames = () => {
    let localStorageData = localStorage.getItem('Names');
    if(localStorageData === null){
        return [];
    }
    return JSON.parse(localStorageData);
}

const RemoveFromLocalStorage = (name) => {
    let names = GetNames();
    let nameIndex = names.indexOf(name);
    names.splice(nameIndex, 1);
    localStorage.setItem('Names', JSON.stringify(names));
    // namesList = GetNames();// update namesList after deletion
}

export {GetNames, RemoveFromLocalStorage, SaveToLocalStorage};