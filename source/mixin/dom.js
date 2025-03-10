// # DOM mixin
// This mixin builds on the base and position mixins to give DOM elements (Scrawl-canvas [Stack](../factory/stack.html), [Canvas](../factory/canvas.html) and [Element](../factory/element.html) wrapper objects) the ability to act as __artefacts__ in a Scrawl-canvas stack environment.
// + Absolute and relative positioning and dimensioning
// + Positioning in the 3rd (z) dimension (absolute values only)
// + Use other artefacts as `pivot`, `mimic` and `path` objects
// + Allow other artefacts to use Element objects as their pivot or mimic object
// + Track the real (3D) positions of the DOM element's corners, so that they can participate in collision detection functionality (for example, drag-and-drop)
// + Allow other artefacts to use Element object corners as their pivot reference
// + 3D-rotation management - extending beyond `roll` (z) rotation to include `pitch` (x) and `yaw` (y) rotations
// + DOM element class and CSS management
// + Real-time localized mouse/pointer cursor coordinate tracking


// #### Imports
import { constructors, artefact } from '../core/library.js';
import { mergeOver, pushUnique, removeItem, isa_obj, isa_dom, isa_quaternion, xt, xta, λnull, Ωempty, isa_fn } from '../core/utilities.js';
import { uiSubscribedElements, currentCorePosition, applyCoreResizeListener, addLocalMouseMoveListener, removeLocalMouseMoveListener } from '../core/userInteraction.js';
import { addDomShowElement, setDomShowRequired, domShow } from '../core/document.js';

import { makeQuaternion, requestQuaternion, releaseQuaternion } from '../factory/quaternion.js';

import positionMix from '../mixin/position.js';
import deltaMix from './delta.js';
import pivotMix from './pivot.js';
import mimicMix from './mimic.js';
import pathMix from './path.js';
import anchorMix from '../mixin/anchor.js';


// #### Export function
export default function (P = Ωempty) {


// #### Mixins
// + [position](../mixin/position.html)
// + [delta](../mixin/delta.html)
// + [pivot](../mixin/pivot.html)
// + [mimic](../mixin/mimic.html)
// + [path](../mixin/path.html)
// + [anchor](../mixin/anchor.html)
    P = positionMix(P);
    P = deltaMix(P);
    P = pivotMix(P);
    P = mimicMix(P);
    P = pathMix(P);
    P = anchorMix(P);


// #### Shared attributes
// TODO: we need to test how various Javascript frameworks interact with Scrawl-canvas functionality in this area. In particular: [vue.js](https://vuejs.org/); [React](https://reactjs.org/); [Svelte](https://svelte.dev/)
    let defaultAttributes = {


// __domElement__ - Wrapper objects reference handle to its DOM element
        domElement: '',


// __pitch__, __yaw__ - rotation management in the `x` and `y` axes, to go with the __roll__ attribute (for `z` axis rotation) defined in the position mixin. Like roll, values should be Numbers representing ___degrees___ (not radians)
        pitch: 0,
        yaw: 0,


// __offsetZ__ - Number - unlike the X and Y offsets, offsetZ can only ever be a number as there is no 3d box (as such) to act as a length for relative N% strings (and 'front', 'center', 'back' strings would be equally nonsensical)
        offsetZ: 0,

// __css__ - a Javascript Object to hold key:value CSS values. Scrawl-canvas does not track any non-positioning-related CSS attributes; this attribute is a convenience function to allow developers to add CSS to the DOM element's `style` attribute.
// + Styles added to DOM elements using this object are applied directly to the element, thus having precedence over all other CSS declarations such as those included in a &lt;style> tag in the document, or in a CSS style sheet file.
        css: null,

// __classes__ - a String representation of the DOM element's `classNode` attribute.
        classes: '',

// __position__ - a String representation of the DOM element's `position` attribute.
// + by default all Scrawl-canvas Stack, Canvas and Element wrapper DOM elements are given a position value of `absolute`
// + root Stack and Canvas wrappers have a position value of `relative` - this is to make sure their DOM elements remain in the document flow, thus attempting to minimize Scrawl-canvas's impact on the wider environment
// + other possible values - except `static` - will be respected if they are explicitly set on the DOM elements prior to Scrawl-canvas initialization.
        position: 'absolute',

// __smoothFont__ - a Boolean to handle the non-standards `font-smooth`, `-webkit-font-smoothing` and `-moz-osx-font-smoothing` CSS properties.
// + by default all Scrawl-canvas Stack, Canvas and Element wrapper DOM will automatically smooth fonts
// + setting this value to false will get Scrawl-canvas to attempt to switch off font smoothing
// + ___This CSS property is non-standards-compliant___ and thus likely to break in interesting and unexpected ways!
        smoothFont: true,

// __checkForResize__ - Boolean - automatically update stuff when the element changes its dimensions
// + triggers as part of the [userInteraction](../core/userInteraction.html) `updateUiSubscribedElement` functionality
        checkForResize: false,

// __trackHere__ - String flag - when set, Scrawl-canvas will track mouse/touch cursor's _local_ position (relative to top-left corner) over the wrapper's DOM element
// + Stack and Canvas wrappers have this flag set to true `subscribe`, by default
// + Element wrappers default to false `''`, as expected
// + The value can also be set to `'local'`, which will set up a local listener to help track mouse movements across a 3d rotated DOM element
// + ___BE AWARE___ that setting the value to `'local'` is an _experimental technology!_ There are a number of issues surrounding the functionality - principally that we lose the ability to dynamically resize the rotated element/canvas: changing the element's dimensions will lead to inaccuracies in mouse cursor positioning!
        trackHere: '',

// __activePadding__ - Number - if the `trackHere` attribute is set to `'local'` then the here object will generally remain true whatever the position of the mouse cursor - this is because here coordinates are only updated as the cursor moves over the element, not when it moves beyond its borders. The activePadding Number supplies a padding area along the inside edge of the element - if the mouse moves into this area then a the here.active boolean will become false. This is not foolproof because it will often miss a rapidly moving cursor!
        activePadding: 5,

// __domAttributes__ - pseudo-attribute which is not retained by the wrapper object. See `updateDomAttributes` function below for details on how to use this functionality when creating or updating (via `set`), for example, Element objects

// __includeInTabNavigation__ - pseudo-attribute which is not retained by the wrapper object. See `updateDomAttributes` function below for details on how to use this functionality when creating or updating (via `set`), for example, Element objects
        includeInTabNavigation: false,

// These actions are all related to user accessibility and the ability of the user to define their preferences at the operation system or device level. Listeners to capture the state of, and changes in, those values are set up in `core/userInteraction.js`. Each canvas, stack or (subscribed) element can take advantage of this functionality to update its appearance dependant on the user's preferences.
        reduceMotionAction: null,
        noPreferenceMotionAction: null,
        colorSchemeLightAction: null,
        colorSchemeDarkAction: null,
        reduceTransparencyAction: null,
        noPreferenceTransparencyAction: null,
        reduceDataAction: null,
        noPreferenceDataAction: null,
    };
    P.defs = mergeOver(P.defs, defaultAttributes);


// #### Packet management
    P.packetExclusions = pushUnique(P.packetExclusions, ['domElement', 'pathCorners', 'rotation']);
    P.packetFunctions = pushUnique(P.packetFunctions, ['onEnter', 'onLeave', 'onDown', 'onUp']);

// `processDOMPacketOut` - internal helper function
    P.processDOMPacketOut = function (key, value, includes) {

        return this.processFactoryPacketOut(key, value, includes);
    };

// `processFactoryPacketOut` - internal helper function
    P.processFactoryPacketOut = function (key, value, includes) {

        let result = true;

        if(includes.indexOf(key) < 0 && value === this.defs[key]) result = false;

        return result;
    };

// `finalizePacketOut` - internal helper function
    P.finalizePacketOut = function (copy, items) {

        if (isa_dom(this.domElement)) {

            let el = this.domElement;

            let mynode = el.cloneNode(true);

            let kids = mynode.querySelectorAll('[data-corner-div="sc"]');
            kids.forEach(kid => mynode.removeChild(kid));

            copy.outerHTML = mynode.outerHTML;
            copy.host = el.parentElement.id;
        }

        copy = this.handlePacketAnchor(copy, items);

        return copy;
    };


// #### Clone management
// `postCloneAction` - internal helper function
    P.postCloneAction = function(clone, items) {

        if (this.onEnter) clone.onEnter = this.onEnter;
        if (this.onLeave) clone.onLeave = this.onLeave;
        if (this.onDown) clone.onDown = this.onDown;
        if (this.onUp) clone.onUp = this.onUp;

        return clone;
    };


// #### Kill management
// No additional kill functionality required


// #### Get, Set, deltaSet
    let S = P.setters,
        D = P.deltaSetters;

S.trackHere = function(val) {

    if (xt(val)) {

        if (val) {

            pushUnique(uiSubscribedElements, this.name);

            if (val === 'local') addLocalMouseMoveListener(this);
        }
        else {

            removeItem(uiSubscribedElements, this.name);
            removeLocalMouseMoveListener(this);
        }
        this.trackHere = val;
    }
};

// `position`
    S.position = function (item) {

        this.position = item;
        this.dirtyPosition = true;
    };

// `smoothFont`
    S.smoothFont = function (item) {

        this.smoothFont = item;
        this.dirtySmoothFont = true;
    };

// `visibility`
    S.visibility = function (item) {

        this.visibility = item;
        this.dirtyVisibility = true;
    };

// `offsetZ`
    S.offsetZ = function (item) {

        this.offsetZ = item;
        this.dirtyOffsetZ = true;
    };

    D.offsetZ = function (item) {

        this.offsetZ += item;
        this.dirtyOffsetZ = true;
    };

// `roll`
    S.roll = function (item) {

        this.roll = this.checkRotationAngle(item);
        this.dirtyRotation = true;
    };
    D.roll = function (item) {

        this.roll = this.checkRotationAngle(this.roll + item);
        this.dirtyRotation = true;
    };

// `pitch`
    S.pitch = function (item) {

        this.pitch = this.checkRotationAngle(item);
        this.dirtyRotation = true;
    };
    D.pitch = function (item) {

        this.pitch = this.checkRotationAngle(this.pitch + item);
        this.dirtyRotation = true;
    };

// `yaw`
    S.yaw = function (item) {

        this.yaw = this.checkRotationAngle(item);
        this.dirtyRotation = true;
    };
    D.yaw = function (item) {

        this.yaw = this.checkRotationAngle(this.yaw + item);
        this.dirtyRotation = true;
    };

// `css`
    S.css = function (item) {

        this.css = (this.css) ? mergeOver(this.css, item) : item;

        this.dirtyCss = true;
    };

// `classes`
    S.classes = function (item) {

        this.classes = item;

        this.dirtyClasses = true;
    };

// `domAttributes` - see `updateDomAttributes` below
    S.domAttributes = function (item) {

        this.updateDomAttributes(item);
    };

    S.includeInTabNavigation = function (item) {

        const el = this.domElement;

        if (el) {

            this.includeInTabNavigation = item;

            if (item) el.setAttribute('tabindex', 0);
            else el.setAttribute('tabindex', -1);
        }
    };


// #### Prototype functions

// `checkRotationAngle` - internal function - a quick check for rotational (`roll`, `pitch`, `yaw`) setter/deltaSetter functionality. Attempts to keep values of these attributes between -360 and + 360
    P.checkRotationAngle = function (angle) {

        if (angle < -180 || angle > 180) {
            angle += (angle > 0) ? -360 : 360;
        }

        return angle;
    };

// `updateDomAttributes` - DOM wrapper objects do not keep track of their DOM element attribute values; this function is a convenience function to make updating those attributes a bit easier. Function arguments can be one of:
// + `(attribute-String, value)`
// + `({attribute-String: value, attribute-String: value, etc})`
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

// `initializeDomLayout` - internal function 
// + Used by factory constructors to help wrap DOM elements in a Stack, Canvas or Element wrapper
// + TODO - there's a lot of improvements we can do here - the aim should be to create the wrapper object and update the objects DOM element's style and dimensions attributes - specifically shifting `position` from "static" to "absolute" - in a way that does not disturb the page view in any way whatsoever (pixel-perfect!) so website visitors are completely unaware that the work has taken place
    P.initializeDomLayout = function (items) {

        let el = items.domElement,
            elStyle = el.style;

        elStyle.boxSizing = 'border-box';

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

                    // TODO - this isn't working! see Demo DOM 003 where attempting to set the perspective in CSS causes the demo to fail
                    // + Workaround is to explicitly set the stack's perspectiveZ value in Javascript
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


// ##### DOM element class attribute management

// `addClasses`
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

// `removeClasses`
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

// ##### DOM element corners management
// Scrawl-canvas keeps track of its DOM wrapper element's positions by creating four zero-dimension &lt;div> elements and adding them as absolutely positioned children to the element. We can then get these children to report on their real coordinates (even when the parent is 3D rotated) by calling `getClientRects` on them.

// `addPathCorners`
    P.emptyElementTagNames = ['AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR', 'CANVAS'];
    P.addPathCorners = function () {

        if (this.domElement && 
            !this.noUserInteraction && 
            this.emptyElementTagNames.indexOf(this.domElement.tagName) < 0) {

            let pointMaker = function () {

                let p = document.createElement('div');

                p.style.width = 0;
                p.style.height = 0;
                p.style.position = 'absolute';
                p.style.margin = 0;
                p.style.border = 0;
                p.style.padding = 0;

                return p;
            };

            let tl = pointMaker(),
                tr = pointMaker(),
                br = pointMaker(),
                bl = pointMaker();

            tl.style.top = '0%';
            tl.style.left = '0%';
            tl.setAttribute('data-corner-div', 'sc');

            tr.style.top = '0%';
            tr.style.left = '100%';
            tr.setAttribute('data-corner-div', 'sc');

            br.style.top = '100%';
            br.style.left = '100%';
            br.setAttribute('data-corner-div', 'sc');

            bl.style.top = '100%';
            bl.style.left = '0%';
            bl.setAttribute('data-corner-div', 'sc');

            let el = this.domElement;

            el.appendChild(tl);
            el.appendChild(tr);
            el.appendChild(br);
            el.appendChild(bl);

            this.pathCorners.push(tl);
            this.pathCorners.push(tr);
            this.pathCorners.push(br);
            this.pathCorners.push(bl);

            if (!this.currentCornersData) this.currentCornersData = [];
        }
        return this;
    };

// `checkCornerPositions`
    P.checkCornerPositions = function (corner) {

        let pathCorners = this.pathCorners;

        if (pathCorners.length === 4) {

            let here = this.getHere(),
                x = currentCorePosition.scrollX - (here.offsetX || 0),
                y = currentCorePosition.scrollY - (here.offsetY || 0),
                round = Math.round,
                results = [],
                client;

            const cornerPush = function (c) {

                let coord = c[0];

                if (coord) {

                    results.push(round(coord.left + x));
                    results.push(round(coord.top + y));
                }
                else results.push(0, 0);
            };

            switch (corner) {

                case 'topLeft' :

                    client = pathCorners[0].getClientRects();
                    cornerPush(client);
                    return results;

                case 'topRight' :

                    client = pathCorners[1].getClientRects();
                    cornerPush(client);
                    return results;

                case 'bottomRight' :

                    client = pathCorners[2].getClientRects();
                    cornerPush(client);
                    return results;

                case 'bottomLeft' :

                    client = pathCorners[3].getClientRects();
                    cornerPush(client);
                    return results;

                default :

                    pathCorners.forEach(point => {

                        if (isa_dom(point)) {

                            client = point.getClientRects();
                            cornerPush(client);
                        }
                    });
                    return results;
            }
        }
    }

// `getCornerCoordinate`
    const cornerCoordinateLabels = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
    P.getCornerCoordinate = function (corner) {

        if (cornerCoordinateLabels.indexOf(corner) >= 0) return this.checkCornerPositions(corner);
        else return [].concat(this.currentStampPosition);
    };


// ##### Collision detection

// `cleanPathObject`
// + Scrawl-canvas uses the DOM wrapper element's child &lt;div> elements' position coordinates to build a `Path2D object` (which will be some form of trapezium). 
// + We can now perform collision detection in the same way as we do for Canvas-based entity objects using `CanvasRenderingContext2D.isPointInPath`
    P.cleanPathObject = function () {

        this.dirtyPathObject = false;

        if (this.domElement && !this.noUserInteraction) {

            if (!this.pathCorners.length) this.addPathCorners();

            if (this.pathCorners.length) {

                if (!this.currentCornersData) this.currentCornersData = [];

                let cornerData = this.currentCornersData;
                cornerData.length = 0;
                cornerData.push(...this.checkCornerPositions());

                let p = this.pathObject = new Path2D();
                p.moveTo(cornerData[0], cornerData[1]);
                p.lineTo(cornerData[2], cornerData[3]);
                p.lineTo(cornerData[4], cornerData[5]);
                p.lineTo(cornerData[6], cornerData[7]);
                p.closePath();
            }
            else {
                let p = this.pathObject = new Path2D();
                p.moveTo(0, 0);
                p.lineTo(10, 0);
                p.lineTo(0, 10);
                p.lineTo(-10, 0);
                p.closePath();
            }
        }
    };

// `checkHit`
    P.checkHit = function (items = [], mycell) {

        if (this.noUserInteraction) return false;

        if (!this.pathObject || this.dirtyPathObject) this.cleanPathObject();

        let tests = (!Array.isArray(items)) ?  [items] : items,
            poolCellFlag = false;

        if (!mycell) {

            mycell = requestCell();
            poolCellFlag = true;
        }

        let engine = mycell.engine,
            stamp = this.currentStampPosition,
            x = stamp[0],
            y = stamp[1],
            tx, ty;

        if (tests.some(test => {

            if (Array.isArray(test)) {

                tx = test[0];
                ty = test[1];
            }
            else if (xta(test, test.x, test.y)) {

                tx = test.x;
                ty = test.y;
            }
            else return false;

            if (!tx.toFixed || !ty.toFixed || isNaN(tx) || isNaN(ty)) return false;

            return engine.isPointInPath(this.pathObject, tx, ty);

        }, this)) {

            if (poolCellFlag) releaseCell(mycell);

            return {
                x: tx,
                y: ty,
                artefact: this,
            };
        }
        
        if (poolCellFlag) releaseCell(mycell);
        
        return false;
    };


// ##### Display cycle functionality

// `cleanRotation`
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
        
        if (this.mimicked && this.mimicked.length) this.dirtyMimicRotation = true;
    };

// `cleanOffsetZ`
    P.cleanOffsetZ = function () {

        // nothing to do here - function only exists in case we need to do stuff in future Scrawl-canvas version
        this.dirtyOffsetZ = false;
    };

// `cleanContent`
    P.cleanContent = function () {

        this.dirtyContent = false;

        let el = this.domElement;

        if (el) this.dirtyDimensions = true;
    };

// `cleanDisplayShape` - overwritten in Stack and Canvas artefacts via the displayShape mixin
    P.cleanDisplayShape = λnull;

// `cleanDisplayArea` - overwritten in Stack and Canvas artefacts via the displayShape mixin
    P.cleanDisplayArea = λnull;

// `prepareStamp` - check all the dirty flags and call the appropriate `clean` functions if they are set
    P.prepareStamp = function () {

        if (this.dirtyScale || this.dirtyDimensions || this.dirtyStart || this.dirtyOffset || this.dirtyHandle || this.dirtyRotation) this.dirtyPathObject = true;

        if (this.dirtyContent) this.cleanContent();
        if (this.dirtyScale) this.cleanScale();
        if (this.dirtyDimensions) this.cleanDimensions();
        if (this.dirtyDisplayArea) this.cleanDisplayArea();
        if (this.dirtyDisplayShape) this.cleanDisplayShape();
        if (this.dirtyLock) this.cleanLock();
        if (this.dirtyStart) this.cleanStart();
        if (this.dirtyOffset) this.cleanOffset();
        if (this.dirtyOffsetZ) this.cleanOffsetZ();
        if (this.dirtyHandle) this.cleanHandle();
        if (this.dirtyRotation) this.cleanRotation();

        if (this.isBeingDragged || this.lockTo.indexOf('mouse') >= 0 || this.lockTo.indexOf('particle') >= 0) {

            this.dirtyStampPositions = true;
            this.dirtyStampHandlePositions = true;
        }

        if (this.pivoted.length) this.dirtyStampPositions = true;

        if (this.dirtyStampPositions) this.cleanStampPositions();
        if (this.dirtyStampHandlePositions) this.cleanStampHandlePositions();

        if (this.dirtyPathObject) this.cleanPathObject();
    };

// `stamp` - builds a set of Strings which can then be applied to the DOM wrapper's element's `style` attribute.
// + The functionality for performing the update is defined in the [document](../core/document.html) module's `domShow` function, which will be called for each DOM-based artefact during the 'show' stage of the Display cycle
// + Function returns a promise
//
// Only DOM elements whose attribute values have changed will be updated - as made clear by setting the appropriate dirty flags. Affected style attributes are: 
// + `perspectiveOrigin` and `perspective` - Stack wrappers only
// + `position` (relative vs absolute, not position within a Stack)
// + `width` and `height` - for dimensions
// + `transformOrigin` - relating to wrapper `handle` values
// + `transform` - for positioning and rotation within a Stack element
// + `display` - for visibility
    P.stamp = function () {

        // do not process if the DOM element is missing
        if (!this.domElement) return false;

        // calculate transform strings on each iteration
        let [stampX, stampY] = this.currentStampPosition,
            [handleX, handleY] = this.currentStampHandlePosition,
            scale = this.currentScale;

        let rotation = this.currentRotation,
            v, vx, vy, vz, angle;

        let nTransformOrigin = `${handleX}px ${handleY}px 0`,
            nTransform = `translate(${stampX - handleX}px,${stampY - handleY}px)`;

        if (this.yaw || this.pitch || this.roll || (this.pivot && this.addPivotRotation) || (this.mimic && this.useMimicRotation) || (this.path && this.addPathRotation)) {

            v = rotation.v;
            vx = v.x;
            vy = v.y;
            vz = v.z;
            angle = rotation.getAngle(false);

            nTransform += ` rotate3d(${vx},${vy},${vz},${angle}rad)`;
        }

        if (this.offsetZ) nTransform += ` translateZ(${this.offsetZ}px)`;

        if (scale !== 1) nTransform += ` scale(${scale},${scale})`;

        if (nTransform !== this.currentTransformString) {

            this.currentTransformString = nTransform;
            this.dirtyTransform = true;
        }

        if (nTransformOrigin !== this.currentTransformOriginString) {

            this.currentTransformOriginString = nTransformOrigin;
            this.dirtyTransformOrigin = true;
        }

        // determine whether there is a need to trigger a redraw of the DOM element
        if (this.dirtyTransform || this.dirtyPerspective || this.dirtyPosition || this.dirtyDomDimensions || this.dirtyTransformOrigin || this.dirtyVisibility || this.dirtySmoothFont || this.dirtyCss || this.dirtyClasses || this.domShowRequired) {

            this.domShowRequired = false;
            addDomShowElement(this.name);
            setDomShowRequired(true);
        }

        // update artefacts subscribed to this artefact (using it as their pivot or mimic source), if required
        if (this.dirtyPositionSubscribers) this.updatePositionSubscribers();

        // if this artefact's pivot or mimic source was playing up, reset appropriate dirty flags so we can try and fix on next iteration
        if(this.dirtyMimicRotation || this.dirtyPivotRotation) {

            this.dirtyMimicRotation = false;
            this.dirtyPivotRotation = false;
            this.dirtyRotation = true;
        }

        if(this.dirtyMimicScale) {

            this.dirtyMimicScale = false;
            this.dirtyScale = true;
        }
    };


// `initializeAccessibility` - internal function - similar to `initializeDomLayout`, this function gets called by the Stack, Canvas and Element factory function constructors
    P.initializeAccessibility = function () {

        this.reduceMotionAction = λnull;
        this.noPreferenceMotionAction = λnull;
        this.colorSchemeLightAction = λnull;
        this.colorSchemeDarkAction = λnull;
        this.reduceTransparencyAction = λnull;
        this.noPreferenceTransparencyAction = λnull;
        this.reduceDataAction = λnull;
        this.noPreferenceDataAction = λnull;
    };

// __prefers-reduced-motion__ accessibility user choice
    S.reduceMotionAction = function (item) {
        if (isa_fn(item)) this.reduceMotionAction = item;
    };
    P.setReduceMotionAction = function (item) {
        if (isa_fn(item)) this.reduceMotionAction = item;
    };
    S.noPreferenceMotionAction = function (item) {
        if (isa_fn(item)) this.noPreferenceMotionAction = item;
    };
    P.setNoPreferenceMotionAction = function (item) {
        if (isa_fn(item)) this.noPreferenceMotionAction = item;
    };
    P.reducedMotionActions = function () {

        const here = this.here;

        if (xt(here)) {

            const accessibilityFlag = here.prefersReducedMotion;

            if (xt(accessibilityFlag)) {

                if (accessibilityFlag) this.reduceMotionAction();
                else this.noPreferenceMotionAction();
            }
        }
    };

// __prefers-color-scheme__ accessibility user choice
    S.colorSchemeLightAction = function (item) {
        if (isa_fn(item)) this.colorSchemeLightAction = item;
    };
    P.setColorSchemeLightAction = function (item) {
        if (isa_fn(item)) this.colorSchemeLightAction = item;
    };
    S.colorSchemeDarkAction = function (item) {
        if (isa_fn(item)) this.colorSchemeDarkAction = item;
    };
    P.setColorSchemeDarkAction = function (item) {
        if (isa_fn(item)) this.colorSchemeDarkAction = item;
    };
    P.colorSchemeActions = function () {

        const here = this.here;

        if (xt(here)) {

            const accessibilityFlag = here.prefersDarkColorScheme;

            if (xt(accessibilityFlag)) {

                if (accessibilityFlag) this.colorSchemeDarkAction();
                else this.colorSchemeLightAction();
            }
        }
    };


// __prefers-reduced-transparency__ accessibility user choice
    S.reduceTransparencyAction = function (item) {
        if (isa_fn(item)) this.reduceTransparencyAction = item;
    };
    P.setReduceTransparencyAction = function (item) {
        if (isa_fn(item)) this.reduceTransparencyAction = item;
    };
    S.noPreferenceTransparencyAction = function (item) {
        if (isa_fn(item)) this.noPreferenceTransparencyAction = item;
    };
    P.setNoPreferenceTransparencyAction = function (item) {
        if (isa_fn(item)) this.noPreferenceTransparencyAction = item;
    };
    P.reducedTransparencyActions = function () {

        const here = this.here;

        if (xt(here)) {

            const accessibilityFlag = here.prefersReduceTransparency;

            if (xt(accessibilityFlag)) {

                if (accessibilityFlag) this.reduceTransparencyAction();
                else this.noPreferenceTransparencyAction();
            }
        }
    };


// __prefers-reduced-data__ accessibility user choice
    S.reduceDataAction = function (item) {
        if (isa_fn(item)) this.reduceDataAction = item;
    };
    P.setReduceDataAction = function (item) {
        if (isa_fn(item)) this.reduceDataAction = item;
    };
    S.noPreferenceDataAction = function (item) {
        if (isa_fn(item)) this.noPreferenceDataAction = item;
    };
    P.setNoPreferenceDataAction = function (item) {
        if (isa_fn(item)) this.noPreferenceDataAction = item;
    };
    P.reducedDataActions = function () {

        const here = this.here;

        if (xt(here)) {

            const accessibilityFlag = here.prefersReduceData;

            if (xt(accessibilityFlag)) {

                if (accessibilityFlag) this.reduceDataAction();
                else this.noPreferenceDataAction();
            }
        }
    };

    P.checkAccessibilityValues = function () {

        this.reducedMotionActions();
        this.colorSchemeActions();
        this.reducedTransparencyActions();
        this.reducedDataActions();
    }

// `apply`
// + I really don't like this functionality - see if we can purge it from the code base?
    P.apply = function() {

        applyCoreResizeListener();

        this.prepareStamp();
        this.stamp()

        domShow(this.name);

        this.dirtyPathObject = true;
        this.cleanPathObject();
    };

// Return the prototype
    return P;
};
