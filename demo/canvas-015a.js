// # Demo Canvas 015a 
// Phrase entity - cache output to improve render speeds

// [Run code](../../demo/canvas-015a.html)
import {
    createImageFromEntity,
    library as L,
    makeDragZone,
    makePhrase,
    makePicture,
    makeRender,
    setIgnorePixelRatio,
} from '../source/scrawl.js'

import { reportSpeed } from './utilities.js';

// Get Scrawl-canvas to recognise and act on device pixel ratios greater than 1
setIgnorePixelRatio(false);


// #### Scene setup
let canvas = L.artefact.mycanvas,
    entitys = L.entity;

canvas.set({
    backgroundColor: 'aliceblue',
    css: {
        border: '1px solid black'
    }
});


// Create and clone Phrase entitys
makePhrase({
    name: 'myphrase_fill',

    text: 'H&epsilon;lj&ouml;!',
    font: 'bold 40px Garamond, serif',

    startX: '14%',
    startY: '28%',
    handleX: 'center',
    handleY: 'center',

    fillStyle: 'green',
    strokeStyle: 'gold',

    lineWidth: 2,
    lineJoin: 'round',
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 2,
    shadowColor: 'black',

    lineHeight: 1,

}).clone({
    name: 'myphrase_draw',
    startX: '38%',
    method: 'draw',

}).clone({
    name: 'myphrase_drawAndFill',
    startX: '84%',
    method: 'drawAndFill',

}).clone({
    name: 'myphrase_fillAndDraw',
    startX: '62%',
    method: 'fillAndDraw',
    sharedState: true

}).clone({
    name: 'myphrase_drawThenFill',
    startX: '14%',
    startY: '67%',
    method: 'drawThenFill'

}).clone({
    name: 'myphrase_fillThenDraw',
    startX: '38%',
    method: 'fillThenDraw',

}).clone({
    name: 'myphrase_clear',
    startX: '62%',
    method: 'clear'

}).clone({
    name: 'myphrase_multiline',

    text: 'Lorem ipsum har varit standard ända sedan 1500-talet, när-en-okänd-boksättare-tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok.',

    width: 120,
    justify: 'center',

    size: '12px',
    weight: 'normal',

    startX: '84%',
    method: 'fill',

    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
});


// Change the fill and stroke styles on one of the phrase entitys, and any entity sharing that phrase's state
L.artefact.myphrase_fillAndDraw.set({
    fillStyle: 'blue',
    strokeStyle: 'coral'
});


// #### Caching entity output
// A one-off instruction to tell Scrawl-canvas to create image assets from our Phrase entitys the next time it performs a Display cycle
// + By caching entity output in &lt;img> elements, we can then replace the Phrase entitys with Picture entitys that use the cached image as their asset source. As graphic text output is an expensive operation for the canvas element to perform - particularly when we apply a shadow blur to the text - it will often make sense to replace such Phrase entitys with Picture entitys.
// + This approach is less useful for text that updates frequently, or uses dynamic fill/stroke styling
createImageFromEntity(entitys.myphrase_fill, true);
createImageFromEntity(entitys.myphrase_draw, true);
createImageFromEntity(entitys.myphrase_drawAndFill, true);
createImageFromEntity(entitys.myphrase_fillAndDraw, true);
createImageFromEntity(entitys.myphrase_drawThenFill, true);
createImageFromEntity(entitys.myphrase_fillThenDraw, true);
createImageFromEntity(entitys.myphrase_clear, true);
createImageFromEntity(entitys.myphrase_multiline, true);


// #### User interaction
// Create the drag-and-drop zone
let current = makeDragZone({

    zone: canvas,
    endOn: ['up', 'leave'],
    exposeCurrentArtefact: true,
    preventTouchDefaultWhenDragging: true,
});


// #### Scene animation
// Function to display frames-per-second data, and other information relevant to the demo
const report = reportSpeed('#reportmessage', function () {
    const dragging = current();
    return `Currently dragging: ${(typeof dragging !== 'boolean' && dragging) ? dragging.artefact.name : 'nothing'}`;
});


// Create the Display cycle animation
makeRender({

    name: 'demo-animation',
    target: canvas,
    afterShow: report,

    // #### Caching (continued)
    // After the first iteration of the Display cycle, we can create Picture entitys to replace our Phrase entitys
    // + As the content and display of the text does not change (only their positions change when users drag-and-drop them), we can treat the creation of the cache images and associated entitys as a one-off job
    afterCreated: () => {

        let g = L.group[canvas.base.name];

        // Switch off the Phrase entitys via a set call to their Group (which, in this instance is the canvas.base Cell's default Group)
        g.setArtefacts({
            visibility: false,
        });

        let keys = g.artefacts;

        // Generate Picture entitys, using the existing Phrase entitys for positional and dimensional data
        keys.forEach(name => {

            let e = entitys[name];

            if (e) {

                makePicture({

                    name: `${name}-cached`,

                    start: e.get('start'),
                    handle: e.get('handle'),
                    dimensions: e.get('dimensions'),

                    asset: `${name}-image`,
                    copyDimensions: ['100%', '100%'],

                    strokeStyle: 'red',
                    method: 'fillThenDraw',
                });
            }
        });
    },
});


// #### Development and testing
console.log(L);
