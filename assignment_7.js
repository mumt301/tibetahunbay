
function thereminOn(oscillator1, oscillator2) {
    oscillator1.play();
    oscillator2.play();

}


function thereminControl(e, oscillator1, oscillator2, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

 


    let urlParams = (new URL(document.location)).searchParams;
    let minFrequency = 220;
    let maxFrequency = 880;
    if (urlParams.has('minfreq')) {
        minFrequency = parseInt(urlParams.get('minfreq'));
    }

    if (urlParams.has('maxfreq')) {
        maxFrequency = parseInt(urlParams.get('maxfreq'));
    }

    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + ((x / theremin.clientWidth) * freqRange);
    let thereminVolume = 1.0 - (y / theremin.clientHeight);


    let noteName1 = document.getElementById('notename1');
    let freqNum1 = document.getElementById('freq1')
    let noteName2 = document.getElementById('notename2');
    let freqNum2 = document.getElementById('freq2')



    oscillator1.frequency = thereminFreq;
    noteName1.innerHTML = noteFromFrequency(thereminFreq);
    freqNum1.innerHTML = thereminFreq;

    let semitones = 0;
    if (urlParams.has('semitones')) {
        semitones = parseInt (urlParams.get('semitones'));
        oscillator2.frequency = interval(thereminFreq, semitones);
        noteName2.innerHTML = noteFromFrequency(oscillator2.frequency);
        freqNum2.innerHTML = oscillator2.frequency;
    } else 
    { oscillator2.frequency = 0;}


    oscillator1.volume = thereminVolume;
    oscillator2.volume = thereminVolume;


    freqNum1.innerHTML = "Frequency of The First Oscillator: " + oscillator1.frequency + " Hz";
    noteName1.innerHTML = "Note of The First Oscillator: " + noteFromFrequency(oscillator1.frequency, true)
    if (semitones == 0){
    freqNum2.innerHTML = "Frequency of The Second Oscillator: " + oscillator1.frequency + " Hz";
    noteName2.innerHTML = "Note of The Second Oscillator: " + noteFromFrequency(oscillator1.frequency, true);
}
else { 
freqNum2.innerHTML = "Frequency of The Second Oscillator: " + oscillator2.frequency + " Hz";
noteName2.innerHTML = "Note of The Second Oscillator: " + noteFromFrequency(oscillator2.frequency, true)
    }
}


function thereminOff(oscillator1, oscillator2) {
    oscillator1.stop();
    oscillator2.stop();
}


function runAfterLoadingPage() {

    let urlParams = (new URL(document.location)).searchParams;

    let oscillatorType = "sine";
    if (urlParams.has('oscillator')) {
        oscillatorType = urlParams.get('oscillator')
    }
    

    const oscillator1 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });

    const oscillator2 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });

    const theremin = document.getElementById("thereminZone");

    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator1, oscillator2);
    });

    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator1, oscillator2, theremin);
    });

    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator1, oscillator2);
    });
}

window.onload = runAfterLoadingPage;