if (location.href.indexOf('selectCourse') > -1) {
	var div = $('<div></div>');
	$(document.body).append(div);
	div.attr('id', 'brush');
	if ($('#regfrm table tbody tr').length == 0) {
		div.html('课程列表中无课程');
	} else {
		var courseNumber = localStorage['courseNumber'];
		if (!courseNumber) {
			courseNumber = prompt("请输入要选的课程边号","");
		} 
		courseNumber = courseNumber.trim();
		div.html("正在刷的课程号:" + courseNumber);
	    var course = null;
	    $('a span').each(function() {
	    	if ($(this).text() == courseNumber) {
	    		course = $(this).parents('tr').find('input:first');
	    		return;
	    	}
	    })
	    if (course) {
	    	console.log(course);
	    	if (!course.prop('disabled')) {
	    		course.attr('checked', true);
		        $('button[type="submit"]').click();
		        var timer = setInterval(function() {
		        	var ok = $('button[value="ok"]');
		        	if (ok.length > 0) {
		        		ok.click();
		        		clearInterval(timer);
		        	}
		        }, 10);
		    	localStorage.clear();
	    	} else {
	    		setTimeout(function () {
		    		if (!localStorage['courseNumber']) {
			    		localStorage['courseNumber'] = courseNumber;
			    	}
		    		location.reload();
		    	}, 1500);
	    	}
	    } else {
	    	div.html('课程列表中没有该课程号');
	    }
	}
} else {
	localStorage.clear();
}