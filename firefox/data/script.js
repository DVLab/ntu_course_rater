$('body').prepend('<div id="toppanel"></div>');



//$("#courses").tablecloth({ theme: "dark" });
//$("#opinion").tablecloth({ theme: "light" });

//$.ajax({
//			type:"GET",
//			url:chrome.extension.getURL("template.html")
//		}).done(function(template) {
			var template=' <div id="panel"> <div class="content clearfix" style="float:left"> <div class="content" id="opinionDiv"> <table class="hideextra" id="opinion"> <thead> <tr> <th><div class="title">類別</div></th> <th><div class="title">評論</div></th> <th><div class="title">附註</div></th> </tr> </thead> <tbody> <tr> <td class="title">總評</td> <td> <div class="overall" id="1">輕鬆</div> <div class="overall" id="2">有趣</div> <div class="overall" id="3">紮實</div> <div class="overall" id="4">很累</div> <div class="overall" id="5">崩潰</div> </td> <!-- <td><div>複選</div></td> --> <td class="appendix">複選</td> </tr> <tr> <td class="title">教學風格</td> <td> <div class="style" id="1">中規中矩</div> <div class="style" id="2">鼓勵討論</div> <div class="style" id="5">口齒清晰</div> <div class="style" id="9">大師風範</div> <br> <div class="style" id="14">從不點名</div> <div class="style" id="7">喜歡閒聊</div> <div class="style" id="10">幽默風趣</div> <div class="style" id="11">有點沈悶</div> <div class="style" id="12">深入淺出</div> <br> <div class="style" id="4">不準時下課</div> <div class="style" id="13">管教嚴格</div> <div class="style" id="6">老師會認人</div> <div class="style" id="3">互動氣氛良好</div> <div class="style" id="8">分享人生哲理</div> </td> <!-- <td><div>複選</div></td> --> <td  class="appendix">複選</td> </tr> <tr> <td class="title">學習成效</td> <td> <div class="learning" id="1">步調過快</div> <div class="learning" id="2">步調適中</div> <div class="learning" id="3">步調過慢</div> <div class="learning" id="4">收穫豐碩</div> <div class="learning" id="5">聽不太懂</div> <br> <div class="learning" id="6">教材準備精良</div> <div class="learning" id="7">教材準備不足</div> </td> <!-- <td><div>複選</div></td> --> <td class="appendix">複選</td> </tr> <tr> <td class="title">作業份量</td> <td> <div class="hw_loading" id="1">沒有作業</div> <div class="hw_loading" id="2">偶爾一次</div> <div class="hw_loading" id="3">每月一次以上</div> <div class="hw_loading" id="4">兩周一次以上</div> <div class="hw_loading" id="5">每周一次以上</div> </td> <!-- <td><div>單選</div></td> --> <td class="appendix">單選</td> </tr> <tr> <td class="title">考試份量</td> <td> <div class="exam_loading" id="1">沒有考試</div> <div class="exam_loading" id="2">偶爾一次</div> <div class="exam_loading" id="3">每月一次以上</div> <div class="exam_loading" id="4">兩周一次以上</div> <div class="exam_loading" id="5">每周一次以上</div> </td> <!-- <td><div>單選</div></td> --> <td class="appendix">單選</td> </tr> <tr> <td class="title">整體負擔</td> <td> <div class="loading" id="1">非常輕鬆</div> <div class="loading" id="2">有點輕鬆</div> <div class="loading" id="3">負擔適中</div> <div class="loading" id="4">有點重</div> <div class="loading" id="5">非常重</div> </td> <!-- <td><div>單選</div></td> --> <td class="appendix">單選</td> </tr> <tr> <td class="title">難易度</td> <td> <div class="difficulty" id="1">非常簡單</div> <div class="difficulty" id="2">有點簡單</div> <div class="difficulty" id="3">難度適中</div> <div class="difficulty" id="4">有點困難</div> <div class="difficulty" id="5">非常困難</div> </td> <!-- <td><div>單選</div></td> --> <td class="appendix">單選</td> </tr> </tbody> </table> <br><br> <textarea id="comment" placeholder="可自動或手動填入教學意見唷！"></textarea> </div> </div> <div class="left" style="float:left"> <br>  <label style="color:white; font-size:16;">預設自動完成選項：</label> <select id="autoCompleteSelection"> <option value="5">5 (非常同意)</option> <option value="4">4 (同意)</option> <option value="3">3 (普通)</option> <option value="2">2 (不同意)</option> <option value="1">1 (非常不同意)</option> </select> <br><span style="color:red;font-weight:bold;">本預設選項僅為使用者介面最佳化之設計，<br>請同學務必至選單中一一檢查您的回應，<br>提供給老師最真實的回應  <br></span><br> <label style="color:white; font-size:16;">課後學習活動 (無學習活動，則無需勾選)</label><br><br> <input style="color:white; font-size:10;" type="checkbox" name="activity1" >閱讀資料 </input> <input style="color:white; font-size:10;" type="checkbox" name="activity2">繳交閱讀心得報告</input> <input style="color:white; font-size:10;" type="checkbox" name="activity3">做習題</input> <br> <input style="color:white; font-size:10;"type="checkbox" name="activity4">寫報告</input> <input style="color:white; font-size:10;"type="checkbox" name="activity5">準備口頭報告</input> <input style="color:white; font-size:10;"type="checkbox" name="activity6">專案研究</input><br> <input style="color:white; font-size:10;"type="checkbox" name="activity7">作品或展演</input> <input style="color:white; font-size:10;"type="checkbox" name="activity8">準備隨堂測驗</input> <input style="color:white; font-size:10;"type="checkbox" name="activity9">其他</input> <br><label id="errorMsg" style="color:red"> </label>  <br> <div id="submitButton">送出</div><br> <span style="font-size:150%;font-weight:bold;text-align:left;position:relative;left:-30px;">&#8592;您可以自行編輯左側內容</span><br> <a style="color:grey" href="mailto:semanticwebdvlab@gmail.com">聯絡我們</a> <label id="privacy" style="color:grey">隱私權聲明</label> <br> <label id="copyright" style="color:grey">Copyright©2013 All Rights Reserved</label> </div> </div> <!-- /login --> <!-- The tab on top -->	<div class="tab"> <ul class="login"> <li class="left">&nbsp;</li> <li id="toggle"> <a id="open" class="open" href="#">開啟</a> <a id="close" style="display: none;" class="close" href="#">關閉</a>			</li> <li class="right">&nbsp;</li> </ul> </div> <!-- / top --> <div class="modal"><!-- Place at bottom of page --></div> <div id="msg-modal" style="display:none"> 本程式之開發以及擁有者為國立臺灣大學電子工程學研究所設計驗證實驗室，其中包括程式、文字敘述、圖片...等，均受到中華民國著作權法及國際著作權法律的保障，著作權為原作者所有。 <br><br> 隱私權聲明： <br><br> 本程式純粹用於語意網以及語意資料庫(Sementic Web and Semantic Database)的學術研究用途，其目的為希望能透過簡化繁冗的教學意見調查填答過程，收集帶有語意的教學意見調查資料，進而在下學期推出能夠根據這些課程教學風格或是負擔、難易度等等資料為索引之語意搜尋以及課程推薦、討論、選課之網站。同學們輸入的帳號與密碼，將僅用於登入學校的教學意見網站，我們不會記錄同學的帳號及密碼；此外，根據保密原則，我們絕不會洩漏填答學生的身分或個資，也不會將填答結果以任何形式 --- 包含個別或是群體統計的資訊，直接公開於任何網站或是交付給第三者使用。同學幫助我們填答的部分，將只會用於輔助將來的課程語意搜尋系統，提供同學在選課、排課的參考，規劃出最適合個人學習需求的課表。 <br><br> 為了讓台大的課程能夠有更方便且普及的評價系統，希望各位同學能夠踴躍使用本程式填答教學意見調查！並且請同學以理性之方式對各課程課做文字建議或意見表達（包括教師教學效果或需要改進意見等），切勿使用侮辱、謾罵或人身攻擊等文字，因而觸法。 </div> ';
			$('#toppanel').prepend(template); 
			bindOpinonClick();
			//loadButtonImages();
			autoCompleteSelection();
			bindCheckBoxForHomework();

			$("#submitButton").bind('click',function(){submit();});
			$("#privacy").bind('click',function(){ showMessageDialog();});

			$("#comment").change(function(){ changeCommentText();});

			$("input[name=ans1]")[0].click();
			$("input[name=ans2]")[0].click();
			$("input[name=ans3]")[0].click();
			$("input[name=ans4]")[1].click();

	$("#open").click(function(){
		console.log("slide");
		$("#toppanel")[0].style.height = 500;
		$("#panel").slideDown("slow");
	});	

	// Collapse Panel
	$("#close").click(function(){
		$("#panel").slideUp("slow");	
		$("#toppanel")[0].style.height = 42;
	});		
	$("#toppanel")[0].style.height = 42;

	// Switch buttons from "Log In | Register" to "Close Panel" on click
	$("#toggle a").click(function () {
		$("#toggle a").toggle();
	});

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

//		});	
