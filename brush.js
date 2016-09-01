init();

function init() {
	addButtons();
	var disabled = localStorage.getItem('disabled');
	if (!disabled || disabled== 'false') {
		console.log('------------------------------------------------------');
		var courseNumbers = getStorageCourseNumbers();
		var degrees = getStorageDegrees();
		if (courseNumbers.length == 0) {
			loadModal();
		} else {
			if (location.href.indexOf('selectCourse') > -1) {
				if ($('#regfrm table tbody tr').length == 0) {
					notice(document.body, '课程列表中无课程', 'danger');
				} else {
					brush(courseNumbers, degrees);
				}
			} else {
				$("tr > td > a").each(function() {
					var text = $(this).text().trim();
					for (var index = courseNumbers.length - 1; index > -1; index--) {
						if (text == courseNumbers[index]) {
							console.log('课程:' + courseNumbers[index] + '已选上,是否为学位课:' + degrees[index]);
							courseNumbers.splice(index, 1);
							degrees.splice(index, 1);
						}
					}
				});
				checkCollege(courseNumbers, degrees);
			}
		}
	}
}
function addButtons() {
	var disabled = localStorage.getItem('disabled');
	var buttons = '';
	if (disabled == 'true') {
		buttons += '<button id="startBrush" type="button" class="btn btn-primary btn-lg">继续刷课</button>';
		
	} else if ((getStorageCourseNumbers().length > 0 && !disabled) || disabled == 'false') {
		buttons += '<button id="stopBrush" type="button" class="btn btn-primary btn-lg">停止刷课</button>';
	}
	if (getStorageCourseNumbers().length > 0) {
		buttons += '<button id="endBrush" type="button" class="btn btn-danger btn-lg">结束刷课</button>';
	}
	$(document.body).prepend('<div class="text-center">' + buttons + '</div>')
	$('#stopBrush').click(function() {
		localStorage.setItem('disabled', 'true');
		window.location.reload();
	});
	$('#startBrush').click(function() {
		localStorage.setItem('disabled', 'false');
		window.location.reload();
	});
	$('#endBrush').click(function() {
		localStorage.clear();
		window.location.reload();
	});
}

function checkCollege(courseNumbers, degrees) {
	if (courseNumbers.length > 0) {
		$('#regfrm2 label').each(function () {
			var text = $(this).text();
			for (var index in courseNumbers) {
				if (text.indexOf(courseNumbers[index].substr(0, 2)) > -1) {
					console.log('勾选课程所在学院:' + courseNumbers[index]);
					$(this).prev().prop('checked', true);
				}
			}
		});
		if ($('#regfrm2 input[type=checkbox]:checked').length > 0) {
			setStorage(courseNumbers, degrees);
			console.log('提交增加选课');
			$('#regfrm2 button[type=submit]').click();
		}
	}
}

function loadModal() {
	$(document.body).append(
		'<div class="modal fade" id="brush-modal">' +
		'<div class="modal-dialog">' +
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'<h4 class="modal-title">填写信息</h4>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<div><label for="courseNumber" class="control-label">课程号(多个请使用|分隔)</label></div>' +
		'<input type="text" class="form-control" id="courseNumber" placeholder="091M4041H" style="width: 96%;">' +
		'</div>' +
		'<div class="form-group">' +
		'<div><label for="degree" class="control-label">是否作为学位课,和课程号一一对应(多个请使用|分隔)</label></div>' +
		'<input type="text" class="form-control" id="degree" placeholder="true|false" style="width: 96%;">' +
		'</div>' +
		'</form>' +
		'</div>' +
		'<div class="modal-footer">' +
		'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
		'<button type="button" id="ok" class="btn btn-primary">确定</button>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>');
	var modal = $('#brush-modal');
	modal.modal();
	$('#ok').click(function () {
		var courseNumbers = removeEmptyInArray($('#courseNumber').val().replace(/\s/g, '').split('|'));
		if (courseNumbers.length > 0) {
			var degrees = removeEmptyInArray($('#degree').val().replace(/\s/g,'').split('|'));
			while (degrees.length < courseNumbers.length) {
				degrees.push('false');
			}
			modal.modal("hide");
			if (location.href.indexOf('selectCourse') > -1) {
				brush(courseNumbers, degrees);
			} else {
				checkCollege(courseNumbers ,degrees);
			}
		} else {
			notice('.modal form', '请输入课程号', 'danger');
		}
	});
}

function removeEmptyInArray(array) {
	for (var index = array.length - 1; index > -1; index--) {
		if (array[index].length == 0) {
			array.splice(index, 1);
		}
	}
	return array;
}

function notice(context, msg, type) {
	$(".text-center.alert").remove();
	if (context) {
		$(context).prepend('<div class="text-center alert alert-' + type + ' alert-dismissible" role="alert" style="font-size:30px">' +
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
			'<strong>' + msg + '</strong>' +
			'</div>');
	}
}

function brush(courseNumbers, degrees) {
	for (var index = courseNumbers.length - 1; index > -1; index--) {
		console.log("查找该课程:" + courseNumbers[index]);
		var courseNumberInput = null, degreeInput = null;
		$('a span').each(function () {
			if ($(this).text().trim() == courseNumbers[index]) {
				console.log("找到该课程:" + courseNumbers[index]);
				var tr = $(this).parents('tr').find('input');
				courseNumberInput = tr.eq(0);
				degreeInput = tr.eq(1);
				return;
			}
		});
		if (courseNumberInput) {
			if (!courseNumberInput.prop('disabled')) {
				console.log("勾选该课程:" + courseNumbers[index]);
				courseNumberInput.prop('checked', true);
				if ((degrees[index] == 'true') && !degreeInput.prop("disabled")) {
					console.log("学位课勾选:" + courseNumbers[index]);
					degreeInput.prop("checked", true);
				}

			} else {
				console.log("该课程选满,下次继续刷:" + courseNumbers[index]);
				setInterval(function () {
					location.reload();
				}, 1500);
			}
		} else {
			console.log("未找到该课程:" + courseNumbers[index]);
			console.log("下次不刷该课程:" + courseNumbers[index]);
			courseNumbers.splice(index, 1);
			degrees.splice(index, 1);
		}
	}
	if ($('input[type=checkbox]:checked').length > 0) {
		console.log("有选中课程,提交选课");
		$('button[type="submit"]').click();
		var timer = setInterval(function () {
			var ok = $('button[value="ok"]');
			if (ok.length > 0) {
				ok.click();
				clearInterval(timer);
			}
		}, 10);
	}
	setStorage(courseNumbers, degrees);
}

function setStorage(courseNumbers, degrees) {
	localStorage.setItem('courseNumbers', courseNumbers.join('|'));
	localStorage.setItem('degrees', degrees.join('|'));
}

function getStorageCourseNumbers() {
	return getStorage('courseNumbers');
}

function getStorageDegrees() {
	return getStorage('degrees');
}

function getStorage(key) {
	var temp = localStorage.getItem(key);
	if (temp) {
		return temp.split('|');
	}
	return [];
}
