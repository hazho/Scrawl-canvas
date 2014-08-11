var mycode = function() {
	'use strict';
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');

	//define variables
	var pad,
		pat,
		dotty;

	//add canvass to web page
	scrawl.addCanvasToPage({
		canvasName: 'canvas',
		parentElement: 'canvasHolder',
		width: 400,
		height: 400,
	}).makeCurrent();
	pad = scrawl.pad.canvas;

	//create a new cell for the pattern
	pad.addNewCell({
		name: 'pat',
		width: 50,
		height: 50,
		backgroundColor: 'blue',
	});
	pat = scrawl.group.pat;

	//add sprites to the pattern cell ...
	scrawl.makeLine({
		name: 'guide',
		startX: -25,
		startY: 25,
		endX: 75,
		endY: 25,
		visibility: false,
		group: 'pat',
	});
	scrawl.newWheel({
		radius: 10,
		fillStyle: 'red',
		method: 'fill',
		path: 'guide',
		pathPlace: 0.25,
		deltaPathPlace: 0.002,
		handleY: -25,
		group: 'pat',
	}).clone({
		pathPlace: 0.75,
	}).clone({
		handleY: 25,
	}).clone({
		pathPlace: 0.25,
	}).clone({
		handleY: 0,
		pathPlace: 0.5,
	}).clone({
		pathPlace: 0,
	});
	scrawl.cell[pad.base].groups.push('pat');

	//build the pattern
	dotty = scrawl.newPattern({
		name: 'dotty',
		canvas: 'pat',
	});

	//add a block sprite, for showing off the pattern
	scrawl.newBlock({
		startX: 200,
		startY: 200,
		handleX: 'center',
		handleY: 'center',
		width: 200,
		height: 200,
		lineWidth: 40,
		lineJoin: 'round',
		lineCaps: 'round',
		method: 'draw',
		strokeStyle: 'dotty',
	});
	scrawl.newGroup({
		name: 'cover',
		order: 5,
	});
	scrawl.newBlock({
		width: 90,
		height: 75,
		fillStyle: 'white',
		group: 'cover',
	});

	//animation object
	scrawl.newAnimation({
		fn: function() {
			pat.updateStart();
			dotty.update();
			pad.render();

			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + Math.ceil(testTime) + '; fps: ' + Math.floor(1000 / testTime);
		},
	});
};

scrawl.loadModules({
	path: '../source/',
	minified: false,
	modules: ['block', 'images', 'path', 'wheel', 'factories', 'animation'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
