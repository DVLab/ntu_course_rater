$('body').prepend('<div id="toppanel"></div>');

$.ajax({
			type:"GET",
			url:chrome.extension.getURL("template.html")
		}).done(function(template) {

			$('#toppanel').prepend(template); 
			bindOpinonClick();
			loadButtonImages();
			autoCompleteSelection();
			bindCheckBoxForHomework();

			$("#submitButton").bind('click',function(){submit();});
			$("#privacy").bind('click',function(){ showMessageDialog();});

			$("#comment").change(function(){ changeCommentText();});

			$("input[name=ans1]")[0].click();
			$("input[name=ans2]")[0].click();
			$("input[name=ans3]")[0].click();
			$("input[name=ans4]")[1].click();

			current_course = getCourse();
			var code = current_course.user;

			var json_id_courses = JSON.stringify( {"authCode": CryptoJS.SHA1(code).toString()} );
			$.ajax({
				   type:"POST",
				   url:"http://r444b.ee.ntu.edu.tw/course_rater/checkUsed.php",
				   datatype: "json",                                                                                                                                                                                      
	    		   error: function() { console.log('Uh Oh!'); },
				   data: {"CHECK": json_id_courses }
				}).done(function(used) {
					console.log(used);
					if ( used == 0 ){
						$("#privacy").click();
					}
			});

		});	
