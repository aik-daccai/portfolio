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
			//$('.top-logo__img').attr('src', 'https://resource.fanmily.jp/admin/images/logo_admin.png');
		} else {
			page.addClass("collapsed");
			$('.global-nav__input').prop('checked', false);
			//$('.channel-sidebar_on').removeClass('channel-sidebar_on');
			$('.channel_active').removeClass('channel_active');
			//$('.top-logo__img').attr('src', 'images/icon_app.png');
			$('#logoutLayer').fadeOut();
		}
	});
	$('.global-nav__label').on('click', function () {
		var page = $('.page-wrapper');
		if (page.hasClass("collapsed")) {
			page.removeClass("collapsed");
			//$('.top-logo__img').attr('src', 'https://resource.fanmily.jp/admin/images/logo_admin.png');
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
	$('.primary').css('color', $('#Primary').val());
	$('.bg_primary').css('background-color', $('#Primary').val());
	//Head Line
	$('.headline').css('color', $('#HeadLine').val());
	//Accent
	$('.accent').css('color', $('#Accent').val());
	//Text
	$('.text').css('color', $('#Text').val());
	//Sub Text
	$('.sub_text').css('color', $('#SubText').val());
	//Content
	$('.contents').css('background-color', $('#Content').val());
	//Gradient
	var startClr = $('#GradientStart').val();
	var endClr = $('#GradientEnd').val();
	$('.gradient').css({
		"background": "linear-gradient(90deg, " + startClr + " 0%, " + endClr + " 100%)"
	});
	//Navigation-bar
	$('.navigation_bar').css('background-color', $('#Navigation-bar').val());
	//Navigation-Tint
	$('.navigation_tint').css('color', $('#Navigation-Tint').val());
	//Primary
	$('.tab_bar').css('background-color', $('#Tab-Bar').val());
	//Background
	$('.background').css('background-color', $('#Background').val());

	//Change color
	//Primary
	$('#Primary').change(function () {
		$('.primary').css('color', $('#Primary').val());
		$('.bg_primary').css('background-color', $('#Primary').val());
	});
	//Head Line
	$('#HeadLine').change(function () {
		$('.headline').css('color', $('#HeadLine').val());
	});
	//Accent
	$('#Accent').change(function () {
		$('.accent').css('color', $('#Accent').val());
	});
	//Text
	$('#Text').change(function () {
		$('.text').css('color', $('#Text').val());
	});
	//Sub Text
	$('#SubText').change(function () {
		$('.sub_text').css('color', $('#SubText').val());
	});
	//Content
	$('#Content').change(function () {
		$('.contents').css('background-color', $('#Content').val());
	});
	//Gradient
	$('#GradientStart, #GradientEnd').change(function () {
		var startClr = $('#GradientStart').val();
		var endClr = $('#GradientEnd').val();
		$('.gradient').css({
			"background": "linear-gradient(90deg, " + startClr + " 0%, " + endClr + " 100%)"
		});
	});
	//Navigation-bar
	$('#Navigation-bar').change(function () {
		$('.navigation_bar').css('background-color', $('#Navigation-bar').val());
	});
	//Navigation-Tint
	$('#Navigation-Tint').change(function () {
		$('.navigation_tint').css('color', $('#Navigation-Tint').val());
	});
	//Primary
	$('#Tab-Bar').change(function () {
		$('.tab_bar').css('background-color', $('#Tab-Bar').val());
	});
	//Background
	$('#Background').change(function () {
		$('.background').css('background-color', $('#Background').val());
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

	//validation
	var scratch = document.getElementById('scratch');
	scratchValidat();
	if (scratch != null) {
		scratch.addEventListener('change', scratchValidat);
		scratch.addEventListener('input', scratchValidat);
		scratch.addEventListener('click', scratchValidat);
	}

	function scratchValidat() {
		var flag = false;
		var prop3 = $('#third .flag').prop('checked');
		var prop4 = $('#fourth .flag').prop('checked');
		var src = $('#coverImage').prop("src");

		if (!($('[name=scratch_title]').val())) {
			flag = true;
		} else if (!($('[name=start_time]').val())) {
			flag = true;
		} else if (!($('[name=end_time]').val())) {
			flag = true;
		} else if (!($('[name=display_start_time]').val())) {
			flag = true;
		} else if (!($('[name=price]').val())) {
			flag = true;
		} else if (!($('[name=first_title]').val())) {
			flag = true;
		} else if (!($('[name=first_rate]').val())) {
			flag = true;
		} else if (!($('[name=second_title]').val())) {
			flag = true;
		} else if (!($('[name=second_rate]').val())) {
			flag = true;
		}
		if (src == 'https://resource.fanmily.jp/admin/images/img_noitem.jpg') {
			if (!($('[name=cover_image]').val())) {
				flag = true;
			}
		}
		if (prop3) {
			if (!($('[name=third_title]').val())) {
				flag = true;
			} else if (!($('[name=third_rate]').val())) {
				flag = true;
			}
		}
		if (prop4) {
			if (!($('[name=fourth_title]').val())) {
				flag = true;
			} else if (!($('[name=fourth_rate]').val())) {
				flag = true;
			}
		}
		if (flag) {
			$('.scratch__submit-btn').prop('disabled', true).css('background', '#ccc');
			return false;
		} else {
			$('.scratch__submit-btn').prop('disabled', false).css('background', '');
		}
	}
});

//景品の追加
$(function () {
	var ct = 0;
	$('.grade__prize').each(function () {
		var $1st = $('#grade\\[' + ct + '\\]');
		var lastBlock = $('.grade__prize:last');
		var $count = $('.grade__prize').length;
		$1st.find('.grade__prize-add').hide();

		if (ct == 0) {
			$1st.find('.grade__prize-delete').hide();
		}
		if (ct > 0) {
			$1st.find('.grade__prize-delete').show();
		}
		ct++;
		if ($count > 9) {
			$('.grade__prize-add').hide();
		} else {
			lastBlock.find('.grade__prize-add').show();
		}
	});

	//add
	$('.grade__prize-add').click(function () {
		var $1stParent = $(this).parent(),
			$1st = $('#grade\\[' + ct + '\\]'),
			$count = $('.grade__prize').length,
			$thumb = $(this).parent('.grade__prize').find('.thumb').length,
			$uploaded = $(this).parent('.grade__prize').find('.uploaded').length,
			video = $(this).parents('.grade__prize').find('.video__name').length,
			bg = $(this).parents('.grade__prize').find('.form__file-bg').length,
			txta = $(this).parents('.grade__prize').find('textarea').length,
			deleteCheck = $(this).parents('.grade__prize').find('.grade__img .media-list__checkbox').length,
			$loading = $(this).parents('.grade__prize').find('.video').length,
			/*      ↓ 追記コード ↓      */
			clonecode = $('.grade__prize:last').clone(true),
			cloneno = clonecode.attr('data-formno'),
			cloneno2 = parseInt(cloneno) + 1,
			cloneno3 = parseInt(cloneno) + 2;
		/*        ↑ ここまで ↑      */

		$('.grade__prize').find('.grade__prize-add').hide();

		if (ct > 0) {
			$1st.find('.grade__prize-delete').show();
		}
		if (ct < 1) {
			ct++;
		}
		if (ct == 0) {
			ct++;
		}
		ct = $('.grade__prize').length;

		$1stParent.clone(true)
		/*      ↓ 追記コード ↓      */
		clonecode.attr('data-formno', cloneno2);
		clonecode.find('.grade__prize-num').html(cloneno3)
		clonecode.insertAfter($('.grade__prize:last'))
			/*        ↑ ここまで ↑      */
			.attr('id', 'grade[' + ct + ']')
			.find('.grade__prize-add, .grade__prize-delete').show()
			.end()
			.find('div, input, button, textarea, select').each(function (idx, obj) {
				$(this).parents('.grade__prize').find('select.prize-type').val('0');
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
				if ($(obj).attr('type') == 'hidden') {
					$(obj).val('');
				}
				if ($(obj).attr('type') == 'text') {
					$(obj).val('');
				}
				if ($(obj).attr('type') == 'file') {
					$(obj).val('');
				}
				if ($(obj).attr('type') == 'number') {
					$(obj).val('');
				}
				if ($(obj).attr('class') == 'uploaded') {
					$(obj).val('');
				}
				if (txta == 1) {
					$(this).parent('.grade__prize').find('textarea').val('');
				}
				if ($uploaded == 1) {
					$(this).parent('.grade__prize').find('.uploaded').attr('src', 'https://resource.fanmily.jp/admin/images/img_noitem.jpg').show();
				}
				if ($loading == 1) {
					$(this).parents('.grade__prize').find('.scratch__img-inner').removeClass('video').removeClass('video_loading');
				}
				if ($thumb == 1) {
					$(this).parent('.grade__prize').find('.thumb').remove();
				}
				if (video == 1) {
					$(this).parent('.grade__prize').find(".video__name").empty();
				}
				if (video == 1) {
					$(this).parent('.grade__prize').find(".media-list__edit").remove();
				}
				if (video == 1) {
					$(this).parent('.grade__prize').find(".media-list__pre-btn").remove();
				}
				if ($count >= 9) {
					$('.grade__prize-add').hide();
				}
			})
			.find('div').each(function () {
				if (bg == 0) {
					$(this).parents('.grade__prize').find('input[type=file]').after('<span class="form__file-bg">クリックで<br>メディアを追加</span>');
				}
				if (deleteCheck > 0) {
					$(this).parents('.grade__prize').find('.media-list__btn').show();
					$(this).parents('.grade__prize').find('.media-list__checkbox').remove();
					$(this).parents('.grade__prize').find('.grade__img').removeClass('close');
				}
				$(this).parents('.grade__prize').find('.clear-button').css({
					display: ''
				});
				return false;
			}).parents('.grade__prize').find('.prize-download').hide().children('.checkbox__input').prop('checked', false);
		ct++;
	});
	//delete
	$('.grade__prize-delete').click(function () {
		/*      ↓ 追記コード ↓      */
		$(this).parents(".grade__prize").remove();
		var scount = 0;
		$('.grade__prize').each(function () {
			var scount2 = scount + 1;
			$(this).attr('data-formno', scount);
			$('.grade__prize-num', this).html(scount2);
			scount += 1;
		});
		/*        ↑ ここまで ↑      */
		var removeObj = $(this).parent();
		removeObj.fadeOut('fast', function () {

			removeObj.remove();
			ct = 0;

			$("[id^='grade']").each(function (index, formObj) {
				if ($(formObj).attr('id') != 'grade[0]') {
					ct++;
					$(formObj).attr('id', 'grade[' + ct + ']')
						.find('div, input, button, textarea, select').each(function (idx, obj) {
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
			var lastBlock = $('#grade\\[' + ct + '\\]');
			lastBlock.find('.grade__prize-add').show();
		});
	});
});


//景品種類
$(function () {
	$(".prize-type").change(function () {
		var prizeType = $(this).val();
		if (prizeType == "0") {
			$(this).parents('.form__field-inner').find('.prize-download').hide().children('.checkbox__input').prop('checked', false);
		}
		if (prizeType == "1") {
			$(this).parents('.form__field-inner').find('.prize-download').show();
		}
		if (prizeType == "2") {
			$(this).parents('.form__field-inner').find('.prize-download').hide().children('.checkbox__input').prop('checked', false);
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

//media-category
$(function () {
	function category() {
		var category_val = $('.media-category select').val();
		//var isAnnounce = $('.media-category__announce');
		if (category_val == '0') {
			$('#imgCategory').show();
			$('#videoCategory').hide();
			//isAnnounce.text('画像が複数枚ある場合は、スライド表示されます');
		} else if (category_val == '1') {
			$('#imgCategory').hide();
			$('#videoCategory').show();
			//isAnnounce.text('動画がリピート再生されます');
		}
	}
	category();
	$('.media-category select').change(function () {
		category();
	});
});


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
	//edit
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
		}
	});
});
