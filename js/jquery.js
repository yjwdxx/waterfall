$(window).on("load",function(){
	waterfall();
	var dateInt={"data":[{"src":"1.jpg"},{"src":"3.jpg"},
	{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},
	{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},
	{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"}]}
	$(window).on("scroll",function(){
		if (checkScrollSlide ){
             $.each(dateInt.data,function(key,value){
             	var obox=$("<div>").addClass("box").appendTo($("#main"));
             	var opic=$("<div>").addClass("pic").appendTo($(obox));
             	var oimg=$("<img>").attr("src","img/"+$(value).attr("src")).appendTo($(opic));             	
             })
             waterfall();
		}
	})
})
function waterfall(){
	var $boxs=$("#main>div");
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$("#main").width(w*cols).css("margin","0 auto");
    var hArr=[];
    $boxs.each(function(index,value){
    	var h=$boxs.eq(index).outerHeight();
          if (index < cols) {
             hArr[index]=h;
          }else{
             var minH=Math.min.apply(null,hArr);
             var minHIndex=$.inArray(minH,hArr);
             $(value).css({
             	"position":"absolute",
             	"top":minH+"px",
             	"left":minHIndex*w+"px"
             })
             hArr[minHIndex]+=$boxs.eq(index).outerHeight();
          }
    })
}
function checkScrollSlide(){
	var $lastBox=$("#main>div").last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var docuemntH=$(window).height();
	return (lastBoxDis<scrollTop+docuemntH)?ture:false;
}
