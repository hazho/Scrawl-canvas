// # Shape-basic mixin
// This mixin defines the key attributes and functionality for all Scrawl-canvas __path-defined entitys__. 

// #### Imports
import { radian } from '../core/library.js';
import { mergeOver, xt, defaultNonReturnFunction, pushUnique } from '../core/utilities.js';

import { requestVector, releaseVector } from '../factory/vector.js';

import calculatePath from './shapePathCalculation.js';


// #### Export function
export default function (P = {}) {


// #### Shared attributes
    let defaultAttributes = {

        species: '',
        useAsPath: false,
        precision: 10,

        pathDefinition: '',

        showBoundingBox: false,
        boundingBoxColor: 'rgba(0,0,0,0.5)',
        minimumBoundingBoxDimensions: 20,
    };
    P.defs = mergeOver(P.defs, defaultAttributes);


// #### Packet management
    P.packetExclusions = pushUnique(P.packetExclusions, ['dimensions', 'pathed']);
    P.packetExclusionsByRegex = pushUnique(P.packetExclusionsByRegex, []);
    P.packetCoordinates = pushUnique(P.packetCoordinates, []);
    P.packetObjects = pushUnique(P.packetObjects, []);
    P.packetFunctions = pushUnique(P.packetFunctions, []);

    P.finalizePacketOut = function (copy, items) {

        let stateCopy = JSON.parse(this.state.saveAsPacket(items))[3];
        copy = mergeOver(copy, stateCopy);

        copy = this.handlePacketAnchor(copy, items);

        return copy;
    };


// #### Clone management
// No additional clone functionality defined here


// #### Kill management
// No additional kill functionality defined here


// #### Get, Set, deltaSet
    let G = P.getters,
        S = P.setters,
        D = P.deltaSetters;

    S.species = function (item) {

        if (xt(item)) {

            if (item) this.dirtyPathObject = true;

            this.species = item;
            this.dirtySpecies = true;
            this.dirtyPathObject = true;
        }
    };

    // Invalidate __dimensions__ setters - dimensions are an emergent property of shapes, not a defining property
    S.width = defaultNonReturnFunction;
    S.height = defaultNonReturnFunction;
    S.dimensions = defaultNonReturnFunction;
    D.width = defaultNonReturnFunction;
    D.height = defaultNonReturnFunction;
    D.dimensions = defaultNonReturnFunction;

    // __pathDefinition__
    S.pathDefinition = function (item) {

        if (item.substring) this.pathDefinition = item;
        this.dirtyPathObject = true;
    };


// #### Prototype functions

    // `updateDirty` - internal setter helper function
    P.updateDirty = function () {

        this.dirtySpecies = true;
        this.dirtyPathObject = true;
    };

    // `midInitActions` - internal constructor helper function
    P.midInitActions = function (items) {

        this.set(items);
    };

    // `shapeInit` - internal constructor helper function
    P.shapeInit = function (items) {

        this.entityInit(items);

        this.units = [];
        this.unitLengths = [];
        this.unitPartials = [];

        this.pathed = [];

        this.localBox = [];
    };


// #### Path-related functionality

    // `positionPointOnPath`
    P.positionPointOnPath = function (vals) {

        let v = requestVector(vals);

        v.vectorSubtract(this.currentStampHandlePosition);

        if(this.flipReverse) v.x = -v.x;
        if(this.flipUpend) v.y = -v.y;

        v.rotate(this.roll);

        v.vectorAdd(this.currentStampPosition);

        let res = {
            x: v.x,
            y: v.y
        }

        releaseVector(v);

        return res;
    };

    // `getBezierXY`
    P.getBezierXY = function (t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {

        let T = 1 - t;

        return {
            x: (Math.pow(T, 3) * sx) + (3 * t * Math.pow(T, 2) * cp1x) + (3 * t * t * T * cp2x) + (t * t * t * ex),
            y: (Math.pow(T, 3) * sy) + (3 * t * Math.pow(T, 2) * cp1y) + (3 * t * t * T * cp2y) + (t * t * t * ey)
        };
    };

    // `getQuadraticXY`
    P.getQuadraticXY = function (t, sx, sy, cp1x, cp1y, ex, ey) {

        let T = 1 - t;

        return {
            x: T * T * sx + 2 * T * t * cp1x + t * t * ex,
            y: T * T * sy + 2 * T * t * cp1y + t * t * ey
        };
    };

    // `getLinearXY`
    P.getLinearXY = function (t, sx, sy, ex, ey) {

        return {
            x: sx + ((ex - sx) * t),
            y: sy + ((ey - sy) * t)
        };
    };

    // `getBezierAngle`
    P.getBezierAngle = function (t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {

        let T = 1 - t,
            dx = Math.pow(T, 2) * (cp1x - sx) + 2 * t * T * (cp2x - cp1x) + t * t * (ex - cp2x),
            dy = Math.pow(T, 2) * (cp1y - sy) + 2 * t * T * (cp2y - cp1y) + t * t * (ey - cp2y);

        return (-Math.atan2(dx, dy) + (0.5 * Math.PI)) / radian;
    };

    // `getQuadraticAngle`
    P.getQuadraticAngle = function (t, sx, sy, cp1x, cp1y, ex, ey) {

        let T = 1 - t,
            dx = 2 * T * (cp1x - sx) + 2 * t * (ex - cp1x),
            dy = 2 * T * (cp1y - sy) + 2 * t * (ey - cp1y);

        return (-Math.atan2(dx, dy) + (0.5 * Math.PI)) / radian;
    };

    // `getLinearAngle`
    P.getLinearAngle = function (t, sx, sy, ex, ey) {

        let dx = ex - sx,
            dy = ey - sy;

        return (-Math.atan2(dx, dy) + (0.5 * Math.PI)) / radian;
    };

    // `getPathPositionData`
    P.getPathPositionData = function (pos) {

        if (xt(pos) && pos.toFixed) {

            let remainder = pos % 1,
                unitPartials = this.unitPartials,
                previousLen = 0, 
                stoppingLen, myLen, i, iz, unit, species;

            // ... because sometimes everything doesn't all add up to 1
            if (pos === 0) remainder = 0;
            else if (pos === 1) remainder = 0.9999;

            // 1. Determine the pertinent subpath to use for calculation
            for (i = 0, iz = unitPartials.length; i < iz; i++) {

                species = this.units[i][0];
                if (species === 'move' || species === 'close' || species === 'unknown') continue;

                stoppingLen = unitPartials[i];

                if (remainder <= stoppingLen) {

                    // 2. Calculate point along the subpath the pos value represents
                    unit = this.units[i];
                    myLen = (remainder - previousLen) / (stoppingLen - previousLen);

                    break;
                }

                previousLen = stoppingLen;
            }

            // 3. Get coordinates and angle at that point from subpath; return results
            if (unit) {

                let [unitSpecies, ...vars] = unit;

                let myPoint, angle;

                switch (unitSpecies) {

                    case 'linear' :
                        myPoint = this.positionPointOnPath(this.getLinearXY(myLen, ...vars));
                        angle = this.getLinearAngle(myLen, ...vars);
                        break;

                    case 'quadratic' :
                        myPoint = this.positionPointOnPath(this.getQuadraticXY(myLen, ...vars));
                        angle = this.getQuadraticAngle(myLen, ...vars);
                        break;
                        
                    case 'bezier' :
                        myPoint = this.positionPointOnPath(this.getBezierXY(myLen, ...vars));
                        angle = this.getBezierAngle(myLen, ...vars);
                        break;
                }

                let flipAngle = 0
                if (this.flipReverse) flipAngle++;
                if (this.flipUpend) flipAngle++;

                if (flipAngle === 1) angle = -angle;

                angle += this.roll;

                myPoint.angle = angle;

                return myPoint;
            }
        }
        return false;
    }


    // #### Collision detection

    // `calculateSensors`
    P.calculateSensors = function () {

        let sensorSpacing = this.sensorSpacing || 50,
            length = this.length,
            segments = parseInt(length / sensorSpacing, 10),
            pos = 0,
            data, i, iz;

        if (segments < 4) segments = 4;

        let segmentLength = 1 / segments;

        let sensors = this.currentSensors;
        sensors.length = 0;

        data = this.getPathPositionData(0);
        sensors.push([data.x, data.y]);
        
        for (i = 0; i < segments; i++) {

            pos += segmentLength;
            data = this.getPathPositionData(pos);
            sensors.push([data.x, data.y]);
        }
    };



// #### Display cycle functionality

    // `prepareStamp` - the purpose of most of these actions is described in the [entity mixin function](http://localhost:8080/docs/source/mixin/entity.html#section-31) that this function overwrites
    P.prepareStamp = function() {

        if (this.dirtyHost) this.dirtyHost = false;

        if (this.dirtyScale || this.dirtySpecies || this.dirtyDimensions || this.dirtyStart || this.dirtyHandle) {

            this.dirtyPathObject = true;
            if (this.collides) this.dirtyCollision = true;

            if (this.dirtyScale || this.dirtySpecies)  this.pathCalculatedOnce = false;
       }

        if (this.isBeingDragged || this.lockTo.indexOf('mouse') >= 0) {

            this.dirtyStampPositions = true;
            if (this.collides) this.dirtyCollision = true;
        }

        if ((this.dirtyRotation || this.dirtyOffset) && this.collides) this.dirtyCollision = true;

        if (this.dirtyCollision && !this.useAsPath) {

            this.dirtyPathObject = true;
            this.pathCalculatedOnce = false;
        }

        if (this.dirtyScale) this.cleanScale();

        if (this.dirtyStart) this.cleanStart();

        if (this.dirtyOffset) this.cleanOffset();
        if (this.dirtyRotation) this.cleanRotation();

        if (this.dirtyStampPositions) this.cleanStampPositions();

        if (this.dirtySpecies) this.cleanSpecies();
        if (this.dirtyPathObject) this.cleanPathObject();

        if (this.dirtyPositionSubscribers) this.updatePositionSubscribers();
    };


    // `cleanDimensions` - internal helper function called by `prepareStamp` 
    // + Dimensional data has no meaning in the context of Shape entitys (beyond positioning handle Coordinates): width and height are emergent properties that cannot be set on the entity.
    P.cleanDimensions = function () {

        this.dirtyDimensions = false;

        this.dirtyStart = true;
        this.dirtyHandle = true;
        this.dirtyOffset = true;
    };

    // `cleanPathObject` - internal helper function - called by `prepareStamp`
    P.cleanPathObject = function () {

        this.dirtyPathObject = false;

        if (!this.noPathUpdates || !this.pathObject) {

            this.calculateLocalPath(this.pathDefinition);
            this.cleanStampPositionsAdditionalActions();

            if (this.dirtyDimensions) this.cleanDimensions();
            if (this.dirtyHandle) this.cleanHandle();
            if (this.dirtyStampHandlePositions) this.cleanStampHandlePositions();

            let handle = this.currentStampHandlePosition;

            this.pathObject = new Path2D(`m${-handle[0]},${-handle[1]}${this.localPath}`);
        }
    };

    // `calculateLocalPath` - internal helper function - called by `cleanPathObject`
    P.calculateLocalPath = function (d, isCalledFromAdditionalAcctions) {

        let res;

        if (this.collides) this.useAsPath = true;

        if (!this.pathCalculatedOnce) {

            res = calculatePath(d, this.currentScale, this.currentStart, this.useAsPath, this.precision);
            this.pathCalculatedOnce = true;
        }

        if (res) {

            this.localPath = res.localPath;
            this.units = res.units;
            this.unitLengths = res.unitLengths;
            this.unitPartials = res.unitPartials;
            this.length = res.length;

            let maxX = res.maxX,
                maxY = res.maxY,
                minX = res.minX,
                minY = res.minY;

            let dims = this.dimensions,
                currentDims = this.currentDimensions,
                box = this.localBox;

            dims[0] = parseFloat((maxX - minX).toFixed(1));
            dims[1] = parseFloat((maxY - minY).toFixed(1));
            
            if(dims[0] !== currentDims[0] || dims[1] !== currentDims[1]) {

                currentDims[0] = dims[0];
                currentDims[1] = dims[1];
                this.dirtyHandle = true;
            }


            box.length = 0;
            box.push(parseFloat(minX.toFixed(1)), parseFloat(minY.toFixed(1)), dims[0], dims[1]);

            if (!isCalledFromAdditionalAcctions) this.calculateLocalPathAdditionalActions();
        }
    };
    P.calculateLocalPathAdditionalActions = defaultNonReturnFunction;

    // `cleanStampPositionsAdditionalActions` - internal helper function - called by `cleanPathObject`
    P.cleanStampPositionsAdditionalActions = function () {

        if (this.path && this.lockTo.indexOf('path') >= 0) {

            this.dirtyStampPositions = true;
            this.dirtyStampHandlePositions = true;
        }
    };

// #### Stamp methods
// All actual drawing is achieved using the entity's pre-calculated [Path2D object](https://developer.mozilla.org/en-US/docs/Web/API/Path2D).

    // `draw`
    P.draw = function (engine) {

        engine.stroke(this.pathObject);
        if (this.showBoundingBox) this.drawBoundingBox(engine);
    },

    // `fill`
    P.fill = function (engine) {

        engine.fill(this.pathObject, this.winding);
        if (this.showBoundingBox) this.drawBoundingBox(engine);
    },

    // `drawAndFill`
    P.drawAndFill = function (engine) {

        let p = this.pathObject;

        engine.stroke(p);
        this.currentHost.clearShadow();
        engine.fill(p, this.winding);
        if (this.showBoundingBox) this.drawBoundingBox(engine);
    },

    // `fillAndDraw`
    P.fillAndDraw = function (engine) {

        let p = this.pathObject;

        engine.stroke(p);
        this.currentHost.clearShadow();
        engine.fill(p, this.winding);
        engine.stroke(p);
        if (this.showBoundingBox) this.drawBoundingBox(engine);
    },

    // `drawThenFill`
    P.drawThenFill = function (engine) {

        let p = this.pathObject;

        engine.stroke(p);
        engine.fill(p, this.winding);
        if (this.showBoundingBox) this.drawBoundingBox(engine);
    },

    // `fillThenDraw`
    P.fillThenDraw = function (engine) {

        let p = this.pathObject;

        engine.fill(p, this.winding);
        engine.stroke(p);
        if (this.showBoundingBox) this.drawBoundingBox(engine);
    },

    // `clear`
    P.clear = function (engine) {

        let gco = engine.globalCompositeOperation;

        engine.globalCompositeOperation = 'destination-out';
        engine.fill(this.pathObject, this.winding);
        
        engine.globalCompositeOperation = gco;

        if (this.showBoundingBox) this.drawBoundingBox(engine);
    },    

    // `drawBoundingBox`
    P.drawBoundingBox = function (engine) {

        engine.save();

        engine.strokeStyle = this.boundingBoxColor;
        engine.lineWidth = 1;
        engine.globalCompositeOperation = 'source-over';
        engine.globalAlpha = 1;
        engine.shadowOffsetX = 0;
        engine.shadowOffsetY = 0;
        engine.shadowBlur = 0;

        engine.strokeRect(...this.getBoundingBox());

        engine.restore();
    };

    // `getBoundingBox`
    P.getBoundingBox = function () {

        let floor = Math.floor,
            ceil = Math.ceil,
            minDims = this.minimumBoundingBoxDimensions;

        let [x, y, w, h] = this.localBox;
        let [hX, hY] = this.currentStampHandlePosition;
        let [sX, sY] = this.currentStampPosition;

        // Pad out excessively thin widths and heights
        if (w < minDims) w = minDims;
        if (h < minDims) h = minDims;

        return [floor(x - hX), floor(y - hY), ceil(w), ceil(h), sX, sY];
    };

// Return the prototype
    return P;
};
