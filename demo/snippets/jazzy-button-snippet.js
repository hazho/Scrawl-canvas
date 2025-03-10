// # Demo Snippets 001
// Scrawl-canvas DOM element snippets
//
// Related files:
// + [DOM element snippets - main module](../snippets-001.html)
// + [Spotlight text snippet](./spotlight-text-snippet.html)
// + [Jazzy button snippet](./jazzy-button-snippet.html)
// + [Page performance snippet](./page-performance-snippet.html)
//
// ### 'Jazzy button' snippet
// __Purpose:__ display the number of times a user has clicked on a button element; animate the text and its line when the user clicks on the button.
//
// __Function input:__ a &lt;button> element, or any other block-displayed DOM element containing no child elements.
//
// __Function output:__ 
// ```
// {
//     element           // wrapper
//     canvas            // wrapper
//     animation         // object
//     demolish          // function
//
//     artefacts {
//         trackLine     // Shape entity
//         label         // Phrase entity
//     }
//
//     assets {
//         lineGradient  // Gradient wrapper
//     }
//
//     functions {
//         setClickText  // increase the number of clicks recorded on the button
//         textTween     // Tween animation function
//         gradientTween // Tween animation function
//     }
// }
// ```
// ##### Usage example:
// ```
// import jazzyButton from './relative/or/absolute/path/to/this/file.js';
//
// let myElements = document.querySelectorAll('.some-class');
//
// myElements.forEach(el => jazzyButton(el));
// ```

// Import the Scrawl-canvas object 
// + there's various ways to do this. See [Demo DOM-001](../dom-001.html) for more details
import * as scrawl from '../../source/scrawl.js';

// Get Scrawl-canvas to recognise and act on device pixel ratios greater than 1
scrawl.setIgnorePixelRatio(false);


// __Effects on the element:__ 
// + The DOM element will appear to have a light gray background
export default function (el) {

    // Apply the snippet to the DOM element
    let snippet = scrawl.makeSnippet({
        domElement: el,
    });

    if (snippet) {

        // Set some convenience variables
        let canvas = snippet.canvas;
        canvas.setAsCurrentCanvas();

        let wrapper = snippet.element,
            name = wrapper.name,
            styles = wrapper.elementComputedStyles;

        // The snippet will take details of its font family, size and color from the DOM element's computed styles
        // + Note that Firefox does not supply a font string; font details are broken up into their constituent parts and need to be reconstructed. The code below will not pick up bold fonts:
        let color = styles.color || 'black',
            font = styles.font || `${(styles.fontStyle != 'normal') ? styles.fontStyle + ' ' : ''}${(styles.fontVariant != 'normal') ? styles.fontVariant + ' ' : ''}${styles.fontSize} ${styles.fontFamily}` || '20px sans-serif';

        canvas.set({
            backgroundColor: '#f2f2f2',
        })

        // define the text we'll be displaying in the button
        let counter = 0;
        let setClickText = () => (counter === 1) ? `${counter} click` : `${counter} clicks`;

        // A path for the text to animate along, together with a gradient for its strokeStyle
        let lineGradient = scrawl.makeGradient({
            name: `${name}-gradient`,
            endX: '100%',
            cyclePalette: true
        })
        .updateColor(0, 'blue')
        .updateColor(650, 'green')
        .updateColor(700, 'gold')
        .updateColor(750, 'green')
        .updateColor(999, 'blue');

        let trackLine = scrawl.makeLine({

            name: `${name}-line`,
            startX: 20,
            endX: '95%',
            startY: '70%',
            endY: '70%',

            lineWidth: 6,
            lineCap: 'round',
            method: 'draw',

            strokeStyle: lineGradient,
            lockStrokeStyleToEntity: true,

            globalAlpha: 0.5,

            useAsPath: true,
        });

        // The phrase entity that will display the text
        let label = scrawl.makePhrase({

            name: `${wrapper.name}-label`,

            text: `Hello - ${setClickText()}`,

            // Use the font set on the DOM element via CSS
            font,
            fillStyle: color,

            handleY: '68%',

            textPath: `${name}-line`,
            textPathPosition: 0,
            textPathLoop: false,
        });

        // Animate the phrase entity along the line when button element is clicked
        let textTween = scrawl.makeTween({
            name: `${name}-textTween`,
            duration: 2500,
            targets: label,
            definitions: [
                {
                    attribute: 'textPathPosition',
                    start: 1,
                    end: 0,
                    engine: 'easeIn'
                },
                {
                    attribute: 'globalAlpha',
                    start: 0,
                    end: 1,
                    engine: 'easeIn'
                }
            ]
        });

        // Animate the gradient for the Line the text moves along
        let gradientTween = scrawl.makeTween({
            name: `${name}-gradientTween`,
            targets: lineGradient,
            duration: 2500,
            definitions: [
                {
                    attribute: 'paletteStart',
                    integer: true,
                    start: 699,
                    end: 0,
                    engine: 'easeOut'
                }, {
                    attribute: 'paletteEnd',
                    integer: true,
                    start: 700,
                    end: 999,
                    engine: 'easeOut'
                }
            ]
        });

        let clickAction = (e) => {

            // Increase the local counter; update the Phrase entity with new text
            counter++;

            label.set({
                text: `Hello - ${setClickText()}`,
            });

            // Both tweens need to halt and restart if user clicks on them while they are running
            if (textTween.isRunning()) {
                textTween.halt();
                textTween.seekTo(0);
            }
            textTween.run();

            if (gradientTween.isRunning()) {
                gradientTween.halt();
                gradientTween.seekTo(0);
            }
            gradientTween.run();
        }
        scrawl.addNativeListener('click', clickAction, el);

        snippet.artefacts = {
            trackLine: trackLine,
            label: label,
        };

        snippet.assets = {
            lineGradient: lineGradient,
        };

        snippet.functions = {
            setClickText: setClickText,
            textTween: textTween,
            gradientTween: gradientTween,
        };
    }
    return snippet;
};
