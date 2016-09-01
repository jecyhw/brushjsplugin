init();

function init() {
    var courseNumber = localStorage['courseNumber'];
    if (location.href.indexOf('selectCourse') > -1) {
		if ($('#regfrm table tbody tr').length == 0) {
			notice('课程列表中无课程', 'danger');
		} else {
			if (!courseNumber) {
				loadModal();
			} else {
				brush(courseNumber, localStorage[courseNumber]);
			}
		}
	} else {
        if (courseNumber) {
			$("tr > td > a").each(function() {
				if ($(this).text().trim() == courseNumber) {
					notice('课程:' + courseNumber + '已选上,是否为学位课:' + localStorage[courseNumber]);
            		localStorage.removeItem('courseNumber');
            		localStorage.removeItem(courseNumber);
				}
			});
            
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
		'<label for="courseNumber" class="control-label">课程号</label>' +
		'<input type="text" class="form-control" id="courseNumber" placeholder="091M4041H">' +
		'</div>' +
		'<div class="checkbox">' +
		'<label  class="control-label">' +
		'<input type="checkbox" id="degree"> 是否作为学位课' +
		'</label>' +
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
		var courseNumber = $('#courseNumber').val();
		var degree = $('#degree').prop('checked');
		modal.modal("hide");
		brush(courseNumber, degree);
	});
}

function notice(msg, type) {
	$(".text-center.alert").remove();
	$(document.body).prepend('<div class="text-center alert alert-' + type + ' alert-dismissible" role="alert" style="font-size:30px">' +
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'<strong>' + msg + '</strong>' +
		'</div>');
}

function brush(courseNumber, degree) {
	courseNumber = courseNumber.trim();
	if (courseNumber && courseNumber.length > 0) {
		console.log("查找课程:" + courseNumber);
		notice('正在刷的课程号:' + courseNumber, 'info');
		var courseNumberInput = null, degreeInput = null;
		$('a span').each(function () {
			if ($(this).text().trim() == courseNumber) {
				console.log("找到课程");
				var tr = $(this).parents('tr').find('input');
				courseNumberInput = tr.eq(0);
				degreeInput = tr.eq(1);
				return;
			}
		});
		if (courseNumberInput) {
			if (!courseNumberInput.prop('disabled')) {
				console.log("勾选课程");
				courseNumberInput.prop('checked', true);
				if (degree && !degreeInput.prop("disabled")) {
					console.log("勾选学位课");
					degreeInput.prop("checked", true);
				}
				console.log("提交选课");
				$('button[type="submit"]').click();
				var timer = setInterval(function () {
					var ok = $('button[value="ok"]');
					if (ok.length > 0) {
						ok.click();
						clearInterval(timer);
					}
				}, 10);
				localStorage.removeItem('courseNumber');
				localStorage.removeItem(courseNumber);
			} else {
				console.log("课程选满,准备继续刷");
				setTimeout(function () {
					if (!localStorage['courseNumber']) {
						localStorage['courseNumber'] = courseNumber;
						localStorage[courseNumber] = degree;
					}
					location.reload();
				}, 1500);
			}
		} else {
			console.log("未找到课程");
			notice('课程列表中没有该课程号', 'danger');
		}
	} else {
        notice('请输入正确的课程号', 'danger');
	}
}
