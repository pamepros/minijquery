// jquery copy for older phone widgets&apps
// _('#id')
// _('@name')
// _('tag')
// _('#id < tag')
// _('#id < tag: .class')
var wrt_query = {	
	_id: function(id) {
		var id  = id.replace('#', '');
			id  = jQuery.trim(id);
		var doc = document;
		var elm = doc.getElementById(id);
		var obj = new _obj;
		if(elm != null) obj.elements.push(elm);  
		obj.length = elm == null ? 0  : 1;			
		return obj;
	},
	_tag: function(tag, parent) {		
		var doc = parent == undefined ? document : parent;
		var tag = tag.replace('#', '');
			tag = tag.replace('.', '');
			tag = jQuery.trim(tag);		
		var elm = doc.getElementsByTagName(tag);
		if(!elm.length) return {'elements' : undefined, 'length': 0}
		var obj  = new _obj()
		var elms = [];
		for(var i = 0; i < elm.length; i++) {
			elms.push(elm[i]);
		}	
		obj.length   = elms.length;
		obj.elements = elms; 	
		return obj;	 
	},
	_class: function(className, tags) {
		var className = className.replace('#', '');
			className = className.replace('.', '');
			className = jQuery.trim(className);			
		var obj  = new _obj;
		var elms = [];
		for(var i = 0; i< tags.length; i++) {
			if(wrt_query._hasClass(className, tags[i])) {
				elms.push(tags[i]);
			}
		}
		obj.elements = elms;
		obj.length = elms.length;				
		return obj;
	},
	_name: function(name) {
		var name  = name.replace('@', '');
			name  = jQuery.trim(name);
		var doc = document;
		var elm = doc.getElementsByName(name);
		var obj = new _obj;
		if(elm == null) return _obj;
		var elms = [];
		for(var i = 0; i< elm.length; i++) {
			elms.push(elm[i]);
		}  
		obj.elements = elms;
		obj.length   = elms.length;		
		return obj;
	},
	_childs: function(element) {
		var childs = element.childNodes;
		return childs.length ? childs : false;	
	},
	_hasClass: function(className, element) {
		try {
			var classes = element.className;
				classes = jQuery.trim(classes);
				classes = classes.split(' ');
				if(!classes.length) return false;
				
				for(var i in classes) { 
					
					var c = classes[i];	c = jQuery.trim(c);
					if(c == className) return true;					 	
				}
								
		}catch(e) { return false; }
		return false;				 
	}
}

function _obj(){
	
	this.elements = [];
	this.length   = 0;
	
	this.hide = function() {		
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			elm[key].style.display = 'none'; 
		}
	}
	this.display = function(display) {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			elm[key].style.display = display; 
		}
	}
	this.show = function() {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			elm[key].style.display = 'block'; 
		}
	}
	this.html = function(html) {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			elm[key].innerHTML = html; 
		}
	}	
	this.css = function(property, value) {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			
			var styles = elm[key].getAttribute('style');
				styles = jQuery.trim(styles);
			
			if(styles.indexOf(property)!=-1) {					
				styles = styles.split(';');
				for(var i in styles) {
					if(styles[i].indexOf(property) != -1) {
						styles[i] = property +':' + value;
					}
				}				
			}
			else {					
				styles = styles.split(';');
				styles.push(property +':' + value);
			}			
			styles = styles.join(';');
			styles = styles.replace(';;', ';');				
			elm[key].setAttribute('style', styles);					
		}		
	}
	this.click = function(callback) { 
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			elm[key].onclick = callback; 
		}		 
	}
	this.childs = function() {
		
		var elms = [];
		var elm = this.elements;
		if(!elm.length) return false;
		
		for(var key in elm) {
			var childs = elm[key].childNodes;
			for(var i = 0; i< childs.length; i++) {
				elms.push(childs[i]);	
			}				
		}
		if(!elms.length) return false;		
		
		var obj = new _obj();
			obj.elements = elms;
			obj.length = elms.length;		
		
		return obj;
	}
	this.findrecursive = function(className, element){
		
		var elms = [];
		if(wrt_query._hasClass(className, element)){
			elms.push(element);
		} 
		
		var childs = element.childNodes;
		if(!childs.length) return elms;
		
		for(var i=0; i< childs.length; i++) {
			var elements = this.findrecursive(className, childs[i]);			
			if(!elements.length) continue;
			for(var j in elements) elms.push(elements[j]);
		}
		return elms;
	}
	// find inside an _obj elements by className
	this.find = function(className) {
		
		var className = className.replace('#', '');
			className = className.replace('.', '');
			className = jQuery.trim(className);
		
		var elm  = this.elements;
		var elms = [];
		for(var key in elm) {
			
			var elements = this.findrecursive(className, elm[key]);
			if(!elements.length) continue;
			for(var j in elements) elms.push(elements[j]);					
		}	
		var obj = new _obj;
			obj.length   = elms.length;
			obj.elements = elms;
			
		return obj;		
	}	
	this.text = function(text) {
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			elm[key].innerText = text; 
		}
	}	
	this.attr = function(key, value) {
		var elm = this.elements;
		if(!elm.length) return;
		
		for (var k in elm) {
			elm[k].setAttribute(key, value);
		}
	}
	this.checked = function(flag) { 
		
		var elm  = this.elements;
		var flag = flag == true ? true : false;
		for (var key in elm) {
			if(elm[key].type == 'radio' || elm[key].type == 'checkbox') {
				elm[key].checked = flag;
			}				
		} 
	}
	this.firstChild = function() {
		
		var elm = this.elements;
		var elms = []

		var obj  = new _obj();
		for(var key in elm) {
			elms.push(elm[key].childNodes[0]);
		}
		obj.elements = elms;
		obj.length   = elms.length;
		return obj;
	}	
	this.addClass = function(new_class) {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for (var key in elm) {
			var classes = elm[key].className;
			if(classes.indexOf(new_class)!= -1) continue;
			classes += ' ' + new_class;
			classes  = classes.replace(/\s+/, ' ');	
			elm[key].className = classes;
		} 
	}
	this.removeClass = function(rm_class) {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for (var key in elm) {
			var classes = elm[key].className.replace(rm_class,'');
			elm[key].className = classes;
		}
	}
	
	this.changeClass = function(new_class) {
		var elm = this.elements;
		if(!elm.length) return;
		
		for (var key in elm) {
			elm[key].className = new_class;
		}
	}
	
	this.getClass = function() {
		var elm = this.elements;
		if(!elm.length) return;
		
		for (var key in elm) {
			return elm[key].className;
		}
	}
	
	this.append = function(html) {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			new_html 		= elm[key].innerHTML + html;
			elm[key].innerHTML 	= new_html;
		}
	}
	this.val = function(valor) {
		
		var elm = this.elements;
		if(!elm.length) return;
		
		for(var key in elm) {
			elm[key].value = valor;
		}
	}
	this.getChecked = function() {
		var elm  = this.elements;
		var allchecked = [];
		for (var key in elm) {
			if(elm[key].type == 'radio' || elm[key].type == 'checkbox') {
				if(elm[key].checked == true) {
					allchecked.push(elm[key].value);
				}
			}
		}
		return allchecked;
	}
	this.unbind = function(event,callback) {
		var elm = this.elements;
		if(!elm.length) return;
		for(var key in elm) {
			elm[key].removeEventListener("'"+event+"'",callback,false);
			//elm[key].removeEventListener(event, callback, false);
		}
	}	
}

function _(id) {
	var obj = new _obj();
	if(id == undefined) return obj;
	if(id.indexOf('<') != -1) {
		
		var aux = id.split('<'), id = aux[0], 
			tag = aux[1], className = undefined;
			
		if(tag.indexOf(':')!= -1) {			
			aux = tag.split(':');
			tag = aux[0];
			className = aux[1];		
		}
		var obj = wrt_query._id(id);
		if(!obj.length) return obj;				
		var obj = wrt_query._tag(tag, obj.elements[0]);
		if(!obj.length) return obj;		
		if(className == undefined)	return obj;		
		return wrt_query._class(className, obj.elements);			
	}		
	if(id.indexOf('#') != -1) return wrt_query._id(id);	
	if(id.indexOf('@') != -1) return wrt_query._name(id);
	return wrt_query._tag(id);
}
/**
 * @param {Object} str
 * 
 */
function trim(str) {
    return str.replace(/^\s+/g,'').replace(/\s+$/g,'')
}


function ucfirst (str) {
	str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
}
// load css stylesheet
function _css(name, callback) {
	if(name == undefined) return;
	var	style = document.createElement('link');
		style.href = 'css/style_' + name + '.css';
		style.type = 'text/css';
		style.rel  = 'stylesheet';
		style.onload = function(){
			if(callback == undefined) return;	 
			eval(callback); 
		}				
	var body = document.getElementsByTagName('head').item(0);	
		body.appendChild(style);
}
