/*jshint esversion: 6*/
'use strict';

function initCheckBirthday() {
    const birthday = document.getElementById('birthday').value;

    const result = checkBirthday(birthday) ? "Да" : "Нет";

    document.getElementById('disclaimer').innerHTML = result;   
}

function checkBirthday(birthday) {
    const nowDate = Date.now();
    const userDate = new Date(birthday);
    birthday = +userDate;
    const diff = nowDate - birthday;
    const age = diff / 1000 / 60 / 60 / 24 /366;
    return age > 18;
}

function initPrintAnimalSound() {
    const animal = {
        sound: 'grrrr',
    };

    const result = getAnimalSound(animal);

    document.getElementById('sound').innerHTML = result;   
}

function getAnimalSound(animal) {
    const sound = animal.sound;
    return sound === undefined ? null : sound;
}

function initCalculateStatement() {
    for (let idx = 0; idx < 3; idx++) {
        const marks = document.getElementById('learner-' + idx).value.split(',');

        const average = getAverageMark(marks);

        document.getElementById('learner-' + idx + '-average').innerHTML = average;
    }
}

function getAverageMark(marks) {
    const roundedAverage = Math.round(marks.reduce((x, y) => x + Number(y), 0) / marks.length);
    return roundedAverage;
}