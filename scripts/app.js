// Pedro Castaneda
// 02-15-2023
// In this assignment we are to build a random name generator application for desktop. The user will be able to split the list into groups, add new names to the list, remove names from the list, be able to save the list into local storage.

// set up default list
// be able to get input from user and add name to list
// be able to display random name
// be able to delete specific person from list
// be able to set number of groups and number of people per group
// create elements
// test everything

// Imports
import { GetNames, SaveToLocalStorage, RemoveFromLocalStorage } from './localStorage.js'
// Global Variables
// let namesList = GetNames();
// console.log(namesList);
let defaultData, studentData, isPopulated, randomIndex;
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
// let fillList = document.querySelector('#fillList');

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
    console.log('Names list in Populate function:');
    console.log(namesList);
    console.log('dataTest strinified!');
    console.log(JSON.stringify(defaultData));
    defaultData.map(person => {
        if (!namesList.some(name => name === person.firstName)) {// condition checks to see if 
            SaveToLocalStorage(person.firstName);
            console.log('Logged from populate func: ' + person.firstName);
        }
    });
}
// This function will  populate list with student names
const PopulateListWithStudentNames = () => {
    let namesList = GetNames();
    studentData.map(person => {
        if (!namesList.some(name => name === person.firstName)) {
            SaveToLocalStorage(`${person.firstName} ${person.lastName}`);
            console.log('Logged from student populate func: ' + person.firstName);
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
// Creates list elements
const MakeListItemsForDropdown = () => {
    let namesList = GetNames();
    console.log('Names list in MakeListItemsForDropdown:');
    console.log(namesList);
    let listEmptyTxt = document.createElement('p');
    listEmptyTxt.textContent = 'List is currently empty, add names to the list.';
    listEmptyTxt.className = 'text-center text-danger my-3';
    if (namesList.length === 0) {
        injectItems.append(listEmptyTxt);
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
            injectItems.append(nameContainer);

            deleteBtn.addEventListener('click', function () {
                RemoveFromLocalStorage(name);
                injectItems.removeChild(nameContainer);
                GetNames();
            });
        });
    }
}
MakeListItemsForDropdown();
// Creates list item when new name added
const MakeListItemForEntry = (name) => {
    let namesList = GetNames();
    console.log('Names list in MakeListItemForEntry');
    console.log(namesList);
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
    injectItems.append(nameContainer);

    deleteBtn.addEventListener('click', function () {
        RemoveFromLocalStorage(name);
        injectItems.removeChild(nameContainer);
        GetNames();
        console.log('Names list after delete btn pressed:')
        console.log(namesList);
    });
}

const SplitByNumberOfPeople = (numOfPeople, namesArr) => {
    let numOfPplParsed = parseInt(numOfPeople);
    let numOfGroups = Math.ceil(namesArr.length / numOfPplParsed);
    let groups = [];
    // make for loop to iterate from 0 to maxPerGroup value
    // make secondary loop to add mini group array to groups array
    // secondary loop will iterate through namesList while it still has length of 0 AND also iterate only while counter is less than number of people then randomly take a name from the list and push it into minigroups array
    // then outside the second for loop push the mini
    for(let i = 0; i < numOfGroups; i++){
        let group = [];
        console.log('Value of i: ' + i);
        for(let j = 0; j < numOfPplParsed && namesArr.length > 0; j++){
            console.log('Value of j: ' + j);
            let rndIndex = Math.floor(Math.random() * (numOfPplParsed + 1));
            // see if you can use .some to check if person has already been added
            console.log('Random name from Split by ppl func: ' + namesArr[rndIndex]);
            console.log(group.includes(namesArr[rndIndex]));
            if(!group.includes(namesArr[rndIndex])){
                group.push(namesArr[rndIndex]);
            }
            
            // if I use the slice method in here then it will remove 5 from list while I am making the first group
        }
        groups.push(group);
        console.log('Length of groups list: ' + groups.length);
        // use slice method out here
    }
    console.log(numOfGroups);
    console.log(namesArr.length);
    console.log(parseInt(numOfPeople));
}

// Event Listeners
addNameBtn.addEventListener('click', function () {
    if (nameInput.value === '') {
        alert('Please enter a name!');
    }
    let names = GetNames();// reinitialize list for updated list
    console.log('Names in add btn');
    console.log(names);
    let namesStr = JSON.stringify(names);// make names into strings
    console.log('Names as strings in add btn');
    console.log(namesStr);
    if (!namesStr.includes(JSON.stringify(nameInput.value))) {// check if name is in name array
        console.log('Name input value in if statement in add btn: ' + nameInput.value);
        SaveToLocalStorage(nameInput.value);
        MakeListItemForEntry(nameInput.value);
        nameInput.value = '';
        GetNames();
    }
});

randomBtn.addEventListener('click', function () {
    let namesList = GetNames();
    randomIndex = Math.floor(Math.random() * namesList.length);
    displayName.textContent = namesList[randomIndex];
    console.log('Random btn clicked!');
});

splitByPeople.addEventListener('click', function () {
    if (peopleInGroup.value === '') {
        alert('Please make an entry');
    }
    else {
        let namesList = GetNames();
        console.log('input value for split by people: ', peopleInGroup.value, numberOfGroups.value);
        SplitByNumberOfPeople(peopleInGroup.value, namesList)
        peopleInGroup.value = '';
    }
});

splitByGroup.addEventListener('click', function () {
    numberOfGroups.value = '';
});

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }

// array.sort((a, b) => 0.5 - Math.random());