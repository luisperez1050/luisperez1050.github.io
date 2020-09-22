$(document).ready(function() {
	/*
	* V A R A I B L E S
	*/
	let cardLayout = {
		column: 6,
		row: 6
	};

	let cardValue = 0;
	let turns = 0;
	let tries = pad(0);
	let seconds = 0;
	let minutes = 0;
	let points = 0;
	let timeIntervalID = '';
	
	
	let doesItMatch = [];

	/*
	* B U I L D   U I   &   E V E N T S
	*/

	document.getElementById('start').addEventListener('click', () => {
		timeIntervalID = setInterval(timerIncrement, 1000);
		document.querySelector('.row').classList.remove('disabled');
		document.getElementById('start').setAttribute('disabled', '');
		document.getElementById('start').classList.remove('button-focus');
	});

	document.getElementById('reset').addEventListener('click', () => {
		seconds = 0;
		minutes = 0;
		tries = pad(0);
		points = 0;
		timerIncrement(true);
		document.querySelector('.row').innerHTML = ''; //clear out the cards to start over
		startLayout(cardLayout.column, cardLayout.row);

		document.querySelector('.row').classList.add('disabled');
		document.querySelector('.points').classList.remove('game-over');
		document.getElementById('start').removeAttribute('disabled');
		document.getElementById('start').classList.add('button-focus');
		clearInterval(timeIntervalID);
	});
	
	startLayout(cardLayout.column, cardLayout.row);
	
	// attach click events and determine if clicked cards match
	function attachCardFlipEvents() {
		document.querySelectorAll('.card-value').forEach(card => card.classList.add('hide'));

		const cards = document.querySelectorAll('.col-4');
		[...cards].forEach( card => {
			card.addEventListener('click', () => {
				let selectedCard = card.id;
				let checkValue = card.querySelector('.card-value').dataset.card_value;
				doesItMatch.push(checkValue);
				console.log(doesItMatch);
				turns++;
	
				document.getElementById(selectedCard).querySelector('.card-container').classList.toggle('hide');
				document.getElementById(selectedCard).querySelector('.card-container').classList.add('selected');
				document.getElementById(selectedCard).querySelector('.card-value').classList.toggle('hide');
				document.getElementById(selectedCard).style.pointerEvents = 'none'; // disables element, fixes bug where clicking the same card incorrectly marks a match
	
				if (turns == 2) {
					[...cards].forEach( card => card.style.pointerEvents = 'none');
					if (doesItMatch[0] === doesItMatch[1]){
						points++;
						points = pad(points);
						setTimeout(function() {
							document.getElementById('points').innerHTML = `Points: ${points}`;
							document.querySelectorAll(`.selected ~ [data-card_value="${checkValue}"] span`).forEach( match => match.innerHTML = 'MATCH');
							document.querySelectorAll(`.selected ~ [data-card_value="${checkValue}"]`).forEach( selected => selected.classList.add('card-match'));
							document.querySelectorAll(`.selected ~ [data-card_value="${checkValue}"]`).forEach( selected => selected.classList.remove('card-value'));
							[...cards].forEach( card => card.style.pointerEvents = 'all');
							document.querySelectorAll('div.selected').forEach( selected => selected.remove());
							
							if(points == 18){
								document.getElementById('points').innerHTML = " <h2> You win Yay! Reset Game to Start Over</h2>";
							}
						}, 1200);
						
					} else {
						setTimeout(function() {
							document.querySelectorAll('.card-container').forEach( container => container.classList.remove('hide'));
							document.querySelectorAll('.card-value').forEach( val => val.classList.add('hide'));
							document.querySelectorAll('.card-container').forEach( container => container.classList.remove('selected'));
							[...cards].forEach( card => card.style.pointerEvents = 'all');
						}, 1200);
					}
					turns = 0;
					doesItMatch= [];
					tries++;
					tries = pad(tries);
				}
				
				document.getElementById('card_flips').innerHTML = `Turns: ${tries}`;
	
			});
		});
	}


	/*
	* F U N C T I O N S
	*/

	function startLayout(column, row) {
		document.querySelector('#timer').innerHTML = "Timer: 0:00";
		document.querySelector('#card_flips').innerHTML = "Turns: 00";
		document.querySelector('#points').innerHTML = "Points: 00";


		
		for (outer = 0; outer < column; outer++){
			for (inner = 0; inner < row; inner++){
				cardValue++;
				if (cardValue == 6){cardValue = 0;}
				
				document.querySelector('.row').innerHTML +=
				`<div class='col-4 col-md-2' id="${outer}${inner}">
					<div class='card-container'></div>
					<div class='card-value' data-card_value="${cardValue}"><span> ${cardValue} </span> </div>
				</div>`;
			}
		}
		shuffle();
		attachCardFlipEvents();
	}
	// borrowed from JS fiddle
    function shuffle(){

		let all_cards = document.querySelectorAll('div.col-4');
		let divs = [...all_cards];

		for(let i = 0; i < divs.length; i++) document.getElementById(divs[i].id).parentNode.removeChild(document.getElementById(divs[i].id));            
		//the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
		let i = divs.length;
		if ( i == 0 ) return false;
		while ( --i ) {
			let j = Math.floor( Math.random() * ( i + 1 ) );
			let tempi = divs[i];
			let tempj = divs[j];
			divs[i] = tempj;
			divs[j] = tempi;
		}

		for(let i = 0; i < divs.length; i++) document.querySelector('.row').appendChild(divs[i]);
                    
	}
	// used to display timer
	function timerIncrement(clear = false) {
		seconds++;

		if (clear) {
			seconds = 0; 
			minutes = 0;
		}
		
		seconds = pad(seconds);

		if(seconds == 60){
			minutes++;
			seconds = 0;
			
			minutes = pad(minutes);
			seconds = pad(0);
		}

		if(minutes == 60) {
			document.querySelector('.row').classList.add('disabled');
			document.querySelector('.points').classList.add('game-over');
			document.querySelectorAll('.col-4').forEach(card => card.style.pointerEvents = 'none');
			clearInterval(timeIntervalID);
		}

		document.getElementById('timer').innerHTML = `Timer: ${minutes}:${seconds}`;
	}
	// add leading zero for UI
	function pad(number) {
		return (number < 10) ? (`0${number}`) : number;
	}

});