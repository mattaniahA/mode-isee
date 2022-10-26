const midiChannel = new BroadcastChannel('midi-channel');

const KNOB1 = 'KNOB1';
const KNOB2 = 'KNOB2';
const KNOB3 = 'KNOB3';

const INPUT_ID_MAP = new Map([
  [0, KNOB1],
  [1, KNOB2],
  [2, KNOB3],
]);

const INPUT_VALUES = new Map();
for (const [key, value] of INPUT_ID_MAP.entries()) {
  INPUT_VALUES.set(value, 0);
}

navigator.requestMIDIAccess().then(midiSuccess, midiFailure);
function midiSuccess (midi) {
  var inputs = midi.inputs.values();  // inputs is an Iterator

  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
    // each time there is a midi message call the onMIDIMessage function
    input.value.onmidimessage = onMIDIMessage;
  }
}
function midiFailure () {
  console.error('No access to your midi devices.')
}


function onMIDIMessage(message) {
  var inputID = message.data[1];
  var value = message.data[2];
  var keyName = INPUT_ID_MAP.get(inputID);
  // update midi vals in global map
  INPUT_VALUES.set(keyName, value);
  midiChannel.postMessage({ keyName: keyName, value: value });
}

function midiVal(name){
  return INPUT_VALUES.get(name);
}

function between(x, min, max) {
  return x >= min && x <= max;
}