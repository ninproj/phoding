
$(document).on('ready', init1);

function init1(){

	waitForHover();
}

function generateBG(){

	$('body').css({'background-color':'blue'})

}


var toggle =true;

function waitForHover(){

	
		$('#blah').on('mouseover', function(e){

			if(toggle === true){
				$('#blah').html("Let's learn some code");
				toggle=false;
			}
			else{
				$('#blah').html("Phoding");
				toggle=true;
			}

		})


		$('#blah').on('mouseout', function(e){

			$('#blah').html("Hello!");
			

		})
	

	

}





