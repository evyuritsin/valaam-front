$(document).ready(function() {
    $('.slider-for').slick({
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    arrows: true,
	    prevArrow: '<img src="./img/arrow_prev_slider.png" alt="btn prev" class="gallery__btn-prev">',
	    nextArrow: '<img src="./img/arrow_next_slider.png" alt="btn next" class="gallery__btn-next">',
	    fade: true,
	    asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
	    slidesToShow: 6,
	    slidesToScroll: 1,
	    asNavFor: '.slider-for',
	    dots: false,
	    arrows: false,
	    centerMode: false,
	    focusOnSelect: true
    });
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
    $(".icon_date").flatpickr({
	    "locale": "ru"
	});
	$('.header__login-auth').click(function() {
		$('.modal__blocked').show();
		$('body').css('overflow', 'hidden');
		$('.modals').hide();
		$('.login').show();
	});
	$('.header__login-reg').click(function() {
		$('.modal__blocked').show();
		$('body').css('overflow', 'hidden');
		$('.modals').hide();
		$('.register').show();
	});
	$('.modal__close-link').click(function() {
		$(this).parent('.modals').hide();
		$('body').css('overflow', 'auto');
		$('.modal__blocked').hide();
	});
	$('.modal__blocked').click(function() {
		$('.modal__close-link').click();
	});
	$('.modal__forgot').click(function() {
		$('.modal__close-link').click();
		$('.modal__blocked').show();
		$('body').css('overflow', 'hidden');
		$('.modals').hide();
		$('.recovery-password').show();
	});			
	$('.modal__btn').click(function() {
		var bolean = $(this).closest('.modals').hasClass('login');
		$('.modals').hide();
		var res = (bolean) ? $('.register').show() :$('.login').show();
	});
	$('.placement-item__btn').click(function() {
		var parent = $(this).closest('.placement-item');
		var slider = parent.find('.placement-item__gallery-item');
		var geo = parent.find('.placement-item__geo');
		var title = parent.find('.placement-item__title');
		var desc = parent.find('.placement-item__desc');
		var prices = parent.find('.placement-item__prices');
		var btn = parent.find('.placement-item__btn');
		var included = parent.find('.placement-item__included');
		console.log(btn.attr('selectedOrder'));
		if (btn.attr('selectedOrder') === 'false') {
			slider.css('border-top', '3px solid #FF8A00').css('border-left', '3px solid #FF8A00').css('border-right', '3px solid #FF8A00');
			geo.css('border-left', '3px solid #FF8A00').css('border-right', '3px solid #FF8A00');
			title.css('border-left', '3px solid #FF8A00').css('border-right', '3px solid #FF8A00');
			desc.css('border-left', '3px solid #FF8A00').css('border-right', '3px solid #FF8A00');
			prices.css('border-left', '3px solid #FF8A00').css('border-right', '3px solid #FF8A00');
			btn.css('border-bottom', '3px solid #FF8A00')
				.css('border-left', '3px solid #FF8A00')
				.css('border-right', '3px solid #FF8A00')
				.css('background-color', '#FF8A00')
				.text('Отменить выбор');
			included.css('top','3px');
			btn.attr('selectedOrder', 'true');
		} else {
			slider.css('border-top', 'none').css('border-left', 'none').css('border-right', 'none');
			btn.attr('style', '').text('Добавить в заявку');
			geo.attr('style', '');
			title.attr('style', '');
			desc.attr('style', '');
			prices.attr('style', '');
			included.attr('style', '');
			btn.attr('selectedOrder', 'false');			
		}
		$('.placement-select__list').html('');
		$('.placement-item__btn[selectedOrder=true]').each(function (index, element){
			var caption = $(element).closest('.placement-item').find('.placement-item__title').text();
			$('.placement-select__list').append('<li class="placement-select__item">' + caption + '</li>');
		});
	});
	$('[showmodal]').click(function() {
		$('.' + $(this).attr('showmodal')).css('width', $(this).css('width'));
	});
	$('[showmodal=count-list]').click(function() {
		$('.popup').hide();
		var pos = $(this).position();
		var showTarget = $('.' + $(this).attr('showmodal'));
		var keyObj = $(this).attr('inputobj');
		var data = $(this).attr('data');
		if (data != '') {
			var arrData = JSON.parse(data);
			for (var key in arrData) {
				showTarget.find('span:contains("' + key + '")').closest('.index-form').find('.index-form__value').text(arrData[key]);
			}					
		}
		showTarget.css('top', pos.top + $(this).height() + 2).css('left', pos.left).attr('obj', keyObj).show();
	});

	$('[showmodal=duration-list]').click(function() {
		$('.popup').hide();
		var pos = $(this).position();
		var showTarget = $('.' + $(this).attr('showmodal'));
		var keyObj = $(this).attr('inputobj');
		showTarget.css('top', pos.top + $(this).height() + 2).css('left', pos.left).attr('obj', keyObj).show();

	});
	$('[showmodal=geo-list]').click(function() {
		$('.popup').hide();
		var pos = $(this).position();
		var showTarget = $('.' + $(this).attr('showmodal'));
		var keyObj = $(this).attr('inputobj');
		showTarget.css('top', pos.top + $(this).height() + 2).css('left', pos.left).attr('obj', keyObj).show();

	});		
	$('.popup__composition-btn').click(function() {
		var output = [];
		const data = {};
		var target = $(this).closest('.popup__composition');
		var key = target.attr('obj');
		target.find('.index-form').each(function (index, element) {
			var label = $(element).find('.index-form__text').text();
			var value = $(element).find('.index-form__value').text();
			if (value != '0') {
				output.push(label + ' - ' + value);
				data[label] = value;						
			}

		});
		$('[inputobj=' + key + ']').val(output.join(' ')).attr('data', JSON.stringify(data));
		target.find('.index-form__value').text('0');
		target.hide();
	});
	$('.popup__listing input[type=checkbox]').click(function() {
		var list = [];
		const data = {};
		var key = $(this).closest('.popup__listing').attr('obj');
		$(this).closest('.popup__listing').find('input[type=checkbox]').each(function (index, element) {
			if ($(element).is(':checked')) {
				list.push($(element).parent().find('.checkbox__text').text());
				data[index] = $(element).parent().find('.checkbox__text').text();
			}
		});
		$('[inputobj=' + key + ']').val(list.join('; ')).attr('data', JSON.stringify(data));
	});
	$('.popup').blur(function() {
		$('.popup').hide();
	});
	$('.vp-tab').click(function() {
		var idTab = $(this).attr('id-tab');
		console.log(idTab);
		$('.vp-tab').removeClass('vp-tab_active');
		$(this).addClass('vp-tab_active');
		$('.vp-tab-content').removeClass('vp-tab-content_active');
		$('[id-tab-content=' + idTab + ']').addClass('vp-tab-content_active');	
	});
});