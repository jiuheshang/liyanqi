// script.js
document.getElementById('startButton').addEventListener('click', function() {
    document.querySelector('.dark-background').classList.add('hidden');
    document.querySelector('.light-background').classList.remove('hidden');
    document.getElementById('addSomethingButton').classList.remove('hidden');
});

document.getElementById('addSomethingButton').addEventListener('click', function() {
    document.querySelector('.cake').classList.remove('hidden');
    document.getElementById('birthdaySong').play();
});
