/*
# dom mixin
*/
import { constructors, artefact, group } from '../core/library.js';
import { generateUuid, mergeOver, pushUnique, removeItem, isa_obj, isa_fn, isa_quaternion, xt, addStrings, xta } from '../core/utilities.js';
import { uiSubscribedElements, currentCorePosition, applyCoreResizeListener } from '../core/userInteraction.js';
import { addDomShowElement, setDomShowRequired, domShow } from '../core/document.js';

import { makeQuaternion, requestQuaternion, releaseQuaternion } from '../factory/quaternion.js';
import { requestCell, releaseCell } from '../factory/cell.js';


export default function (P = {}) {

/*
## Define attributes

All factories using the dom mixin will add these to their prototype objects
*/
	let defaultAttributes = {

/*

*/
		domElement: '',

/*

*/
		pitch: 0,

/*

*/
		yaw: 0,

/*
Unlike the X and Y offsets, offsetZ can only ever be a number as there is no 3d box (as such) to act as a length for relative N% strings (and 'front', 'center', 'back' strings would be equally nonsensical)
*/
		offsetZ: 0,

/*

*/
		collides: false,
		pathCorners: null,
		collisionPath: null,
		collisionPoints: null,

/*

*/
		css: null,

/*

*/
		classes: '',

/*

*/
		currentTransformString: '',
		currentTransformOriginString: '',

/*

*/
		rotation: null,

/*

*/
		position: 'absolute',

/*

*/
		trackHere: false,
	};
	P.defs = mergeOver(P.defs, defaultAttributes);


/*
## Define getter, setter and deltaSetter functions
*/
	let S = P.setters,
		D = P.deltaSetters;

/*

*/
	S.trackHere = function (item) {

		this.trackHere = item;
		
		if (item) pushUnique(uiSubscribedElements, this.name);
		else removeItem(uiSubscribedElements, this.name);
	};

/*

*/
	S.actionResize = function (item) {

		this.actionResize = item;

		if (item) {

			this.prepareStamp();
			domShow(this.name);
			this.triggerResizeCascade();
		}
	};

/*

*/
	S.position = function (item) {

		this.position = item;
		this.dirtyPosition = true;
	};

/*

*/
	S.visibility = function (item) {

		this.visibility = item;
		this.dirtyVisibility = true;
	};

/*

*/
	S.offsetZ = function (item) {

		this.offsetZ = item;
		this.dirtyOffsetZ = true;
	};

/*

*/
	D.offsetZ = function (item) {

		this.offsetZ += item;
		this.dirtyOffsetZ = true;
	};

/*

*/
	S.roll = function (item) {

		this.roll = this.checkRotationAngle(item);
		this.dirtyRotation = true;
	};

/*

*/
	S.pitch = function (item) {

		this.pitch = this.checkRotationAngle(item);
		this.dirtyRotation = true;
	};

/*

*/
	S.yaw = function (item) {

		this.yaw = this.checkRotationAngle(item);
		this.dirtyRotation = true;
	};

/*

*/
	D.roll = function (item) {

		this.roll = this.checkRotationAngle(this.roll + item);
		this.dirtyRotation = true;
	};

/*

*/
	D.pitch = function (item) {

		this.pitch = this.checkRotationAngle(this.pitch + item);
		this.dirtyRotation = true;
	};

/*

*/
	D.yaw = function (item) {

		this.yaw = this.checkRotationAngle(this.yaw + item);
		this.dirtyRotation = true;
	};

/*

*/
	S.css = function (item) {

		this.css = (this.css) ? mergeOver(this.css, item) : item;

		this.dirtyCss = true;
	};

/*

*/
	S.classes = function (item) {

		this.classes = item;

		this.dirtyClasses = true;
	};

/*

*/
	S.collides = function (item) {

		this.collides = item;

		if (item) this.dirtyPathObject = true;
	};

/*

*/
	S.domAttributes = function (item) {

		this.updateDomAttributes(item);
	}

/*

*/
	P.checkRotationAngle = function (angle) {

		if (angle < -180 || angle > 180) {
			angle += (angle > 0) ? -360 : 360;
		}

		return angle;
	};

/*
Overwrites the clone function in mixin/base.js
*/
	P.clone = function (items = {}) {

		let self = this,
			regex = /^(local|dirty|current)/;

		let host = this.currentHost || artefact[this.host];
		this.currentHost = null;

		let grp = this.group;
		this.group = grp.name;

		let corners = this.pathCorners;
		this.pathCorners = null;

		let points = this.collisionPoints;
		this.collisionPoints = null;

		let tempPivot = this.pivot, 
			tempMimic = this.mimic, 
			tempPath = this.path;

		if (tempPivot && tempPivot.name) this.pivot = tempPivot.name;
		if (tempMimic && tempMimic.name) this.mimic = tempMimic.name;
		if (tempPath && tempPath.name) this.path = tempPath.name;

		let copied = JSON.parse(JSON.stringify(this));

		if (tempPivot) this.pivot = tempPivot;
		if (tempMimic) this.mimic = tempMimic;
		if (tempPath) this.path = tempPath;

		copied.name = (items.name) ? items.name : generateUuid();

		this.currentHost = host;
		this.group = grp;
		this.pathCorners = corners;
		this.collisionPoints = points;

		Object.entries(this).forEach(([key, value]) => {

			if (regex.test(key)) delete copied[key];
			if (isa_fn(this[key])) copied[key] = self[key];
		}, this);

		if (this.domElement) {

			copied.domElement = this.domElement.cloneNode(true);
			copied.domElement.id = copied.name;

			if (host && host.domElement) host.domElement.appendChild(copied.domElement);
		}

		let clone = new constructors[this.type](copied);
		clone.set(items);

		if (grp) grp.addArtefacts(clone);

		// TODO - generate clone collisionPoints to match existing points, unless items includes CP date in which case use that instead

		return clone;
	};

/*

*/
	P.addClasses = function (item) {

		if (item.substring) {

			let classes = this.classes;

			classes += ` ${item}`;
			classes = classes.trim();
			classes = classes.replace(/[\s\uFEFF\xA0]+/g, ' ');

			if (classes !== this.classes) {

				this.classes = classes;
				this.dirtyClasses = true;
			}
		}
		return this;
	};

/*

*/
	P.removeClasses = function (item) {

		if (item.substring) {

			let classes = this.classes,
				targets = item.split(),
				search;

			targets.forEach(cls => {

				search = new RegExp(' ?' + cls + ' ?');
				classes = classes.replace(search, ' ');
				classes = classes.trim();
				classes = classes.replace(/[\s\uFEFF\xA0]+/g, ' ');
			});

			if (classes !== this.classes) {

				this.classes = classes;
				this.dirtyClasses = true;
			}
		}
		return this;
	};

/*

*/
	P.updateDomAttributes = function (items, value) {

		if (this.domElement) {

			let el = this.domElement;

			if (items.substring && xt(value)) {

				if (value) el.setAttribute(items, value);
				else el.removeAttribute(items);
			}
			else if (isa_obj(items)) {

				Object.entries(items).forEach(([item, val]) => {

					if (val) el.setAttribute(item, val);
					else el.removeAttribute(item);
				});
			}

		}
		return this;
	};

/*

*/
	P.addPathCorners = function () {

		let pointMaker = function () {

			let p = document.createElement('div');

			p.style.width = 0;
			p.style.height = 0;
			p.style.position = 'absolute';

			return p;
		};

		let tl = pointMaker(),
			tr = pointMaker(),
			br = pointMaker(),
			bl = pointMaker();

		tl.style.top = '0%';
		tl.style.left = '0%';

		tr.style.top = '0%';
		tr.style.left = '100%';

		br.style.top = '100%';
		br.style.left = '100%';

		bl.style.top = '100%';
		bl.style.left = '0%';

		let el = this.domElement;

		el.appendChild(tl);
		el.appendChild(tr);
		el.appendChild(br);
		el.appendChild(bl);

		this.pathCorners.push(tl);
		this.pathCorners.push(tr);
		this.pathCorners.push(br);
		this.pathCorners.push(bl);

		return this;
	};

/*

*/
	P.cleanPathObject = function () {

		this.dirtyPathObject = false;

		if (!this.pathCorners.length) this.addPathCorners();

		let here = this.getHere(),
			x = currentCorePosition.scrollX - (here.offsetX || 0),
			y = currentCorePosition.scrollY - (here.offsetY || 0),
			round = Math.round,
			results = [],
			client;

		this.pathCorners.forEach(point => {

			client = point.getClientRects();
			client = client[0];
			
			if (client) results.push(round(client.left + x), round(client.top + y));
			else results.push(0, 0);
		});

		let p = this.pathObject = new Path2D();
		p.moveTo(results[0], results[1]);
		p.lineTo(results[2], results[3]);
		p.lineTo(results[4], results[5]);
		p.lineTo(results[6], results[7]);
		p.closePath();
	};

/*

*/
	P.checkHit = function (items = {}) {

		if (!this.collides || !this.domElement) return false;

		let tests = (!Array.isArray(items)) ?  [items] : items;

		let mycell = requestCell(),
			engine = mycell.engine,
			tx, ty;

		this.cleanPathObject();

		if (tests.some(test => {

			if (Object.prototype.toString.call(test) !== '[object Object]') return false;

			tx = test.x;
			ty = test.y;

			if (!tx.toFixed || !ty.toFixed || isNaN(tx) || isNaN(ty)) return false;

			// this measures against a flat, unrotated host (usually a stack artefact) - if we want to measure against a rotated host (roll) then we will need to do some stuff to the engine. I have no clue about how to handle a Stack that has been rotated around pitch or yaw.
			return engine.isPointInPath(this.pathObject, tx, ty);

		}, this)) {

			releaseCell(mycell);

			return {
				x: tx,
				y: ty,
				artefact: this
			};
		}
		
		releaseCell(mycell);
		
		return false;
	};

/*

*/
	// P.addCollisionPoints = function (...args) {

	// 	let pointMaker = function () {

	// 		let p = document.createElement('div');

	// 		p.style.width = 0;
	// 		p.style.height = 0;
	// 		p.style.position = 'absolute';

	// 		return p;
	// 	};

	// 	let collisionPoints = this.collisionPoints = [],
	// 		element = this.domElement;

	// 	if (element) {

	// 		let pointsArray = new Set();

	// 		args.forEach(item => {

	// 			if (item.substring) {

	// 				item = item.toLowerCase();

	// 				switch (item) {

	// 					case 'corners' :
	// 						pointsArray.add('ne').add('nw').add('sw').add('se');
	// 						break;

	// 					case 'edges' :
	// 						pointsArray.add('n').add('w').add('s').add('e');
	// 						break;

	// 					case 'border' :
	// 						pointsArray.add('ne').add('nw').add('sw').add('se').add('n').add('w').add('s').add('e');
	// 						break;

	// 					case 'center' :
	// 						pointsArray.add('c');
	// 						break;

	// 					case 'all' :
	// 						pointsArray.add('ne').add('nw').add('sw').add('se').add('n').add('w').add('s').add('e').add('c');
	// 						break;

	// 					case 'ne' :
	// 					case 'e' :
	// 					case 'se' :
	// 					case 's' :
	// 					case 'sw' :
	// 					case 'w' :
	// 					case 'nw' :
	// 					case 'n' :
	// 						pointsArray.add(item);
	// 						break;
	// 				}
	// 			}
	// 		});

	// 		let topArray = ['ne', 'n', 'nw'],
	// 			middleArray = ['e', 'w', 'c'],
	// 			leftArray = ['nw', 'w', 'sw'],
	// 			centerArray = ['n', 's', 'c'];

	// 		pointsArray.forEach(val => {

	// 			let point = pointMaker();

	// 			if (topArray.indexOf(val) >= 0) point.style.top = '0%';
	// 			else if (middleArray.indexOf(val) >= 0) point.style.top = '50%';
	// 			else point.style.top = '100%';

	// 			if (leftArray.indexOf(val) >= 0) point.style.left = '0%';
	// 			else if (centerArray.indexOf(val) >= 0) point.style.left = '50%';
	// 			else point.style.left = '100%';

	// 			element.appendChild(point);
	// 			collisionPoints.push(point);
	// 		});
	// 	}
	// 	return this;
	// };

/*

*/
	// P.getCollisionPointCoordinates = function (host) {

	// 	let cPoints = this.collisionPoints,
	// 		here = isa_obj(host.here) ? host.here : {},
	// 		x = currentCorePosition.scrollX - (here.offsetX || 0),
	// 		y = currentCorePosition.scrollY - (here.offsetY || 0),
	// 		round = Math.round,
	// 		results = [];

	// 	this.collisionPoints.forEach((point) => {

	// 		let client = point.getClientRects();
	// 		client = client[0];
			
	// 		if (client) results.push([
	// 			round(client.left + x),
	// 			round(client.top + y)
	// 		]);
	// 	});
	// 	return results;
	// };

/*

*/
	P.cleanRotation = function () {

		this.dirtyRotation = false;

		if (!this.rotation || !isa_quaternion(this.rotation)) this.rotation = makeQuaternion();

		if (!this.currentRotation || !isa_quaternion(this.rotation)) this.currentRotation = makeQuaternion();

		let calculatedRotation = this.rotation;

		calculatedRotation.setFromEuler({
			pitch: this.pitch || 0,
			yaw: this.yaw || 0,
			roll: this.roll || 0,
		});

		if (calculatedRotation.getMagnitude() !== 1) calculatedRotation.normalize();

		let processedRotation = requestQuaternion(),
			path = this.path,
			mimic = this.mimic,
			pivot = this.pivot,
			lock = this.lockTo;

		if (path && lock.indexOf('path') >= 0) {

			processedRotation.set(calculatedRotation);
			// TODO check to see if path roll needs to be added

		}
		else if (mimic && this.useMimicRotation && lock.indexOf('mimic') >= 0) {

			if (xt(mimic.currentRotation)) {

				processedRotation.set(mimic.currentRotation);
				if (this.addOwnRotationToMimic) processedRotation.quaternionRotate(calculatedRotation);
			}
			else this.dirtyMimicRotation = true;
		} 
		else {

			processedRotation.set(calculatedRotation);

			if (pivot && this.addPivotRotation && lock.indexOf('pivot') >= 0) {

				if (xt(pivot.currentRotation)) processedRotation.quaternionRotate(pivot.currentRotation);
				else this.dirtyPivotRotation = true;
			}
		}

		this.currentRotation.set(processedRotation);

		releaseQuaternion(processedRotation);

		this.dirtyPositionSubscribers = true;
	};

/*

*/
	P.cleanOffsetZ = function () {

		// nothing to do here - function only exists in case we need to do stuff in future Scrawl-canvas version
		this.dirtyOffsetZ = false;
	};

/*

*/
	P.cleanContent = function () {

		this.dirtyContent = false;

		let el = this.domElement;

		if (el) this.dirtyDimensions = true;
	};

/*

*/
	P.initializeDomLayout = function (items) {

		let el = items.domElement,
			elStyle = el.style;

		if (el && items.setInitialDimensions) {

			let dims = el.getBoundingClientRect(),
				trans = el.style.transform,
				transOrigin = el.style.transformOrigin,
				host = false,
				hostDims;

			if (items && items.host) {

				host = items.host;

				if (host.substring && artefact[host]) host = artefact[host];
			}

			// TODO - discover scale

			// discover dimensions (width, height)
			this.currentDimensions[0] = dims.width;
			this.currentDimensions[1] = dims.height;
			items.width = dims.width;
			items.height = dims.height;

			// recover classes already assigned to the element
			if (el.className) items.classes = el.className;

			// go with lock defaults - no work required

			// discover start (boundingClientRect - will be the difference between this object and its host (parent) object 'top' and 'left' values)
			if (host && host.domElement) {

				hostDims = host.domElement.getBoundingClientRect();

				if (hostDims) {

					items.startX = dims.left - hostDims.left;
					items.startY = dims.top - hostDims.top;
				}
			}


			// TODO go with offset defaults - though may be worthwhile checking if the translate style has been set?

			// TODO discover handle (transform, transformOrigin)

			// TODO go with rotation (pitch, yaw, roll) defaults - no further work required?

			// for Stack artefacts only, discover perspective and perspective-origin values
			if (this.type === 'Stack') {

				// TODO - currently assumes all lengths supplied are in px - need a way to calculate non-px values
				if (!xt(items.perspective) && !xt(items.perspectiveZ)) {

					// TODO - this isn't working! 
					items.perspectiveZ = (xt(elStyle.perspective) && elStyle.perspective) ? parseFloat(elStyle.perspective) : 0;
				}

				let perspectiveOrigin = elStyle.perspectiveOrigin;

				if (perspectiveOrigin.length) {

					perspectiveOrigin = perspectiveOrigin.split(' ');

					if (perspectiveOrigin.length > 0 && !xt(items.perspective) && !xt(items.perspectiveX)) items.perspectiveX = perspectiveOrigin[0];

					if (!xt(items.perspective) && !xt(items.perspectiveY)) {

						if (perspectiveOrigin.length > 1) items.perspectiveY = perspectiveOrigin[1];
						else items.perspectiveY = perspectiveOrigin[0];
					}
				}
			}
		}
	};

/*

*/
	P.checkForResize = function () {

		let el = this.domElement;

		if (el) {

			let dims = el.getBoundingClientRect(),
				flag = false;

			if (this.currentDimensions[0] !== dims.width) {

				this.dimensions[0] = this.currentDimensions[0] = dims.width;
				flag = true;
			}

			if (this.currentDimensions[1] !== dims.height) {

				this.dimensions[1] = this.currentDimensions[1] = dims.height;
				flag = true;
			}

			if (flag && (this.type === 'Stack')) this.triggerResizeCascade();
		}
	};

	P.triggerResizeCascade = function () {

		let gBucket = this.groupBuckets,
			aBucket;

		if (gBucket && gBucket.length) {

			gBucket.forEach(grp => {

				aBucket = grp.artefactBuckets;

				if (aBucket && aBucket.length) {

					aBucket.forEach(art => {

						if (art) {

							art.dirtyDimensions = true;
						}
					})
				}
			})
		}
	};

/*

*/
	P.prepareStamp = function () {

		if (this.actionResize) this.checkForResize();

		if (this.dirtyContent) this.cleanContent();
		if (this.dirtyScale) this.cleanScale();
		if (this.dirtyDimensions) this.cleanDimensions();
		if (this.dirtyLock) this.cleanLock();
		if (this.dirtyStart) this.cleanStart();
		if (this.dirtyOffset) this.cleanOffset();
		if (this.dirtyOffsetZ) this.cleanOffsetZ();
		if (this.dirtyHandle) this.cleanHandle();
		if (this.dirtyRotation) this.cleanRotation();

		if (this.isBeingDragged || this.lockTo.indexOf('mouse') >= 0) {

			this.dirtyStampPositions = true;
			this.dirtyStampHandlePositions = true;
		}

		if (this.dirtyStampPositions) this.cleanStampPositions();
		if (this.dirtyStampHandlePositions) this.cleanStampHandlePositions();
	};

	P.cleanStampPositionsAdditionalActions = function () {

		if (this.domElement && this.collides) this.dirtyPathObject = true;
	};
/*

*/
	P.stamp = function () {

		let self = this;

		return new Promise((resolve, reject) => {

			// do not process if the DOM element is missing
			if (!self.domElement) reject(false);

			// calculate transform strings on each iteration
			let [stampX, stampY] = self.currentStampPosition,
				[handleX, handleY] = self.currentStampHandlePosition,
				scale = self.currentScale;

			let rotation = self.currentRotation,
				v, vx, vy, vz, angle;

			let nTransformOrigin = `${handleX}px ${handleY}px 0`,
				nTransform = `translate(${stampX - handleX}px,${stampY - handleY}px)`;

			if (self.yaw || self.pitch || self.roll || (self.pivot && self.addPivotRotation) || (self.mimic && self.useMimicRotation) || (self.path && self.addPathRotation)) {

				v = rotation.v;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				angle = rotation.getAngle(false);

				nTransform += ` rotate3d(${vx},${vy},${vz},${angle}rad)`;
			}

			if (self.offsetZ) nTransform += ` translateZ(${self.offsetZ}px)`;

			if (scale !== 1) nTransform += ` scale(${scale},${scale})`;

			if (nTransform !== self.currentTransformString) {

				self.currentTransformString = nTransform;
				self.dirtyTransform = true;
			}

			if (nTransformOrigin !== self.currentTransformOriginString) {

				self.currentTransformOriginString = nTransformOrigin;
				self.dirtyTransformOrigin = true;
			}

			// determine whether there is a need to trigger a redraw of the DOM element
			if (self.dirtyTransform || self.dirtyPerspective || self.dirtyPosition || self.dirtyDomDimensions || self.dirtyTransformOrigin || self.dirtyVisibility || self.dirtyCss || self.dirtyClasses || self.domShowRequired) {

				addDomShowElement(self.name);
				setDomShowRequired(true);
			}

			// update artefacts subscribed to this artefact (using it as their pivot or mimic source), if required
			if (self.dirtyPositionSubscribers) self.updatePositionSubscribers();

			// if this artefact's pivot or mimic source was playing up, reset appropriate dirty flags so we can try and fix on next iteration
			if(self.dirtyMimicRotation || self.dirtyPivotRotation) {

				self.dirtyMimicRotation = false;
				self.dirtyPivotRotation = false;
				self.dirtyRotation = true;
			}

			if(self.dirtyMimicScale) {

				self.dirtyMimicScale = false;
				self.dirtyScale = true;
			}

			resolve(true);
		});
	};

/*

*/
	P.apply = function() {

		applyCoreResizeListener();

		this.prepareStamp();
		domShow(this.name);
	};

	return P;
};
