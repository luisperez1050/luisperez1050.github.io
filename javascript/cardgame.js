$(document).ready(function() {
	/*
	* V A R A I B L E S
	*/
	let cardLayout = {
		column: 6,
		row: 6
	};
	let memoryValue = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
	let cardValue = 0;
	let turns = 0;
	let tries = pad(0);
	let seconds = 0;
	let minutes = 0;
	let points = 0;
	
	
	let doesItMatch = [];

	/*
	* B U I L D   U I   &   E V E N T S
	*/
	let mode = document.querySelector('input[name="mode"]:checked').value;
	let test = document.querySelector('input[name="mode"]').value;
	document.querySelector('input[name="mode"]').addEventListener('click', () => {
		console.log(test);
	});
console.log(test);

	document.querySelector('#start').addEventListener('click', () => {
		setInterval(timerIncrement, 1000);
		document.querySelector('.row').classList.remove('disabled');
		document.querySelector('#start').setAttribute('disabled', '');
	});
	document.querySelector('#game_mode').addEventListener('click', () => {
		document.querySelector('.card-settings').classList.toggle('hide');
		document.querySelector('#start').setAttribute('disabled', '');
		document.querySelector('#reset').setAttribute('disabled', '');
	});
	// document.querySelector('#submit_mode').addEventListener('submit', () => {
	// 	document.querySelector('#start').removeAttribute('disabled', '');
	// 	document.querySelector('#reset').removeAttribute('disabled', '');
	// 	console.log('luis');
	// });

	document.querySelector('#reset').addEventListener('click', () => {
		seconds, minutes, tries, points = 0;
		document.querySelector('.row').innerHTML = '';
		startLayout(6,6);
		//need to iterate every element
		document.querySelectorAll('.card-value').forEach(card => card.classList.add('hide'));
	});

	document.querySelector('#easy_mode').addEventListener('click', () => {
		startLayout(4,4);
	});

	document.querySelector('#medium_mode').addEventListener('click', () => {
		startLayout(6,6);
	});
	
	// startLayout(cardLayout.column, cardLayout.row);
	startLayout(6,6);
	

	
	$('.card-value').hide();
	$(document).on('click', '.col-4', function() {
		let selectedCard = $(this).attr('id');
		let checkValue = $(this).children('.card-value').data('test');
		
		doesItMatch.push(checkValue);
		console.log(doesItMatch);
		turns++;
		
		$(`#${selectedCard} .card-container`).toggle();
		$(`#${selectedCard} .card-container`).addClass('selected');
		$(`#${selectedCard} .card-value`).toggle();

		if (turns == 2) {
			$('.col-4').css('pointer-events', 'none');
			if (doesItMatch[0] === doesItMatch[1]){
				points++;
				points = pad(points);
				setTimeout(function() {
					$('#points').text(`Points: ${points}`);
					$(`.selected ~ [data-test="${checkValue}"] span`).text('MATCH');
					$(`.selected ~ [data-test="${checkValue}"]`).addClass('card-match');
					$(`.selected ~ [data-test="${checkValue}"]`).removeClass('card-value');
					$('.col-4').css('pointer-events', 'all');
					$('div.selected').remove();
					
					if(points === 18){
						$('#points').append(" <h2> You win Yay! Reset Game to Start Over</h2>");
					}
				}, 1200);
				
			} else {
				setTimeout(function() {
					$('.card-container').show();
					$('.card-value').hide();
					$('.card-container').removeClass('selected');
					$('.col-4').css('pointer-events', 'all');
				}, 1200);
			}
			turns = 0;
			doesItMatch= [];
			tries++;
			tries = pad(tries);
		}
		
		$('#card_flips').text(`Turns: ${tries}`);

	});

	/*
	* F U N C T I O N S
	*/

	function startLayout(column, row) {
		const mode = document.querySelector('input[name="mode"]:checked').value;
		document.querySelector('#timer').innerHTML = "Timer: 0:00";
		document.querySelector('#card_flips').innerHTML = "Turns: 00";
		document.querySelector('#points').innerHTML = "Points: 00";


		
		for (outer = 0; outer < column; outer++){
			for (inner = 0; inner < row; inner++){
				cardValue++;
				if (cardValue == 6){cardValue = 0;}
				
				$('.row').append(
				`<div class='col-4 col-md-2' id="${outer}${inner}">
					<div class='card-container'></div>
					<div class='card-value' data-test="${cardValue}"><span> ${cardValue} </span> </div>
				</div>`
				);
			}
		}
		shuffle();
	}
	// borrowed from JS fiddle
    function shuffle(){
        $('.row').each(function(){
            var divs = $(this).find('div.col-4');
            for(var i = 0; i < divs.length; i++) $(divs[i]).remove();            
            //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
            var i = divs.length;
            if ( i == 0 ) return false;
            while ( --i ) {
				var j = Math.floor( Math.random() * ( i + 1 ) );
				var tempi = divs[i];
				var tempj = divs[j];
				divs[i] = tempj;
				divs[j] = tempi;
			}
            for(var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
        });                    
	}
	// used to display timer
	function timerIncrement() {
		seconds++;
		seconds = pad(seconds);

		if(seconds == 60){
			minutes++;
			minutes = pad(minutes);
			seconds = pad(0);
		}
		$('#timer').text(`Timer: ${minutes}:${seconds}`);
	}
	// add leading zero for UI
	function pad(number) {
		return (number < 10) ? (`0${number}`) : number;
	}

});