AOS.init({
    duration: 1000,
    offset: 150,
    once: true,
});

new Rellax('.rellax', {
    speed: -4,
});


window.onload = () => {
    const wideIndexes = [1, 9];
    const tallIndexes = [7, 8, 15, 23, 31];
    const liItems = document.querySelectorAll('#about .gallery li');

    for (let idx = 0; idx < liItems.length; idx++) {
        if (tallIndexes.includes(idx + 1)) {
            liItems[idx].classList.add('tall')
        } else if (wideIndexes.includes(idx + 1)) {
            liItems[idx].classList.add('wide')
        }
    }
}