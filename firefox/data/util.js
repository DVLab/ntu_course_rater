var overall_click_order = [];
var current_course;

var addClickOrder = function (ith){
	if ( overall_click_order.indexOf(ith) == -1 )
		overall_click_order.push(ith);
}

var removeClickOrder = function (ith){
	overall_click_order = overall_click_order.filter( function (v) { return v!=ith; }  )
}

var automateCompleteLoading = function(obj){
	if ( obj.className.search("_pressed") < 0 || (obj.className !== "hw_loading_pressed" && obj.className !== "exam_loading_pressed") )
		return;
	var score = parseInt(obj.id);
	if ( obj.className === "hw_loading_pressed"){
		var exam_pressed = $(".exam_loading_pressed");
		if ( exam_pressed.get(0) )
			score = (parseInt(exam_pressed.get(0).id) + parseInt(obj.id))/2;
	}else if ( obj.className === "exam_loading_pressed" ){
		var hw_pressed = $(".hw_loading_pressed");
		if ( hw_pressed.get(0) )
			score = (parseInt(hw_pressed.get(0).id) + parseInt(obj.id))/2;
	}
	$("div.loading[id=" + Math.round(score) + "]").click();
}

var autoCompleteSelection = function(){
	$("#autoCompleteSelection").change(function(){
		var value = $(this).find(":selected").val();
		for ( var i = 5 ; i <= 28 ; ++i ){
			$("input[name^=ans" + i +"]").each(function(ith,obj){if(ith+1==value) obj.click();})
		}
	});
	for ( var i = 5 ; i <= 28 ; ++i ){
		$("input[name^=ans" + i +"]").each(function(ith,obj){if(ith+1==5) obj.click();})
	}
}


var hasActivities = function() {
	result = false;
	for (i = 0; i < 9; ++i) {
		result = $('input[name="activity' + i + '"]').attr('checked');
		if (result) break;
	}
	return result;
}
var bindCheckBoxForHomework = function() {
	$('input[name^="activity"]').each(function(index) {
		$(this).change(function(e) {
		if(hasActivities()){
				$('input[name="ans4"][value="1"]').click();
		}
		else{
				$('input[name="ans4"][value="2"]').click();
		}
		//	console.log("1");
	//		if (hasActivities()) {
		//		var $yes_button = $('input[name="ans4"][value="1"]');
		//		if (!$yes_button.prop('checked')) $yes_button.click();
				if( $(this).attr('checked')){
					$('input[name="homework"][value="' + (index + 1) + '"]').prop('checked', true);
				}
				else{
					$('input[name="homework"][value="' + (index + 1) + '"]').prop('checked', false);
				}
	//		} else {
		//		$('input[name="ans4"][value="2"]').click();
	//			}
//			console.log("this_check:"+$(this).attr('checked'));
		
		});
	});
}
/*
var bindCheckBoxForHomework = function(){

	$("input[name=extraLearning]").bind('click',function(){
	//	var value = $(this).val();
	//	if (this.checked){
	//		$("input[name=ans4]")[0].click();
	//		console.log("input:"+$("input[name=ans4]")[0].html());
		console.log("0");
		var checked = 0;
		$("input[name=homework]").each(function(ith,obj){
			if($(obj).val()==value){
				obj.click(); 
				console.log("1");
//				$('input[name="homework"][value="'+(ith + 1) + '"]').attr('checked', obj.checked);
			}
			if(obj.checked){
				console.log("2");
				var yes_button = $('input[name="ans4"]')[0];
//				if (!yes_button.prop('checked')) $yes_button.click();
//				$('input[name="homework"][value="'+(ith + 1)+'"]').attr('checked', obj.checked);
				checked++;
			}
		})
		if (checked==0){

				console.log("3");
				var yes_button = $('input[name="ans4"]')[1];
//				if (!yes_button.prop('checked')) $yes_button.click();
//				$('input[name="ans4"][value="2"]').click();
//			$("input[name=ans4]")[1].click();
		}
	});
}*/

function Course(semester, user, course_code, class_num, teacher_name, course_name) {
	this.semester = semester;
	this.user = user;
	this.course_code = course_code;
	this.class_num = class_num;
	this.teacher_name = teacher_name;
	this.course_name = course_name;
	
	this.print = function() {
		console.log(this.semester + " [" + this.course_code + "-" + this.class_num + ":" + this.credit + "] " + this.user);
	};
}

var loadButtonImages = function(){
	$.each( $("img.multiOptTip"), function(index){ $("img.multiOptTip")[index].src=chrome.extension.getURL("images/multipleOptions.png");} );
	$.each( $("img.singleOptTip"), function(index){ $("img.singleOptTip")[index].src=chrome.extension.getURL("images/singleOption.png"); } );
	//$("img.backToCoursesAndSubmitImg")[0].src = chrome.extension.getURL("images/submit.png");
}

var getCourse = function() {
	var user = $("input[name=USER]").get(0).value;
	var course_code = $("input[name=COU_CODE]").get(0).value;
	var class_num = $("input[name=CLASS]").get(0).value; if (class_num.replace(/ /g,'').length==0) class_num = "00";
	
	var semester = $("b").get(0).parentNode.childNodes[1].textContent.replace(/ /g,'') + $("b").get(1).parentNode.childNodes[1].textContent.replace(/ /g,'');
	var course_name = ""+$("b").get(2).parentNode.childNodes[1].textContent.replace(/ /g,'');
	var teacher_name = ""+$("b").get(3).parentNode.childNodes[1].textContent.replace(/ /g,'');
	var refined_semester = "";
	for ( var i = 0 ; i < semester.length ; ++i ){
		if (semester[i]=='１') refined_semester += '1';
		if (semester[i]=='２') refined_semester += '2';
		if (semester[i]=='０') refined_semester += '0';
	}
	semester = refined_semester;

	//var course_name = $(info.get(5+bachelorShift)).html().replace(/ /g,'');
	//var credit = $(info.get(4+bachelorShift)).html();

	/*
	var year = semester.substring(0,3);
	if ( year[0] == '0' )
		year = year.substring(1,3);
	var sem = '上';
	if ( semester.substring(3,4) == "2" )
		sem = '下'
	semester = year + '年' + sem;
	*/

	return new Course(semester, user, course_code, class_num, teacher_name, course_name);
}

var loadButtonImages = function(){
	$.each( $("img.multiOptTip"), function(index){ $("img.multiOptTip")[index].src=chrome.extension.getURL("images/multipleOptions.png");} );
	$.each( $("img.singleOptTip"), function(index){ $("img.singleOptTip")[index].src=chrome.extension.getURL("images/singleOption.png"); } );
	$("img.submit")[0].src = chrome.extension.getURL("images/submit.png");
}

var bindOpinonClick = function(){
	var types = ['overall','style', 'learning', 'hw_loading', 'exam_loading', 'loading', 'difficulty']; // do not change the order
	$(types).each( function(ithType,type){ 
		$('.'+type).each( function(ith, obj){
			$(obj).unbind();
			$(obj).bind('click', function(){
				$("#errorMsg").html("");
				var pressPressed = false;
				if ( $('.'+type+'_pressed')[0] === obj )
					pressPressed = true;

				// single option
				if (ithType>=3) { $('.'+type+'_pressed').each(function(jth,obj2){ $(obj2).toggleClass(type).toggleClass(type+'_pressed'); 	updateText();  });  } 
				if ( ithType==2 && (obj.id==4 || obj.id==5) ){
					$('.'+type+'_pressed').each(function(jth,obj2){ if(obj2.id==4 || obj2.id==5) $(obj2).toggleClass(type).toggleClass(type+'_pressed'); updateText(); });
				}
				if ( ithType==2 && (obj.id==6 || obj.id==7) ){
					$('.'+type+'_pressed').each(function(jth,obj2){ if(obj2.id==6 || obj2.id==7) $(obj2).toggleClass(type).toggleClass(type+'_pressed'); updateText(); });
				}
				if ( (ithType>=3) && (pressPressed==true) ) {return; }
				else if ( ithType==2 && (obj.id==4 || obj.id==5) && pressPressed ) { return; }
				else if ( ithType==2 && (obj.id==6 || obj.id==7) && pressPressed ) { return; }

				if ( ithType === 0 ){
					if ( obj.className.search("_pressed") > 0 )
						removeClickOrder(parseInt(obj.id));
					else
						addClickOrder(parseInt(obj.id));
				}
				$(obj).toggleClass(type+'_pressed').toggleClass(type); 
				automateCompleteLoading(obj);
				updateText();
			});
		});
	});
}

var submit = function(){
	//var current_course = getCourse();
	var cm_overall = "", cm_difficulty="",cm_loading="", cm_style="", cm_hwLoading="",cm_examLoading="", cm_learning="";
	
	$('div.overall_pressed').each(function(ith,obj){ cm_overall += obj.id.toString() + ","; });
	$('div.style_pressed').each(function(ith,obj){ cm_style += obj.id.toString() + ","; });
	$('div.loading_pressed').each(function(ith,obj){ cm_loading = obj.id.toString() + ","; });
	$('div.difficulty_pressed').each(function(ith,obj){ cm_difficulty = obj.id.toString() + ","; });
	$('div.hw_loading_pressed').each(function(ith,obj){ cm_hwLoading = obj.id.toString() + ","; });
	$('div.exam_loading_pressed').each(function(ith,obj){ cm_examLoading = obj.id.toString() + ","; });
	$('div.learning_pressed').each(function(ith,obj){ cm_learning += obj.id.toString() + ","; });

	if ( cm_overall.length>0 ) cm_overall=cm_overall.substring(0, cm_overall.length - 1);
	if ( cm_style.length>0 )   cm_style=cm_style.substring(0, cm_style.length - 1);
	if ( cm_loading.length>0 ) cm_loading=cm_loading.substring(0, cm_loading.length - 1);
	if ( cm_difficulty.length>0 ) cm_difficulty=cm_difficulty.substring(0, cm_difficulty.length - 1);
	if ( cm_hwLoading.length>0 ) cm_hwLoading=cm_hwLoading.substring(0, cm_hwLoading.length - 1);
	if ( cm_examLoading.length>0 ) cm_examLoading=cm_examLoading.substring(0, cm_examLoading.length - 1);
	if ( cm_learning.length>0 ) cm_learning=cm_learning.substring(0, cm_learning.length - 1);

	if ( (cm_overall+cm_difficulty+cm_loading+cm_style+cm_hwLoading+cm_examLoading+cm_learning).length==0 ){
		$('#errorMsg').html("注意：您尚未填寫任何課程意見，請填寫後再送出。");
		return false;
	}

	var course_name = current_course.course_name;
	var course_code = current_course.course_code.replace(/ /g,'_');
	var course_class = current_course.class_num;
	var semester = current_course.semester;
	var teacher_name = current_course.teacher_name;	
	var code = current_course.user;
	
	var json_course_cm = JSON.stringify( {	"authCode":CryptoJS.SHA1(code).toString(), 
											"courseName": course_name,
											"courseCode": course_code,
											"courseClassNum": course_class,
											"semester": semester,
											"teacher_name": teacher_name,
											"CM_Overall":cm_overall,
											"CM_Style":cm_style,
											"CM_Loading":cm_loading,
											"CM_Difficulty":cm_difficulty,
											"CM_HwLoading":cm_hwLoading,
											"CM_ExamLoading":cm_examLoading,
											"CM_Learning":cm_learning
										  } );

	$.ajax( {
			timeout:8000,
			type:"POST",
			url:"http://r444b.ee.ntu.edu.tw/course_rater/postComment.php",
			data: {"comments": json_course_cm }
		}).done(function(data){
				console.log("from r444b:"+data);
			$("input[name=send]").click();
	}).fail( function(xhr, textStatus, errorThrown) {
				console.log(xhr.responseText);
			alert("Error, Please click the bottom below this page");
       // alert(xhr.responseText);
    });
	
	return true;
}


var resetComments = function(){
	$('div.overall_pressed').each(function(i,obj){obj.setAttribute("class","overall");});
	$('div.style_pressed').each(function(i,obj){obj.setAttribute("class","style");});
	$('div.difficulty_pressed').each(function(i,obj){obj.setAttribute("class","difficulty");});
	$('div.loading_pressed').each(function(i,obj){obj.setAttribute("class","loading");});
}


var bindBackToCourseClick = function(){
	$("#back").unbind();
	$("#back").bind('click', function(){ $("#errorMsg").html(""); $("#chartPage").fadeOut('fast'); $("#opinionDiv").fadeOut('fast',function(){ fadeInCoursePage(); }); });
	$("#backToCoursesAndSubmit").unbind();
	$("#backToCoursesAndSubmit").bind('click', function(){ if ( submit() == false) return; $("#errorMsg").html(""); $("#opinionDiv").fadeOut('fast',function(){fadeInCoursePage();}); });	
}

var showMessageDialog = function(){
	//$("#msg-modal").html(html_content);
	$("#msg-modal").dialog({
		title: "版權及隱私權聲明",
		width: 400,
		height: 250,
		modal: true,
		position:['middle',300],
		closeText: "X",
		closeOnEscape: true,
		show: {
			effect: "clip",
			duration: 200
		},
		hide: {
			effect: "clip",
			duration: 200
		},
		close: function( event, ui ) {
			//initialize("open");
		}
	});

}

var initialize = function(mode){
	/*
	if ( mode == "open" ){
		//$("#close").click();
		$("#open").click();
		if ( $('a.semester-tab').length > 0 ){
			$('a.semester-tab')[0].click();
		}
	}
	if (!autoSlideDown)
		$("#open")[0].style.display = "block";
	if ( $('a.semester-tab-selected').length == 0 && $('a.semester-tab').length > 0 ){
		$('a.semester-tab')[0].click();
	}
	*/
}

/* Automatic Sentence Completion */
var styleSentence = ["教學中規中矩","喜歡鼓勵學生討論","互動氣氛良好","常常不準時下課","口齒清晰","老師很會認人","喜歡上課閒聊","常常分享人生哲理","教學有大師風範","說話幽默風趣","上課有點沉悶","教學深入淺出","管教嚴格","從不點名"];
var styleLevel = [1,1,1,-1,1,1,1,1,1,1,-1,1,1,1];
//'overall','style', 'learning', 'hw_loading', 'exam_loading','difficulty'
var overallSentence = ["很輕鬆","非常有趣","非常紮實","很累","非常崩潰"];
var overallLevel = [1,1,1,-1,-1];

var learningSentence = ["步調過快","步調適中","步調過慢","讓我收穫豐碩","讓我聽不太懂","教材準備精良","教材準備不足"];

var hwSentence = ["沒有作業","偶爾一次","每月一次以上","兩周一次以上","每周一次以上"];
var examSentence = ["沒有考試","偶爾一次","每月一次以上","兩周一次以上","每周一次以上"];
var loadingSentence = ["非常輕鬆","有點輕鬆","適中","有點重","非常重"];
var difficultySentence = ["非常簡單","有點簡單","難度適中","有點困難","非常困難"];

var updateText = function(){
	var style_selection = [], overall_selection = [], learning_selection = [], hw_loading_selection = [], exam_loading_selection = [], loading_selection = [], difficulty_selection = [];
	$(".style_pressed").each(function(i,obj){style_selection.push(parseInt(obj.id));});
	$(".overall_pressed").each(function(i,obj){overall_selection.push(parseInt(obj.id));});
	$(".learning_pressed").each(function(i,obj){learning_selection.push(parseInt(obj.id));});
	$(".hw_loading_pressed").each(function(i,obj){hw_loading_selection.push(parseInt(obj.id));});
	$(".exam_loading_pressed").each(function(i,obj){exam_loading_selection.push(parseInt(obj.id));});
	$(".loading_pressed").each(function(i,obj){loading_selection.push(parseInt(obj.id));});
	$(".difficulty_pressed").each(function(i,obj){difficulty_selection.push(parseInt(obj.id));});

	var sentence = composeSentenceStyle(style_selection);
	sentence += composeSentenceLearning(learning_selection);
	var hw = composeSentenceHW(hw_loading_selection);
	var exam = composeSentenceExam(exam_loading_selection);
	var difficulty = composeSentenceDifficulty(difficulty_selection);
	var overall = composeSentenceOverall(overall_click_order);
	sentence += hw;

	if ( hw.length > 0 && exam.length > 0 ){
		sentence += "，以及";
		sentence += exam;
	}else if ( exam.length > 0){
		sentence += exam;
	}

	if ( hw.length > 0 || exam.length > 0 ){
		sentence += "，讓我覺得這門課整體負擔" + composeSentenceLoading(loading_selection);
	}

	if ( sentence.length > 0 && difficulty.length > 0 )
		sentence += ("，而" + difficulty + "。");
	else if ( difficulty.length > 0 )
		sentence += difficulty + "。";

	sentence += overall;
	$("#comment").val(sentence);
	$("textarea[name=opinion1]").val(sentence);
}

var composeSentenceStyle = function(selections){
	if ( selections.length == 0 )
		return "";
	var sentence = "老師的教學風格，";
	var completed = 0;
	for  (var i = 0 ; i < selections.length ; ++i){
		if ( styleLevel[selections[i]-1] < 0 )
			continue;
		sentence += styleSentence[selections[i]-1];
		completed += 1;
		if ( completed < selections.length )
			sentence += "，";
	}
	var bad = "";
	for  (var i = 0 ; i < selections.length ; ++i){
		if ( styleLevel[selections[i]-1] > 0 )
			continue;
		bad += styleSentence[selections[i]-1];
		completed += 1;
		if ( completed < selections.length )
			bad += "，";
	}
	if ( bad.length > 0 )
		sentence = sentence + "但是" + bad;
	sentence += "。";
	return sentence;
}

var composeSentenceOverall = function(selections){
	if ( selections.length == 0 )
		return "";
	var sentence = "整體來講，我覺得這門課修起來";
	var completed = 0;
	var inverse = overallLevel[selections[0]-1];
	for  (var i = 0 ; i < selections.length ; ++i){
		if ( overallLevel[selections[i]-1]*inverse < 0 )
			continue;
		if ( completed == 1 )
			sentence += "，又";
		else if ( completed == 2 )
			sentence += "，而且";
		sentence += overallSentence[selections[i]-1];
		completed += 1;
	}
	var bad = "";
	completed = 0;
	for  (var i = 0 ; i < selections.length ; ++i){
		if ( overallLevel[selections[i]-1]*inverse > 0 )
			continue;
		if ( completed == 1 )
			bad += "，又";
		else if ( completed == 2 )
			bad += "，而且";
		bad += overallSentence[selections[i]-1];
		completed += 1;
	}
	if ( bad.length > 0　&& selections.length > 1 )
		sentence = sentence + "，但是" + bad;
	else if ( bad.length > 0　&& selections.length == 1 )
		sentence = sentence + bad;
	sentence += "。";
	return sentence;
}

var composeSentenceLearning = function(selections){
	if ( selections.length == 0 )
		return "";
	var sentence = "上課";
	var completed = 0;
	for  (var i = 0 ; i < selections.length ; ++i){
		if ( selections[i] > 3 )
			continue;
		if ( completed >= 1 )
			sentence += "，有時候";
		sentence += learningSentence[selections[i]-1];
		completed += 1;
	}
	var count = 0;
	for  (var i = 0 ; i < selections.length ; ++i){
		if ( (selections[i] != 6) && (selections[i] != 7) )
			continue;
		count += 1;
	}

	if ( count == 1 ){
		if ( sentence.length > 2 )
			sentence += "，";
		for  (var i = 0 ; i < selections.length ; ++i){
			if ( selections[i] != 6 && selections[i] != 7 )
				continue;
			sentence += learningSentence[selections[i]-1];
		}		
	}

	count = 0;
	for  (var i = 0 ; i < selections.length ; ++i){
		if ( selections[i] != 4 && selections[i] != 5 )
			continue;
		count += 1;
	}
	if ( count == 1 ){
		if ( sentence.length > 2 )
			sentence += "，";
		for  (var i = 0 ; i < selections.length ; ++i){
			if ( selections[i] != 4 && selections[i] != 5 )
				continue;
			sentence += learningSentence[selections[i]-1];
		}		
	}
	if ( sentence.length < 3 )
		return "";
	sentence += "。";
	return sentence;
}

var composeSentenceHW = function(selections){
	if ( selections.length == 0 )
		return "";
	var sentence = "";
	if ( selections[0] == 1 ){
		return "沒有作業";
	}else{
		sentence += hwSentence[selections[0]-1];
		sentence += "的作業份量";
	}
	return sentence;
}

var composeSentenceExam = function(selections){
	if ( selections.length == 0 )
		return "";
	var sentence = "";
	if ( selections[0] == 1 ){
		return "沒有考試";
	}else{
		sentence += examSentence[selections[0]-1];
		sentence += "的考試份量";
	}
	return sentence;
}

var composeSentenceLoading = function(selections){
	if ( selections.length == 0 )
		return "";
	return loadingSentence[selections[0]-1];
}

var composeSentenceDifficulty = function(selections){
	if ( selections.length == 0 || selections.length > 1 )
		return "";
	var sentence = "這門課的難度讓我覺得";
	sentence += difficultySentence[selections[0]-1];
	return sentence;
}
