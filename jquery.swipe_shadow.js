/**
 * Created by github.com/jQuadros on 01/04/16.
 */

jQuery.fn.onSwipe = function(toLeft, toRight){

	var xStart = null;
	var xEnd = null;
	var distance = null;

	var toLeftGlobal = function() {};
	var toRightGlobal = function() {};

	this.each(function(){
		jqElem = $(this);

		jqElem.prepend('<div id="div-next" class="div-shadow" style="height: 100%; width: 30px; z-index: 10; position: absolute; right: 0px; text-align: center; display: block; visibility: hidden; border-radius: 99px 0px 0px 99px; background:rgba(0,0,0,0.1);"></div>');
		jqElem.prepend('<div id="div-prev" class="div-shadow" style="height: 100%; width: 30px; z-index: 10; position: absolute; left: 0px;  text-align: center; display: block; visibility: hidden; border-radius: 0px 99px 99px 0px; background:rgba(0,0,0,0.1);"></div>');

		jqElem.on('touchstart', handleTouchStart);
		jqElem.on('touchend', handleTouchEnd);
		jqElem.on('touchmove', handleTouchMove);

		if(toLeft)
			toLeftGlobal = toLeft;
		
		if(toRight)
			toRightGlobal = toRight;

		return this;
	});

	function handleTouchEnd(evt) {
		xEnd = evt.originalEvent.changedTouches[0].clientX;
		hideShadow();
		swipe();
	};

	function handleTouchStart(evt) {
		xStart = evt.originalEvent.changedTouches[0].clientX;
	};

	function handleTouchMove(evt) {
		distance = evt.originalEvent.changedTouches[0].clientX - xStart;
		var direction = distance > 0 ? 'prev' : 'next';
	    if(Math.abs(distance) > 250) {
	        document.getElementById('div-'+direction).style.visibility = "visible";
	        document.getElementById('div-'+direction).style.width = Math.abs(distance)/10+'px';
	        showShadow(direction);
	    }
	    else {
	        hideShadow(); 
	    }
	};

	function showShadow(div) {
		document.getElementById('div-'+div).style.display = 'block';
	};

	function hideShadow() {
		for(var i = 0; i < document.getElementsByClassName('div-shadow').length; i ++) {
			document.getElementsByClassName('div-shadow')[i].style.display = 'none';
		}
	};

	function swipe() {

		if((Math.abs(xEnd - xStart) > 200) && (Math.abs(distance) > 250)) {
			if(xEnd > xStart) {
				toLeftGlobal();
			}
			else if(xEnd < xStart){
				toRightGlobal();
			}
		}
	};
};
