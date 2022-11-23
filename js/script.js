$(document).ready(function() {
	$('.index-form__btn-minus').click(function() {
		var target = $(this).parent().find('.index-form__value');
		var value = Number(target.text());
		var maxValue = Number($(this).parent().attr('maxValue'));
		var minValue = Number($(this).parent().attr('minValue'));
		if (value > minValue) {
			target.text(value - 1);
		}		
	});
	$('.index-form__btn-plus').click(function() {
		var target = $(this).parent().find('.index-form__value');
		var value = Number(target.text());
		var maxValue = Number($(this).parent().attr('maxValue'));
		var minValue = Number($(this).parent().attr('minValue'));	
		if (value < maxValue) {
			target.text(value + 1);
		}		
	});	
});