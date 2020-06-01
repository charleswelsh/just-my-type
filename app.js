$(document).ready(function () {
    const sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean', 
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];
    let sentenceIndex = 0;
    let currentSentence = sentences[sentenceIndex];
    let letterIndex = 0;
    let currentLetter = currentSentence[letterIndex];
    let highlighterPosition = 15;
    let numofMistakes = 0;
    let startTime = null;
    let gameOn = false

    $("#keyboard-upper-container").hide();
    $("#sentence").append(currentSentence);
    $("target-letter").append(currentLetter);

    $(document).keydown(function (e) {
        if (e.key.charCodeAt(0) == 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        }

        if (!gameOn) {
            gameOn = !gameOn;
            startTime = Date.now();
        }

        $(`#${e.key.charCodeAt(0)}`).css("background-color", "orange");

        if (e.key === currentLetter) {
            letterIndex++;
            currentLetter = currentSentence[letterIndex];
            $("#target-letter").empty();
            $("#yellow-block").css("left", (highlighterPosition += 17) + "px");
            $("#feedback").append("<span class= 'glyphicon glyphicon-ok'></span>");
            if(currentLetter === " ") {
                $("#target-letter").append("Space");
            } else {
                $("#target-letter").append(currentLetter);
            };

            if (letterIndex === currentSentence.length) {
                letterIndex = 0;
                sentenceIndex++;
                highlighterPosition = 15;
                currentSentence = sentences[sentenceIndex];

                if (currentSentence === undefined) {
                    let endTime = Date.now();
                    let minutes = endTime - startTime;
                    time = time / 1000/ 60;
                    wordsperMinute(time, numofMistakes);
                    $("#prompt-container").append("<button onClick= 'location.reset' class= 'btn btn-primary' type ='button'>Reset?<button>")
                }

                currentLetter = currentSentence[letterIndex];
                $("#yellow-block").css("left", highlighterPosition + "px");
                $("#feedback").empty();
                $("#sentence").empty();
                $("#sentence").append(currentSentence);
                $("#target-letter").append(currentLetter);

            } else {
                if (e.key !== "Shift") {
                    numofMistakes ++
                    $("#feedback").append("<span class= 'glyphicon glyphicon-remove'></span>");
                }
            }
        }

    });

    $(document).keyup(function (e){
        if (e.key.charCodeAt(0) == 16) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();

            $(`#${e.key.charCodeAt(0)}`).css("background-color", "#f5f5f5");
        }
    });
});

function wordsPerMinute(minutes, numofMistakes) {
    alert (Math.floor(54 / minutes -2 * numofMistakes))
}