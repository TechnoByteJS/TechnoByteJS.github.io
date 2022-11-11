var context = new AudioContext(),
    oscillators = {};

var oscillatorType = "square";

var gainNode = context.createGain();
gainNode.gain.value = 0;
gainNode.connect(context.destination);

var pitchShift = 0;

var lastFrequency = 0;

var voices = 0;

var MIDIchannel = 0;

function setMIDIChannel(channel) {
    MIDIchannel = channel-1;
}

function setChannel() {
    setMIDIChannel(document.getElementById("channelSelect").value);
}

function setOscillatorType(type) {
    oscillatorType = type;
    document.getElementById("istr").innerText = "Waveform: " + type;
}
function setVoices(amount) {
    voices = amount;
    document.getElementById("voices").innerText = "Active Voices: " + amount;
}
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess()
        .then(success, failure);
}
 
function success (midi) {
    var inputs = midi.inputs.values();
    // inputs is an Iterator
 
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}
 
function failure () {
    dialog('No access to your midi devices.')
}
 
function onMIDIMessage (message) {
    console.log(message);
    var frequency = midiNoteToFrequency(message.data[1]);
 
    if (message.data[0] === 144+MIDIchannel && message.data[2] > 0) {
        playNote(frequency);
        lastFrequency = frequency;
        setVoices(voices+1);
    }
 
    if (message.data[0] === 128+MIDIchannel || message.data[2] === 0) {
        stopNote(frequency);
        setVoices(voices-1);
    }
    if (message.data[0] === 224+MIDIchannel) {
      pitchShift = (message.data[2]-64)*2;
      oscillators[lastFrequency].frequency.value = lastFrequency+pitchShift;
      document.getElementById("pitchbend").innerText = "Pitchbend: " + pitchShift + "Hz";
  }
}
 
function midiNoteToFrequency (note) {
    return Math.pow(2, ((note - 69) / 12)) * 440;
}
 
function playNote (frequency) {
    oscillators[frequency] = context.createOscillator();
    oscillators[frequency].type = oscillatorType;
    oscillators[frequency].frequency.value = frequency+pitchShift;
    oscillators[frequency].connect(context.destination);
    oscillators[frequency].connect(gainNode);
    oscillators[frequency].start(context.currentTime);
    document.getElementById("pitch").innerText = "Last frequency: " + Math.abs(Math.trunc(frequency+pitchShift)) + "Hz";
}
 
function stopNote (frequency) {
    oscillators[frequency].stop(context.currentTime);
    oscillators[frequency].disconnect();
}