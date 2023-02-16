// Pedro Castaneda
// 02-15-2023
// In this assignment we are to build a random name generator application for desktop. The user will be able to split the list into groups, add new names to the list, remove names from the list, be able to save the list into local storage.

// Imports
import { GetNames, SaveToLocalStorage, RemoveFromLocalStorage } from './localStorage.js'
import { MakeCards, MakeListItemForEntry, MakeListItemsForDropdown, shuffleArray } from './functions.js';

// Global Variables
let defaultData, studentData, randomIndex;
let nameInput = document.getElementById('nameInput');
let addNameBtn = document.getElementById('addNameBtn');
let randomBtn = document.querySelector('#randomBtn');
let peopleInGroup = document.querySelector('#peopleInGroup');
let numberOfGroups = document.querySelector('#numberOfGroups');
let splitByPeople = document.querySelector('#splitByPeople');
let splitByGroup = document.querySelector('#splitByGroup');
let displayName = document.querySelector('#displayName');
let injectItems = document.querySelector('#injectItems');
let injectGroups = document.querySelector('#injectGroups');
let clearBtn = document.getElementById('clearBtn');

// Functions
// This function will get default names from json file
const GetDefaultNames = async () => {
    const response = await fetch('../data/defaultData.json');
    const data = await response.json();
    return data.defaultNames;// remember to always return!
}
defaultData = await GetDefaultNames();// save name objects to variable
// This function will get student names from json file
const GetStudentNames = async () => {
    const response = await fetch('../data/defaultData.json');
    const data = await response.json();
    return data.studentNames;
}
studentData = await GetStudentNames();

// This function will populate list with default names
const PopulateListWithDefaultNames = () => {
    let namesList = GetNames();
    defaultData.map(person => {
        if (!namesList.some(name => name === person.firstName)) {// condition checks to see if 
            SaveToLocalStorage(person.firstName);
        }
    });
}

// This function will  populate list with student names
const PopulateListWithStudentNames = () => {
    let namesList = GetNames();
    studentData.map(person => {
        if (!namesList.some(name => name === person.firstName)) {
            SaveToLocalStorage(`${person.firstName} ${person.lastName}`);
        }
    })
}

// This function checks to see if namesList is empty, if so then fill with test subjects
const CheckNamesListForPopulation = () => {
    let namesList = GetNames();
    if (namesList.length === 0) {
        PopulateListWithDefaultNames();
        PopulateListWithStudentNames();
    }
}
CheckNamesListForPopulation();

// This function will shuffle current names list, then use for loop to assing a new group array a slice of the shuffledArray. Then push group array to group(s) array. Repeat until end of shuffledArray. Finally, MakeCards for each group.
const SplitByNumberOfPeople = (numOfPeople, namesArr) => {
    let shuffledArray = shuffleArray(namesArr);// shuffle using FY algorithm
    const numOfPplParsed = parseInt(numOfPeople);// covert str to int
    const numOfGroups = Math.ceil(shuffledArray.length / numOfPplParsed);// get num of groups
    let groups = [];// intiate empty array for group arrays
    for (let i = 0; i < shuffledArray.length; i += numOfPplParsed) {
        let group = [];// initiate new array for every increment
        group = shuffledArray.slice(i, i + numOfPplParsed);// slice next section of names list
        groups.push(group);// 
    }
    MakeCards(groups, injectGroups);
}

// Event Listeners
addNameBtn.addEventListener('click', function () {
    if (nameInput.value === '') {
        alert('Please enter a name!');
    }
    let names = GetNames();// reinitialize list for updated list
    let namesStr = JSON.stringify(names);// make names into strings
    if (!namesStr.includes(JSON.stringify(nameInput.value))) {// check if name is in name array
        SaveToLocalStorage(nameInput.value);
        MakeListItemForEntry(nameInput.value, GetNames(), injectItems);
        nameInput.value = '';
        GetNames();
    }
});

randomBtn.addEventListener('click', function () {
    let namesList = GetNames();
    randomIndex = Math.floor(Math.random() * namesList.length);
    displayName.textContent = namesList[randomIndex];
});

splitByPeople.addEventListener('click', function () {
    if (peopleInGroup.value === '') {
        alert('Please make an entry');
    }
    else {
        // let namesList = 
        injectGroups.innerHTML = '';
        SplitByNumberOfPeople(peopleInGroup.value, GetNames());
        peopleInGroup.value = '';
    }
});

splitByGroup.addEventListener('click', function () {
    numberOfGroups.value = '';
});

clearBtn.addEventListener('click', function(){
    injectGroups.innerHTML = '';
});

MakeListItemsForDropdown(GetNames(), injectItems);