	var choices = ["rock","paper","scissors","lizard","spock"];

	/**
		0 : tie,
		1 : win,
	   -1 : loose
	**/
	var matrix = [
					  //["rock","paper","scissors","lizard","spock"]
		/* rock */		[     0,     -1,         1,       1,     -1],
		/* paper */		[     1,      0,        -1,      -1,      1],
		/* scissors */	[    -1,      1,         0,       1,     -1],
		/* lizard */	[    -1,      1,        -1,       0,      1],
		/* spock */		[     1,     -1,         1,      -1,      0],
		];
	// If you notice, it is a inverse matrix between + - 


	var messages = [
					  //["rock","paper","scissors","lizard","spock"]
		/* rock */		["Tie","Paper covers Rock","Rock crushes Scissors","Rock crushes Lizard","Spock vaporizes Rock"],
		/* paper */		["Paper covers Rock",  "Tie","Scissors cuts Paper","Lizard eats Paper","Paper disproves Spock"],
		/* scissors */	["Rock crushes Scissors","Scissors cuts Paper","Tie","Scissors decapitate Lizard","Spock smashes Scissors"],
		/* lizard */	["Rock crushes Lizard","Lizard eats Paper","Scissors decapitate Lizard","Tie","Lizard poisons Spock"],
		/* spock */		["Spock vaporizes Rock","Paper disproves Spock","Spock smashes Scissors","Lizard poisons Spock","Tie"],
		];

	var computerscore = 0, userscore = 0;

	function randomComputerChoices()
	{
		var max = choices.length - 1;
		var min = 0;
	    var index = Math.floor(Math.random()*(max-min+1)+min);
	    return choices[index];
	}

	function battle(userchoice,computerchoice){

		var userHand 		= userchoice[0];
		var computerHand 	= computerchoice[0];

		$("#result").removeClass("text-info")
			.removeClass("text-success")
			.removeClass("text-danger");

		var userIndex 		= choices.indexOf(userHand.id);
		var computerIndex 	= choices.indexOf(computerHand.id);

		var result 			= matrix[userIndex][computerIndex];
		var message 		= messages[userIndex][computerIndex];
		
		var userclass 		= "";
		var computerclass 	= "";

		var win             = "";

		if(result == 0){
			userclass 		= "text-info";
			computerclass 	= "text-info";
		} else if(result > 0) {
			userclass 		= "text-success";
			computerclass 	= "text-danger";
			win 			= "You win!";
			userscore++;
		} else if(result < 0) {
			userclass 		= "text-danger";
			computerclass 	= "text-success";
			win 			= "You lost!";
			computerscore++;
		}

		message += "<br>" + win;  
		
		$(userHand).addClass(userclass);
		$(computerHand).addClass(computerclass);

		$("#result").html(message).addClass(userclass);
		
		$("div#userscore").html(userscore);
		$("div#computerscore").html(computerscore);
	}

	$(document).ready(function() {
		
		$("span.hand").click(function() {

			var userchoice = $(this).clone();
			$(userchoice).removeClass("text-muted");
			$("div#user").html(userchoice).append("<br><span class='hand-text'>YOU</span>");

			var random = randomComputerChoices();
			
			var computerchoice = $("div#hands span#"+random).clone();
			$(computerchoice).removeClass("text-muted");
			$("div#computer").html(computerchoice).append("<br><span class='hand-text'>COMPUTER</span>");

			battle(userchoice,computerchoice);

		});

	});