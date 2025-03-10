// # Demo Tensorflow 001
// Tensorflow tfjs-models / body-pix experiment - follow my eyes

// [Run code](../../demo/tensorflow-001.html)
import * as scrawl from '../source/scrawl.js';

import { reportSpeed } from './utilities.js';

// Get Scrawl-canvas to recognise and act on device pixel ratios greater than 1
scrawl.setIgnorePixelRatio(false);


// #### Scene setup
const canvas = scrawl.library.artefact.mycanvas;


// #### TensorFlow functionality
// We'll handle everything in a raw asset object, which a Picture entity can then use as its source
let myAsset = scrawl.makeRawAsset({

    name: 'tensorflow-model-interpreter',

    userAttributes: [{

        // We're only interested in the metadata generated by the tensorflow model in this demo
        key: 'parts', 
        defaultValue: {},
        setter: function (item) {

            if (item && item.allPoses && item.allPoses.length) {

// @ts-expect-error
                const { parts, leftEyeX, leftEyeY, leftEye, rightEyeX, rightEyeY, rightEye, wobbleDamper } = this;

                let segs = item.allPoses[0];

                segs.keypoints.forEach(s => parts[s.part] = s.position);

                if (parts.leftEye != null) {

                    this.dirtyData = true;

                    let eye = parts.leftEye;

                    if (leftEyeX.length > wobbleDamper) leftEyeX.shift();
                    if (leftEyeY.length > wobbleDamper) leftEyeY.shift();

                    leftEyeX.push(eye.x);
                    leftEyeY.push(eye.y);

                    leftEye[0] = Math.round(leftEyeX.reduce((a, v) => a + v, 0) / leftEyeX.length);
                    leftEye[1] = Math.round(leftEyeY.reduce((a, v) => a + v, 0) / leftEyeY.length);
                }

                if (parts.rightEye != null) {

                    this.dirtyData = true;

                    let eye = parts.rightEye;

                    if (rightEyeX.length > wobbleDamper) rightEyeX.shift();
                    if (rightEyeY.length > wobbleDamper) rightEyeY.shift();

                    rightEyeX.push(eye.x);
                    rightEyeY.push(eye.y);

                    rightEye[0] = Math.round(rightEyeX.reduce((a, v) => a + v, 0) / rightEyeX.length);
                    rightEye[1] = Math.round(rightEyeY.reduce((a, v) => a + v, 0) / rightEyeY.length);
                }
            }

            // We can also check for image dimensions as that info is also passed on by the model output
            if (item && item.width && item.height) {

                if (this.canvasWidth !== item.width) {

                    this.canvasWidth = item.width;
                    this.dirtyData = true;
                }

                if (this.canvasHeight !== item.height) {

                    this.canvasHeight = item.height;
                    this.dirtyData = true;
                }
            }
        },
    },{
        key: 'leftEyeX', 
        defaultValue: [],
        setter: () => {},
    },{
        key: 'leftEyeY', 
        defaultValue: [],
        setter: () => {},
    },{
        key: 'rightEyeX', 
        defaultValue: [],
        setter: () => {},
    },{
        key: 'rightEyeY', 
        defaultValue: [],
        setter: () => {},
    },{
        key: 'wobbleDamper', 
        defaultValue: 2,
    },{
        key: 'leftEye', 
        defaultValue: [0, 0],
        setter: () => {},
    },{
        key: 'rightEye', 
        defaultValue: [0, 0],
        setter: () => {},
    },{
        key: 'canvasWidth', 
        defaultValue: 0,
        setter: () => {},
    },{
        key: 'canvasHeight', 
        defaultValue: 0,
        setter: () => {},
    }],

    // `assetWrapper` is the same as `this` when function is declared with the function keyword
    updateSource: function (assetWrapper) {

        const { element, engine, leftEye, rightEye, canvasWidth, canvasHeight } = assetWrapper;
        const end = 2 * Math.PI;

        // Clear the canvas, resizing it if required
        element.width = canvasWidth;
        element.height = canvasHeight;

        // Draw our filled circles onto the canvas
        engine.globalAlpha = 0.5;

        engine.fillStyle = 'red';
        engine.beginPath();
        engine.arc(...leftEye, 50, 0, end);
        engine.fill();
        
        engine.fillStyle = 'orange';
        engine.beginPath();
        engine.arc(...rightEye, 50, 0, end);
        engine.fill();
    },
});

// The forever loop function, which captures the tensorflow model's output and passes it on to our raw asset for processing
const perform = function (net) {

    net.segmentPerson(video.source)
    .then(parts => {

        myAsset.set({parts});
        perform(net);
    })
    .catch(e => console.log(e));
};


// ##### Import and use livestream
// convenience handle for the media stream asset 
let video;

// Capture the media stream
scrawl.importMediaStream({
    name: 'device-camera',
    audio: false,
})
.then(mycamera => {

    video = mycamera;

    // This fixes the issue in Firefox where the media stream will crash Tensorflow if the stream's video element's dimensions have not been set
// @ts-expect-error
    video.source.width = "1280";
// @ts-expect-error
    video.source.height = "720";

    // Take the media stream and display it in our canvas element
    scrawl.makePicture({

        name: 'mediastream-video',
        asset: mycamera.name,

        width: '100%',
        height: '100%',

        copyWidth: '100%',
        copyHeight: '100%',
    });

    // Start the TensorFlow model
// @ts-expect-error
    bodyPix.load()
    .then (net => {

        // Display the visual generated by our raw asset
        scrawl.makePicture({

            name: 'tensorflow-data-output',
            asset: 'tensorflow-model-interpreter',
            order: 1,

            dimensions: ['100%', '100%'],
            copyDimensions: ['100%', '100%'],
        });

        // Invoke the forever loop
        perform(net);
    })
    .catch(e => console.log('ERROR: ', e));
})
.catch(err => console.log(err.message));


// #### Scene animation
// Function to display frames-per-second data, and other information relevant to the demo
const report = reportSpeed('#reportmessage');


// Create the Display cycle animation
scrawl.makeRender({

    name: 'demo-animation',
    target: canvas,
    afterShow: report,
});

console.log(scrawl.library);
