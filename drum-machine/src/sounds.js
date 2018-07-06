import {Sample} from './scheduling.js';

// Sampled sounds
var kickSample, snareSample, tom1Sample, tom2Sample, hhopenSample, hhclosedSample, blip1Sample, blip2Sample;

// create an array of frequencies corresponding to MIDI notes
let A = 440.0;
let midiNotes = [];
for (let i = 0; i < 127; i++) {
  midiNotes[i] = A * Math.pow(2, (i - 69) / 12);
}

// convert MIDI note to frequency
const midiToFreq = note => {
  return A * Math.pow(2, (note - 69) / 12);
};

// Create a buffer filled with Noise (random values between -1 and 1)
const noiseBuffer = context => {
  let bufferSize = context.sampleRate;
  let buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  let output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  return buffer;
};

function generateIR(context, duration, decay) {
  let sampleRate = context.sampleRate;
  let length = sampleRate * duration;
  let impulse = context.createBuffer(2, length, sampleRate);
  let impulseL = impulse.getChannelData(0);
  let impulseR = impulse.getChannelData(1);

  if (!decay) decay = 2.0;
  for (let i = 0; i < length; i++) {
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
  }
  return impulse;
}

function init(context) {

  kickSample = new Sample(context);
  kickSample.load("/samples/kick.wav");
  snareSample = new Sample(context);
  snareSample.load("/samples/snare.wav");
  tom1Sample = new Sample(context);
  tom1Sample.load("/samples/tom_lo.wav");
  tom2Sample = new Sample(context);
  tom2Sample.load("/samples/tom_hi.wav");
  hhopenSample = new Sample(context);
  hhopenSample.load("/samples/hh_o.wav");
  hhclosedSample = new Sample(context);
  hhclosedSample.load("/samples/hh_c.wav");
  blip1Sample = new Sample(context);
  blip1Sample.load("/samples/blip_1.wav");
  blip2Sample = new Sample(context);
  blip2Sample.load("/samples/blip_2.wav");

}

// Kick
function synthKick(context, destination) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.frequency.value = 3000;

  // osc.type = 'sawtooth';
  osc.frequency.value = 100;
  osc.connect(filter);
  filter.connect(gain);

  gain.connect(destination);
  gain.gain.value = 0;

  osc.start(context.currentTime);

  osc.frequency.exponentialRampToValueAtTime(60, context.currentTime + 0.1);
  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.0001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0.9, 0.8, 0.5, 0]),
    context.currentTime + 0.0001,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.1);
}

function kick(context, destination) {

  kickSample.play(context, destination);

}

// Snare
function synthSnare(context, destination) {
  const noise = context.createBufferSource();
  noise.buffer = noiseBuffer(context);
  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.1;
  const filter = context.createBiquadFilter();
  filter.frequency.value = 8000;
  const gain = context.createGain();

  const osc = context.createOscillator();
  osc.frequency.value = 200;
  const oscGain = context.createGain();
  osc.connect(oscGain);
  oscGain.connect(gain);
  oscGain.gain.value = 0.4;

  noise.connect(noiseGain);
  noiseGain.connect(gain);

  gain.connect(filter);
  gain.gain.value = 0;
  filter.connect(destination);

  noise.start(context.currentTime);
  osc.start(context.currentTime);

  const LENGTH = 0.2;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
}

function snare(context, destination) {

  snareSample.play(context, destination);

}

// Tom 1
function synthTom1(context, destination) {
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = 'sine';
  osc.frequency.value = 250;
  osc.connect(gain);

  gain.connect(destination);
  gain.gain.value = 0;

  osc.start(context.currentTime);

  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.1);
}

function tom1(context, destination) {

  tom1Sample.play(context, destination);

}

// Tom 2
function synthTom2(context, destination) {
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = 'sine';
  osc.frequency.value = 150;
  osc.connect(gain);

  gain.connect(destination);
  gain.gain.value = 0;

  osc.start(context.currentTime);

  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.1);
}

function tom2(context, destination) {

  tom2Sample.play(context, destination);

}

// HH Open
function synthHHOpen(context, destination) {
  const noise = context.createBufferSource();
  noise.buffer = noiseBuffer(context);
  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.5;
  const filter = context.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;

  const osc = context.createOscillator();
  osc.frequency.value = 2000;
  const oscGain = context.createGain();
  oscGain.gain.value = 0.2;

  const gain = context.createGain();

  noise.connect(noiseGain);
  noiseGain.connect(gain);

  osc.connect(oscGain);
  oscGain.connect(gain);

  gain.connect(filter);
  gain.gain.value = 0;
  filter.connect(destination);

  noise.start(context.currentTime);
  osc.start(context.currentTime);

  const LENGTH = 0.5;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
}

function HHOpen(context, destination) {

  hhopenSample.play(context, destination);

}

//HH Closed
function synthHHClosed(context, destination) {
  const noise = context.createBufferSource();
  noise.buffer = noiseBuffer(context);
  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.5;
  const filter = context.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;

  const osc = context.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = 2000;
  const oscGain = context.createGain();
  oscGain.gain.value = 0.2;

  const gain = context.createGain();

  noise.connect(noiseGain);
  noiseGain.connect(gain);

  osc.connect(oscGain);
  oscGain.connect(gain);

  gain.connect(filter);
  gain.gain.value = 0;
  filter.connect(destination);

  noise.start(context.currentTime);
  osc.start(context.currentTime);

  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
}

function HHClosed(context, destination) {

  hhclosedSample.play(context, destination);

}

// Aux 1
function aux1(context, destination) {
  const osc = context.createOscillator();
  osc.type = 'sawtooth';
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.connect(gain);

  // osc.type = '';
  let randomNote = (Math.random() * 30 + 30) | 0;
  osc.frequency.value = midiToFreq(randomNote);
  osc.frequency.linearRampToValueAtTime(
    midiToFreq(randomNote),
    context.currentTime + 0.1
  );

  osc.start(context.getCurrentTime);
  osc.connect(filter);
  gain.connect(destination);
  gain.gain.value = 0;

  const LENGTH = 2;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.2);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.2,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.4);
}

function blip1(context, destination) {

  blip1Sample.play(context, destination);

}

// Aux 2
function aux2(context, destination) {
  const osc = context.createOscillator();
  osc.type = 'sawtooth';
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.connect(gain);

  let randomNote = (Math.random() * 30 + 50) | 0;
  osc.frequency.value = midiToFreq(randomNote);
  osc.frequency.linearRampToValueAtTime(
    midiToFreq(randomNote),
    context.currentTime + 0.1
  );
  osc.start(context.getCurrentTime);
  osc.connect(filter);
  gain.gain.value = 0;
  gain.connect(destination);

  const LENGTH = 2;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.2);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.2,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.4);
}

function blip2(context, destination) {

  blip2.play(context, destination);

}

export { kick, snare, tom1, tom2, HHOpen, HHClosed, aux1, aux2, generateIR, init };
