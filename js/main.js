window.onload=function(){
	waterfall("main","box");
	var dateInt={"data":[{"src":"1.jpg"},{"src":"3.jpg"},
	{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},
	{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},
	{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"}]}
	window.onscroll=function(){
       if (checkScrollSlide) {
       	var oparent=document.getElementById("main");
            for(var i=0;i<dateInt.data.length;i++){
            var oboxs=document.createElement("div");
            	oboxs.className="box";
            	oparent.appendChild(oboxs);
            var opic=document.createElement("div");
            	opic.className="pic";
            	oboxs.appendChild(opic);
            var oimg=document.createElement("img");
                    oimg.src="img/"+dateInt.data[i].src;
                opic.appendChild(oimg);
          }
          waterfall("main","box");
       }
	}
}
function getClass(parent,clsName){
    var boxArray=[],
        oElements=parent.getElementsByTagName("*"),
        len=oElements.length;
  for (var i = 0; i < len; i++) {
   	if(oElements[i].className==clsName){
   		boxArray.push(oElements[i]);
   	}
   }
   return boxArray;
}
function getMinhIndex(array,val){
    for(var i in array){
    	if (array[i]===val) {
             return i;
    	}
    }
}
function checkScrollSlide(){
	var oparent=document.getElementById("main"),
	    oboxs=getClass(oparent,"box"),
	    lastBoxH=oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetHeight/2),
	    scrollTop=document.documentElement.scrollTop||document.body.scrollTop,
	    height=document.body.clientHeight||document.documentElement.clientHeight;
	    return (lastBoxH<(scrollTop+height))?true:false;
} 
function waterfall(parent,box){
    //将main下的所有class为box的元素的取出来
    var oparent=document.getElementById("main"),
        oboxs=getClass(oparent,box),
        oboxW=oboxs[0].offsetWidth,
        cols=Math.floor(document.documentElement.clientWidth/oboxW);
    //设置main的宽度和对其方式
    oparent.style.cssText="width:"+oboxW*cols+"px;margin:0 auto;";
    var hArr=[];
    for(var i=0;i<oboxs.length;i++){
    	if (i<cols) {
    		hArr.push(oboxs[i].offsetHeight);
    	}else{
    		var minH=Math.min.apply(null,hArr);
    		var index=getMinhIndex(hArr,minH);
    		oboxs[i].style.position="absolute";
    		oboxs[i].style.top=minH+"px";
    		//两种方式实现
    		// oboxs[i].style.left=oboxs*index+"px";
    		oboxs[i].style.left=oboxs[index].offsetLeft+"px";
    		hArr[index]+=oboxs[i].offsetHeight;
    	}
    }
}
