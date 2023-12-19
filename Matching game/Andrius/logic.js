console.log('starting');
const cAlert = document.getElementById("customAlert");
var sound = new Audio("./audio/play.mp3");
var allSound = [];
var allImages = [];
var shuffledImages = [];
var matchedImages = [];


function start() {
    matchedImages = [];
    cardGuess = [];
    cardMatched = [];
    $('#match-alerts').hide();
    // load images : from images, add it twice to allImages, shuffle and save in matched images
    $('#match-grid').html('');
    allImages = [];
    shuffledImages = [];
    for (var i = 0; i < 8; i++) {
        loadImages(i);
    }
    shuffledImages = shuffleArray(allImages);
    console.log('randomized images', shuffledImages);
    allSound = matchSoundToImageIndex(shuffledImages);
    // creates 16 card images
    for (var i = 0; i < 16; i++) {
        var cardDiv = "<div class='card-container' id='card-" +
            i +
            "'><div class='card card_front'></div><div class='card card_back'><img draggable='false' src='" +
            shuffledImages[i] +
            "' ></div></div>";
        $('#match-grid').append(cardDiv);
    }
    sound.play();
    addFlip();
}

function loadImages(num) {

    //modified random image function to load all images twice: 
    // to prevent duplicate images and uneven results.
    //var randomNum = Math.floor(Math.random() * images.length);
    //console.log(randomNum);
    var image = images[num];
    for (var i = 0; i < 2; i++) {
        allImages.push(image);
    }
    //console.log('all images', allImages);
    return allImages;
}

function showAlert(){
   let cAlert= document.getElementById("customAlert");
    cAlert.classList.remove("hidden");
}
// close modal function
 function closeModal () {
    let cAlert= document.getElementById("customAlert");
    cAlert.classList.add("hidden");
    }

window.onclick = function(event){
    let cAlert= document.getElementById("customAlert");
    if(event.target == cAlert){
        cAlert.classList.add("hidden");
    }
}

// flips the card that is clicked
var cardHTML;
var cardID;
var cardGuess = [];
var cardMatched = [];
function addFlip() {
    var card = $('.card-container');
    // What happens when a card is clicked
    card.on('click', function (event) {
        $(this).addClass('isflipped');
        cardID = $(this).attr('id');
        // check to see if card can be clicked on
        if (cardID == cardGuess[0]) return;
        if ($(this).hasClass('matched')) return;
        cardGuess.push(cardID);
        // console.log('card id = ' + cardID);
        // console.log('GUESS', cardGuess);
        if (cardGuess.length == 2) {
            var card1 = document.getElementById(cardGuess[0]);
            var card2 = document.getElementById(cardGuess[1]);
            cardGuess = [];
            setTimeout(() => checkAnswers(card1, card2, cardID), 1000);
        }
    });
}
function checkAnswers(card1, card2, cardID) {
    //console.log('matching');
    let cardsrc = card1.innerHTML;
    let cardsrc2 = card2.innerHTML;
    let won = new Audio("./audio/won.mp3");
    if (cardsrc == cardsrc2) {
        //console.log('YES');
        cardMatched.push(card1, card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        playSound(cardID);
    } else {
        //console.log('NO');
        card1.classList.remove('isflipped');
        card2.classList.remove('isflipped');
    }
    if (cardMatched.length == shuffledImages.length) {
        setTimeout(() => {
            won.play();
            //alert('YAY! for Andrius!');
            showAlert();
        }, 3000);


    }
}
function alertMatch(alertMsg) {
    var message = alertMsg;
    $('#match-alerts').html(message).show();
    setTimeout(function () {
        $('#match-alerts').hide();
    }, 1000);
}
//  Durstenfeld shuffle, a function to shuffle arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function matchSoundToImageIndex(imgarray) {
    let audioArray = [];
    for (let i = 0; i < imgarray.length; i++) {
        switch (imgarray[i]) {
            case "./images/Adonis.jpg":
                audioArray.push("./audio/Adonis.mp3");
                break;
            case "./images/AJ.jpg":
                audioArray.push("./audio/AJ.mp3");
                break;
            case "./images/Daddy.jpg":
                audioArray.push("./audio/Daddy.mp3");
                break;
            case "./images/Grama.jpg":
                audioArray.push("./audio/Grama.mp3");
                break;
            case "./images/Mommy.jpg":
                audioArray.push("./audio/Mommy.mp3");
                break;
            case "./images/Alivia.jpg":
                audioArray.push("./audio/Alivia.mp3");
                break;
            case "./images/Avery.jpg":
                audioArray.push("./audio/Avery.mp3");
                break;

            default:
        }
    }
    //console.log("audio files " + audioArray);
    return audioArray;
}

function playSound(cardId) {
    //regex to isolate card numbers from cardId
    let s = cardId.match(/(\d+)/);
    let cardMatchSound = new Audio(allSound[s[0]]);
    cardMatchSound.play();
}
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !cAlert.classList.contains("hidden")) {
      closeModal();
    }
  });