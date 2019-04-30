$(document).ready(function() {
	let cardLayout = {
		column: 6,
		row: 6
	};
	let memoryValue = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
	let testOne = 0;
	let turns = 0;
	let tries = 0;
	let seconds = 0;
	let minutes = 0;
	
	
	let doesItMatch = [];

	function startLayout(column, row) {
		$('#timer').text("Timer: 0:00");
		$('#card_flips').text("Turns: 0");
	  for (outer = 0; outer < column; outer++){
		for (inner = 0; inner < row; inner++){
		  testOne++;
		  if (testOne == 6){testOne = 0;}
		  $('.row').append(
			"<div class='col-2' id=" + outer + inner + ">"+
			  "<div class='card-container'></div>"+
			  "<div class='card-value' data-test="+ testOne +"><span>" + testOne + "</span>"+
			"</div></div>"
		  );
		}
	  }
	}
	function timerIncrement() {
		let leading_zero = '0';
		seconds++;
		
		if(seconds > 9){ leading_zero = '';}
		if(seconds == 60){
			minutes++;
			seconds = 0;
		}
		$('#timer').text("Timer: " + minutes + ":" + leading_zero + seconds);
	}
	startLayout(cardLayout.column, cardLayout.row);
	
	$(document).on('click', '#start', function() {
		setInterval(timerIncrement, 1000);
		$('.row').removeClass('disabled');
	});
	$(document).on('click', '#reset', function() {
		seconds = 0;
		minutes = 0;
		tries = 0;
		$('.row').html("");
		startLayout(cardLayout.column, cardLayout.row);
		$('.card-value').hide();
	})
	
	$('.card-value').hide();
	$(document).on('click', '.col-2', function() {
		let selectedCard = $(this).attr('id');
		let checkValue = $(this).children('.card-value').data('test');
		
		doesItMatch.push(checkValue);
		console.log(doesItMatch);
		turns++;

		// idea use check box to determine if selected or not
		
		$('#' + selectedCard + ' .card-container').toggle();
		$('#' + selectedCard + ' .card-container').addClass('selected');
		$('#' + selectedCard + ' .card-value').toggle();

		if (turns == 2) {
			if (doesItMatch[0] === doesItMatch[1]){
				$('[data-test="'+checkValue+'"] span').text('MATCH');
				$('[data-test="'+checkValue+'"]').addClass('card-match');
				$('[data-test="'+checkValue+'"]').removeClass('card-value');
				$('div.selected').remove();
				
			} else {
				$('.card-container').show();
				$('.card-value').hide();
			}
			turns = 0;
			doesItMatch= [];
			tries++;
		}
		
		$('#card_flips').text("Turns: " + tries);

	})
});