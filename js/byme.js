window.onload=function(){
	waterfall();
    var dateInt={"data":[{"src":"1.jpg"},{"src":"3.jpg"},
	{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},
	{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},
	{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"}]};
	var tag=0;//用来标记次数
	window.onscroll=function(){
	if (checkScrollSlide && tag<dateInt.data.length){
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
                tag++;
		}
		waterfall();	    		
	}
  }
}
//根据class名取值
function getClass(parent,clsName){
	var arr=[],
	    target=parent.getElementsByTagName("*"),
	    len=target.length;
	 for (var i = 0; i < len; i++) {
	 	if (target[i].className==clsName) {
	 		arr.push(target[i]);
	 	}
	 }
	 return arr;
}
//寻找最小高度图片的索引
function getMinHIndex(minH,arr){
    for(var i in arr){
       if (arr[i]===minH) {
       	return i;
       }
    }

}
function checkScrollSlide(){
	var oparent=document.getElementById("main"),
	    oboxs=oparent.getClass(oparent,"box"),
	    lastBox=Math.floor(oboxs[oboxs.length-1].offsetHeight/2)+oboxs[oboxs.length-1].offsetTop,
	    scrollTop=document.documentElement.scrollTop||document.body.scrollTop,
	    height=document.body.clientHeight||document.documentElement.clientHeight;
	    if (lastBox>scrollTop+height) {
	    	return true;
	    }else if (lastBox=height*2) {
	    	return false;
	    }
	}
function waterfall(){
	var oparent=document.getElementById("main"),
	    oboxs=getClass(oparent,"box"),
	    oboxW=oboxs[0].offsetWidth,
	    cols=Math.floor(document.documentElement.clientWidth/oboxW);//获取一行的图片数
	    oparent.style.cssText="width:"+oboxW*cols+"px;margin:0 auto;";
	    var arrH=[];
	    for (var i = 0; i <oboxs.length; i++) {
	       if (i<cols) {
	       	arrH.push(oboxs[i].offsetHeight);//将排列好的一行中所有的高度放入一个数组
	       }
	       else{
	       	var minH=Math.min.apply(null,arrH);
	       	/*
	       	关于上一行代码的解释
	        Math.min参数里面不支持Math.min([param1,param2]) 也就是数组 但是它支持Math.max(param1,param2,param3…),
	        apply的一个巧妙的用处,可以将一个数组默认的转换为一个参数列表([param1,param2,param3] 
	        转换为 param1,param2,param3),apply会将一个数组装换为一个参数接一个参数的传递给方法,
	        这块在调用的时候第一个参数给了一个null,这个是因为没有对象去调用这个方法,
	        我只需要用这个方法帮我运算,得到返回的结果就行,.所以直接传递了一个null过去    
	       	*/
	       	var minHIndex=getMinHIndex(minH,arrH);//寻找最小高度的索引值
	       	oboxs[i].style.position="absolute";
	       	oboxs[i].style.top=minH+"px";
	       	oboxs[i].style.left=oboxs[minHIndex].offsetLeft+"px";
	       arrH[minHIndex]+=oboxs[i].offsetHeight;//将图片定位后，更新保存排列好图片的数组
	       }
	    }
	    
}
