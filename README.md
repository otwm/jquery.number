# jquery.number			

npm install				
bower install		
		
기존의 자바스크립트 넘버 포맷터들이 큰 숫자 또는 아주 작은 소수점 숫자에 대해 정확히 포맷하지 못하기 많을어 보았다.		
그러므로 문자 기반 넘버 포맷터다.별 기능은 없음.

jquery normal number formatter on string based

#how to use

ex)     
$("[data-number]").number(); //bind event       
        
$("[data-number]").unNumber(); //unbind event       
        
//override $(this).val()        
//$(this).val() : 7,888 => 7888     
$("[data-number]").number().keyup(function(){       
    $("span").empty().text(" $(this).val() : " + $(this).val());        
});     
