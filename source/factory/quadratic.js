// # Quadratic factory
// Path-defined entitys represent a diverse range of shapes rendered onto a DOM &lt;canvas> element using the Canvas API's [Path2D interface](https://developer.mozilla.org/en-US/docs/Web/API/Path2D). They use the [shapeBasic](../mixin/shapeBasic.html) and [shapePathCalculation](../mixin/shapePathCalculation.html) (some also use [shapeCurve](../mixin/shapeCurve.html)) mixins to define much of their functionality.
// 
// All path-defined entitys can be positioned, cloned, filtered etc:
// + Positioning functionality for the entity is supplied by the __position__ mixin, while rendering functionality comes from the __entity__ mixin. 
// + Dimensions, however, have little meaning for path-defined entitys - their width and height are determined by their SVG path data Strings; use `scale` instead.
// + Path-defined entitys can use CSS color Strings for their fillStyle and strokeStyle values, alongside __Gradient__, __RadialGradient__, __Color__ and __Pattern__ objects. 
// + They will also accept __Filter__ objects.
// + They can use __Anchor__ objects for user navigation. 
// + They can be rendered to the canvas by including them in a __Cell__ object's __Group__. 
// + They can be __animated__ directly, or using delta animation, or act as the target for __Tween__ animations.
// + Path-defined entitys can be cloned, and killed.


// #### Using path-defined entitys as Scrawl-canvas paths
// A path is a track - straight, or curved, or as complex as required - placed across a container which artefacts can use as a source of their positioning data. We can animate an artifact to move along the path:
// + To enable a path-defined entity to be used as a path by other artefacts, set its `useAsPath` flag to `true`.
// + The artefact can then set its `path` attribute to the path-defined entity's name-String (or the entity itself), and set its `lockTo` Array values to `"path"`.
// + We position the artefact by setting its `pathPosition` attribute to a float Number value between `0.0 - 1.0`, with `0` being the start of the path, and `1` being its end.
// + Path-defined entitys can use other path-defined entitys as a path.
// + Phrase entitys can use a path to position their text block; they can also use a path to position each letter individually along the path.
// + Artefacts (and letters) can be rotated so that they match the rotation at that point along the path - ___tangential rotation___ by setting their `addPathRotation` flag to `true`.
// + Animate an artefact along the path by either using the artefact's `delta` object, or triggering a Tween to perform the movement.


// #### Demos:
// + [Canvas-011](../../demo/canvas-011.html) - Shape entity (make, clone, method); drag and drop shape entitys
// + [Canvas-012](../../demo/canvas-012.html) - Shape entity position; shape entity as a path for other artefacts to follow
// + [Canvas-013](../../demo/canvas-013.html) - Path-defined entitys: oval, rectangle, line, quadratic, bezier, tetragon, polygon, star, spiral
// + [Canvas-014](../../demo/canvas-014.html) - Line, quadratic and bezier entitys - control lock alternatives
// + [Canvas-018](../../demo/canvas-018.html) - Phrase entity - text along a path
// + [Canvas-019](../../demo/canvas-019.html) - Artefact collision detection
// + [Canvas-024](../../demo/canvas-024.html) - Loom entity functionality
// + [DOM-015](../../demo/dom-015.html) - Use stacked DOM artefact corners as pivot points
// + [Component-004](../../demo/component-004.html) - Scrawl-canvas packets - save and load a range of different entitys


// #### Imports
import { constructors, artefact } from '../core/library.js';
import { mergeOver, addStrings, pushUnique } from '../core/utilities.js';

import { makeCoordinate } from './coordinate.js';

import baseMix from '../mixin/base.js';
import positionMix from '../mixin/position.js';
import anchorMix from '../mixin/anchor.js';
import entityMix from '../mixin/entity.js';
import shapeMix from '../mixin/shapeBasic.js';
import curveMix from '../mixin/shapeCurve.js';
import filterMix from '../mixin/filter.js';


// #### Quadratic constructor
const Quadratic = function (items = {}) {

    this.control = makeCoordinate();
    this.currentControl = makeCoordinate();
    this.controlLockTo = 'coord';

    this.curveInit(items);
    this.shapeInit(items);

    this.dirtyControl = true;

    return this;
};


// #### Quadratic prototype
let P = Quadratic.prototype = Object.create(Object.prototype);
P.type = 'Quadratic';
P.lib = 'entity';
P.isArtefact = true;
P.isAsset = false;


// #### Mixins
P = baseMix(P);
P = positionMix(P);
P = anchorMix(P);
P = entityMix(P);
P = shapeMix(P);
P = curveMix(P);
P = filterMix(P);


// #### Quadratic attributes
let defaultAttributes = {

    control: null,
    currentControl: null,

    controlPivot: '',
    controlPivotCorner: '',
    addControlPivotHandle: false,
    addControlPivotOffset: false,
    controlPath: '',
    controlPathPosition: 0,
    addControlPathHandle: false,
    addControlPathOffset: true,
    controlLockTo: '',
};
P.defs = mergeOver(P.defs, defaultAttributes);


// #### Packet management
P.packetExclusions = pushUnique(P.packetExclusions, []);
P.packetExclusionsByRegex = pushUnique(P.packetExclusionsByRegex, []);
P.packetCoordinates = pushUnique(P.packetCoordinates, ['control']);
P.packetObjects = pushUnique(P.packetObjects, ['controlPivot', 'controlPath']);
P.packetFunctions = pushUnique(P.packetFunctions, []);


// #### Clone management
// No additional clone functionality required


// #### Kill management
// No additional kill functionality required


// #### Get, Set, deltaSet
let G = P.getters,
    S = P.setters,
    D = P.deltaSetters;

// __controlPivot__
S.controlPivot = function (item) {

    this.setControlHelper(item, 'controlPivot', 'control');
    this.updateDirty();
    this.dirtyControl = true;
};

// __controlPath__
S.controlPath = function (item) {

    this.setControlHelper(item, 'controlPath', 'control');
    this.updateDirty();
    this.dirtyControl = true;
};

// __control__
// + pseudo-attributes __controlX__, __controlY__
S.controlX = function (coord) {

    if (coord != null) {

        this.control[0] = coord;
        this.updateDirty();
        this.dirtyControl = true;
    }
};
S.controlY = function (coord) {

    if (coord != null) {

        this.control[1] = coord;
        this.updateDirty();
        this.dirtyControl = true;
    }
};
S.control = function (x, y) {

    this.setCoordinateHelper('control', x, y);
    this.updateDirty();
    this.dirtyControl = true;
};
D.controlX = function (coord) {

    let c = this.control;
    c[0] = addStrings(c[0], coord);
    this.updateDirty();
    this.dirtyControl = true;
};
D.controlY = function (coord) {

    let c = this.control;
    c[1] = addStrings(c[1], coord);
    this.updateDirty();
    this.dirtyControl = true;
};
D.control = function (x, y) {

    this.setDeltaCoordinateHelper('control', x, y);
    this.updateDirty();
    this.dirtyControl = true;
};

// __controlLockTo__
S.controlLockTo = function (item) {

    this.controlLockTo = item;
    this.updateDirty();
    this.dirtyControlLock = true;
};


// #### Prototype functions

// `cleanSpecies` - internal helper function - called by `prepareStamp`
P.cleanSpecies = function () {

    this.dirtySpecies = false;

    let p = 'M0,0';

    p = this.makeQuadraticPath();
    
    this.pathDefinition = p;
};

// `makeQuadraticPath` - internal helper function - called by `cleanSpecies`
P.makeQuadraticPath = function () {
    
    let [startX, startY] = this.currentStampPosition;
    let [controlX, controlY] = this.currentControl;
    let [endX, endY] = this.currentEnd;

    return `m0,0q${(controlX - startX)},${(controlY - startY)} ${(endX - startX)},${(endY - startY)}`;
};


// #### Factories

// ##### makeQuadratic
// Accepts argument with attributes:
// + __start__ (___startX___, ___startY___) Coordinate, or __pivot__/__mimic__/__path__ reference artefact (required)
// + __control__ (___controlX___, ___controlY___) Coordinate, or __controlPivot__/__controlPath__ reference artefact (required) 
// + __end__ (___endX___, ___endY___) Coordinate, or __endPivot__/__endPath__ reference artefact (required) 
// + If using reference artefacts, may also need to set the __lockTo__ (___lockXTo___, ___lockYTo___), __controlLockTo__ and __endLockTo__ lock attributes
// + additional reference-linked attributes for the `control` coordinate: __controlPivotCorner__, __addControlPivotHandle__, __addControlPivotOffset__, __controlPathPosition__, __addControlPathHandle__, __addControlPathOffset__
// + additional reference-linked attributes for the `end` coordinate: __endPivotCorner__, __addEndPivotHandle__, __addEndPivotOffset__, __endPathPosition__, __addEndPathHandle__, __addEndPathOffset__
//
// ```
// scrawl.makeQuadratic({
//
//     name: 'my-quadratic',
//
//     startX: '5%',
//     startY: '26.5%',
//
//     controlX: '50%',
//     controlY: '18%',
//
//     endX: '95%',
//     endY: '26.5%',
//
//     handleY: 'center',
//
//     lineWidth: 3,
//     lineCap: 'round',
//     strokeStyle: 'darkseagreen',
//
//     method: 'draw',
// });
// ```
const makeQuadratic = function (items = {}) {

    items.species = 'quadratic';
    return new Quadratic(items);
};

constructors.Quadratic = Quadratic;


// #### Exports
export {
    makeQuadratic,
};
