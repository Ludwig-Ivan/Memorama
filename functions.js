var timer = 0;
var interval;
var points = 0;
var bangame = false;
var turno = 0;
var num1 = 0;
var cardant = null;

function GeneradorNumeros() {
    //? Valida si no hay ningun juego activo
    if (bangame != false) {
        return
    }
    //? Activa el juego
    bangame = true;
    const cards = document.querySelectorAll('.card');

    //? Escond los valores de las cartas
    cards.forEach(card => {
        card.style.color = 'transparent';
    });

    //? Inicia el contador del juego
    Timer();

    //? Genera los valores de cada carta de forma aleatoria despues de 1 segundo
    setTimeout(() => {
        for (let i = 0; i < cards.length / 2; i += 0.5) {
            var pos = generarNumeroAleatorio(0, 15);
            if (cards[pos].textContent === '0') {
                cards[pos].textContent = Math.floor(i + 1);
                cards[pos].onclick = (event) => {
                    Comparador(Math.floor(i + 1), event.target);
                }
            } else {
                i -= 0.5;
            }
        }
    }, 1000)

}

//? Funcion que genera los numeros aleatorios en un rango especifico de valores
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//? Resetea el juego
function Reset() {
    const cards = document.querySelectorAll('.card');
    StopTimer();
    cards.forEach(card => {
        card.textContent = 0;
        card.onclick = () => { };
        card.style.color = '#000';
        card.style.backgroundColor = '#FFF';
    });
    bangame = false;
    points = 0;
    document.querySelector('.points').textContent = '0' + points;
    document.querySelector('.time').textContent = '00';
    timer = 0;
}

//? Se encarga de compara las cartas y colocarlas en sus estados correspondientes
function Comparador(num, card) {
    var bancomp = false;

    //? Verifica q sea la primera carta elegida y la descubre
    if (turno == 0) {
        num1 = num;
        turno = 1;
        card.style.color = '#000';
        cardant = card;
        //? Verifica q sea la segunda carta elegida y la descubre
    } else if (turno == 1) {
        card.style.color = '#000';

        //? Se comparan los valores de las cartas
        bancomp = num1 == num ? true : false;
        //? Se aumenta el turno para evitar seleccionar mas de 3 al mismo tiempo
        turno += 1;

        //? Dependiendo del resultado de la comparacion, se cubren los valores o permaneces visibles
        setTimeout(() => {
            if (bancomp) {

                //? Desactiva la usabilidad de las cartas descubiertas
                card.onclick = () => { };
                cardant.onclick = () => { };

                //? Aumenta el contador en caso de ser iguals
                points += 1;
                document.querySelector('.points').textContent = '0' + points;

                //? Termina la partida en caso de obtener la puntuacion correspondiente
                const cards = document.querySelectorAll('.card');
                if (points == 8) {
                    cards.forEach(card => {
                        card.style.backgroundColor = '#0F0';
                    });
                    StopTimer();
                }
            }
            //? En caso de ser diferentes las oculta nuevamente
            else {
                card.style.color = 'transparent';
                cardant.style.color = 'transparent';

            }
            turno = 0;
            cardant = null;
        }, 1000);
    }
}

//? Activa el contador
function Timer() {
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        timer++;
        document.querySelector('.time').textContent = timer < 10 ? '0' + timer : timer;
    }, 1000);
}

//? Detiene el contador activo
function StopTimer() {
    clearInterval(interval);
}