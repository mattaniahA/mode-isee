const midiChannel = new BroadcastChannel('midi-channel');

const TRACK_LEFT = 'track_left';
const TRACK_RIGHT = 'track_right';
const CYCLE = 'cycle';
const MARKER_SET = 'marker_set';
const MARKER_LEFT = 'marker_left';
const MARKER_RIGHT = 'marker_right';
const REWIND = 'rewind';
const FORWARD = 'forward';
const STOP = 'stop';
const PLAY = 'play';
const RECORD = 'record';
const S1 = 'S1';
const S2 = 'S2';
const S3 = 'S3';
const S4 = 'S4';
const S5 = 'S5';
const S6 = 'S6';
const S7 = 'S7';
const S8 = 'S8';
const M1 = 'M1';
const M2 = 'M2';
const M3 = 'M3';
const M4 = 'M4';
const M5 = 'M5';
const M6 = 'M6';
const M7 = 'M7';
const M8 = 'M8';
const R1 = 'R1';
const R2 = 'R2';
const R3 = 'R3';
const R4 = 'R4';
const R5 = 'R5';
const R6 = 'R6';
const R7 = 'R7';
const R8 = 'R8';
const SLIDER1 = 'SLIDER1';
const SLIDER2 = 'SLIDER2';
const SLIDER3 = 'SLIDER3';
const SLIDER4 = 'SLIDER4';
const SLIDER5 = 'SLIDER5';
const SLIDER6 = 'SLIDER6';
const SLIDER7 = 'SLIDER7';
const SLIDER8 = 'SLIDER8';
const KNOB1 = 'KNOB1';
const KNOB2 = 'KNOB2';
const KNOB3 = 'KNOB3';
const KNOB4 = 'KNOB4';
const KNOB5 = 'KNOB5';
const KNOB6 = 'KNOB6';
const KNOB7 = 'KNOB7';
const KNOB8 = 'KNOB8';

const INPUT_ID_MAP = new Map([
  [58, TRACK_LEFT],
  [59, TRACK_RIGHT],
  [46, CYCLE],
  [60, MARKER_SET],
  [61, MARKER_LEFT],
  [62, MARKER_RIGHT],
  [43, REWIND],
  [44, FORWARD],
  [42, STOP],
  [41, PLAY],
  [45, RECORD],
  [32, S1],
  [33, S2],
  [34, S3],
  [35, S4],
  [36, S5],
  [37, S6],
  [38, S7],
  [39, S8],
  [48, M1],
  [49, M2],
  [50, M3],
  [51, M4],
  [52, M5],
  [53, M6],
  [54, M7],
  [55, M8],
  [64, R1],
  [65, R2],
  [66, R3],
  [67, R4],
  [68, R5],
  [69, R6],
  [70, R7],
  [71, R8],
  [0, SLIDER1],
  [1, SLIDER2],
  [2, SLIDER3],
  [3, SLIDER4],
  [4, SLIDER5],
  [5, SLIDER6],
  [6, SLIDER7],
  [7, SLIDER8],
  [16, KNOB1],
  [17, KNOB2],
  [18, KNOB3],
  [19, KNOB4],
  [20, KNOB5],
  [21, KNOB6],
  [22, KNOB7],
  [23, KNOB8],
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
function isKeyDown(name){
  if (midiVal(name) === 0){
    return false;
  }
  return true;
}

function between(x, min, max) {
  return x >= min && x <= max;
}