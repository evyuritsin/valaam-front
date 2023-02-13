$(document).ready(function() {
    const jsformat = 'MM.DD.YYYY'
    const phpformat = 'YYYY-MM-DD'
    function setupMask() {
		$("[name=passSN]").mask("9999 999999");
		$("[name=telefon]").add('.icon_telefon').add('.input_phone').mask("+7 (999) 999 99 99");
        $("input.modal_phone[name='phone'], " +
            "input.input__text[name='phone'], " +
            "input.input__text[name='company_phone'], " +
            "input.input__text[name='bank_phone']").mask("+7 (999) 999 99 99");    
    }
	function centerViewObj(obj) {
		var height_doc = $(document).scrollTop();
		var height_view = $(window).height();
		var width_view = $(window).width();
		var height_obj = obj.height();
		var width_obj = obj.width();		
		var center_x = (width_view / 2) - (width_obj / 2);
		var center_y = (height_doc + (height_view / 2)) - (height_obj / 2);
		obj.css('top', center_y + 'px').css('left', center_x + 'px');	
	}
	function formatDay(countDay) {
		var countNight = countDay - 1;
		switch (countDay) {
			case '1':
				return countDay + ' день';
				break;
			case '2':
				return countDay + ' дня / ' + countNight + ' ночь';
				break;
			case '3':
			case '4':
				return countDay + ' дня / ' + countNight + ' ночи';
				break;
			case '5':
				return countDay + ' дней / ' + countNight + ' ночи';
				break;
			case '21':
			case '31':
			case '41':
			case '51':
				return countDay + ' день / ' + countNight + ' ночей';
				break;					
			default:
			   return countDay + ' дней / ' + countNight + ' ночей';
		}
	}
	/*10-02-23*/
    function calcBuyTickets(obj) {
    	var conteiner = $('.buy-tickets-form');
    	var conteinerModal = $('.edit-order__content');
    	if (conteiner.length > 0) {
	    	var value = 0;
	    	conteiner.find('.index-form').each(function (index, el){
		    	var count = Number($(el).find('.index-form__value').text());
		    	var price = Number($(el).find('.index-form__price').attr('value'));
		    	value = value + (count * price);  		
	    	});
	    	conteiner
	    		.find('.buy-tickets-form__price')
	    		.attr('value', value)
	    		.text(value + ' ₽');   		
    	}
		if (conteinerModal.length > 0) {
	    	var valueModal = 0;
	    	conteinerModal.find('.index-form').each(function (index, el){
		    	var count = Number($(el).find('.index-form__value').text());
		    	var price = Number($(el).find('.index-form__price').attr('value'));
		    	valueModal = valueModal + (count * price);		    			
	    	});    	
	    	conteinerModal
	    		.find('.buy-tickets-form__price')
	    		.attr('value', valueModal)
	    		.text(valueModal + ' ₽');
		}
    }
    /*10-02-23*/
    function updateTouristForm() {
		$('.tourist_block').not('.order-form_clone').remove();
		$('.order-form_clone').show();
		var clone = $('.order-form_clone');
		$('.edit-order__content')
			.find('.index-form')
			.each(function (i, element){
				var count = Number($(element).find('.index-form__value').text());
				var label = $(element).find('.index-form_label').text();
				for(var counter = 0; counter < count; counter++) {
					var newBlock = $(clone).before(clone.clone());
					newBlock.removeClass('order-form_clone').find('.order-form__subtitle').text(label);
					newBlock.find('[inputobj]').each(function (j, el){
						var rand = Math.floor(Math.random() * 100000);
						$(el).attr('inputobj', rand);
					});
				}
		});
		$('.order-form_clone').hide();
		setupMask();
    }
	function getDaysInMonth(month, year) {
	  var date = new Date(year, month, 1);
	  var days = [];
	  while (date.getMonth() === month) {
	  	var newDate = new Date(date);
	  	var fDate = [];
	  	var fMonth = newDate.getMonth() + 1;
	  	if (newDate.getDate() <= 9) {
	  		fDate[0] = '0' + newDate.getDate();
	  	} else {
	  		fDate[0] = newDate.getDate();
	  	}
	  	if (fMonth <= 9) {
	  		fDate[1] = '0' + fMonth;
	  	} else {
	  		fDate[1] = fMonth;
	  	}
	  	fDate[2] = newDate.getFullYear(); 	
	    days.push(fDate[1] + '.' + fDate[0] + '.' + fDate[2]);
	    //days.push(date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear());
	    date.setDate(date.getDate() + 1);
	  }
	  return days;
	}
	function getFullMonth(month, year) {
		var dateList = getDaysInMonth(month, year);
		var firstDate = new Date(dateList[0]);
		var lastDate = new Date(dateList[dateList.length - 1]);
		var nDate = lastDate;
		if (lastDate.getDay() != 0) {
			for (var i = 0; i <= 6 - lastDate.getDay(); i++) {
				var nextDate = new Date(nDate);
				nextDate.setDate(nextDate.getDate() + 1);
				var lDate = [];
				var fMonth = nextDate.getMonth() + 1;
			  	if (nextDate.getDate() <= 9) {
			  		lDate[0] = '0' + nextDate.getDate();
			  	} else {
			  		lDate[0] = nextDate.getDate();
			  	}
			  	if (fMonth <= 9) {
			  		lDate[1] = '0' + fMonth;
			  	} else {
			  		lDate[1] = fMonth;
			  	}
			  	lDate[2] = nextDate.getFullYear(); 
				dateList.push(lDate[1] + '.' + lDate[0] + '.' + lDate[2]);
				nDate = nextDate;
			}
		}
		nDate = firstDate;
		if (firstDate.getDay() != 0) {
			for (var i = 1; i <= firstDate.getDay() - 1; i++) {
				var prevDate = new Date(nDate);
				prevDate.setDate(prevDate.getDate() - 1);
				var fDate = [];
				var fMonth = prevDate.getMonth() + 1;
			  	if (prevDate.getDate() <= 9) {
			  		fDate[0] = '0' + prevDate.getDate();
			  	} else {
			  		fDate[0] = prevDate.getDate();
			  	}
			  	if (fMonth <= 9) {
			  		fDate[1] = '0' + fMonth;
			  	} else {
			  		fDate[1] = fMonth;
			  	}
			  	fDate[2] = prevDate.getFullYear(); 
			  	dateList.unshift(fDate[1] + '.' + fDate[0] + '.' + fDate[2]);
				nDate = prevDate;
			}
		} else {
			for (var i = 1; i <= 6; i++) {
				var prevDate = new Date(nDate);
				prevDate.setDate(prevDate.getDate() - 1);
				var fDate = [];
				var fMonth = prevDate.getMonth() + 1;
			  	if (prevDate.getDate() <= 9) {
			  		fDate[0] = '0' + prevDate.getDate();
			  	} else {
			  		fDate[0] = prevDate.getDate();
			  	}
			  	if (fMonth <= 9) {
			  		fDate[1] = '0' + fMonth;
			  	} else {
			  		fDate[1] = fMonth;
			  	}
			  	fDate[2] = prevDate.getFullYear(); 
			  	dateList.unshift(fDate[1] + '.' + fDate[0] + '.' + fDate[2]);
				nDate = prevDate;
			}			
		}
		var output = [];
		dateList.forEach(function(item, i, dateList) {
			var cDate = new Date(item);
			if (cDate.getMonth() === month) {
				output.push('<div class="datepicker__date" date="' + item + '">' + cDate.getDate() + '</div>');
			} else {
				output.push('<div class="datepicker__date datepicker_another-month" date="' + item + '">' + cDate.getDate() + '</div>');
			}
		});
		return output.join('');
	}
	function getLabelCalendar (month, year) {
		var label = $('.datepicker-lite').find('.datepicker_label');
		var labelProg = $('.datepicker-prog').find('.datepicker_label');
		var labelTime = $('.datepicker-timing').find('.datepicker_label');
		var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
		label.text(months[month] + ' ' + String(year));
		label.attr('month', month);
		label.attr('year', year);
		labelProg.text(months[month] + ' ' + String(year));
		labelProg.attr('month', month);
		labelProg.attr('year', year);
		labelTime.text(months[month] + ' ' + String(year));
		labelTime.attr('month', month);
		labelTime.attr('year', year);
	}
    $('.calendar-slider-ship').slick({
	    slidesToShow: 7,
	    slidesToScroll: 7,
	    prevArrow: '<div class="calendar-slider__arrow calendar-slider_arrow-prev"></div>',
	    nextArrow: '<div class="calendar-slider__arrow calendar-slider_arrow-next"></div>',
	    dots: false,
	    arrows: true,
	    centerMode: false,
	    focusOnSelect: true,
	    infinite: true
    });  
    $('.slider-for').slick({
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    arrows: true,
	    prevArrow: '<img src="./img/arrow_prev_slider.png" alt="btn prev" class="gallery__btn-prev">',
	    nextArrow: '<img src="./img/arrow_next_slider.png" alt="btn next" class="gallery__btn-next">',
	    fade: true,
	    asNavFor: '.slider-nav',
	    infinite: true
    });
    $('.slider-room').slick({
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    arrows: true,
	    prevArrow: '<img src="./img/arrow_prev_slider.png" alt="btn prev" class="gallery__btn-prev">',
	    nextArrow: '<img src="./img/arrow_next_slider.png" alt="btn next" class="gallery__btn-next">',
	    fade: true,
	    infinite: true
    });    
    $('.slider-nav').slick({
	    slidesToShow: 6,
	    slidesToScroll: 1,
	    asNavFor: '.slider-for',
	    dots: false,
	    arrows: false,
	    centerMode: false,
	    focusOnSelect: true,
	    infinite: true
    });
	$('.index-form__btn-minus').click(function() {
		var target = $(this).parent().find('.index-form__value');
		var value = Number(target.text());
		var maxValue = Number($(this).parent().attr('maxValue'));
		var minValue = Number($(this).parent().attr('minValue'));
		if (value > minValue) {
			target.text(value - 1);
		}
		calcBuyTickets($(this));	
	});
	$('.index-form__btn-plus').click(function() {
		var target = $(this).parent().find('.index-form__value');
		var value = Number(target.text());
		var maxValue = Number($(this).parent().attr('maxValue'));
		var minValue = Number($(this).parent().attr('minValue'));	
		if (value < maxValue) {
			target.text(value + 1);
		}
		calcBuyTickets($(this));			
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
	$('.program-card__edit').click(function() {
		$('.edit-order').removeClass('hide').addClass('show');
		centerViewObj($('.edit-order'));
		$('.modal__blocked').show();
	});
	$('.edit-order__close').click(function() {
		$(this).closest('.modals').removeClass('show').addClass('hide');
		$('.modal__blocked').hide();
	});
	$('.modal__blocked').click(function() {
		$('.modal__close-link').click();
		//$('.modals').removeClass('show').addClass('hide');
		$('.modals').hide();
		$(this).hide();
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
    $(".loginCaptchaNew").click(function () {
        $("#captcha_image").attr('src', '/manager/captcha.php?rand=' + Math.random())
    });
	$('.placement-item__btn').click(function() {
		if ($(this).attr('obj') == 'placement') {
			var parent = $(this).closest('.placement-item');
			var slider = parent.find('.placement-item__gallery-item');
			var geo = parent.find('.placement-item__geo');
			var title = parent.find('.placement-item__title');
			var desc = parent.find('.placement-item__desc');
			var prices = parent.find('.placement-item__prices');
			var btn = parent.find('.placement-item__btn');
			var included = parent.find('.placement-item__included');
			if (btn.attr('selectedOrder') === 'false') {
				parent.addClass('placement-item_select');
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
				parent.removeClass('placement-item_select');
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
			var rooms = [];
			var idRooms = [];
			var priceRoom = 0;
			$('.placement-item__btn[selectedOrder=true]').each(function (index, element){
				var caption = $(element).closest('.placement-item').find('.placement-item__title').text();
				var idRoom = $(element).closest('.placement-item').find('.placement-item__title').attr('value');
				var price = Number($(element).closest('.placement-item').find('.placement-item__value').attr('value'));
				priceRoom = priceRoom + price;
				rooms.push(caption);
				idRooms.push(idRoom);
				$('.placement-select__list').append('<li class="placement-select__item">' + caption + '</li>');
			});
			$('.program-card_rooms').attr('value', idRooms.join(','));
			$('.program-card_rooms').html(rooms.join('<br>'));
			$('.program-card_price-rooms').html('<b>' + priceRoom + '</b> ₽').attr('value', priceRoom);
			var priceProg = Number($('.program-card_price-prog').attr('value'));
			var totalPrice = priceProg + priceRoom;
			$('.program-card_total-price').html('<b>' + totalPrice + '</b> ₽').attr('value', totalPrice);
		}
		if ($(this).attr('obj') == 'habitation') {
			var list = $(this).closest('.list');
			var slider = list.find('.placement-item__gallery-item');
			var geo = list.find('.placement-item__geo');
			var title = list.find('.placement-item__title');
			var desc = list.find('.placement-item__desc');
			var prices = list.find('.placement-item__prices');
			var btn = list.find('.placement-item__btn');
			var included = list.find('.placement-item__included');
			slider.css('border-top', 'none').css('border-left', 'none').css('border-right', 'none');
			btn.attr('style', '').text('Добавить в заявку');
			geo.attr('style', '');
			title.attr('style', '');
			desc.attr('style', '');
			prices.attr('style', '');
			included.attr('style', '');
			btn.attr('selectedOrder', 'false');	

			var parent = $(this).closest('.placement-item');
			var slider = parent.find('.placement-item__gallery-item');
			var geo = parent.find('.placement-item__geo');
			var title = parent.find('.placement-item__title');
			var desc = parent.find('.placement-item__desc');
			var prices = parent.find('.placement-item__prices');
			var btn = parent.find('.placement-item__btn');
			var included = parent.find('.placement-item__included');

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

			var caption = $(this).closest('.placement-item').find('.placement-item__title').text();
			$('[insertField=habitation]').text(caption);
		}
	});
	$('.popup__blocked').click(function() {
		if ($('.count-list').hasClass('show')) {
			$('.popup__composition-btn').click();
		}
		$('.popup').removeClass('show').addClass('hide');
		$(this).hide();
		$('[showmodal]').removeClass('search_filter-open');
	});
	$('body').on('click', '[showmodal]', function() {
		$('.popup').removeClass('show').addClass('hide');
		/*13-02-23*/
		var valDate = $(this).val();
		if (valDate !== '') {
			var valDateArr = valDate.split('.');
			var monthjs = 0;
			if (Number(valDateArr[1]) == 0) {
				monthjs = 11;
			} else {
				monthjs = Number(valDateArr[1]) - 1;
			}
			$('.datepicker').find('.datepicker__body').html(getFullMonth(monthjs, Number(valDateArr[2])));
			getLabelCalendar (monthjs, Number(valDateArr[2]));
			$('.datepicker__date[date="' + valDateArr[1] + '.' + valDateArr[0] + '.' + valDateArr[2] + '"]').addClass('datepicker_select-date');


		} else {
			$('.datepicker__date').removeClass('datepicker_select-date');
		}
		/*13-02-23*/
		var showTarget = $('.' + $(this).attr('showmodal'));
		var pos = $(this).offset();
		var keyObj = $(this).attr('inputobj');
		var hbody = $('body').height();
		showTarget
			.css('top', pos.top + $(this).height() + 21)
			.css('left', pos.left).attr('obj', keyObj)
			.removeClass('hide').addClass('show');		
		$('.' + $(this).attr('showmodal')).css('width', $(this).css('width'));
		$(this).addClass('search_filter-open');
		$('.popup__blocked').height(hbody).show();
	});
	$('[showmodal=count-list]').click(function() {
		var showTarget = $('.' + $(this).attr('showmodal'));
		var data = $(this).attr('data');
		if (data != '') {
			var arrData = JSON.parse(data);
			for (var key in arrData) {
				showTarget.find('span:contains("' + key + '")').closest('.index-form').find('.index-form__value').text(arrData[key]);
			}					
		}
		$('.popup__blocked').show();
	});
	$('body').on('click', '.select__item', function() {
		var obj = $(this).parent().attr('obj');
		$('[inputobj=' + obj + ']').val($(this).text());
		$('[inputfind=' + obj + ']').val($(this).text());
		$(this).parent().removeClass('show').addClass('hide');
		$('.popup__blocked').hide();
		$('[showmodal]').removeClass('search_filter-open');
	});	
	$('.popup__composition-btn').click(function() {
		var output = [];
		const data = {};
		var arr = [];
		var target = $(this).closest('.popup__composition');
		var key = target.attr('obj');
		target.find('.index-form').each(function (index, element) {
			var label = $(element).find('.index-form__text').text();
			var index = $(element).find('.index-form__text').attr('index');
			var value = $(element).find('.index-form__value').text();
			if (value != '0') {
				output.push(label + ' - ' + value);
				data[label] = value;
				arr.push(index + '-' + value);				
			}

		});
		$('[inputobj=' + key + ']').val(output.join(' ')).attr('data', JSON.stringify(data));
		$('[inputfind=' + key + ']').val(arr.join(';'));
		target.find('.index-form__value').text('0');
		target.removeClass('show').addClass('hide');
		$('.popup__blocked').hide();
		$('[showmodal]').removeClass('search_filter-open');
	});
	$('.popup__listing input[type=checkbox]').click(function() {
		var list = [];
		var arr = [];
		const data = {};
		var key = $(this).closest('.popup__listing').attr('obj');
		$(this).closest('.popup__listing').find('input[type=checkbox]').each(function (index, element) {
			if ($(element).is(':checked')) {
				list.push($(element).parent().find('.checkbox__text').text());
				data[index] = $(element).parent().find('.checkbox__text').text();
				arr.push(index + 1);
			}
		});
		$('[inputobj=' + key + ']').val(list.join('; ')).attr('data', JSON.stringify(data));
		$('[inputfind=' + key + ']').val(arr.join(','));
	});
	$('.vp-tab').click(function() {
		var idTab = $(this).attr('id-tab');
		$('.vp-tab').removeClass('vp-tab_active');
		$(this).addClass('vp-tab_active');
		$('.vp-tab-content').removeClass('vp-tab-content_active');
		$('[id-tab-content=' + idTab + ']').addClass('vp-tab-content_active');
		$('.popup').removeClass('show').addClass('hide');
	});
	$('.direction-table__select-ship').click(function() {
		if ($(this).hasClass('direction-table_select-ship-active')) {
			$(this).closest('.direction-table__body').find('tr').removeClass('direction-table__tr-active');
			$(this).closest('.direction-table__body').find('th').removeClass('green').removeClass('direction-table_select-ship-active');
		} else {
			$(this).closest('.direction-table__body').find('tr').removeClass('direction-table__tr-active');
			$(this).closest('.direction-table__body').find('th').removeClass('green').removeClass('direction-table_select-ship-active');
			$(this).closest('tr').addClass('direction-table__tr-active');
			$(this).addClass('direction-table_select-ship-active');			
		}
	});
	$('.custom-select__body').click(function() {
		$('.custom-select__items').removeClass('show').addClass('hide');
		var items = $(this).parent().find('.custom-select__items');
		if (items.hasClass('hide')) {
			$(this).addClass('custom-select_body-open');
			items.removeClass('hide').addClass('show');
		} else {
			$(this).removeClass('custom-select_body-open');
			items.removeClass('show').addClass('hide');		
		}
	});
	$('.custom-select__item').click(function() {
		var value = $(this).text();
		var body = $(this).closest('.custom-select').find('.custom-select__body');
		body.text(value);
		body.removeClass('custom-select_body-open');
		$(this).parent().removeClass('show').addClass('hide');
	});
	var currDate = new Date();
	$('.datepicker').find('.datepicker__body').html(getFullMonth(currDate.getMonth(), currDate.getFullYear()));
	getLabelCalendar (currDate.getMonth(), currDate.getFullYear());
	$('.datepicker_prev-btn').click(function() {
		var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
		var label = $(this).parent().find('.datepicker_label');
		var month = label.attr('month');
		var year = label.attr('year');
		if (Number(month) === 0) {
			var prevYear = Number(year) - 1;
			label.text(months[11] + ' ' + String(prevYear));
			label.attr('month', '11');
			label.attr('year', prevYear);			
		} else {
			var prevMonth = Number(month) - 1;
			label.text(months[prevMonth] + ' ' + year);
			label.attr('month', prevMonth);
			label.attr('year', year);			
		}
		var days = getFullMonth(Number(label.attr('month')), Number(label.attr('year')));
		$(this).closest('.datepicker').find('.datepicker__body').html(days);
	});
	$('.datepicker_next-btn').click(function() {
		var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
		var label = $(this).parent().find('.datepicker_label');
		var month = label.attr('month');
		var year = label.attr('year');
		if (Number(month) === 11) {
			var nextYear = Number(year) + 1;
			label.text(months[0] + ' ' + nextYear);
			label.attr('month', '0');
			label.attr('year', nextYear);
		} else {
			var nextMonth = Number(month) + 1;
			label.text(months[nextMonth] + ' ' + year);
			label.attr('month', nextMonth);
			label.attr('year', year);			
		}
		var days = getFullMonth(Number(label.attr('month')), Number(label.attr('year')));
		$(this).closest('.datepicker').find('.datepicker__body').html(days);
	});
	$('body').on('click', '.datepicker__date', function() {
		var parent = $(this).closest('.popup');
		var date = $(this).attr('date');
		var obj = parent.attr('obj');
		dateArr = date.split('.');
		date = dateArr[1] + '.' + dateArr[0] + '.' + dateArr[2];
		var dateOutput = dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
		if (parent.length === 1) {
			$('[inputobj=' + obj + ']').val(date);
			$('[inputfind=' + obj + ']').val(dateOutput);
		}
		$('.popup__blocked').click();
	});
	/*10-02-23*/
	//var arrreadyprog = '{"idTour": "14","countDayTour": "2","tourName": "НА ПРАЗДНОВАНИЕ ПОКРОВА ПРЕСВЯТОЙ БОГОРОДИЦЫ","tourWayBus": "г. Санкт-Петербург – г. Приозерск - г. Санкт-Петербург",	"tourWayShip": "г. Приозерск – о. Валаам – г. Приозерск","feed": "2 завтрака, 2 обеда, 2 ужина","countExcursions": "4","dates": {"2023-02-12": {"prices": {"adults": "6000","children14": "3000","children7": "0"}},"2023-02-15": {"prices": {"adults": "7000","children14": "4000","children7": "500"}}}}';
	if (typeof arrreadyprog !== 'undefined') {
		var inputarr = JSON.parse(arrreadyprog);
		$('.label_duration').text(formatDay(inputarr['countDayTour'])).attr('value', inputarr['countDayTour']);
		$('.program-card_excursion').text(inputarr['countExcursions']);
		$('.program-card_feeds').text(inputarr['feed']);
		$('.program-card_tourWayShip').text(inputarr['tourWayShip']);
		$('.program-card_tourWayBus').text(inputarr['tourWayBus']);
		$('.program-card_name').text(inputarr['tourName']).attr('value', inputarr['idTour']);
		$('.index-form__price').attr('value', '0').text('');		
	}
	$('body').on('click', '.datepicker-prog .datepicker__date', function() {
		var parent = $(this).closest('.popup');
		var date = $(this).attr('date');
		var obj = parent.attr('obj');
		var dateArr = date.split('.');
		date = dateArr[1] + '.' + dateArr[0] + '.' + dateArr[2];
		var dateInp = dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
		var dateOutput = dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
		if (parent.length === 1) {
			console.log(inputarr["dates"][dateOutput]);
			if (inputarr["dates"][dateOutput] !== undefined) {
				$('.index-form__price')
					.eq(0)
					.attr('value', inputarr["dates"][dateOutput]["prices"]["adults"])
					.text(inputarr["dates"][dateOutput]["prices"]["adults"] + ' ₽');
				$('.index-form__price')
					.eq(1)
					.attr('value', inputarr["dates"][dateOutput]["prices"]["children14"])
					.text(inputarr["dates"][dateOutput]["prices"]["children14"] + ' ₽');
				$('.index-form__price')
					.eq(2)
					.attr('value', inputarr["dates"][dateOutput]["prices"]["children7"])
					.text(inputarr["dates"][dateOutput]["prices"]["children7"] + ' ₽');
				$('.index-form__price')
					.eq(3)
					.attr('value', inputarr["dates"][dateOutput]["prices"]["adults"])
					.text(inputarr["dates"][dateOutput]["prices"]["adults"] + ' ₽');
				$('.index-form__price')
					.eq(4)
					.attr('value', inputarr["dates"][dateOutput]["prices"]["children14"])
					.text(inputarr["dates"][dateOutput]["prices"]["children14"] + ' ₽');
				$('.index-form__price')
					.eq(5)
					.attr('value', inputarr["dates"][dateOutput]["prices"]["children7"])
					.text(inputarr["dates"][dateOutput]["prices"]["children7"] + ' ₽');										
				$('.buy-tickets-form__msg')
					.removeClass('show')
					.addClass('hide')
					.text('');
				$('[inputobj=' + obj + ']').val(date);
				calcBuyTickets($(this));
				$('.btn-next-room').add('.btn-edit-order').prop('disabled', false);	
			} else {
				$('.index-form__price')
					.eq(0)
					.attr('value', '0')
					.text('');
				$('.index-form__price')
					.eq(1)
					.attr('value', '0')
					.text('');
				$('.index-form__price')
					.eq(2)
					.attr('value', '0')
					.text('');
				$('.index-form__price')
					.eq(3)
					.attr('value', '0')
					.text('');
				$('.index-form__price')
					.eq(4)
					.attr('value', '0')
					.text('');
				$('.index-form__price')
					.eq(5)
					.attr('value', '0')
					.text('');					
				$('.buy-tickets-form__msg')
					.removeClass('hide')
					.addClass('show')
					.text('На выбранную дату не предусмотрена программа.');
				$('[inputobj=' + obj + ']').val('');
				$('.buy-tickets-form__price')
				.attr('value', '0')
				.text('0 ₽');
				$(this)
					.closest('.buy-tickets-form')
					.find('.index-form__value')
					.text('0');
				$('.btn-next-room').add('.btn-edit-order').prop('disabled', true);
			}
		}
		$('.popup__blocked').click();
	});
	$('.btn-next-room').click(function() {
		var conteiner = $(this).closest('.buy-tickets-form');
		var date = conteiner.find('.prog-date').val();
		var totalPrice = conteiner.find('.buy-tickets-form__price').attr('value');
		var durationTour = $('.label_duration').attr('value');
		if (conteiner.find('.prog-date').val() != '' && conteiner.find('.buy-tickets-form__price').attr('value') != '0') {
			conteiner.find('.prog-date').val(date);
			var values = $('.edit-order__content').find('.index-form__value');
			conteiner.find('.index-form__value').each(function (i, element){
				$(values[i]).text($(element).text());
			});
			$('.program-card_price-prog').attr('value', totalPrice).html('<b>' + totalPrice + '</b> ₽');
			$('.buy-tickets-form__price').attr('value', totalPrice).text(totalPrice + ' ₽');
			var arrDate = date.split('.');
			var fDate = new Date(Number(arrDate[2]), Number(arrDate[1]) - 1, Number(arrDate[0]));
			fDate.setDate(fDate.getDate() + Number($('.label_duration').attr('value')));
			var currMonth = fDate.getMonth() + 1;
			var curMonth = '';
			if (currMonth <= 9) {
				curMonth = '0' + currMonth;
			} else {
				curMonth = currMonth;
			}
			var currDate = '';
			if (fDate.getDate() <= 9) {
				currDate = '0' + fDate.getDate();
			} else {
				currDate = fDate.getDate();
			}
			var finishDate = currDate + '.' + curMonth + '.' + fDate.getFullYear();
			$('.program-card_date').text(date + ' - ' + finishDate);
			$('.program-card_date').attr('finishDate', finishDate);
			var guests = [];
			var generalGuest = 0;
			conteiner.find('.index-form').each(function (i, element){
				var label = $(element).find('.index-form_label').text();
				var count = $(element).find('.index-form__value').text();
				guests.push(label + ' - ' + count);
				generalGuest = generalGuest + Number(count);
			});
			$('.program-card_guests').text(guests.join(' | '));
			$('.program-card_guests').attr('value', generalGuest);
			var priceProg = Number($('.program-card_price-prog').attr('value'));
			var priceRoom = Number($('.program-card_price-rooms').attr('value'));
			var totalPrice = priceProg + priceRoom;
			$('.program-card_total-price').html('<b>' + totalPrice + '</b> ₽').attr('value', totalPrice);
			$('.program').removeClass('show').addClass('hide');//visibShow
			if (Number(generalGuest) >= 10) {
				//updateTouristForm();
				//$('.group-program').removeClass('visibHide').addClass('visibShow');
				window.location.href = "/zayavka-na-gruppovuyu-programu.html";
			} else if (Number(durationTour) == 1) {
				$('.program-card_rooms').parent().hide();
				$('.program-card_price-rooms').parent().hide();
				$('.btn-back-rooms').text('Вернуться назад к описанию программы');
				updateTouristForm();
				$('.reg-order').removeClass('hide').addClass('show');//visibShow
			} else {
				$('.btn-back-rooms').text('Вернуться назад к выбору размещения');
				$('.program-card_rooms').parent().show();
				$('.program-card_price-rooms').parent().show();
				updateTouristForm();
				$('.placement').removeClass('hide').addClass('show');//visibShow
			}
			conteiner.find('.buy-tickets-form__msg').removeClass('show').addClass('hide');
			window.scrollTo(0, 0);
		} else {
			conteiner.find('.buy-tickets-form__msg').removeClass('hide').addClass('show');
		}
		$('.gallery__btn-next').click();

	});
	$('.btn-edit-order').click(function() {
		var conteiner = $(this).closest('.edit-order__content');
		var date = conteiner.find('.prog-date').val();
		var close = conteiner.find('.edit-order__close');
		var totalPrice = conteiner.find('.buy-tickets-form__price').attr('value');
		if (conteiner.find('.prog-date').val() != '' && conteiner.find('.buy-tickets-form__price').attr('value') != '0') {
			conteiner.find('.prog-date').val(date);
			var values = $('.buy-tickets-form').find('.index-form__value');
			conteiner.find('.index-form__value').each(function (i, element){
				$(values[i]).text($(element).text());
			});
			$('.program-card_price-prog').attr('value', totalPrice).html('<b>' + totalPrice + '</b> ₽');
			$('.buy-tickets-form__price').attr('value', totalPrice).text(totalPrice + ' ₽');
			var arrDate = date.split('.');
			var fDate = new Date(Number(arrDate[2]), Number(arrDate[1]) - 1, Number(arrDate[0]));
			fDate.setDate(fDate.getDate() + Number($('.label_duration').attr('value')));
			var currMonth = fDate.getMonth() + 1;
			var curMonth = '';
			if (currMonth <= 9) {
				curMonth = '0' + currMonth;
			} else {
				curMonth = currMonth;
			}
			var currDate = '';
			if (fDate.getDate() <= 9) {
				currDate = '0' + fDate.getDate();
			} else {
				currDate = fDate.getDate();
			}
			var finishDate = currDate + '.' + curMonth + '.' + fDate.getFullYear();
			$('.program-card_date').text(date + ' - ' + finishDate);
			var guests = [];
			var generalGuest = 0;
			conteiner.find('.index-form').each(function (i, element){
				var label = $(element).find('.index-form_label').text();
				var count = $(element).find('.index-form__value').text();
				var guest = {
					type: label,
					count: count
				};
				guests.push(label + ' - ' + count);
				generalGuest = generalGuest + Number(count);
			});
			$('.program-card_guests').text(guests.join(' | '));
			$('.program-card_guests').attr('value', generalGuest);
			var priceProg = Number($('.program-card_price-prog').attr('value'));
			var priceRoom = Number($('.program-card_price-rooms').attr('value'));
			var totalPrice = priceProg + priceRoom;
			$('.program-card_total-price').html('<b>' + totalPrice + '</b> ₽').attr('value', totalPrice);
			updateTouristForm();
			close.click();	
			conteiner.find('.buy-tickets-form__msg').removeClass('show').addClass('hide');
			if (Number(generalGuest) >= 10) {
				//updateTouristForm();
				//$('.section').removeClass('visibShow').addClass('visibHide');
				//$('.group-program').removeClass('visibHide').addClass('visibShow');
				//window.scrollTo(0, 0);
				window.location.href = "/zayavka-na-gruppovuyu-programu.html";
			}
		} else {
			conteiner.find('.buy-tickets-form__msg').removeClass('hide').addClass('show');
		}
	});
	/*10-02-23*/
	$('.btn-back-prog').click(function() {
		$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide');
		$('.program').removeClass('visibHide').addClass('visibShow');
		$('.placement').removeClass('visibShow').addClass('visibHide');
		window.scrollTo(0, 0);
	});
	$('.btn-back-rooms').click(function() {
		var durationTour = $('.label_duration').attr('value');
		$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide');
		$('.reg-order').removeClass('visibShow').addClass('visibHide');
		if (Number(durationTour) == 1) {
			$('.program').removeClass('visibHide').addClass('visibShow');
		} else {
			$('.placement').removeClass('visibHide').addClass('visibShow');
		}
		$('.tourist_block').not('.order-form_clone').remove();
		$('.order-form_clone').show();	
		window.scrollTo(0, 0);
	});
	$('.btn-next-order').click(function() {
		if ($('.program-card_price-prog').attr('value') != '0' && $('.program-card_price-rooms').attr('value') != '0') {
			$('.placement').removeClass('show').addClass('hide');
			$('.reg-order').removeClass('hide').addClass('show');
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide');
			updateTouristForm();
			window.scrollTo(0, 0);
		} else {
			$('.buy-tickets-form__msg')
				.text('Не выбрано место для проживания')
				.removeClass('hide').addClass('show');
		}
	});
	$('body').on('click', '.order-form__field-gender', function() {
		if (!$(this).hasClass('order-form_field-active')) {
			$(this).parent().find('.order-form__field-gender').removeClass('order-form_field-active');
			$(this).addClass('order-form_field-active');
		}
	});
	$('.isPolomnik').click(function() {
		if ($('.isPolomnik').is(':checked')){
			var lastname = $('[name=lastname]').eq(0).val();
			var firstname = $('[name=firstname]').eq(0).val();
			var patronymic = $('[name=patronymic]').eq(0).val();
			var datebirth = $('[name=datebirth]').eq(0).val();
			var typedoc = $('[name=typedoc]').eq(0).val();
			var passSN = $('[name=passSN]').eq(0).val();
			var passissued = $('[name=passissued]').eq(0).val();
			var passNP = $('[name=passNP]').eq(0).val();
			var passadress = $('[name=passadress]').eq(0).val();
			var passdate = $('[name=passdate]').eq(0).val();
			var telefon = $('[name=telefon]').eq(0).val();
			var email = $('[name=email]').eq(0).val();
			var findout = $('[name=findout]').eq(0).val();

			$('[name=lastname]').eq(2).val(lastname);
			$('[name=firstname]').eq(2).val(firstname);
			$('[name=patronymic]').eq(2).val(patronymic);
			$('[name=datebirth]').eq(2).val(datebirth);
			$('[name=typedoc]').eq(2).val(typedoc);
			$('[name=passSN]').eq(2).val(passSN);
			$('[name=passissued]').eq(2).val(passissued);
			$('[name=passNP]').eq(2).val(passNP);
			$('[name=passadress]').eq(2).val(passadress);
			$('[name=passdate]').eq(2).val(passdate);
			$('[name=telefon]').eq(2).val(telefon);
			$('[name=email]').eq(2).val(email);
			$('[name=findout]').eq(2).val(findout);			
		} else {
			$('[name=lastname]').eq(2).val('');
			$('[name=firstname]').eq(2).val('');
			$('[name=patronymic]').eq(2).val('');
			$('[name=datebirth]').eq(2).val('');
			$('[name=typedoc]').eq(2).val('');
			$('[name=passSN]').eq(2).val('');
			$('[name=passissued]').eq(2).val('');
			$('[name=passNP]').eq(2).val('');
			$('[name=passadress]').eq(2).val('');
			$('[name=passdate]').eq(2).val('');
			$('[name=telefon]').eq(2).val('');
			$('[name=email]').eq(2).val('');
			$('[name=findout]').eq(2).val('');	
		}
	});
	$('.btn-finish-order').click(function() {
		$('.vp-input[required]').removeClass('vp-input_invalid');
		$('.vp-input[required]').each(function (i, element){
			if ($(element).val() == '') {
				$(element).addClass('vp-input_invalid');
			} else {
				$(element).removeClass('vp-input_invalid');
			}
		});
		$('.order-form_clone .vp-input').removeClass('vp-input_invalid');
		if ($('.vp-input_invalid').length > 0) {
			$('.buy-tickets-form__msg')
				.text('Не все обязательные поля заполнены')
				.removeClass('hide').addClass('show');
				console.log($('.vp-input_invalid'));
			return;
		} else {
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide');
		}
		if ($('.categorypay__value').val() == '') {
			$('.buy-tickets-form__msg')
				.text('Категория оплаты не выбрана')
				.removeClass('hide').addClass('show');
			return;
		} else {
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide');
		}
		if ($('.typepay__value').val() == '') {
			$('.buy-tickets-form__msg')
				.text('Тип оплаты не выбран')
				.removeClass('hide').addClass('show');
			return;
		} else {
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide');
		}	
		var objClient = $('.order-form .order-form__field').first();
		var guestList = {};
		var infoGuestArr = {};
		var generalGuest = 0;
		var infoClient = {
			lastName: objClient.find('input[name=lastname]').val(),
			firstName: objClient.find('input[name=firstname]').val(),
			patronymic: objClient.find('input[name=patronymic]').val(),
			dateBirth: objClient.find('input[name=datebirth]').val(),
			typeDoc: objClient.find('input[name=typedoc]').val(),
			passSN: objClient.find('input[name=passSN]').val(),
			passissued: objClient.find('input[name=passissued]').val(),
			passNP: objClient.find('input[name=passNP]').val(),
			passDate: objClient.find('input[name=passdate]').val(),
			passAdress: objClient.find('input[name=passadress]').val(),
			telefon: objClient.find('input[name=telefon]').val(),
			email: objClient.find('input[name=email]').val(),
			findout: objClient.find('input[name=findout]').val(),
			gender: objClient.find('.order-form_field-active').attr('value'),
			isPolomnik: $('.isPolomnik').is(':checked')
		};
		$('.edit-order__content').find('.index-form').each(function (i, element){
			var label = $(element).find('.index-form_label').text();
			var count = $(element).find('.index-form__value').text();
			var guest = {
				type: label,
				count: count
			};
			generalGuest = generalGuest + Number(count);
			guestList[i] = guest;
		});
		$('.tourist_block:not(:first-child)').each(function (i, element){
			if ($(element).find('.order-form__subtitle').text() !== 'clone') {
				var infoTourist = {
					label: $(element).find('.order-form__subtitle').text(),
					lastName: $(element).find('input[name=lastname]').val(),
					firstName: $(element).find('input[name=firstname]').val(),
					patronymic: $(element).find('input[name=patronymic]').val(),
					dateBirth: $(element).find('input[name=datebirth]').val(),
					typeDoc: $(element).find('input[name=typedoc]').val(),
					passSN: $(element).find('input[name=passSN]').val(),
					passissued: $(element).find('input[name=passissued]').val(),
					passNP: $(element).find('input[name=passNP]').val(),
					passDate: $(element).find('input[name=passdate]').val(),
					passAdress: $(element).find('input[name=passadress]').val(),
					telefon: $(element).find('input[name=telefon]').val(),
					benefits: $(element).find('input[name=benefits]').val(),
					comment: $(element).find('input[name=comment]').val(),
					gender: $(element).find('.order-form_field-active').attr('value')			
				};
				infoGuestArr[i] = infoTourist;
			}

		});
		var order = {
			startDate: $('.prog-date').val(),
			finishDate: $('.program-card_date').attr('finishDate'),
			idTour: $('.program-card_name').attr('value'),
			durationTour: $('.duration').attr('value'),
			guestCount: generalGuest,
			idRooms: $('.program-card_rooms').attr('value'),
			guests: guestList,
			infoClient: infoClient,
			infoGuest: infoGuestArr,
			priceProgram: $('.program-card_price-prog').attr('value'),
			priceRooms: $('.program-card_price-rooms').attr('value'),
			priceTotal: $('.program-card_total-price').attr('value'),
			categoryPay: $('.categorypay__value').val(),
			typePay: $('.typepay__value').val()
		};
		console.log(JSON.stringify(order));
		$.ajax({
		  url: '/api/ready-program/',
		  method: 'post',
		  dataType: 'json',
		  crossDomain: true,
		  data: {data: JSON.stringify(order)},
		  success: function(data){
		      if (typeof data['data']['data']['formUrl'] !== 'undefined') {
		      	console.log(data['data']['data']['formUrl']);
		      	//window.location.replace(data['data']['data']['formUrl']);
		      	window.location.href = data['data']['data']['formUrl'];
		      }
		  }
		});
	});
	$('.btn-group-program').click(function() {
		var order = {
			startDate: $('.prog-date').val(),
			finishDate: $('.program-card_date').attr('finishDate'),
			idTour: $('.program-card_name').attr('value'),
			durationTour: $('.duration').attr('value'),
			guestCount: $('.program-card_guests').attr('value'),
			firstName: $('[name=gp_firstname]').val(),
			telefon: $('[name=gp_phone]').val(),
			email: $('[name=gp_email]').val(),
			time: $('[name=gp_timecall]').val(),								
		};
		console.log(JSON.stringify(order));
	});
	$('[name=categorypay]').click(function() {
		$('.categorypay__value').val($(this).attr('label'));
	});
	$('[name=typepay]').click(function() {
		$('.typepay__value').val($(this).attr('label'));
	});
	$('.find-list__footer-link').click(function() {
		var conteiner = $(this).closest('.find-list');
		if ($(this).parent().hasClass('bg-orange')) {
			$('.list[data=' + conteiner.attr('data') + ']').removeClass('show').addClass('hide');
			$(this).text('Показать').parent().removeClass('bg-orange')
		} else {
			$('.find-list__footer-price').removeClass('bg-orange');
			$('.find-list__footer-link').text('Показать');
			$(this).text('Скрыть').parent().addClass('bg-orange');
			$('.list[data]').removeClass('showFlex').addClass('hide');
			$('.list[data=' + conteiner.attr('data') + ']').removeClass('hide').addClass('showFlex');			
		}
		$('.gallery__btn-next').click();
	});
	$('.reviews__form-value-foto').click(function() {
		$('.reviewsFotosInput').click();
	});
	$('.reviews__field-star').click(function() {
		var index = $(this).index();
		var indexStar = index++;
		var path = './img/icons-svg/';
		var full = './img/icons-svg/' + 'icon_reviews_star_full.svg';
		var empty = './img/icons-svg/' + 'icon_reviews_star_empty.svg';
		$('.reviews__field-star').attr('src', empty);
		$('.reviews__field-star:nth-child(-n+' + index + ')').attr('src', full);
		$('.reviewsStarsCountInput').attr('count', index);
	});
	$('.reviews__btn-all').click(function() {
		var target = $(this).closest('.reviews__item');
		if (target.find('.reviews__desc').hasClass('reviews_desc-active')) {
			target.find('.reviews__desc').removeClass('reviews_desc-active');
			$(this).text('Читать отзыв полностью');	
		} else {
			target.find('.reviews__desc').addClass('reviews_desc-active');
			$(this).text('Скрыть полный текст отзыва');			
		}
	});
	$('.header__menu-mob').click(function() {
		$('.menu-mobile__conteiner').removeClass('hide').addClass('showFlex');
	});
	$('.header__close-mob').click(function() {
		var target = $(this).closest('.menu-mobile__conteiner')
		target.removeClass('showFlex').addClass('hide');
	});
	$('.modal_submit-login').click(function() {
	  $('.modal__invalid-msg').removeClass('show').addClass('hide');
	  var username = $(this).closest('.modal__forms').find('.modal_username');
	  var password = $(this).closest('.modal__forms').find('.modal_password');
	  if (username.val() == '') {
	  	$('.modal_loginname-msg').removeClass('hide').addClass('show').text('Не заполнено обязательное поле');
	  	username.addClass('vp-input_invalid');
	  	password.addClass('vp-input_invalid');
	  	$('.modal_loginpass-msg').removeClass('show').addClass('hide');
	  	$('.modal_global-login-msg').removeClass('show').addClass('hide');
	  } else if (password.val() == '') {
	  	username.removeClass('vp-input_invalid');
	  	$('.modal_loginname-msg').removeClass('show').addClass('hide')
	  	$('.modal_global-login-msg').removeClass('show').addClass('hide');
	  	$('.modal_loginpass-msg').removeClass('hide').addClass('show').text('Не заполнено обязательное поле');
	  	password.addClass('vp-input_invalid');
	  } else {
	  	  $(this).closest('.modal__forms').find('input[name]').removeClass('vp-input_invalid');
	  	  $('.modal__invalid-msg').removeClass('show').addClass('hide');
	      $.ajax({
	          url: 'http://valaamskiy-polomnik.directpr.beget.tech/api/auth/login/',
	          method: 'post',
	          dataType: 'json',
	          crossDomain: true,
	          data: $(this).closest('form').serialize(),
	          success: function(data){
		          console.log(data);
		          if (data['status'] === 'error') {
		          	if (data['code'] == 51) {
						$('.modal_global-login-msg').removeClass('hide').addClass('show').text('Введенный пароль короткий.');
		          	} else if (data['code'] == 59) {
						$('.modal_global-login-msg').removeClass('hide').addClass('show').text(data['data'][0]);
		          	}
		          	
		          }
	          }
	      });	  
	  }
	}); 
	$('.modal_submit-reg').click(function() {
	  $('.modal__invalid-msg').removeClass('show').addClass('hide');
	  var inputfull = $(this).closest('.modal__forms').find('.modal__input');
	  var msgfull = $(this).closest('.modal__forms').find('.modal__invalid-msg');
	  var username = $(this).closest('.modal__forms').find('.modal_username');
	  var email = $(this).closest('.modal__forms').find('.modal_email');
	  var phone = $(this).closest('.modal__forms').find('.modal_phone');
	  var msg_general = $('.modal__invalid-general');
	  var msg_username = $('.modal__invalid-name');
	  var msg_email = $('.modal__invalid-email');
	  var msg_phone = $('.modal__invalid-phone');
	  if (username.val() == '') {
	  	inputfull.removeClass('vp-input_invalid');
	  	msgfull.removeClass('show').addClass('hide');
	  	username.addClass('vp-input_invalid');
	  	msg_general.removeClass('show').addClass('hide');
	  	msg_username.removeClass('hide').addClass('show').text('Не заполнено обязательное поле');
	  } else if (email.val() == '') {
	  	inputfull.removeClass('vp-input_invalid');
	  	msgfull.removeClass('show').addClass('hide');
	  	email.addClass('vp-input_invalid');
	  	msg_general.removeClass('show').addClass('hide');
	  	msg_email.removeClass('hide').addClass('show').text('Не заполнено обязательное поле');
	  } else if (phone.val() == '') {
	  	inputfull.removeClass('vp-input_invalid');
	  	msgfull.removeClass('show').addClass('hide');
	  	phone.addClass('vp-input_invalid');
	  	msg_general.removeClass('show').addClass('hide');
	  	msg_phone.removeClass('hide').addClass('show').text('Не заполнено обязательное поле');
	  } else {
	  	  $(this).closest('.modal__forms').find('input[name]').removeClass('vp-input_invalid');
	  	  $('.modal__invalid-msg').removeClass('show').addClass('hide');
	  	  console.log($(this).closest('form').serialize());
	      $.ajax({
	          url: 'http://valaamskiy-polomnik.directpr.beget.tech/api/auth/register/',
	          method: 'post',
	          dataType: 'json',
	          crossDomain: true,
	          data: $(this).closest('form').serialize(),
	          success: function(data){
		          console.log(data);
		          msgfull.removeClass('show').addClass('hide');
		          if (data['status'] === 'error') {
		          	if (data['code'] == 23) {
						msg_general.removeClass('hide').addClass('show').text('Email уже используется.');
		          	} else if (data['code'] == 40) {
		          		msg_general.removeClass('hide').addClass('show').text('Согласие с условиями передачи информации не подтверждено.');
		          	} else if (data['code'] == 20) {
						msg_general.removeClass('hide').addClass('show').text('Email введен не верно.');
		          	}
		          }
	          }
	      });
	  }
	});
	$('.modal_submit-recpass').click(function() {
		$('.modal__invalid-msg').removeClass('show').addClass('hide');
		var inputfull = $(this).closest('.modal__forms').find('.modal__input');
		var msgfull = $(this).closest('.modal__forms').find('.modal__invalid-msg');
		var msg_general = $('.modal__invalid-general');
		var email = $(this).closest('.modal__forms').find('.modal_email');
		if (email.val() == '') {
		  	inputfull.removeClass('vp-input_invalid');
		  	msgfull.removeClass('show').addClass('hide');
		  	email.addClass('vp-input_invalid');
		  	msg_general.removeClass('hide').addClass('show').text('Не заполнено обязательное поле');
	    } else {
	  	  $(this).closest('.modal__forms').find('input[name]').removeClass('vp-input_invalid');
	  	  $('.modal__invalid-msg').removeClass('show').addClass('hide');
	      $.ajax({
	          url: 'http://valaamskiy-polomnik.directpr.beget.tech/api/auth/reset/',
	          method: 'post',
	          dataType: 'json',
	          crossDomain: true,
	          data: $(this).closest('form').serialize(),
	          success: function(data){
		          console.log(data);
		          if (data['status'] === 'error') {
		          	if (data['code'] == 1) {
			          	msgfull.removeClass('show').addClass('hide');
			          	msg_general.removeClass('hide').addClass('show').text(data['data']['message']);		          		
		          	}

		          }
	          }
	      });
	    }
	});
	if ($(window).width() <= 890) {
		$('.login .modal__close').attr('src', './img/icon_modal_close_black.png');
	} else {
		$('.login .modal__close').attr('src', './img/icon_modal_close.png');
	}
	$(window).resize(function() {
		if ($(window).width() <= 890) {
			$('.login .modal__close').attr('src', './img/icon_modal_close_black.png');
		} else {
			$('.login .modal__close').attr('src', './img/icon_modal_close.png');
		}
		$('.popup').removeClass('show').addClass('hide');/*13-02-23*/
	});
	$('.post-list__img').mouseenter(function() {
		$(this).closest('.post-list').find('.post-list__desc').animate({
			top: "50px",
		}, 1000);
	});

	$('.post-list__desc').mouseout(function() {
		$(this).closest('.post-list').find('.post-list__desc').animate({
			top: "300px",
		}, 1000);
	});	
	setupMask();
	//$('.populars .list').scrollTo(300);
});