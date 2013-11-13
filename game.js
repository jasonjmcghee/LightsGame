var hardcore = false;
var flipClass = '';
var gridSize = 5;
var numMoves = 0;

if (hardcore) {
	flipClass = 'hardFlip';
} else {
	flipClass = 'flipped';
}

function setNewSize(size) {
	var grid = document.getElementsByClassName('grid')[0];
	document.getElementById('container').removeChild(grid);
	if (typeof(parseInt(size)) == "number") {
		initialize(parseInt(size));
	} else {
		alert('Not a valid size. Defaulting to 3x3.');
		initialize(3);
	}
}

function initialize(n) {
	numMoves = 0;
	document.getElementById("numMoves").textContent = 'Moves so far: ' + numMoves;
	gridSize = n;
	var ul = document.createElement('ul');
	ul.className = 'grid';
	var totalSize = 600;
	ul.style.width = totalSize.toString() + 'px';
	ul.style.height = totalSize.toString() + 'px';
	document.getElementById('container').appendChild(ul);
	var grid = document.getElementsByClassName('grid')[0];

	var marginSize = Math.ceil(45 / gridSize);
	var margin = marginSize.toString() + 'px';
	var boxSize = Math.floor((totalSize - marginSize*(gridSize)) / gridSize);
	var offset = (600 - ((boxSize*(gridSize)) + (marginSize*(gridSize))));

	if (offset < 0) {
		boxSize += Math.floor(offset/gridSize);
	}
	var size = boxSize.toString() + 'px';

	for (var i = gridSize*gridSize; i > 0; i--) {
		var li = document.createElement('li');
		li.style.width = size;
		li.style.height = size;
		li.style.marginLeft = margin;
		li.style.marginTop = margin;
		grid.appendChild(li);
	}

	var nodeList = document.getElementsByTagName('li');
	var nodeArray = [];
	for (var i = 0; i < nodeList.length; i++) {
		nodeArray[i] = nodeList[i];
	}
	nodeArray.forEach(function(e, i, a) {
		e.addEventListener('click', function(){ 
			flipAdjacent(e, i); 
			numMoves++; 
			document.getElementById("numMoves").textContent = 'Moves so far: ' + numMoves;
		});
	});

	
}

function flip(element) {

	if (element.className == flipClass) {
		element.className = '';
	} else {
		element.className = flipClass;
	}
}

function flipAdjacent(element, index) {
	var row = Math.floor(index / gridSize);
	var col = index % gridSize;
	flip(element);
	var adjacent = [[col-1, row], [col+1, row], [col, row-1], [col, row+1]];
	adjacent.forEach(function(point, i, a) {
		if (point[0] >= 0 && point[0] < gridSize) {
			if (point[1] >= 0 && point[1] < gridSize) {
				flip(document.getElementsByTagName('li')[point[1]*gridSize + point[0]]);
			}
		}
	});

	var isWinner = true;
	var nodeList = document.getElementsByTagName('li');
	var nodeArray = [];
	for (var i = 0; i < nodeList.length; i++) {
		nodeArray[i] = nodeList[i];
	}
	nodeArray.forEach(function(e, i, a) {
		if (hardcore) {
			if (e.className != flipClass) isWinner = false;
		} else {
			if (e.className == flipClass) isWinner = false;
		}
	});
	if (isWinner) {
		defaultSetup();
		alert('You won in:' + numMoves + '!');
		defaultSetup();

	}
}

function defaultSetup() {
	setNewSize(document.getElementsByClassName('sizeInput')[0].value);
	randomize();
}

function toggleHardcore() {
	if(hardcore) { 
		hardcore = false; 
		flipClass = 'flipped';
	}
	else { 
		hardcore = true;
		flipClass = 'hardFlip'; 
	}
}

function randomize() {
	var nodeList = document.getElementsByTagName('li');
	var nodeArray = [];
	for (var i = 0; i < nodeList.length; i++) {
		nodeArray[i] = nodeList[i];
	}
	var gridSize = document.getElementsByClassName('sizeInput')[0].value;
	nodeArray.forEach(function(e, i, a) {
		if (Math.random() > 0.8) flipAdjacent(e);
	});
}

function updateSizeText() {
	if (document.getElementsByClassName('sizeInput')[0].value) {
		var size = document.getElementsByClassName('sizeInput')[0].value
		document.getElementById('nxn').textContent = "Game Size: " + size.toString() + 'x' + size.toString();
	}
}