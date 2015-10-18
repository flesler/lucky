#!/usr/bin/env node

const
	opts = require('commander'),
	cs = require('colors-mini'),
	crypto = require('crypto'),
	pkg = require('../package.json');

//- Options

opts
	.version(pkg.version)
	.description(pkg.description)
	//- Simulation
	.option('-o, --opponents <n>', 'Number of opponents competing [default 1]', Number, 1)
	.option('-r, --rounds <n>', 'Number of rounds simulated [default 100]', Number, 100)
	//- Output
	.option('-C, --no-colors', 'Do not use fancy colors in output')
	.option('-v, --verbose [level]', 'Verbosity level (0-4) [default 1]', Number, 1)
	.option('-s, --silent', 'Alias for --verbose=0')
	.option('-n, --number', 'Output only the luck number')
	.option('-8, --eightball', 'Transform into a magic 8-ball')

	.on('--help', function(){
	  console.log('  Exit code:');
	  console.log('');
	  console.log('    Exits successfully only if luck is above average');
	})
	.parse(process.argv);

// If no level provided, then maximum verbosity is assumed
if (opts.verbose === true) {
	opts.verbose = 4;
}
if (opts.number || opts.eightball || opts.silent) {
	opts.verbose = 0;
}

if (!opts.colors) {
	for (var key in cs) {
		cs[key] = function(s) { return s; };
	}
}

//- Utils

const PLAYERS = opts.opponents + 1;
const ROUNDS = opts.rounds;
const HUMAN_PLAYER = 0;


function log(level) {
	if (level <= opts.verbose) {
		var msg = [].slice.call(arguments, 1).join(' ');
		console.log(msg);
	}
}

function playerName(n) {
	return n === HUMAN_PLAYER ? cs.green('Human') : cs.red('CPU '+n);
}

function winsToLuck() {
	// Expected wins by an average simpleton (0% luck)
	var avg = ROUNDS / PLAYERS;
	var rem = humanWins - avg;
	return Math.round(rem * 100 / avg);
}

//- Simulation

log('Simulating', cs.grey(ROUNDS), 'rounds against', cs.red(opts.opponents), 'opponent(s)');

var humanWins = 0;
// The score of each player+round is a random byte
var scores = crypto.randomBytes(PLAYERS * ROUNDS);
for (var round = 0; round < ROUNDS; round++) {
	log(3, cs.cyan('Round ' + (round+1)));
	var max = 0, winner;

	for (var player = 0; player < PLAYERS; player++) {
		var score = scores[round * PLAYERS + player];
		log(4, cs.grey('->'), playerName(player), 'scored:', cs.grey(score));
		// Ties are given to CPUs
		if (score >= max) {
			max = score;
			winner = player;
		}
	}
	
	log(3, cs.grey('->'), 'The winner is', playerName(winner));
	if (winner === HUMAN_PLAYER) {
		humanWins++;
	}
}

//- Results

var luck = winsToLuck();
var lucky = luck > 0;
var unlucky = luck < 0;
var color = unlucky ? cs.red : cs.green;

log(2, 'You won', cs.green(humanWins), 'out of', cs.grey(ROUNDS), 'rounds against', cs.red(opts.opponents), 'opponent(s)');
log(1, 'Your luck is', color(Math.abs(luck)+'%'), unlucky ? 'below' : 'above', 'average');

if (opts.eightball) {
	var replies = lucky ?
		['Yes', 'Definitely!', 'Probably', 'Very likely'] :
		['No!', 'Nope', 'Hmmm', 'Nahhh', 'No way!'];
	console.log(replies[Math.floor(replies.length * Math.random())]);
}
if (opts.number) {
	console.log(luck);
}

// Allow other commands to be executed only if luck is above average
process.exit(lucky ? 0 : 1);