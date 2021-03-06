// JavaScript Documentvar
//parts読み込み
/*function include(){
	$.ajax({
		url: '/portfolio/include.html',
		cache: false,
		async: false,
		dataType: 'html',
		success: function(html){
			document.write(html);
		}
	});
}
*/

//nav
$(function () {
	//current
	$('.submenu__link').each(function () {
		var $href = $(this).attr('href');
		if (location.href.match($href)) {
			$(this).parent('.submenu__item').addClass('submenu__item_active').parents('.global-nav__item').addClass('global-nav__item_active').children('.global-nav__input').prop('checked', true);
		} else {
			$(this).parent('.submenu__item').removeClass('submenu__item_active');
		}
	});

	//accordion
	$('.global-nav__link').on("click", function () {
		var prop = $('#navToggle').prop('checked');
		if (prop) {
			setTimeout(function () {
				$('#navToggle').prop('checked', false);
			}, 150);
		}
	});

	//collapsed
	$('#nav-ctrl').on('click', function () {
		var page = $('.page-wrapper');
		if (page.hasClass("collapsed")) {
			page.removeClass("collapsed");
		} else {
			page.addClass("collapsed");
			$('.global-nav__input').prop('checked', false);
			$('.channel_active').removeClass('channel_active');
			$('#logoutLayer').fadeOut();
		}
	});
	$('.global-nav__label').on('click', function () {
		var page = $('.page-wrapper');
		if (page.hasClass("collapsed")) {
			page.removeClass("collapsed");
		}
	});

	//tooltip
	$('.global-nav__label').hover(function () {
			var msg = $(this).children('.global-nav__text').text(),
				toolTip = "<div class='tooltip'>" + msg + "</div>",
				countTip = $(this).children('.tooltip').length,
				collapsed = $('.collapsed').length;

			if (collapsed == 0) {
				return false;
			} else if (countTip == 0) {
				$(this).append(toolTip);
			} else {
				$(this).children('.tooltip').show();
			}
		},
		function () {
			$('.tooltip').hide();
		});

	//panel-show
	$('.header__channel').click(function () {
		$('#channelPopup').addClass('popup_on');
	});

	$('.filter-search__date').click(function () {
		// 要素の位置を取得
		var clientRect = this.getBoundingClientRect();
		var positionX = clientRect.left + window.pageXOffset;
		var positionY = clientRect.top + window.pageYOffset;
		var negativeX = positionX / 1.5;
		$('#filterPopup').addClass('popup_on');
		$('.date-range').css({
			'display': 'block',
			'top': positionY,
			'left': negativeX
		});
	});

	$('.popup__overlay, .popup-box__clear').click(function () {
		$('.popup').removeClass('popup_on');
	});
});


//validation
$(function () {
	var info = document.getElementById('info');
	if (info != null) {
		info.addEventListener('change', infoValidat);
	}
	infoValidat();

	//validation
	function infoValidat() {
		var flag = false;
		var error = $('.form__error');

		if (!($('[name=service_name]').val())) {
			flag = true;
		} else if (!($('[name=service_domain]').val())) {
			flag = true;
		}
		if (flag) {
			$('.form__submit-btn').prop('disabled', true).css('background', '#ccc');
			return false;
		} else {
			$('.form__submit-btn').prop('disabled', false).css('background', '');
		}
	}

	//submit demo
	$('#saveModal .primary-btn').click(function () {
		$.when(
				$('#layer, #saveModal').fadeOut(),
				$('body,html').css({
					overflow: 'auto'
				})
			)
			.then(function () {
				_showAlert('保存しました')
			});
	});

});

//フォーム送信後の完了メッセージ
function _showAlert(msg) {
	var $alert = $('<div>').prependTo($('.main-content')).addClass('alert');
	//e.preventDefault();
	$alert.css('display', 'none').text(msg).fadeIn('slow', function () {
		setTimeout(function () {
			$alert.fadeOut('slow')
		}, 1000);
	});
}


//modal
$(function () {
	function bodyHidden() {
		$('body,html', parent.document).css({
			overflow: 'hidden'
		});
	}

	$('#save').click(function () {
		$('#layer, #saveModal').fadeIn();
		bodyHidden();
	});

	$('#closed').click(function () {
		$('#layer, #closedModal').fadeIn();
		bodyHidden();
	});

	$('.cancel, #layer, .modal__ok-btn').click(function () {
		$('#layer,.modal').fadeOut();
		$('body,html').css({
			overflow: 'auto'
		});
	});

	$('#logout').click(function () {
		$('#logoutModal').fadeIn().css({
			'z-index': '9'
		});
		$('#layer').fadeIn().css({
			'z-index': '9',
			'background-color': 'rgba(0,0,0,.4)'
		});
		bodyHidden();
	});

	$('.cancel, #logoutLayer').click(function () {
		$('#logoutModal').fadeOut();
		$('#layer').fadeOut();
		$('body,html').css({
			overflow: 'auto'
		});
	});
});


//tab-position
$(function () {
	var urlHash = location.hash;
	//var target = $(urlHash);
	var width = $('.filter-tab__item_active').innerWidth();
	var position = $('.filter-tab__scroll').scrollLeft();
	var offset = $('.filter-tab__item_active').offset() + width + 1;
	var windowWidth = window.innerWidth;
	var stay = position + (windowWidth / 2) - width / 2;
	if (urlHash) {
		$('body,html').stop().scrollTop(0);
		if (offset > windowWidth) {
			$('.filter-tab__scroll').stop().scrollLeft(stay);
		}
		return false;
	}
});


//セクションの移動
$(function () {
	$('#sortList').sortable({
		axis: "y",
		revert: true,
	});
});

//color-preview
$(function () {
	//Read color
	//Primary
	$('.primary-text').css('color', $('#Primary').val());
	$('.bg_primary').css('background-color', $('#Primary').val());
	//border
	$('.section__group').css('border-color', $('#Border').val());
	//Accent
	$('.section__label').css('color', $('#Accent').val());
	//Text
	$('.section__inner').css('color', $('#Text').val());
	//Sub Text
	$('.text').css('color', $('#SubText').val());
	//Background
	$('.section__inner').css('background-color', $('#Background').val());
	//Gradient
	var startClr = $('#GradientStart').val();
	var endClr = $('#GradientEnd').val();
	$('.section__card').css({
		"background": "linear-gradient(90deg, " + startClr + " 0%, " + endClr + " 100%)"
	});
	//shadow
	var shadowClr = $('#Shadow').val();
	$('.section__card').css({
		"box-shadow": "9px 9px 16px " + shadowClr
	});

	//Change color
	//Primary
	$('#Primary').change(function () {
		$('.primary-text').css('color', $('#Primary').val());
		$('.bg_primary').css('background-color', $('#Primary').val());
	});
	//Accent
	$('#Accent').change(function () {
		$('.section__label').css('color', $('#Accent').val());
	});
	//Text
	$('#Text').change(function () {
		$('.section__inner').css('color', $('#Text').val());
	});
	//Sub Text
	$('#SubText').change(function () {
		$('.sub_text').css('color', $('#SubText').val());
	});
	//Content
	$('#Border').change(function () {
		$('.section__group').css('border-color', $('#Border').val());
	});
	//Background
	$('#Background').change(function () {
		$('.section__inner').css('background-color', $('#Background').val());
	});
	//Gradient
	$('#GradientStart, #GradientEnd').change(function () {
		var startClr = $('#GradientStart').val();
		var endClr = $('#GradientEnd').val();
		$('.section__card').css({
			"background": "linear-gradient(90deg, " + startClr + " 0%, " + endClr + " 100%)"
		});
	});
	//Shadow
	$('#Shadow').change(function () {
		var shadowClr = $('#Shadow').val();
		$('.section__card').css({
			"box-shadow": "9px 9px 16px " + shadowClr
		});
	});
	//hight-light
	$('#HightLight').change(function () {
		var hightLightClr = $('#HightLight').val();
		$('head').append('<style>.section__card::before { box-shadow: -6px -6px 16px ' + hightLightClr + ';} </style>');
	});
	
});


//確率・割合の計算
var DoSum = function (self) {
	var GROUP = self.data('group');
	var SUM = 0;
	$("[data-group='" + GROUP + "']").each(function () {
		SUM = SUM + Number($(this).val());
	});
	$("#Sum" + GROUP).val(SUM);
};

//確率の計算
var DoSumTt = function () {
	var SUM = 0;
	$("[data-group='Total']").each(function () {
		SUM = SUM + Number($(this).val());
	});
	$("#SumTotal").val(SUM);
};

//割合の計算
var DoSum1 = function () {
	var SUM = 0;
	$("[data-group='First']").each(function () {
		SUM = SUM + Number($(this).val());
	});
	$("#SumFirst").val(SUM);
};

var DoSum2 = function () {
	var SUM = 0;
	$("[data-group='Second']").each(function () {
		SUM = SUM + Number($(this).val());
	});
	$("#SumSecond").val(SUM);
};

var DoSum3 = function () {
	var SUM = 0;
	$("[data-group='Third']").each(function () {
		SUM = SUM + Number($(this).val());
	});
	$("#SumThird").val(SUM);
};

var DoSum4 = function () {
	var SUM = 0;
	$("[data-group='Fourth']").each(function () {
		SUM = SUM + Number($(this).val());
	});
	$("#SumFourth").val(SUM);
};

$(function () {

	DoSumTt();
	DoSum1();
	DoSum2();
	DoSum3();
	DoSum4();

	//change data-group
	$('.scratch').on('change', '[data-group]', function () {
		DoSum($(this));
	});

	//chenge toggle
	$(".grade__toggle .flag").on('change', function () {
		var chk = $(this).prop('checked'),
			$sp = $(this).parents('.scroll__col');
		//$probability = $('#SumTotal').val();

		setTimeout(function () {
			DoSumTt();
		}, 100);

		if (chk == false) {
			$sp.addClass('unavailable');
			$sp.find('[data-group="Total"]').val('');
		} else {
			$sp.removeClass('unavailable');
		}
	});
});

/*//Change layout-img
$(function () {
	function Optionable() {//レイアウト画像の切り替え
		$('.clip-grid__img_row').each(function() {
			var pcFlag = $('#titleAdd').prop('checked');
			var pcReplace = $(this).attr('src').replace(/op_/g,'opCustom_');
			var _pcBack = $(this).attr('src').replace(/opCustom_/g,'op_');
			if (pcFlag) {
				$(this).attr('src',pcReplace);
			} else {
				$(this).attr('src',_pcBack);
			}
		});
	}
	
	function _replace() {//lightboxの画像切り替え
		$('a.media-list__link').each(function() {
			var OpFlag = $('#titleAdd').prop('checked');
			var replace = $(this).attr('href').replace(/def_/g,'custom_');
			var _back = $(this).attr('href').replace(/custom_/g,'def_');
			if (OpFlag) {
				$(this).attr('href',replace);
			} else {
				$(this).attr('href',_back);
			}
		});
	}
	
	Optionable();
	_replace();
	
	$('[name=Title]').change(function () {
		Optionable();
		_replace();
	});
});
*/


//chenge fanclub-popup
$(function () {
	var fanclub = $('.channel-popup__box').attr('name');
	var client = $('.popup-box__input:checked').attr('id');
	$('.channel-popup__box').each(function () {
		if (fanclub == client) {
			$(this).addClass('channel-popup__box_show');
			return false;
		}
		if (fanclub != client) {
			$(this).removeClass('channel-popup__box_show');
		}
	});
	//chenge
	$('#channel1').change(function () {
		$('[name="channel1"]').addClass('channel-popup__box_show');
		$('[name!="channel1"]').removeClass('channel-popup__box_show');

	});
	$('#channel2').change(function () {
		$('[name="channel2"]').addClass('channel-popup__box_show');
		$('[name!="channel2"]').removeClass('channel-popup__box_show');
	});
});

//read range-option
$(function () {
	var rangeOption = $('.date-range__active').text();
	$('.date-range__label, .filter-search__range').text(rangeOption);
	$('.date-range__input').change(function () {
		$('.date-range__label, .filter-search__range').text('カスタム');
	});
});

//read date
function summaryDate() {
	var from = document.getElementById('from').value;
	var to = document.getElementById('to').value;
	document.getElementById('summaryFrom').innerHTML = from;
	document.getElementById('summaryTo').innerHTML = to;
}

$(function () {
	var summary = $('.date-range__input').length;
	if (summary) {
		summaryDate();
	}
	$('.date-range__input').change(function () {
		summaryDate();
	});

	$('.popup-box__clear').click(function () {
		setTimeout(function () {
			summaryDate();
		}, 50);
	});
});

//sortInclude
$(function () {
	//apply-mode
	$('#apply').change(function () {
		//↓編集押したときのコメント付きの表示とアイテム無効の表示
		if ($('#apply').prop('checked')) {
			$('.edit__btn_run').css({
				display: 'inline-block'
			});
			$('.edit__btn_sort').html('キャンセル').css({
				background: '#777',
				color: '#FFF'
			});
			$('.edit__sort-discription').css({
				display: 'block'
			});
			$('.filter-search__close').css({
				display: 'none'
			});
			$('.filter-search__edit').css({
				marginRight: '-8px'
			});
			$('.edit__btn_display').hide();
		} else {
			$('.edit__btn_run').css({
				display: ''
			});
			$('.edit__btn_sort').html('カスタマイズの適用').css({
				background: '',
				color: ''
			});
			$('.edit__sort-discription').css({
				display: ''
			});
			$('.filter-search__close').css({
				display: ''
			});
			$('.filter-search__edit').css({
				marginRight: ''
			});
			$('.edit__btn_display').show();
		}
	});
	//initialize-mode
	$('#initialize').change(function () {
		//↓編集押したときのコメント付きの表示とアイテム無効の表示
		if ($('#initialize').prop('checked')) {
			$('.edit__btn_run').css({
				display: 'inline-block'
			});
			$('.edit__btn_display').html('キャンセル').css({
				background: '#777',
				color: '#FFF'
			});
			$('.edit__display-discription').css({
				display: 'block'
			});
			$('.filter-search__close').css({
				display: 'none'
			});
			$('.filter-search__edit').css({
				marginRight: '-8px'
			});
			$('.edit__btn_sort').hide();
		} else {
			$('.edit__btn_run').css({
				display: ''
			});
			$('.edit__btn_display').html('カスタマイズの初期化').css({
				background: '',
				color: ''
			});
			$('.edit__display-discription').css({
				display: ''
			});
			$('.filter-search__close').css({
				display: ''
			});
			$('.filter-search__edit').css({
				marginRight: ''
			});
			$('.edit__btn_sort').show();
		}
	});
	//sort-mode
	$('#sort').change(function () {
		//↓編集押したときのコメント付きの表示とアイテム無効の表示
		if ($('#sort').prop('checked')) {
			$('.list__link').css('pointer-events', 'auto');
			$('.edit__btn_run').css({
				display: 'inline-block'
			});
			$('.edit__btn_sort').html('キャンセル').css({
				background: '#777',
				color: '#FFF'
			});
			$('.filter-search__list .list-move').toggleClass('list-move_show');
			$('.list__link').css({
				pointerEvents: 'none',
				paddingRight: '48px'
			});
			$('#sortFilterList').sortable({
				disabled: false,
				axis: "y",
				revert: true,
			});
			$('.edit__sort-discription').css({
				display: 'block'
			});
			$('.filter-search__close').css({
				display: 'none'
			});
			$('.filter-search__edit').css({
				marginRight: '-8px'
			});
			$('.edit__btn_display').hide();
			$('.list-toggle').css({
				display: 'none'
			});
			$('head').append('<style>.displaying::after { right: 56px; } </style>');
		} else {
			$('.edit__btn_run').css({
				display: ''
			});
			$('.edit__btn_sort').html('並び替え').css({
				background: '',
				color: ''
			});
			$('.filter-search__list .list-move').toggleClass('list-move_show');
			$('.list__link').css({
				pointerEvents: '',
				paddingRight: ''
			});
			$('#sortFilterList').sortable({
				disabled: true,
			});
			$('#sortFilterList').sortable("option", "revert", false);
			$('.edit__sort-discription').css({
				display: ''
			});
			$('.filter-search__close').css({
				display: ''
			});
			$('.filter-search__edit').css({
				marginRight: ''
			});
			$('.edit__btn_display').show();
			$('head').find('style').remove();
		}
	});
	$('#display').change(function () {
		//↓編集押したときのコメント付きの表示とアイテム無効の表示
		if ($('#display').prop('checked')) {
			$('.list__link').css('pointer-events', 'auto');
			$('.edit__btn_run').css({
				display: 'inline-block'
			});
			$('.edit__btn_display').html('キャンセル').css({
				background: '#777',
				color: '#FFF'
			});
			$('.list__link').css({
				pointerEvents: 'none',
				paddingRight: '48px'
			});
			$('.filter-search__close').css({
				display: 'none'
			});
			$('.list-toggle').css({
				right: '16px'
			});
			$('.edit__display-discription').css({
				display: 'block'
			});
			$('.filter-search__edit').css({
				marginRight: '-8px'
			});
			$('.edit__btn_sort').hide();
			$('.list-toggle').css({
				display: 'block'
			});
			$('head').append('<style>.displaying::after { opacity: 0; } </style>');
		} else {
			$('.edit__btn_run').css({
				display: ''
			});
			$('.edit__btn_display').html('有効化の編集').css({
				background: '',
				color: ''
			});
			$('.list__link').css({
				pointerEvents: '',
				paddingRight: ''
			});
			$('.list-toggle').css({
				right: ''
			});
			$('.edit__display-discription').css({
				display: ''
			});
			$('.filter-search__close').css({
				display: ''
			});
			$('.filter-search__edit').css({
				marginRight: ''
			});
			$('.edit__btn_sort').show();
			$('head').find('style').remove();
		}


	});
	//display mode
	$('.list_sort .list__item').each(function () {
		var displayToggle = $(this).find('.toggle__switch');
		if (displayToggle.prop('checked')) {
			$(this).toggleClass('displaying');
		}

	});
	$('.list_sort .list__item').change(function () {
		var displayToggle = $(this).find('.toggle__switch');
		if (displayToggle.prop('checked')) {
			$(this).toggleClass('displaying');
		} else {
			$(this).removeClass('displaying');
		}
	});

	$('.edit__btn_run, .filter-search__btn, .popup-box__action-btn, .date-range__option').click(function () {
		_showAlert('実行しました');
		setTimeout(function () {
			location.reload();
		}, 1000);
	});
});

//viewerの高さ計算
$(window).on('load resize', function () {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	//	console.log(windowHeight);
	if (windowWidth < 768) {
		$('.viewer__inner').css('height', windowHeight + 'px');
	} else {
		$('.viewer__inner').css('height', '100%');
	}
});

$(function () {
	var ct = 0;
	$('.parent').each(function () {
		var original = $('#block\\[' + ct + '\\]');
		original.find('.add').hide();

		if (ct == 0) {
			original.find('.remove').hide();
		}
		if (ct > 0) {
			original.find('.remove').show();
		}
		ct++;
		var lastBlock = $('.parent:last');
		lastBlock.find('.add').show();
	});

	$('.add').click(function () {

		var parent = $(this).parent('');
		var original = $('#block\\[' + ct + '\\]');
		$('.parent').find('.add').hide();

		if (ct > 0) {
			original.find('.remove').show();
		}
		if (ct < 1) {
			ct++;
		}
		if (ct == 0) {
			ct++;
		}

		parent.clone(true)
			.insertAfter(parent)
			.attr('id', 'block[' + ct + ']')
			.find('.add, .remove').show()
			.end()
			.find('div, input, button').each(function (idx, obj) {
				if ($(obj).attr('id')) {
					$(obj).attr({
						id: $(obj).attr('id').replace(/\[[0-9]\]+$/, '[' + ct + ']')
					});
				}
				if ($(obj).attr('name')) {
					$(obj).attr({
						name: $(obj).attr('name').replace(/\[[0-9]\]+$/, '[' + ct + ']')
					});
				}
				if ($(obj).attr('type') == 'text') {
					$(obj).val('');
				}
				if ($(obj).attr('type') == 'checkbox') {
					$(obj).prop('checked', false);
				}
			});
		ct++;
	});

	$('.remove').click(function () {

		var removeObj = $(this).parent();
		removeObj.fadeOut('fast', function () {

			removeObj.remove();
			ct = 0;

			$("[id^='block']").each(function (index, formObj) {
				if ($(formObj).attr('id') != 'block[0]') {
					ct++;
					$(formObj).attr('id', 'block[' + ct + ']')
						.find('div, input, button').each(function (idx, obj) {
							if ($(obj).attr('id')) {
								$(obj).attr({
									id: $(obj).attr('id').replace(/\[[0-9]\]+$/, '[' + ct + ']')
								});
							}
							if ($(obj).attr('name')) {
								$(obj).attr({
									name: $(obj).attr('name').replace(/\[[0-9]\]+$/, '[' + ct + ']')
								});
							}
						});
				}
			});
			var lastBlock = $('#block\\[' + ct + '\\]');
			lastBlock.find('.add').show();
		});
	});
});
