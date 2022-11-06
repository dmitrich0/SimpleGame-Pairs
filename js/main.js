(() => {
    let digitsArray = [];
    let quessedCards = [];
    let flippedCards = [];
    let mainTimer;

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    function finishGame() {
        for (btn of document.getElementsByClassName('cell')) {
            btn.setAttribute('disabled', 'true');
        }
        let playAgainBtn = document.createElement('button');
        playAgainBtn.textContent = 'Играть снова';
        playAgainBtn.classList.add('btn');
        playAgainBtn.classList.add('restart-btn');
        playAgainBtn.addEventListener('click', () => {
            flippedCards = [];
            quessedCards = [];
            document.getElementsByClassName('main')[0].lastChild.remove();
            document.getElementsByClassName('main')[0].lastChild.remove();
            document.getElementsByClassName('main')[0].appendChild(createPlayground(digitsArray));
            document.querySelector('.timer').textContent = '60';
        })
        document.getElementsByClassName('main')[0].appendChild(playAgainBtn);
    }
    function checkWin(quessed) {
        if (quessed.length == digitsArray.length) {
            finishGame();
        }
    }
    function flipCard(card) {
        if (quessedCards.indexOf(card) != -1) return;
        else if (flippedCards.length == 1 && card != flippedCards[0] && flippedCards[0].childNodes[0].textContent == card.childNodes[0].textContent) {
            quessedCards.push(card);
            quessedCards.push(flippedCards[0]);
            card.classList.add('quessed');
            flippedCards[0].classList.add('quessed');
            flippedCards = [];
            card.childNodes[0].classList.toggle('hidden');
            card.childNodes[0].classList.toggle('visible');
            checkWin(quessedCards);
            return;
        }
        else if (flippedCards.length == 2) {
            for (const card of flippedCards) {
                card.childNodes[0].classList.toggle('hidden');
                card.childNodes[0].classList.toggle('visible');
            }
            flippedCards = [];
            flipCard(card);
            return;
        }
        else if (flippedCards.indexOf(card) == -1) {
            flippedCards.push(card);
        }
        else {
            flippedCards.pop(flippedCards.indexOf(card));
        }
        card.childNodes[0].classList.toggle('hidden');
        card.childNodes[0].classList.toggle('visible');
    }
    function createPlayground(input_array) {
        let playground = document.createElement('div');
        playground.classList.add('playground', 'grid');
        const size = "1fr ".repeat(Math.sqrt(input_array.length));
        playground.style.gridTemplateColumns = size;
        playground.style.gridTemplateRows = input_array.length;
        shuffle(input_array);
        for (const elem of input_array) {
            let cell = playground.appendChild(document.createElement('button'));
            let num = cell.appendChild(document.createElement('p'));
            num.textContent = elem;
            num.classList.add('hidden');
            cell.classList.add('cell');
            cell.addEventListener('click', () => flipCard(cell));
        }
        return playground;
    }
    addEventListener('DOMContentLoaded', () => {
        function startGame(size) {
            if (size == undefined) return;
            const limit = (size > 10 || size < 2 || size % 2 != 0) ? 4 : size * size / 2;
            for (let i = 1; i < limit + 1; i++) {
                digitsArray.push(i);
                digitsArray.push(i);
            }
            shuffle(digitsArray);
            input.style.display = 'none';
            btn.style.display = 'none';
            document.getElementsByClassName('title')[0].style.display = 'none';
            document.getElementsByClassName('input-descr')[0].style.display = 'none';
            document.getElementsByClassName('main')[0].appendChild(createPlayground(digitsArray));
            startTimer();
            let timer = document.querySelector('.timer');
            timer.classList.toggle('hidden');
        }
        const input = document.getElementsByClassName('input')[0];
        const btn = document.getElementsByClassName('start-btn')[0];
        btn.addEventListener('click', () => startGame(input.value));

        let timer = document.querySelector('.timer');

        function startTimer() {
            if (mainTimer)
                clearInterval(mainTimer);
            mainTimer = setInterval(incrementTimer, 1000);
        }

        function incrementTimer() {
            if (parseInt(timer.textContent) === 0) {
                clearInterval(mainTimer);
                finishGame();
            }
            else
                timer.textContent = (parseInt(timer.textContent) - 1).toString();
        }
    });
})();