//UI utils
"use strict";
const uiu = (function () {
	
	//getElementById
	function id(id) {
		return document.getElementById(id);
	}

	//querySelector \ querySelectorAll
	function query(sel, all) {
		if (all) {
			return document.querySelectorAll(sel);
		} else {
			return document.querySelector(sel);
		}
	}

	//showTooltip opacity and pointerEvents
	function showTooltip(e, id, ad, callback) {
		let ttid = query(id);
		ttid.style.pointerEvents = 'all';
		ttid.style.opacity = '1';
		ttid.style.left = e.x + ad.x + 'px';
		ttid.style.top = e.y - ad.y + 'px';
		if (callback) {
			callback.call(ttid, null);
		}
	}
	//hideTooltip
	function hideTooltip(id) {
		if (typeof id === 'string') id = query(id);

		id.style.pointerEvents = 'none';
		id.style.opacity = '0';
	}

	//throttle
	function throttle (callback, limit) {
		var wait = false;
		return function () {
			if (!wait) {
				callback.apply(null, arguments);
				wait = true;
				setTimeout(function () {
					wait = false;
				}, limit);
			}
		}
	}

	//preventRightClick
	function preventRightClick() {
		on('contextmenu',window,function(e){
			e.preventDefault();
		})
	}

	//on listeners
	function on(evt, id, fun, all) {
		if(typeof evt === 'object') {
			all = fun;
		}
		if (typeof id === 'string') id = query(id,all);

		if(typeof evt === 'object') {
			if(all) {
				for (let i in evt) {
					for (let j = 0; j < id.length; j++) {
						id[j]['on' + i] = evt[i];
					}
				}
			} else {
				for (let i in evt) {
					id['on' + i] = evt[i];
				}
			}
		} else {
			if (all) {
				for (let i = 0; i < id.length; i++) {
					id[i]['on' + evt] = fun;
				} 
			} else {
				id['on' + evt] = fun;
			}
		}
	}

	//addEvent listener actually
	function setOn(evt, id, fun, all) {
		if(typeof evt === 'object') {
			all = fun;
		}
		if (typeof id === 'string') id = query(id,all);

		if(typeof evt === 'object') {
			if(all) {
				for (let i in evt) {
					for (let j = 0; j < id.length; j++) {
						id[j].addEventListener(i, evt[i]);
					}
				}
			} else {
				for (let i in evt) {
					id.addEventListener(i, evt[i]);
				}
			}
		} else {
			if (all) {
				for (let i = 0; i < id.length; i++) {
					id[i].addEventListener(evt, fun);
				} 
			} else {
				id.addEventListener(evt, fun);
			}
		}
	}

	//Event Delegation
	function eventDelegate(option, func) {
		let parent = option.parent;
		let isAll = option.all;
		let condition = option.condition || function() {return true};
		let findtarget = option.find;
		let bubbleTarget = option.findDeeper;

		if(bubbleTarget === undefined) {
			bubbleTarget = true;
		}
		
		if (typeof parent === 'string') parent = uiu.query(parent, isAll);

		let setOnEvt = on;
		if (option.noOverwrite) { setOnEvt = setOn };
		

		//have to loop and set events because on and setOn only 
		// dont loop through and set callback in NodeList elements
		// indipendently
		if(isAll) {
			for (let i = 0; i < parent.length; i++) {
				setOnEvt(option.on || 'mouseover', parent[i], function (e) {
					let target = e.target;
					let find;
					if(findtarget) {
						find = target.closest(findtarget);
					} else {
						find = true;
					}
					if(bubbleTarget) {
						if (find && condition(target,e)) {
							func(target, parent[i], e);
						}
					} else {
						if (find && condition(find,e)) {
							func(find, parent[i], e);
						} 
					}
				}); 
			}
		} else { //no loop for performance boost
			setOnEvt(option.on || 'mouseover', parent, function (e) {
				let target = e.target;
				let find;
				if(findtarget) {
					find = target.closest(findtarget);
				} else {
					find = true;
				}
				if(bubbleTarget) {
					if (find && condition(target,e)) {
						func(target, parent, e);
					}
				} else {
					if (find && condition(find,e)) {
						func(find, parent, e);
					} 
				}
			}); 
		}
		
	}

	//multikey handler
	function onkey(keyStr,callback,elm) {
		if (typeof elm === 'string') elm = uiu.query(elm);     
		if (!elm) {elm = document};

		keyStr = keyStr.toUpperCase();

		let keys = {
			///WINDOWS///
			'13' : 'ENTER',
			'16': 'SHIFT',
			'17': 'CTRL',
			'18': 'ALT',
			'33': 'PAGEUP',
			'34': 'PAGEDOWN',
			'35': 'END',
			'36': 'HOME',
			'45': 'INSERT',
			'46': 'DELETE',
			/// ARROWS ///
			'38': 'UPARROW',
			'40': 'DOWNARROW',
			'37': 'LEFTARROW',
			'39': 'RIGHTARROW',
			/////ALPHA/////
			'65': 'A', /**/ '66': 'B',
			'67': 'C', /**/ '68': 'D',
			'69': 'E', /**/ '70': 'F',
			'71': 'G', /**/ '72': 'H',
			'73': 'I', /**/ '74': 'J',
			'75': 'K', /**/ '76': 'L',
			'77': 'M', /**/ '78': 'N',
			'79': 'O', /**/ '80': 'P',
			'81': 'Q', /**/ '82': 'R',
			'83': 'S', /**/ '84': 'T',
			'85': 'U', /**/ '86': 'V',
			'87': 'W', /**/ '88': 'X',
			'89': 'Y', /**/ '90': 'Z',
			///NUMERIC///
			'48': '0', /**/ '49': '1',
			'50': '2', /**/ '51': '3',
			'52': '4', /**/ '53': '5',
			'54': '6', /**/ '55': '7',
			'56': '8', /**/ '57': '9',
			'97':   'NUM1', /**/ '98': 'NUM2',
			'99':   'NUM3', /**/ '100': 'NUM4',
			'101':  'NUM5', /**/ '102': 'NUM6',
			'103':  'NUM7', /**/ '104': 'NUM8',
			'105':  'NUM9',
		}

		let isSingle;
		let keyArray;
		let type = 'down';
		if(keyStr.indexOf('+') !== -1) {
			keyArray = keyStr.split('+');
			isSingle = false;
		} else {
			isSingle = true;
			keyArray = keyStr;
		}

		let isReadyToCall = false;
		let mulKeys = [];

		setOn('key'+type, elm, function(e) {
			let evtKey = e.which || e.keyCode || 0;

			if(!isSingle) {

			mulKeys.push(evtKey);
			
				if(mulKeys[0] === mulKeys[1]) {
					mulKeys.pop();
				}

				if(mulKeys.length > keyArray.length) {
					mulKeys.pop();
				}

				if( keys[mulKeys[0]] === keyArray[0] &&
						keys[mulKeys[1]] === keyArray[1] &&
						keys[mulKeys[2]] === keyArray[2] &&
						keys[mulKeys[3]] === keyArray[3] &&
						keys[mulKeys[4]] === keyArray[4] &&
						keys[mulKeys[5]] === keyArray[5]
					) {
					isReadyToCall = true;
				} else {
					isReadyToCall = false;
				}
				
			} else {
				if(keys[e.which] === keyArray) {
					isReadyToCall = true;
					
				} else {
					isReadyToCall = false;
				}
			}
			
			if(isReadyToCall) {
				callback(e);
			}
		});
		elm.addEventListener('keyup',function(e) {
			if(!isSingle) {
			  mulKeys.pop();
			}
		});
	}
	

	//toogleStyles
	function toggleStyle(elm, stl, prop1, prop2, once) {
		if (typeof elm === 'string') elm = query(elm);

		let elmStyle = elm.style[stl];
		if (elm.style[stl] === prop1 || !elm.style[stl]) {
			elm.style[stl] = prop2;
		} else {
			elm.style[stl] = prop1;
		}
	}
	//setStyles
	function setStyle(el, stls) {
		if (typeof el === 'string') el = query(el);

		for (let i in stls) {
			el.style[i] = stls[i];
		}
	}
	//classMatch
	function isClassMatch(el, str) {
		if (typeof el === 'string') el = query(el);

		let cls = str.replace(/^\.|#/, '');
		if (el.className.match(cls)) {
			return el;
		}
		return false;
	}

	//toogleClass
	function toggleClass(id, classname, callback) {
		if (typeof id === 'string') id = query(id);

		id.classList.toggle(classname);
		if (callback) {
			callback();
		}
	}
	function addClass(id, classname, callback) {
		if (typeof id === 'string') id = query(id);

		id.classList.add(classname);
		if (callback) {
			callback();
		}
	}
	function removeClass(id, classname, callback) {
		if (typeof id === 'string') id = query(id);

		id.classList.remove(classname);
		if (callback) {
			callback();
		}
	}

	//linkDOM
	function linkDOM(elm1, elm2, callback) {
		if (typeof elm1 === 'string') elm1 = query(elm1);
		if (typeof elm2 === 'string') elm2 = query(elm2);

		if (callback) {
			callback.call(null, elm1, elm2);
		} else {
			toggleClass(elm1, 'button-active');
			toggleClass(elm2, 'button-active');
		}
	}

	//selectorMatch
	function selectorMatch(el,selector) {
		let proto = Element.prototype;
		let func = proto.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function() {
			return [].indexOf.call(document.querySelectorAll(s),this) !== -1;
		}
		return func.call(el,selector);
	}

	
	// dropdown menu
	function dropdown(option, callback) {
		let evt = option.on || 'mousedown';
		let offevt = option.off || 'mouseleave';
		let disEvt = option.dispatchEvt || 'mousedown';
		let parent = option.parent;
		let childs = option.childs;
		let childsSTR = option.childs;
		let content = option.content;
		let dispatch = option.dispatch;
		let time = option.timer;
		let effect = option.effect || 'default';
		let effectAttr = option.effectStyles || {'top' : ['50%', '100%']};
		let effectClass = option.effectClass || false;

		if (typeof parent === 'string') parent = query(parent);
		if (typeof dispatch === 'string') dispatch = query(dispatch);


		parent.style.position = 'relative';
		let buttons = document.querySelectorAll(childs);
		for (let j = 0; j < buttons.length; j++) {
			buttons[j].style.position = 'relative';
		}

		let ddStyles = {
			'pointer-events': 'none',
			'opacity': '0',
			'display': 'initial',
			'position': 'absolute',
			'left': '0%'
		}
		let con = document.querySelectorAll(content);
		for (let i = 0; i < con.length; i++) {
			setStyle(con[i], ddStyles);
		}

		let VFX = {
			default: {
				show: function (dd) {
					setStyle(dd, {
						'pointer-events': 'all',
						'opacity': '1',
					});
					toggleStyle(dd, 'display', 'none', 'block');                 
				},
				hide: function (dd) {
					setStyle(dd, {
						'display': 'none'
					});                   
				}
			},
			fade: {
				show: function (dd) {
					toggleStyle(dd, 'opacity', '0', '1');
					toggleStyle(dd, 'pointerEvents', 'none', 'all');
					(effectClass) ? addClass(dd,effectClass) : false;
				},
				hide: function (dd) {
					setStyle(dd, {
						'opacity': '0',
						'pointerEvents': 'none'
					});
					(effectClass) ? removeClass(dd,effectClass) : false;                    
				}
			},
			fadeSlide: {
				show: function (dd) {
					for(let i in effectAttr) {
						toggleStyle(dd, [i], effectAttr[i][0], effectAttr[i][1]);
					}
					toggleStyle(dd, 'opacity', '0', '1');
					toggleStyle(dd, 'pointerEvents', 'none', 'all');
					(effectClass) ? addClass(dd,effectClass) : false;
				},
				hide: function (dd) {
					for(let i in effectAttr) {
						setStyle(dd, {
							[i] :  effectAttr[i][0]
						});
					}
					setStyle(dd, {
						'opacity': '0',
						'pointerEvents': 'none'
					});
					(effectClass) ? removeClass(dd,effectClass) : false;                    
				}
			},
		};

		eventDelegate({
			on : evt,
			parent : parent,
			find : childsSTR,
			noOverwrite : true,
			condition : function(e) {
				if(isClassMatch(e,childsSTR)) {
					return true;
				}
			},
		},function(e,p) {
			let target = e;
			let dropdown = target.querySelector(content);
			
			//hide all first
			let isDown = true;
			let dropdownAll = parent.querySelectorAll(content);
			for (let i = 0; i < dropdownAll.length; i++) {
				VFX[effect].hide(dropdownAll[i]);
			}
			if (dropdown) { //if dropdown is exist
				VFX[effect].show(dropdown);
				
				if (time) {
					let dropTimer;
					let parentTimer;
					on(offevt, dropdown, function () {
						dropTimer = window.setTimeout(function () {
							VFX[effect].hide(dropdown);
							isDown = false;
							if (callback) { callback.call(dropdown, isDown); }
						}, time);
					});
					on(offevt, parent, function () {
						parentTimer = window.setTimeout(function () {
							VFX[effect].hide(dropdown);
							isDown = false;
							if (callback) { callback.call(dropdown, isDown); }
						}, time);
					});
					on('mouseover', dropdown, function () {
						window.clearTimeout(parentTimer);
						window.clearTimeout(dropTimer);
					});
					on('mouseover', parent, function () {
						window.clearTimeout(parentTimer);
						window.clearTimeout(dropTimer);
					});
				} else {
					on(offevt, dropdown, function () {
						VFX[effect].hide(dropdown);
						isDown = false;
						if (callback) { callback.call(dropdown, isDown); }
					});
					on(offevt, parent, function () {
						VFX[effect].hide(dropdown);
						isDown = false;
						if (callback) { callback.call(dropdown, isDown); }
					});
				}
				if (dispatch) {
					setOn(disEvt, dispatch, function () {
						VFX[effect].hide(dropdown);
						isDown = false;
						if (callback) { callback.call(dropdown, isDown); }
					});
				}
				if (callback) { callback.call(dropdown, isDown); }
			}

		});
	}

	// wooSlider
	function wooSlider(option) {
		let child = option.childs;
		let parent = option.parent;
		let extra = option.extra || '.1#';
		let create = option.create || false;
		let style = option.style;
		let offset = option.offset || {x : 0, y : 0};
		let predefine = {
			'position': 'absolute',
			'left': '0',
			'bottom': '0',
			'height': '5px',
			'transition': '0.3s',
			'background-color': 'lightskyblue'
		};
		if (typeof parent === 'string') parent = query(parent);

		parent.style.position = 'relative';
		Object.assign(predefine, style);

		parent.addEventListener('mouseover', slide);
		if (create) {
			let woo = document.createElement('div');
			woo.id = 'woo';
			setStyle(woo, predefine);
			parent.appendChild(woo);
		}
		function slide(e) {
			// compatible with electron.js
			let target = e.target;
			if (target.className.match(child.replace('.', ''))
				|| target.className.match(extra.replace('.', ''))) {
				const slider = query('#woo');
				const x = target.getBoundingClientRect().right;
				const w = target.getBoundingClientRect().width;
				slider.style.width = w + 'px';
				slider.style.left = (x - w) + offset.x + 'px';
			}
		}
	}

	//radialMenu
	function radialMenu(option,callback) {
		let center = option.center || false;
		let radius = option.radius || 100;
		let offset_x = option.x || 0;
		let offset_y = option.y || 0;
		let parent = option.parent;

		if (typeof parent === 'string') parent = uiu.query(parent);
		
		let childCount = parent.childElementCount;
		let slice = Math.PI*2 / childCount;

		for (let i = 0; i < childCount; i++) {
			let elm = parent.children[i];
			let angle = i * slice;
		
			let x = offset_x + Math.cos(angle) * radius;
			let y = offset_y + Math.sin(angle) * radius;
			
			setStyle(elm,{
				'left' : x + 'px',
				'top' : y + 'px',
			})
			
		}

		if(callback) {
			callback.call(parent,parent.children);
		}
	}


	//tooltip
	function tooltip(option) {
		let parent = option.parent;
		let offset = option.offset || {x : 5, y: 10};
		let append = option.appendTo;
		
		if (typeof parent === 'string') parent = uiu.query(parent);
		if (typeof append === 'string') append = uiu.query(append);
		
		if(!parent.querySelector('#' + (option.id || 'uiuTooltip'))) {
			let tooltip = document.createElement('div');
				tooltip.setAttribute('class',option.contentClass || '');
				tooltip.setAttribute('id',option.id || 'uiuTooltip');
				tooltip.innerHTML = option.content || 'tooltip';

			// console.log(append)
			(append||parent).appendChild(tooltip);
			
			setStyle(parent,{
				'position' : 'relative',
			});
			setStyle(tooltip,{
				'min-width' : '90px',
				'position' : 'absolute',
				'opacity' : '0',
				'transform' : 'scale(0.6)',
				'pointer-events' : 'none',
				'transition' : '0.2s',
				'transition-property' : 'opacity, transform',
				'z-index' : '5',
				'left' : '0',
				'top' : '0'
			});

			setOn({
				'mouseover' : function(e) {
					setStyle(tooltip,{
						'opacity' : option.opacity || 1,
						'transform' : 'scale(1)'
					});
				},
				'mouseleave' : function() {
					setStyle(tooltip,{
						'opacity' : '0',
				    'transform' : 'scale(0.6)',
					});
				}
			},parent);
			

		let pre_left,
				pre_right;
			
		
		function posSet(e) {
			// const body_w = document.body.offsetWidth;
			// const parent_w = parent.pageX;

			// let child_w = tooltip.offsetWidth;
			// let child_r = tooltip.getBoundingClientRect().right;

			// let offsetToTest = e.clientX + child_w;
			
			// if(body_w > offsetToTest) {
			// 	pre_left = (e.offsetX + offset.x);
			// 	console.log(pre_left)
			// } else {
			// 	// pre_left = (body_w - parent_w) - child_w;
			// }
			// 	// console.log(child_r)

			setStyle(tooltip,{
				left : e.offsetX + offset.x + 'px',
				top : e.offsetY + offset.y + 'px' 
			});
		}

		setOn('mousemove',parent,throttle(posSet,option.throttle || 30))

		}
	};

	//modal 
	function modal(option,callback) {
		let parent = option.parent;
		let toggle = option.toggle;
		let diveIn = option.in || ['top','0%','30%'];
		let diveOut = option.diveOut || 'top';
		if (typeof parent === 'string') parent = uiu.query(parent);
		if (typeof toggle === 'string') toggle = uiu.query(toggle);
		
		if(!toggle.querySelector('#uiuModalCloseBtn')) {

			let close = document.createElement('div');
			close.setAttribute('id','uiuModalCloseBtn');
			close.innerHTML = 'x';

			setStyle(close,{
				'position' : 'absolute',
				'right' : '-15px',
				'top' : '-0px',
				'text-align' : 'center',
				'width' : '25px',
				'height' : '25px',
				'padding' : '5px',
				'border-radius' : '50%',
				'line-height' : '14px',
				'cursor' : 'pointer',
				'background-color' : 'white',
				'color' : '#252525',
				'z-index' : '1'
			});

			toggle.appendChild(close);

			setOn('click',close,toggleModal)
		}

		setStyle(toggle,{
			'position' : 'absolute',
			'opacity' : '0',
			'pointer-events' : 'none',
			'transition' : '0.2s',
			[diveIn[0]] : diveIn[1]
		});
		
		if(option.shiftBaseline === true) {
			setStyle(toggle,{
				'transform' : 'translateY(-50%)'
			});
		}

		function toggleModal() {
			toggleStyle(toggle,'opacity','0','1');
			toggleStyle(toggle,'pointer-events','none','all');
			toggleStyle(toggle,diveIn[0],diveIn[1],diveIn[2]);
			
			if(callback) {
				callback();
			}
		}

		let on = option.on;
		if(typeof on === 'string') {
			uiu.setOn(option.on,parent,function() {
				toggleModal();
			})
		} else {
			if(option.on()) {
				toggleModal();
			}
		}
	}


	// event subscription
	const event = {
		events : {},
		subEvent : function subEvent(eventName,callback) {
			this.events[eventName] = this.events[eventName] || [];
			this.events[eventName].push(callback);
		},
		unsubEvent : function(eventName,callback) {
			if(this.events[eventName]) {
				for (let i = 0; i < this.events[eventName].length; i++) {
					if(this.events[eventName][i] === callback) {
						this.events[eventName].splice(0,1);
						break;
					}
				}
			}
		},
		unsubAll : function() {
			this.events = {};
		},
		emit : function(eventName,value) {
			if(this.events[eventName]) {
				for (let i = 0; i < this.events[eventName].length; i++) {
					this.events[eventName][i].apply(null,value);
				}
			}
		}
	}
	

	function navbar(option) {
		let parent = option.parent;
		let toggleIcon = option.toggleIcon;
		let content = option.content;

		if (typeof parent === 'string') parent = uiu.query(parent);
		if (typeof toggleIcon === 'string') toggleIcon = uiu.query(toggleIcon);
		if (typeof content === 'string') content = uiu.query(content);

		let navHeight = parent.offsetHeight;
		let height = content.offsetHeight;

		uiu.on('click',toggleIcon,function() {
			uiu.toggleStyle(parent,'height' ,'50px',height+navHeight+'px');            
		})
		
	}

	function _clamp(val,max,min) {
		return Math.min(Math.max(val,max),min);
	}

	//draggable
	function draggable(option,callback) {
		let parent = option.parent;
		let child = option.child;
		let dragger = option.dragger;
		
		if (typeof parent === 'string') parent = uiu.query(parent);
		if (typeof child === 'string') child = uiu.query(child);
		if (typeof dragger === 'string') dragger = uiu.query(dragger);

		dragger = dragger || child;

    let isDown = false;
    let origin = {};
		let pos = {};
		let padding = option.padding || 10;
		
		let adjust = {
			width : parent.offsetWidth - child.offsetWidth-padding,
			height : parent.offsetHeight - child.offsetHeight-padding,
			x : parent.offsetLeft,
			y : parent.offsetTop,
		}

    dragger.addEventListener('mousedown',(e) => {
			e.stopPropagation();
      isDown = true;
      origin.x = e.offsetX;
			origin.y = e.offsetY;
		},false);

    dragger.addEventListener('mouseup',(e) => isDown = false);
		window.addEventListener('mouseup',(e) => isDown = false);
		window.addEventListener('mouseleave',(e) => isDown = false);
		
    window.addEventListener('mousemove',throttle((e) => {
			e.stopPropagation();
			if(isDown) {
				pos = {
					x : _clamp(e.clientX - origin.x - adjust.x, padding, adjust.width),
					y : _clamp(e.clientY - origin.y - adjust.y, padding, adjust.height)
				};
				child.style.left = pos.x + 'px';
				child.style.top = pos.y + 'px';
				if(callback) {
					callback(pos)
				}
			}
    },10),false);

	}

	function createDIV(options) {
		if (typeof options.append === 'string')
			options.append = uiu.query(options.append);

		let div = document.createElement('div');
		if(options.id) {
			div.setAttribute('id', options.id);
		}
		if(options.class) {
			div.setAttribute('class', options.class);
		}
		if(options.styles) {
			uiu.setStyle(div, options.styles);
		}

		options.append.appendChild(div);
		return div;
	}

	return {
		id: id,
		query: query,
		preventRightClick : preventRightClick,
		showTooltip: showTooltip,
		hideTooltip: hideTooltip,
		on: on,
		setOn: setOn,
		onkey : onkey,
		throttle : throttle,
		toggleClass: toggleClass,
		removeClass : removeClass,
		addClass : addClass,
		toggleStyle : toggleStyle,
		linkDOM: linkDOM,
		dropdown: dropdown,
		setStyle: setStyle,
		wooSlider: wooSlider,
		eventDelegate: eventDelegate,
		isClassMatch: isClassMatch,
		selectorMatch : selectorMatch,
		radialMenu : radialMenu,
		tooltip : tooltip,
		modal : modal,
		navbar : navbar,
		//event emit
		event : event,
		draggable : draggable,
		createDIV : createDIV,
	}
})();
