
$(document).on('ready', init1);

function init1(){

	waitForHover();
}

function generateBG(){

	$('body').css({'background-color':'blue'})

}


function waitForHover(){


	$('#blah').on('mouseover', function(e){
	$('#blah').html("Let's learn some code");

	})
	$('#blah').on('mouseout', function(e){
	$('#blah').html("Phoding: Phaser to Code Games");

	})
}





