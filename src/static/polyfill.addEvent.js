// if(!Function.prototype.bind){
// 	Function.prototype.bind = function(){
// 		if(typeof this !== 'function'){
// 			// console.log(111);
// 			return false
// 			// throw new err('Function.prototype.bind - what is trying to be bound is not callable');
// 		}
// 		var _this = this;
// 		var obj = arguments[0];
// 		var ags = Array.prototype.slice.call(arguments,1);
// 		return function(){
// 			_this.apply(obj,ags);
// 		};
// 	};
// }

//兼容addEventListener函数
function _addEventListener(ele,event,fn){
	// console.log(ele,event,fn)
	var dom = ele || window;
	if(dom.addEventListener){
		dom.addEventListener(event,fn,true);
	}else{
		dom.attachEvent('on'+event,fn);
	}
}

//兼容removeEventListener函数
function _removeEventListener(ele,event,fn){
	if(ele){
		if(ele.removeEventListener){
			ele.removeEventListener(event,fn,true);
		}else{
			ele.detachEvent('on'+event,fn);
		}
	}

}
