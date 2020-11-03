// JavaScript Document
//uploadFilesの実行(使用するクラス名を入れてください)
$(function () {
	var fileInput = $('.upload__input');
	fileInput.uploadFiles();
});
/*************************************
**************************************
			uploadFiles
**************************************
*************************************/
$.fn.uploadFiles = function (option) {
	//option選択(詳細は下記のoption内容を参照)
	option = $.extend({
		position: 0, // 0:before, 1:after, 2:parent.prepend, 3:parent.append,
		// arbitrarily : プレビュー画像を任意の場所に挿入できるので、数字を入れください↑
		imgbreak: false, // append <br> after images：改行（<br>）挿入
		alternate: '.alt' // selecter for alternate view input file names
	}, option || {});
	
	//ドラッグしている要素がドロップ領域に入ったとき・領域にある間
	$('.upload__img').on('dragenter dragover', function (event) {
		event.stopPropagation();
		event.preventDefault();
	});
	
	//ドラッグしている要素がドロップ領域から外れたとき
	$('.upload__img').on('dragleave', function (event) {
		event.stopPropagation();
		event.preventDefault();
	});
	
	//（input以外のボタン）クリックで画像を選択する場合
	$('.uploadBtn').on('click', function () {
		//$('.upload__input').click();
		//sns.html
		$(this).parents('.sns__content-fluid').find('.upload__input').click();
	});
	
	//ファイルが変更された時
	this.change(function () {
		var $parent = $(this).parent('.upload');
		$parent.find('.upload__img').hide();
		$parent.find('.upload__txt').hide();
		$parent.removeClass('video');
		$parent.find('.clear-button').fadeIn();
		$.fn.uploadFiles.run.call(this, option);
	});
	
	return this;
};

//↓option内容（アップロード時の動き）↓
// preview uploadnail images
$.fn.uploadFiles.run = function (option) {
	var $self = $(this);
	var $parent = $(this).parent('.upload');
	// clear uploadnail images
	$.fn.uploadFiles.clear.call($self, option);

	// HTML5 ?
	if (window.File && window.FileReader && this.files) {
		var filenames = [];
		for (var i = 0, I = this.files.length; i < I; i++) {
			var file = this.files[i];
			if (file && (file.type && file.type.match(/^image/) // image ?
					|| !file.type && file.name.match(/\.(jp[eg]+|png|gif|bmp)$/i) && $.browser.msie)) {
				var reader = new FileReader();
				reader.onload = function (file, i) {
					return function () {
						var tag = '<img src="' + this.result + '" alt="' + file.name + '" title="' + file.name + ' (' + Math.round(file.size / 1024) + 'kb)' + '" class="uploaded" />';

						// set uploadnail images
						$.fn.uploadFiles.set.call($self, option, tag);
					}
				}(file, i);
				reader.readAsDataURL(file); // read image data

				// add filenames
				filenames.push(file.name);
				$parent.find('.upload__video').empty();

			} else {//videoの時の表示
				var fragment = file.name;
				var video = $(this).parent('.upload').find('.upload__video');
				if (video.length) {
					$parent.find('.upload__video').append(fragment);
				} else {
					$(this).after('<span class="upload__video">' + fragment + '</span>');
				}
				$parent.find('.uploaded').slideUp();
			}
		}

		// file names
		var alt = (filenames.length) ? filenames.join(', ') : null;

	}
	// legacy IE
	else {
		var file = this.value;
		if (file && !file.match('fakepath') && file.match(/\.(jp[eg]+|png|gif|bmp)$/i)) {
			var img = new Image();
			img.src = file;
			img.onload = function () {
				var filename = this.src.match(/([^\\\/]+)$/) ? RegExp.$1 : '';
				var tag = '<img src="' + this.src + '" alt="' + filename + '" title="' + this.src + '" class="legacy uploaded" />';

				// set uploadnail images
				$.fn.uploadFiles.set.call($self, option, tag);
			};
			if (img.complete) img.onload();
		}

		// file names
		var alt = (!file) ? null : file.match(/([^\\\/]+)$/) ? RegExp.$1 : file;
	}
};

// clear uploadnail images
$.fn.uploadFiles.clear = function (option) {
	// find images
	var $images = (typeof option.position == 'number')
		? this.siblings('img.uploaded')
		: $(option.position).find('img.uploaded');

	// remove images
	if ($images.length) {
		$images.not('.upload__img').next('br').remove()
			.end().remove();
	}
};

// position uploadnail images
$.fn.uploadFiles.set = function (option, tag) {
	var in_label = this.parent('label').length;
	var tag_br = (option.imgbreak) ? "<br />\n" : "\n";
	var $tag = (option.position == 1 || option.position == 3) ? $(tag_br + tag)
		: $(tag + tag_br);
	// append
	(option.position == 0) ? this.before($tag): (option.position == 1) ? this.after($tag)
		: (option.position == 2) ? this.parent().prepend($tag)
		: (option.position == 3) ? this.parent().append($tag)
		: $(option.position).append($tag).show();

	// as trigger in label ?
	if (in_label) {
		var $self = $(this);
		$tag.click(function (e) {
			$self.click();
			return false;
		});
	}
};


/*************************************
**************************************
			others action
**************************************
*************************************/
$(function() {
	//[編集モード]hovern時の「プレビュー」表示
	$('.upload').hover(function() {
		$(this).find('.upload__preview').fadeIn().html('<p class="media-hover">プレビュー画面へ</p>');
	}, function() {
		$(this).find('.upload__preview').fadeOut().html('');
	});
	
	//[編集モード]削除フラグの"close"クラスの付与
	$('.media-list__delete .checkbox__input').change(function () {
			$(this).parents('.media-list__item').toggleClass('close');
	});
	
	$('.media-list__checkbox .checkbox__input').change(function () {
			$(this).parents('.grade__img').toggleClass('close');
	});
	
	//[新規モード]ファイル選択後に"clear”ボタンを表示
	if ($('.upload__text').length) {
		$('input[type=file]').change(function () {
			$(this).parents('.media-list__item, .grade__img').find('.clear-button').fadeIn();
		});
	}
	if ($('.upload__text').length) {
		$('input[type=file]').change(function () {
			$(this).parents('.upload').find('.clear-button').fadeIn();
		});
	}

	//clearの動作
	$('.clear-button').click(function () {
		//default
		var $mediaField = $(this).parent('.upload');
		$mediaField.find('input[type=file]').val('');
		$mediaField.find('.uploaded').remove();
		$mediaField.find('.upload__txt, .upload__img').show();
		$mediaField.find('.upload__video').empty();
		$(this).css('display', '');
		
	});
	
});
