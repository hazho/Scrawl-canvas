import scrawl from '../source/scrawl.js'
scrawl.setScrawlPath('/source');


// Scene setup
let canvas = scrawl.library.artefact.mycanvas;

scrawl.library.canvas.mycanvas.set({
	backgroundColor: 'lightgray',
	css: {
		border: '1px solid black'
	}
});


// Japan outline
scrawl.makeShape({
	name: 'japan_fill',

	startX: 50,
	startY: 20,

	fillStyle: 'green',
	strokeStyle: 'gold',

	lineWidth: 2,
	lineJoin: 'round',
	shadowOffsetX: 2,
	shadowOffsetY: 2,
	shadowBlur: 2,
	shadowColor: 'black',

	scale: 0.2,
	scaleOutline: false,

	showBoundingBox: true,
	boundingBoxColor: 'black',

	// svg outline of Japan from this source:
	// https://silhouettegarden.com/download/japan-silhouette/
	pathDefinition: `M96.947,642.362c0.029,0.929,1.348,0.51,2.576,0.03c1.229-0.479,2.368-1.019,3.207-1.079c0.838-0.06,1.378,0.359,1.677-0.06
	s0.36-1.678,0.959-2.517c0.599-0.839,1.738-1.259,2.517-1.798s1.198-1.198,0.869-2.008c-0.33-0.809-1.408-1.767-1.468-2.756
	c-0.06-0.988,0.899-2.008,1.887-2.157c0.989-0.149,2.008,0.569,2.787,0.989c0.779,0.419,1.318,0.539,1.947,0.539
	c0.629,0,1.348-0.12,2.337-1.708s2.247-4.644,3.057-6.861c0.809-2.217,1.168-3.595,1.108-4.674c-0.06-1.078-0.539-1.857-0.539-3.115
	c0-1.259,0.479-2.996,1.648-5.603c1.168-2.606,3.026-6.082,4.284-8.809c1.259-2.727,1.918-4.704,2.427-6.232
	c0.509-1.527,0.869-2.606,1.558-3.745c0.688-1.138,1.708-2.336,2.757-3.385c1.048-1.049,2.126-1.947,3.146-2.847
	c1.019-0.898,1.977-1.798,2.517-2.696c0.539-0.898,0.659-1.798,0.09-2.576c-0.57-0.779-1.828-1.438-1.738-2.367
	s1.528-2.127,1.498-2.757c-0.029-0.629-1.528-0.688-2.486-1.168s-1.378-1.378-1.318-2.367c0.06-0.988,0.599-2.067,0.21-2.396
	c-0.39-0.33-1.708,0.09-3.625-0.24c-1.917-0.329-4.434-1.407-5.183-2.156c-0.749-0.75,0.27-1.169,1.438-1.738
	c1.168-0.569,2.486-1.288,3.385-2.696c0.899-1.408,1.379-3.506,1.229-5.244c-0.149-1.737-0.929-3.115-2.307-3.805
	c-1.378-0.689-3.355-0.689-4.523-0.03c-1.169,0.659-1.528,1.978-2.427,2.727s-2.336,0.929-3.984,0.779
	c-1.648-0.15-3.505-0.63-4.704-1.349c-1.198-0.719-1.738-1.678-2.217-3.535c-0.479-1.857-0.899-4.614-1.139-6.292
	s-0.3-2.277-0.839-2.187c-0.539,0.09-1.558,0.869-2.606,0.898c-1.049,0.03-2.127-0.688-3.146-0.839
	c-1.02-0.15-1.978,0.27-3.176,0.659c-1.199,0.39-2.637,0.749-3.595,1.378c-0.959,0.63-1.438,1.528-1.828,2.337
	c-0.39,0.81-0.689,1.528-1.228,2.098c-0.54,0.568-1.319,0.988-1.408,1.468c-0.09,0.479,0.509,1.019,0.629,1.618
	c0.12,0.599-0.24,1.258-1.288,1.078c-1.049-0.18-2.787-1.198-3.985-1.348c-1.198-0.15-1.858,0.569-2.367,1.468
	s-0.869,1.978-1.468,2.786c-0.599,0.81-1.438,1.349-2.037,1.109c-0.599-0.24-0.959-1.259-1.738-1.889
	c-0.779-0.629-1.978-0.868-2.846-0.509s-1.408,1.318-1.798,2.037c-0.389,0.719-0.629,1.198-0.359,1.798
	c0.27,0.599,1.048,1.318,1.258,1.978s-0.15,1.258-0.958,1.078c-0.809-0.18-2.068-1.139-3.296-1.498
	c-1.228-0.359-2.426-0.119-3.085,0.39c-0.659,0.51-0.779,1.288-0.958,2.188c-0.18,0.898-0.42,1.917-0.18,2.606
	c0.24,0.688,0.958,1.048,1.558,1.768c0.599,0.719,1.079,1.797,2.067,2.517c0.988,0.719,2.487,1.078,3.715,1.647
	c1.229,0.569,2.187,1.349,2.666,2.487c0.48,1.138,0.48,2.637,0.18,3.625c-0.299,0.989-0.898,1.468-1.797,1.378
	s-2.097-0.749-2.936-1.678c-0.839-0.929-1.318-2.127-1.918-2.457c-0.599-0.329-1.318,0.21-1.528,1.349s0.09,2.876,0.209,4.584
	c0.12,1.708,0.06,3.386-0.419,5.123c-0.479,1.738-1.378,3.535-1.199,4.254c0.18,0.72,1.438,0.36,2.487-0.06
	c1.049-0.419,1.887-0.898,3.056-2.187c1.168-1.289,2.667-3.386,4.254-4.584s3.266-1.498,4.134-0.959s0.929,1.917,0.689,2.906
	c-0.24,0.988-0.779,1.588,0.299,1.768s3.775-0.06,5.003-1.408s0.989-3.805,0.12-5.423c-0.869-1.617-2.367-2.396-3.056-3.506
	c-0.689-1.107-0.569-2.546-0.27-4.074c0.299-1.527,0.779-3.146,1.528-3.775c0.749-0.629,1.768-0.27,2.846,0.569
	s2.217,2.157,2.667,3.476c0.449,1.318,0.209,2.637,1.198,4.015c0.989,1.379,3.206,2.816,4.105,4.135
	c0.898,1.318,0.479,2.517-0.39,3.386c-0.869,0.868-2.188,1.408-2.367,2.037s0.779,1.348,1.199,2.247
	c0.419,0.898,0.299,1.978-0.39,3.386s-1.948,3.146-3.235,4.974c-1.289,1.827-2.607,3.745-4.314,4.913
	c-1.708,1.169-3.805,1.588-4.974,2.427s-1.408,2.097-1.558,4.464c-0.15,2.367-0.21,5.843,0.539,7.82
	c0.749,1.977,2.307,2.456,3.056,3.445c0.749,0.988,0.689,2.486,0.149,3.924c-0.539,1.438-1.558,2.817-2.696,3.446
	c-1.138,0.629-2.397,0.509-2.876,1.378c-0.479,0.869-0.18,2.727,1.168,4.164c1.348,1.438,3.745,2.457,6.262,3.176
	c2.517,0.72,5.153,1.139,5.752,0.3s-0.839-2.936-1.558-4.974c-0.719-2.037-0.719-4.015,0-6.021c0.719-2.008,2.157-4.045,3.625-5.063
	c1.468-1.019,2.966-1.019,4.015-0.51c1.048,0.51,1.648,1.528,1.108,2.547s-2.217,2.038-3.266,3.236s-1.468,2.576-0.989,3.835
	c0.479,1.258,1.857,2.396,2.577,3.625c0.719,1.229,0.779,2.547,0.18,4.344C98.175,639.156,96.917,641.434,96.947,642.362
	L96.947,642.362z M538.224,164.09c-0.943,1.333-1.573,2.921-2.651,3.805s-2.606,1.063-3.7,0.854
	c-1.093-0.21-1.752-0.809-2.067-1.977c-0.313-1.168-0.284-2.907,0.285-4.18c0.569-1.273,1.678-2.083,2.966-2.847
	c1.289-0.764,2.757-1.483,3.206-2.307s-0.12-1.753-0.824-2.502s-1.543-1.318-1.393-1.782c0.149-0.464,1.288-0.824,2.322-1.199
	c1.033-0.375,1.962-0.764,2.486-1.483s0.644-1.768,1.093-2.322c0.45-0.555,1.229-0.614,1.979-1.408
	c0.748-0.794,1.468-2.322,2.067-3.476c0.599-1.153,1.078-1.933,2.187-2.801c1.108-0.869,2.847-1.827,4.149-2.951
	c1.304-1.123,2.172-2.412,2.517-3.835c0.345-1.423,0.165-2.98,0.509-3.895c0.345-0.914,1.214-1.184,2.173-0.644
	c0.958,0.539,2.007,1.887,3.341,2.412c1.333,0.524,2.951,0.224,4.748-1.109c1.798-1.333,3.775-3.7,5.528-5.333
	c1.752-1.633,3.28-2.532,4.449-2.756c1.168-0.225,1.977,0.225,2.427,1.108c0.449,0.884,0.539,2.202,0.449,3.535
	c-0.09,1.333-0.36,2.682-0.6,3.625c-0.239,0.943-0.449,1.483-1.737,2.097s-3.655,1.303-5.618,2.052
	c-1.962,0.749-3.52,1.558-4.823,2.442s-2.352,1.842-3.415,3.131c-1.064,1.289-2.143,2.906-3.057,4.254
	c-0.913,1.348-1.662,2.427-2.816,2.472c-1.153,0.045-2.711-0.944-3.835-1.079c-1.123-0.135-1.813,0.584-2.262,1.723
	s-0.659,2.696-1.153,3.82c-0.494,1.123-1.273,1.813-2.098,2.636c-0.823,0.824-1.692,1.783-2.262,2.876
	c-0.569,1.094-0.839,2.322-1.603,3.476C540.426,161.678,539.168,162.756,538.224,164.09L538.224,164.09z M496.476,192.117
	c0.359,0.928,1.079,2.187,1.708,3.026c0.629,0.838,1.168,1.258,1.857,1.124c0.688-0.135,1.528-0.824,1.857-1.828
	c0.329-1.004,0.149-2.322,0.345-3.281c0.194-0.958,0.764-1.558,1.348-2.052c0.585-0.495,1.184-0.884,1.633-1.528
	c0.45-0.645,0.75-1.543,1.214-2.187s1.094-1.034,1.468-1.648c0.375-0.614,0.495-1.453,0.734-2.112s0.599-1.138,1.213-1.678
	c0.614-0.539,1.483-1.139,2.083-1.888c0.599-0.749,0.929-1.648,1.348-2.292c0.42-0.644,0.929-1.033,1.723-1.453
	c0.795-0.419,1.873-0.869,2.906-1.438c1.034-0.569,2.022-1.258,2.966-2.067c0.944-0.809,1.843-1.737,2.277-2.666
	s0.404-1.858-0.119-2.172c-0.524-0.314-1.544-0.015-2.518,0.3s-1.902,0.644-3.205,0.254c-1.304-0.389-2.981-1.498-4.314-1.708
	c-1.333-0.21-2.322,0.479-2.921,1.633c-0.6,1.153-0.81,2.771-1.318,4.464c-0.51,1.693-1.318,3.461-2.337,4.779
	c-1.019,1.317-2.247,2.187-2.876,3.22c-0.63,1.034-0.66,2.232-1.034,3.311s-1.094,2.037-1.902,2.951
	c-0.809,0.914-1.708,1.782-2.472,2.576s-1.394,1.513-1.708,2.172C496.116,190.589,496.116,191.188,496.476,192.117L496.476,192.117z
	 M526.077,191.203c0.39-1.723,1.528-3.581,3.146-4.614c1.618-1.034,3.715-1.243,4.854-0.569c1.139,0.674,1.318,2.232,0.375,4
	c-0.944,1.767-3.011,3.745-4.539,4.793c-1.528,1.048-2.517,1.168-3.191,0.434C526.047,194.513,525.688,192.925,526.077,191.203
	L526.077,191.203z M513.554,201.674c-0.061-0.929,0.419-1.768,1.572-2.127c1.154-0.36,2.981-0.24,3.565,0.494
	c0.585,0.734-0.074,2.082-0.929,2.951c-0.854,0.869-1.902,1.258-2.726,0.944C514.213,203.621,513.613,202.603,513.554,201.674
	L513.554,201.674z M501.864,209.136c0.125-0.781,0.424-1.92,1.038-2.789c0.614-0.869,1.543-1.468,2.637-1.348
	c1.094,0.12,2.352,0.958,2.547,2.007c0.194,1.048-0.674,2.307-1.893,2.968c-1.218,0.662-2.785,0.726-3.595,0.546
	C501.79,210.341,501.739,209.917,501.864,209.136L501.864,209.136z M369.865,281.336c0.734-0.45,1.724-0.509,2.322-0.869
	c0.6-0.36,0.809-1.02,0.779-1.783c-0.03-0.764-0.3-1.633-0.016-2.382c0.285-0.749,1.124-1.378,1.947-2.067
	c0.824-0.689,1.634-1.438,2.308-2.172s1.213-1.453,2.052-1.513c0.839-0.06,1.978,0.539,3.236,1.063
	c1.258,0.524,2.637,0.974,3.58,1.288c0.944,0.314,1.453,0.494,2.082,0.375s1.378-0.54,2.217-1.184
	c0.84-0.644,1.769-1.513,2.053-2.321c0.284-0.809-0.075-1.559-0.645-2.098c-0.568-0.54-1.348-0.869-2.202-1.154
	c-0.854-0.284-1.782-0.524-2.501-0.854c-0.719-0.33-1.229-0.749-1.843-1.528c-0.614-0.779-1.333-1.917-1.992-2.816
	s-1.259-1.558-1.963-1.947c-0.704-0.39-1.513-0.509-2.217-0.464s-1.304,0.254-1.782,0.404c-0.479,0.15-0.839,0.239-1.408-0.075
	c-0.569-0.315-1.349-1.034-2.263-1.798c-0.913-0.764-1.962-1.573-2.801-2.217c-0.839-0.644-1.469-1.124-1.769-1.752
	c-0.299-0.629-0.269-1.408,0.181-2.697c0.449-1.288,1.318-3.085,2.127-4.389c0.809-1.303,1.558-2.112,2.771-2.546
	c1.213-0.435,2.891-0.494,4.044-0.12c1.154,0.375,1.783,1.183,2.563,2.082c0.778,0.899,1.708,1.888,2.517,2.906
	c0.809,1.019,1.498,2.067,2.112,2.727s1.153,0.929,1.992,0.63c0.839-0.3,1.978-1.169,3.056-2.083
	c1.079-0.914,2.098-1.873,3.071-2.771c0.974-0.899,1.902-1.738,3.115-2.592c1.214-0.854,2.711-1.723,4.164-2.352
	c1.453-0.629,2.861-1.019,4.284-1.048c1.424-0.03,2.861,0.299,4.688,1.228c1.828,0.929,4.045,2.457,6.517,3.85
	s5.198,2.652,7.535,3.85s4.284,2.337,6.232,3.371c1.947,1.033,3.895,1.962,5.812,2.816c1.918,0.854,3.806,1.633,5.528,2.727
	c1.723,1.093,3.28,2.501,4.209,3.011c0.929,0.51,1.229,0.12,1.468-1.168c0.24-1.289,0.42-3.476,0.63-5.288
	c0.209-1.813,0.449-3.251,0.688-4.554c0.24-1.303,0.479-2.472,1.289-4.329c0.809-1.858,2.188-4.404,3.37-6.426
	c1.184-2.022,2.172-3.521,3.415-4.869c1.244-1.348,2.742-2.547,4.21-3.775c1.469-1.229,2.906-2.487,4.149-3.865
	s2.292-2.876,3.4-3.491c1.109-0.614,2.277-0.344,4.314,0.03c2.037,0.375,4.943,0.854,7.011,0.944s3.296-0.209,3.595-1.019
	c0.3-0.809-0.329-2.127-0.209-2.801c0.12-0.674,0.988-0.705,1.782-0.255s1.514,1.378,2.292,1.498
	c0.779,0.12,1.618-0.569,2.606-1.393c0.989-0.824,2.128-1.783,2.802-2.577s0.884-1.423,2.142-1.797
	c1.259-0.375,3.565-0.495,5.034-1.154c1.468-0.659,2.097-1.857,2.411-2.906c0.315-1.049,0.315-1.948-0.119-2.113
	c-0.435-0.164-1.304,0.405-2.562,0.405c-1.259,0-2.907-0.569-3.491-1.124c-0.584-0.554-0.104-1.093-0.135-1.873
	c-0.029-0.779-0.569-1.797-0.943-2.876c-0.375-1.079-0.584-2.217-0.404-2.951c0.18-0.734,0.749-1.063,0.898-1.603
	c0.15-0.539-0.12-1.288-0.689-1.663c-0.568-0.375-1.438-0.375-2.411-0.659s-2.053-0.854-2.562-2.083
	c-0.51-1.228-0.45-3.116-0.345-5.063s0.255-3.955,1.108-5.587c0.854-1.633,2.412-2.891,3.102-4.599s0.509-3.865,0.27-5.842
	s-0.539-3.775-1.528-3.625c-0.988,0.149-2.666,2.247-4.074,4.344c-1.408,2.098-2.547,4.194-3.925,6.352s-2.996,4.375-4.974,5.783
	c-1.978,1.408-4.314,2.007-6.112,1.228c-1.797-0.779-3.056-2.936-4.644-4.434s-3.505-2.337-4.584-2.097
	c-1.078,0.239-1.318,1.558-2.247,1.857c-0.929,0.299-2.546-0.419-3.955-0.479c-1.407-0.06-2.606,0.539-2.995-0.12
	c-0.39-0.659,0.029-2.577-0.63-3.625s-2.396-1.229-4.584-1.858c-2.187-0.629-4.823-1.708-7.61-3.415
	c-2.786-1.708-5.722-4.045-8.059-6.441c-2.337-2.397-4.074-4.854-6.142-7.76c-2.067-2.906-4.464-6.262-7.91-10.217
	c-3.445-3.955-7.939-8.509-10.636-10.95c-2.696-2.442-3.596-2.771-4.18-2.546s-0.854,1.004-1.334,1.678
	c-0.479,0.674-1.168,1.244-1.932,1.393c-0.765,0.15-1.604-0.12-2.292,0.27c-0.689,0.39-1.229,1.438-1.678,2.682
	c-0.45,1.243-0.81,2.682-0.885,4.134c-0.074,1.453,0.135,2.921,0.674,4.495c0.54,1.573,1.409,3.25,2.487,5.048
	c1.079,1.798,2.367,3.715,3.057,5.423c0.688,1.708,0.778,3.206,0.703,4.689c-0.074,1.483-0.313,2.951-0.479,4.554
	c-0.165,1.603-0.255,3.341-0.749,4.884s-1.394,2.891-1.933,3.715c-0.539,0.824-0.719,1.124-0.584,1.603
	c0.135,0.479,0.584,1.139,0.794,2.157s0.18,2.397,0.06,3.865c-0.12,1.468-0.329,3.026-0.539,4.225
	c-0.21,1.198-0.42,2.037-0.854,2.876c-0.436,0.839-1.094,1.677-2.067,2.381c-0.974,0.705-2.263,1.273-2.861,2.083
	c-0.6,0.809-0.51,1.857-0.375,3.146s0.314,2.816,0.72,4.794c0.404,1.978,1.033,4.404,1.139,6.247
	c0.104,1.842-0.315,3.101-0.689,4.194c-0.375,1.093-0.704,2.022-1.288,2.771c-0.585,0.749-1.424,1.318-2.473,1.453
	c-1.048,0.135-2.307-0.165-3.25-0.554c-0.944-0.39-1.573-0.869-2.143-1.303s-1.078-0.824-1.678-0.689s-1.288,0.794-2.067,0.899
	c-0.778,0.105-1.647-0.344-2.651-1.108c-1.003-0.764-2.142-1.842-3.565-2.517c-1.423-0.674-3.131-0.944-4.435-0.824
	c-1.303,0.12-2.201,0.629-2.726,1.169c-0.524,0.539-0.675,1.108-0.3,1.932c0.374,0.824,1.273,1.902,1.933,2.981
	c0.659,1.079,1.078,2.157,1.333,3.116c0.255,0.959,0.345,1.798,0.149,2.787c-0.194,0.989-0.674,2.127-1.183,2.981
	c-0.51,0.854-1.049,1.423-1.544,1.917c-0.494,0.495-0.943,0.914-1.123,1.558c-0.181,0.645-0.091,1.513-0.405,1.873
	c-0.314,0.36-1.033,0.209-1.603-0.179c-0.569-0.39-0.989-1.02-1.498-0.779c-0.51,0.24-1.108,1.348-1.543,2.157
	s-0.704,1.319-1.273,1.573c-0.569,0.255-1.438,0.255-2.232,0.21c-0.794-0.045-1.513-0.135-2.098,0.359
	c-0.584,0.495-1.033,1.573-1.078,2.711c-0.045,1.138,0.314,2.336,0.345,3.46c0.03,1.124-0.27,2.172-0.614,3.101
	c-0.344,0.929-0.734,1.737-1.063,2.427c-0.329,0.689-0.6,1.258-0.555,2.127c0.046,0.869,0.405,2.037,1.349,3.071
	s2.472,1.933,3.686,2.606c1.213,0.674,2.112,1.124,2.861,2.262c0.748,1.138,1.348,2.966,1.647,4.225
	c0.3,1.258,0.3,1.947,0.007,2.869c-0.292,0.921-0.876,2.075-1.355,3.199c-0.479,1.123-0.854,2.217-1.266,3.4
	c-0.413,1.183-0.861,2.457-0.854,3.708c0.008,1.25,0.472,2.479,1.071,3.4s1.333,1.536,2.112,1.94
	c0.779,0.405,1.603,0.599,2.321,0.464c0.72-0.135,1.334-0.599,1.881-1.251S369.131,281.786,369.865,281.336L369.865,281.336z
	 M382.256,138.882c-0.704,0.592-0.989,1.491-1.153,2.584c-0.165,1.093-0.21,2.382,0.112,3.273c0.322,0.892,1.011,1.386,1.752,1.296
	c0.742-0.09,1.536-0.764,2.157-1.768c0.622-1.004,1.071-2.336,1.057-3.482c-0.016-1.146-0.494-2.105-1.296-2.442
	S382.96,138.291,382.256,138.882L382.256,138.882z M387.671,147.024c-0.816,0.405-1.46,0.899-1.745,1.618
	c-0.284,0.719-0.21,1.663,0.337,2.547c0.547,0.883,1.565,1.708,2.741,1.962c1.176,0.254,2.51-0.06,3.184-1.012
	c0.674-0.951,0.689-2.539,0.292-3.67c-0.396-1.131-1.206-1.805-2.104-1.985C389.477,146.305,388.487,146.62,387.671,147.024
	L387.671,147.024z M348.072,255.683c-0.704,0.247-1.647,0.711-2.284,1.558c-0.637,0.846-0.967,2.075-0.899,3.161
	c0.067,1.086,0.532,2.029,1.198,2.517c0.667,0.487,1.536,0.517,2.21,0.015c0.674-0.502,1.153-1.536,1.408-2.592
	s0.285-2.135,0.247-2.966c-0.037-0.832-0.143-1.416-0.427-1.693C349.24,255.405,348.776,255.436,348.072,255.683L348.072,255.683z
	 M169.525,468.124c-1.558,0.555-2.636,1.513-2.981,2.457c-0.344,0.944,0.045,1.872,1.603,2.427c1.558,0.554,4.285,0.734,5.752,0.149
	c1.468-0.584,1.678-1.933,1.678-3.041s-0.209-1.978-1.333-2.337C173.12,467.42,171.083,467.57,169.525,468.124L169.525,468.124z
	 M179.277,461.323c-1.483,0.494-2.801,1.692-3.161,3.131s0.239,3.115,1.258,3.984c1.018,0.869,2.456,0.929,3.79,0.255
	s2.562-2.082,3.026-3.445c0.464-1.363,0.165-2.682-0.809-3.445C182.408,461.038,180.76,460.829,179.277,461.323L179.277,461.323z
	 M325.859,397.223c0.39-1.798,1.108-3.895,0.749-4.974s-1.798-1.139-3.625-0.06c-1.828,1.078-4.045,3.295-5.872,5.242
	c-1.828,1.948-3.266,3.626-3.116,5.153c0.149,1.528,1.888,2.907,2.337,4.015c0.449,1.109-0.39,1.948-1.288,3.026
	c-0.899,1.079-1.857,2.396-1.678,3.206c0.18,0.809,1.498,1.108,3.146,0.958c1.647-0.149,3.625-0.748,5.752-1.857
	c2.128-1.108,4.404-2.726,5.333-4.403c0.93-1.678,0.51-3.416-0.09-4.345c-0.599-0.929-1.378-1.049-1.737-1.857
	S325.47,399.02,325.859,397.223L325.859,397.223z M351.966,516.083c-0.98,0.307-1.415,1.521-1.415,2.523
	c0,1.004,0.435,1.798,1.295,2.09c0.862,0.292,2.15,0.083,2.914-0.621s1.004-1.902,0.359-2.802
	C354.476,516.375,352.947,515.775,351.966,516.083L351.966,516.083z M205.22,524.112c-1.168,0.704-2.277,1.783-2.097,2.847
	c0.18,1.063,1.648,2.111,3.685,2.187s4.644-0.824,5.078-2.053c0.435-1.228-1.303-2.786-2.786-3.4
	C207.617,523.079,206.389,523.408,205.22,524.112L205.22,524.112z M232.698,483.029c1.002-0.24,2.021-0.09,2.381,0.479
	c0.359,0.57,0.06,1.559-0.33,2.697s-0.869,2.427-0.929,3.311s0.3,1.363,0.884,1.827c0.584,0.465,1.393,0.914,2.067,0.839
	c0.674-0.075,1.213-0.674,1.723-1.273c0.509-0.599,0.989-1.198,1.902-1.019c0.914,0.181,2.262,1.139,3.416,1.723
	c1.153,0.585,2.112,0.794,2.861,0.704s1.289-0.479,1.723-1.033c0.434-0.555,0.764-1.273,1.363-1.693
	c0.6-0.419,1.468-0.539,2.082-0.719c0.614-0.18,0.974-0.419,1.318-0.943c0.345-0.524,0.674-1.334,1.079-2.067
	c0.405-0.734,0.884-1.394,1.543-1.334c0.659,0.061,1.498,0.84,1.888,0.929c0.389,0.091,0.33-0.509,0.015-1.617
	c-0.314-1.108-0.884-2.727-1.468-4.165c-0.584-1.438-1.183-2.696-1.543-3.64c-0.359-0.943-0.479-1.573-0.075-2.352
	c0.405-0.779,1.333-1.708,1.888-2.802c0.554-1.093,0.734-2.352,1.543-3.28c0.809-0.929,2.247-1.528,3.475-2.157
	c1.229-0.629,2.248-1.288,3.236-2.307c0.988-1.019,1.947-2.397,2.726-3.745c0.779-1.349,1.378-2.667,2.367-3.835
	c0.989-1.169,2.367-2.188,3.266-3.476c0.898-1.289,1.318-2.847,1.708-4.554c0.39-1.708,0.749-3.565,0.45-5.604
	c-0.3-2.037-1.259-4.254-1.678-6.321s-0.299-3.984,0.27-5.752c0.569-1.768,1.588-3.386,3.356-4.524
	c1.767-1.139,4.284-1.798,6.591-2.396c2.307-0.599,4.404-1.139,5.992-2.008s2.667-2.067,3.625-2.007
	c0.959,0.06,1.797,1.378,1.678,3.086c-0.12,1.707-1.198,3.805-2.727,5.813c-1.528,2.007-3.505,3.925-5.273,4.853
	c-1.768,0.93-3.326,0.869-4.404,1.259s-1.678,1.229-1.468,1.978c0.209,0.749,1.229,1.408,2.097,2.157s1.588,1.588,1.678,2.666
	c0.09,1.079-0.45,2.397-0.689,3.655c-0.239,1.259-0.18,2.457,0.629,3.206s2.367,1.049,3.955,0.959
	c1.588-0.09,3.206-0.569,4.254-1.618c1.049-1.049,1.528-2.667,2.157-3.985c0.629-1.317,1.409-2.336,2.696-2.666
	c1.289-0.329,3.086,0.03,4.494-0.149c1.408-0.181,2.427-0.898,3.985-1.828c1.558-0.929,3.656-2.066,5.124-3.116
	c1.468-1.048,2.307-2.007,3.146-2.366s1.678-0.12,2.666-0.449c0.989-0.33,2.128-1.229,3.536-2.067s3.086-1.618,4.104-2.457
	s1.378-1.737,1.827-2.756s0.989-2.157,1.708-3.266c0.719-1.109,1.617-2.188,2.037-3.745c0.42-1.559,0.359-3.596,1.139-5.303
	c0.778-1.708,2.396-3.086,4.494-4.524c2.097-1.438,4.674-2.937,6.921-4.374c2.247-1.438,4.164-2.816,5.033-4.165
	c0.868-1.348,0.688-2.666,0.688-4.434c0-1.768,0.18-3.985,0.63-5.722c0.449-1.738,1.168-2.996,2.366-4.434
	c1.199-1.438,2.877-3.056,4.075-4.944c1.198-1.887,1.917-4.044,2.517-6.292c0.6-2.247,1.078-4.583,1.438-6.501
	c0.359-1.917,0.601-3.416,0.899-4.583c0.301-1.169,0.66-2.008,1.14-3.116c0.479-1.109,1.078-2.487,1.678-4.344
	c0.599-1.857,1.198-4.194,1.468-6.052c0.27-1.858,0.21-3.236-0.12-4.314c-0.329-1.079-0.929-1.858-1.408-2.667
	c-0.479-0.809-0.839-1.648-1.468-2.008c-0.629-0.359-1.528-0.24-2.876-0.27c-1.349-0.03-3.146-0.209-4.165-1.019
	s-1.258-2.247-1.168-3.595c0.09-1.348,0.51-2.607,1.498-2.577c0.989,0.03,2.547,1.348,3.774,1.378
	c1.229,0.03,2.128-1.229,2.877-2.996c0.749-1.767,1.348-4.044,1.378-5.632c0.03-1.588-0.51-2.487-1.169-3.296
	c-0.658-0.809-1.438-1.528-1.588-2.457c-0.149-0.929,0.33-2.067,0.15-3.056c-0.18-0.988-1.019-1.827-1.349-2.636
	c-0.329-0.809-0.149-1.588,0.12-2.337s0.629-1.468,1.857-2.217s3.326-1.528,4.794-2.217c1.468-0.689,2.307-1.288,2.486-2.097
	s-0.299-1.828,0-3.026c0.3-1.199,1.379-2.577,1.588-3.536c0.21-0.959-0.449-1.498-0.929-2.697c-0.479-1.198-0.779-3.056-0.749-4.314
	s0.39-1.917,1.648-1.708c1.258,0.209,3.415,1.288,4.764,1.498c1.348,0.21,1.887-0.449,2.756,0.749
	c0.869,1.199,2.067,4.254,2.816,6.622c0.749,2.367,1.049,4.044,1.678,4.793s1.588,0.569,2.247,0s1.019-1.528,1.198-2.576
	c0.181-1.049,0.181-2.188,0.779-2.427c0.6-0.24,1.798,0.419,3.025,1.349c1.229,0.928,2.487,2.126,3.326,2.427
	c0.839,0.299,1.259-0.3,1.408-1.408s0.03-2.727,0.239-3.746c0.21-1.018,0.749-1.438,0.989-2.037c0.239-0.599,0.18-1.378,0.029-2.337
	c-0.149-0.958-0.389-2.097-0.929-2.696c-0.539-0.599-1.378-0.659-2.217-0.569c-0.839,0.09-1.678,0.329-2.937,1.019
	c-1.258,0.689-2.936,1.828-4.254,2.277c-1.318,0.449-2.277,0.209-2.756-0.779c-0.479-0.989-0.479-2.727-0.15-4.314
	c0.33-1.587,0.989-3.025,1.708-4.374c0.719-1.348,1.498-2.606,2.517-3.325c1.019-0.719,2.277-0.899,3.625-0.36
	c1.349,0.539,2.786,1.797,3.984,2.636c1.199,0.839,2.157,1.259,3.236,1.199s2.276-0.599,2.966-0.509
	c0.688,0.09,0.869,0.809,0.539,2.367c-0.329,1.558-1.168,3.955-1.108,5.603c0.061,1.647,1.019,2.546,1.168,4.224
	c0.15,1.678-0.509,4.135-0.449,6.112c0.061,1.978,0.84,3.476,1.199,5.153s0.299,3.536,0.839,5.033
	c0.539,1.499,1.678,2.637,2.606,3.476s1.647,1.378,2.996,2.547c1.348,1.168,3.325,2.966,4.374,5.003
	c1.049,2.038,1.168,4.315,1.647,6.622c0.479,2.307,1.318,4.644,2.067,7.22s1.408,5.393,1.738,8.449
	c0.329,3.056,0.329,6.352,0.149,8.958c-0.18,2.606-0.539,4.524-1.468,6.561s-2.427,4.194-3.536,5.603
	c-1.108,1.408-1.827,2.067-2.815,3.296c-0.988,1.228-2.247,3.026-2.877,4.644c-0.629,1.618-0.629,3.056-0.509,4.613
	c0.119,1.559,0.359,3.236,0.509,4.974c0.15,1.737,0.21,3.535,0.18,5.033c-0.029,1.498-0.149,2.696-0.39,3.565
	c-0.239,0.869-0.599,1.408-1.139,1.019c-0.539-0.389-1.258-1.708-2.216-2.756c-0.959-1.049-2.158-1.828-2.787-1.828
	s-0.688,0.779-1.168,1.468c-0.479,0.688-1.379,1.288-2.428,1.468c-1.048,0.18-2.246-0.06-2.815,0.389
	c-0.569,0.45-0.51,1.588-0.51,2.457c0,0.869-0.06,1.468-0.449,2.187s-1.108,1.558-1.648,2.427c-0.539,0.868-0.897,1.767-1.048,2.756
	c-0.15,0.988-0.09,2.067,0.06,3.176c0.15,1.108,0.39,2.247,0.989,3.325c0.599,1.079,1.558,2.098,2.007,3.236s0.39,2.396,0.33,4.074
	c-0.061,1.678-0.12,3.775-0.15,5.273c-0.029,1.498-0.029,2.396,0.27,3.445c0.3,1.049,0.899,2.247,0.959,3.445
	c0.061,1.198-0.419,2.396-0.839,3.535c-0.419,1.139-0.779,2.217-0.869,3.416c-0.089,1.198,0.09,2.517-0.329,3.355
	s-1.438,1.198-2.217,1.977c-0.779,0.779-1.318,1.979-1.888,3.297c-0.569,1.317-1.169,2.756-1.647,4.224
	c-0.48,1.468-0.839,2.966-1.349,4.404s-1.168,2.816-1.349,3.984c-0.18,1.169,0.12,2.127,0.21,3.206s-0.029,2.277-0.449,3.206
	s-1.139,1.588-1.408,2.786s-0.09,2.937,1.288,5.333c1.379,2.396,3.955,5.453,5.723,7.79s2.727,3.954,2.457,4.763
	c-0.27,0.81-1.768,0.81-3.329,1.067c-1.562,0.259-3.187,0.775-4.643,2.082c-1.457,1.308-2.745,3.404-3.389,4.947
	c-0.645,1.543-0.645,2.531-0.6,3.97s0.135,3.326-0.285,4.929c-0.419,1.603-1.348,2.921-2.366,3.685
	c-1.02,0.765-2.127,0.974-3.401,1.184c-1.273,0.21-2.711,0.42-3.85,1.153c-1.139,0.734-1.977,1.993-2.651,3.206
	c-0.674,1.214-1.184,2.382-1.918,3.086c-0.733,0.704-1.692,0.943-2.366,0.375c-0.674-0.569-1.063-1.948-0.869-3.026
	c0.195-1.078,0.975-1.857,1.199-2.576s-0.105-1.379-0.54-1.918c-0.434-0.539-0.974-0.959-0.898-1.663s0.764-1.692,0.988-2.411
	c0.225-0.72-0.015-1.169-0.27-1.618c-0.254-0.449-0.524-0.898-0.464-1.618c0.06-0.719,0.449-1.708,1.423-2.996
	s2.531-2.876,3.7-4.015c1.168-1.139,1.947-1.827,2.037-2.562c0.09-0.733-0.509-1.513-1.078-2.021c-0.569-0.51-1.109-0.75-2.098-0.6
	c-0.988,0.149-2.427,0.689-3.386,1.318s-1.438,1.348-1.857,2.021c-0.419,0.675-0.778,1.304-1.509,1.944
	c-0.73,0.64-1.832,1.292-2.457,1.933c-0.626,0.64-0.775,1.27-0.745,2.138c0.029,0.869,0.239,1.978,0.644,2.727
	c0.405,0.749,1.004,1.139,1.288,1.663c0.285,0.524,0.255,1.184,0.03,2.021c-0.225,0.84-0.644,1.858-1.258,2.562
	c-0.614,0.704-1.424,1.095-2.128,1.109s-1.303-0.345-1.272-1.034c0.029-0.688,0.688-1.708,0.883-2.486
	c0.195-0.779-0.074-1.318-1.168-1.857s-3.011-1.079-3.943-1.329c-0.933-0.251-0.88-0.214-1.303,0.074
	c-0.424,0.289-1.323,0.828-1.937,1.337c-0.614,0.51-0.943,0.989-1.169,1.648c-0.225,0.659-0.345,1.498-0.614,2.217
	c-0.27,0.72-0.688,1.318-1.123,2.127c-0.435,0.81-0.884,1.828-0.689,2.712c0.195,0.884,1.034,1.633,1.408,2.547
	c0.375,0.913,0.285,1.992-0.12,2.98c-0.404,0.989-1.123,1.888-1.813,2.637c-0.688,0.749-1.348,1.349-1.723,2.172
	c-0.374,0.824-0.464,1.873-0.898,2.382c-0.435,0.51-1.214,0.479-1.693,0.794c-0.479,0.315-0.659,0.975-1.213,1.498
	c-0.555,0.524-1.483,0.914-2.322,0.42s-1.588-1.872-1.962-3.206c-0.375-1.333-0.375-2.621-0.285-4.015s0.27-2.891,0.435-4.254
	s0.314-2.592,0.959-3.267c0.644-0.674,1.782-0.794,2.188-1.108c0.404-0.314,0.074-0.823-0.569-1.333
	c-0.645-0.509-1.604-1.019-2.727-1.288c-1.124-0.27-2.412-0.3-3.431,0.09s-1.768,1.198-2.007,2.188
	c-0.24,0.988,0.029,2.157-0.495,2.98c-0.524,0.824-1.842,1.304-2.711,1.992c-0.869,0.689-1.289,1.588-1.828,2.577
	c-0.539,0.988-1.198,2.067-1.782,3.025c-0.584,0.959-1.094,1.798-1.648,2.816c-0.554,1.02-1.153,2.217-2.187,2.547
	c-1.034,0.33-2.502-0.21-4.045-0.435s-3.161-0.135-4.39,0.24c-1.228,0.374-2.066,1.033-3.265,0.988s-2.756-0.794-4.599-1.318
	c-1.842-0.524-3.97-0.823-5.947-0.404c-1.978,0.419-3.805,1.558-5.468,2.262s-3.161,0.975-4.12,0.6s-1.378-1.394-1.079-2.367
	c0.3-0.974,1.319-1.902,2.742-2.681c1.423-0.779,3.25-1.409,4.015-1.963c0.764-0.555,0.464-1.033-0.389-1.304
	c-0.854-0.27-2.262-0.329-3.715-0.554c-1.453-0.225-2.951-0.614-3.775-0.435s-0.974,0.929-0.809,1.813
	c0.165,0.884,0.644,1.902,0.36,2.622c-0.285,0.719-1.333,1.138-2.352,1.213s-2.007-0.195-2.277-1.139s0.18-2.562,0.149-3.79
	c-0.029-1.229-0.539-2.066-0.554-2.711c-0.015-0.645,0.464-1.094,1.453-1.963c0.988-0.868,2.486-2.157,2.546-2.966
	c0.06-0.81-1.318-1.139-2.711-0.959c-1.394,0.18-2.801,0.869-3.61,1.723s-1.019,1.873-1.168,2.892s-0.24,2.037-0.779,2.951
	c-0.539,0.913-1.528,1.723-2.202,2.562s-1.034,1.708-1.079,2.576c-0.045,0.869,0.225,1.738,0.958,2.532
	c0.734,0.794,1.933,1.513,3.206,2.157c1.273,0.644,2.622,1.213,3.955,1.992c1.333,0.779,2.651,1.768,3.416,2.951
	c0.764,1.183,0.974,2.562,0.584,3.685c-0.39,1.124-1.378,1.993-2.262,2.337c-0.884,0.345-1.663,0.165-2.067-0.329
	c-0.404-0.494-0.435-1.304-0.869-1.663c-0.435-0.359-1.274-0.27-2.622,0.449c-1.349,0.72-3.206,2.067-4.704,2.667
	c-1.498,0.6-2.637,0.449-3.476,0.524s-1.378,0.374-1.588,0.943c-0.209,0.569-0.089,1.408-0.329,1.918
	c-0.24,0.509-0.839,0.688-1.273,1.078c-0.435,0.39-0.705,0.989-0.66,1.782c0.045,0.795,0.405,1.783,0.24,2.532
	c-0.165,0.749-0.854,1.258-1.633,1.992s-1.648,1.692-2.561,3.116c-0.915,1.423-1.873,3.311-2.592,4.974
	c-0.719,1.662-1.198,3.101-2.157,4.283c-0.959,1.184-2.397,2.112-3.296,3.251s-1.258,2.487-2.217,2.816
	c-0.959,0.33-2.517-0.359-4.225-1.124c-1.708-0.764-3.565-1.602-4.689-2.756c-1.124-1.153-1.513-2.621-1.857-4.314
	c-0.345-1.692-0.645-3.61-1.588-4.898c-0.944-1.288-2.532-1.947-3.745-2.741s-2.052-1.723-2.397-2.756
	c-0.344-1.034-0.194-2.172-0.509-3.221c-0.315-1.049-1.094-2.007-0.974-3.146c0.119-1.139,1.138-2.457,1.363-3.551
	s-0.344-1.963-0.569-2.727c-0.225-0.764-0.104-1.423,0.3-1.992c0.405-0.569,1.093-1.049,2.397-1.888
	c1.303-0.839,3.221-2.037,4.629-3.551c1.408-1.513,2.307-3.34,2.562-4.808c0.255-1.469-0.135-2.577-1.079-2.997
	c-0.943-0.419-2.442-0.149-3.76,0.345c-1.318,0.495-2.457,1.214-3.536,1.408c-1.079,0.195-2.097-0.135-3.91-1.019
	c-1.813-0.884-4.419-2.321-6.157-3.101c-1.737-0.779-2.606-0.899-4.389-0.659c-1.783,0.239-4.479,0.839-6.276,1.108
	c-1.798,0.27-2.697,0.21-3.655,0.914c-0.959,0.704-1.978,2.172-2.906,2.936c-0.929,0.764-1.768,0.824-2.457,1.214
	s-1.228,1.108-2.157,1.978c-0.929,0.868-2.247,1.888-3.299,2.296s-1.839,0.205-2.606-0.181s-1.517-0.955-2.266-1.209
	c-0.75-0.255-1.499-0.195-2.352,0.209c-0.854,0.405-1.813,1.154-2.682,1.139c-0.869-0.015-1.648-0.794-2.217-0.584
	c-0.569,0.21-0.929,1.408-1.483,2.427c-0.555,1.019-1.304,1.857-2.172,1.902s-1.857-0.704-2.396-0.734
	c-0.54-0.029-0.629,0.659-0.689,1.469c-0.06,0.809-0.09,1.737-0.689,2.276c-0.599,0.54-1.768,0.689-2.666,0.314
	c-0.899-0.374-1.528-1.272-1.394-2.066s1.034-1.483,1.258-2.008s-0.225-0.884-1.228-0.719c-1.004,0.165-2.562,0.854-3.61,1.094
	c-1.049,0.239-1.588,0.03-2.247,0.435s-1.438,1.423-2.636,2.202c-1.199,0.778-2.817,1.318-4.09,1.588
	c-1.273,0.27-2.202,0.27-2.831-0.256c-0.63-0.523-0.959-1.572-1.588-2.561c-0.629-0.989-1.558-1.918-2.726-1.888
	c-1.169,0.029-2.577,1.019-3.536,2.232c-0.959,1.213-1.468,2.65-1.677,3.819c-0.21,1.169-0.12,2.067,0.393,3.015
	c0.513,0.947,1.45,1.944,1.543,2.606c0.093,0.663-0.656,0.992-1.405,1.457s-1.498,1.063-1.647,1.978
	c-0.15,0.914,0.299,2.143,0.067,3.123c-0.232,0.981-1.146,1.716-2.139,1.996c-0.993,0.281-2.063,0.108-2.434-0.741
	c-0.371-0.851-0.041-2.378-0.041-3.262s-0.33-1.124-0.839-1.498c-0.51-0.375-1.199-0.884-1.903-1.304
	c-0.704-0.419-1.423-0.749-2.232-0.913c-0.809-0.165-1.708-0.165-2.112-0.39c-0.405-0.225-0.315-0.674-0.345-1.304
	c-0.03-0.629-0.18-1.438-0.854-1.483c-0.674-0.044-1.873,0.674-2.832,1.304c-0.958,0.629-1.678,1.168-2.217,1.019
	c-0.54-0.149-0.899-0.988-1.499-1.168c-0.599-0.18-1.438,0.299-1.977,0.284c-0.54-0.015-0.779-0.524-1.139-0.779
	c-0.36-0.255-0.839-0.255-1.633,0.3s-1.902,1.663-2.921,2.008c-1.019,0.345-1.947-0.075-2.606-1.049s-1.048-2.502-1.648-3.011
	c-0.599-0.51-1.408,0-2.208,0.722s-1.589,1.657-2.57,1.634c-0.981-0.022-2.154-1.002-2.74-2.091
	c-0.586-1.089-0.586-2.287-0.047-3.187c0.539-0.898,1.618-1.498,1.857-2.366c0.24-0.869-0.359-2.008-0.09-3.326
	s1.408-2.816,2.667-3.865c1.258-1.048,2.637-1.647,3.715-1.707c1.078-0.061,1.857,0.419,3.026,0.779
	c1.168,0.359,2.726,0.599,4.044,0.239s2.396-1.318,3.296-2.606c0.898-1.288,1.618-2.906,3.176-3.745
	c1.558-0.839,3.955-0.898,6.352-1.888s4.793-2.906,6.831-4.824c2.038-1.917,3.715-3.834,5.333-5.482
	c1.618-1.647,3.175-3.026,4.344-4.254c1.168-1.229,1.947-2.307,3.565-3.326c1.618-1.019,4.075-1.978,5.094-2.966
	c1.019-0.988,0.599-2.008,0.12-2.786c-0.479-0.779-1.019-1.318-0.27-1.948c0.749-0.629,2.786-1.348,5.033-2.247
	c2.247-0.898,4.704-1.977,6.681-2.336c1.977-0.36,3.476,0,4.464,0.568c0.989,0.569,1.468,1.349,1.857,2.157
	c0.39,0.81,0.689,1.648,1.438,2.188c0.75,0.539,1.947,0.779,3.386,0.18c1.438-0.6,3.116-2.037,4.524-2.517
	c1.408-0.479,2.546,0,4.674,0.27c2.127,0.27,5.243,0.33,8.479-0.12c3.235-0.449,6.591-1.407,8.898-2.067
	c2.307-0.658,3.565-1.019,5.303-1.168c1.738-0.149,3.955-0.09,5.932-0.09c1.978,0,3.715-0.06,5.244-0.479
	c1.528-0.419,2.846-1.198,3.999-1.902C230.708,483.897,231.695,483.269,232.698,483.029L232.698,483.029z M223.847,524.959
	c-1.708,0.614-4.344,2.921-5.752,4.958s-1.588,3.806-1.168,5.078c0.419,1.273,1.438,2.053,2.786,2.487
	c1.349,0.435,3.026,0.524,3.67-0.42c0.644-0.943,0.254-2.921,0.405-4.584c0.15-1.662,0.838-3.011,1.483-3.954
	c0.644-0.944,1.243-1.483,1.153-2.292C226.334,525.423,225.555,524.345,223.847,524.959L223.847,524.959z M138.459,564.642
	c0.719-1.498,2.217-3.235,4.134-4.345c1.917-1.108,4.254-1.588,6.382-2.217c2.127-0.629,4.044-1.408,5.752-2.727
	c1.708-1.318,3.206-3.176,4.614-5.572c1.408-2.397,2.726-5.333,4.044-7.19s2.637-2.637,3.595-2.367
	c0.959,0.27,1.558,1.588,2.157,2.547c0.599,0.958,1.199,1.558,1.857,1.917c0.659,0.359,1.378,0.479,2.517,0.03
	s2.696-1.468,3.895-1.588s2.037,0.659,3.206,0.749c1.168,0.09,2.666-0.51,3.805-1.169c1.138-0.659,1.917-1.378,1.798-2.666
	c-0.12-1.288-1.139-3.146-1.259-4.464s0.659-2.098,1.468-1.918s1.648,1.318,3.326,0.989c1.678-0.33,4.194-2.128,5.873-2.996
	c1.677-0.869,2.516-0.81,4.254-0.18c1.737,0.629,4.374,1.827,6.202,2.876c1.827,1.049,2.846,1.947,4.044,2.157
	c1.199,0.21,2.577-0.27,3.476,0.09c0.898,0.359,1.318,1.558,1.408,2.876c0.089,1.318-0.15,2.756-0.09,4.135
	c0.06,1.378,0.419,2.696,1.019,4.074c0.599,1.379,1.438,2.816,1.048,4.045c-0.389,1.229-2.007,2.247-4.194,3.445
	s-4.944,2.577-6.621,4.554c-1.678,1.978-2.277,4.555-2.696,6.682c-0.42,2.127-0.659,3.805-1.318,4.434
	c-0.659,0.63-1.738,0.21-3.146-1.198s-3.146-3.805-5.513-5.272c-2.367-1.469-5.363-2.008-7.341-1.708
	c-1.977,0.3-2.936,1.438-4.164,2.127c-1.229,0.689-2.727,0.929-3.685,1.618c-0.959,0.688-1.378,1.827-1.498,2.937
	c-0.12,1.108,0.06,2.187-0.629,2.936c-0.689,0.749-2.247,1.169-3.235,2.098s-1.409,2.366-2.217,3.175
	c-0.809,0.81-2.007,0.989-2.876,1.679c-0.869,0.688-1.409,1.887-1.318,3.056c0.09,1.168,0.809,2.307,1.288,3.715
	s0.719,3.086,0.03,3.296c-0.689,0.21-2.307-1.049-4.135-1.408s-3.865,0.18-5.213-0.329c-1.349-0.51-2.007-2.067-2.067-3.356
	c-0.06-1.288,0.479-2.307-0.449-2.606s-3.326,0.12-4.644-0.719c-1.318-0.839-1.558-2.937-1.199-4.764
	c0.36-1.828,1.318-3.386,1.948-4.733c0.629-1.349,0.929-2.487,0.06-3.446c-0.869-0.958-2.906-1.737-4.883-2.007
	s-3.895-0.03-5.453,0.509c-1.558,0.54-2.756,1.379-3.385,1.169C137.8,567.398,137.74,566.14,138.459,564.642L138.459,564.642z
	 M86.821,661.504c-1.004,0.539-1.723,1.528-2.112,2.622s-0.45,2.292-0.075,3.385c0.375,1.094,1.184,2.082,2.517,2.667
	c1.333,0.584,3.191,0.764,4.554,0.104s2.232-2.157,2.427-3.73c0.195-1.572-0.285-3.221-1.019-4.194s-1.723-1.272-2.861-1.378
	C89.113,660.875,87.825,660.965,86.821,661.504L86.821,661.504z M105.262,651.048c-0.989,0.659-2.127,2.097-2.937,3.625
	c-0.809,1.528-1.289,3.146-1.828,4.599c-0.54,1.453-1.138,2.742-1.273,3.94s0.194,2.307,1.079,2.756
	c0.884,0.45,2.321,0.24,3.221-0.748c0.898-0.989,1.258-2.757,2.083-4.42c0.823-1.663,2.112-3.221,2.576-4.898
	s0.104-3.476-0.495-4.434C107.089,650.509,106.25,650.389,105.262,651.048L105.262,651.048z M64.082,524.226
	c-1.423,0.061-2.562-0.898-2.756-2.636c-0.195-1.738,0.554-4.255,1.962-6.517s3.475-4.27,4.883-5.168
	c1.408-0.899,2.158-0.689,2.712,0.494s0.914,3.341,0.554,5.438c-0.359,2.098-1.438,4.135-2.831,5.692
	C67.212,523.088,65.504,524.166,64.082,524.226L64.082,524.226z M61.055,525.784c-1.184,0.539-1.963,2.067-2.352,3.775
	c-0.39,1.707-0.39,3.596,0.285,4.719c0.674,1.124,2.022,1.483,3.206,0.6c1.184-0.885,2.202-3.012,2.711-4.675
	c0.509-1.662,0.509-2.86-0.284-3.685C63.826,525.694,62.238,525.245,61.055,525.784L61.055,525.784z M73.803,541.633
	c-1.318,0.72-2.337,2.277-2.472,3.626c-0.135,1.348,0.614,2.486,2.112,2.682c1.498,0.194,3.745-0.555,4.689-1.843
	c0.943-1.288,0.584-3.116-0.405-4.09S75.121,540.914,73.803,541.633L73.803,541.633z M42.15,577.526
	c-1.663-0.03-3.311,0.449-4.299,1.363s-1.318,2.262-1.348,3.596c-0.03,1.333,0.24,2.651,1.318,3.146s2.966,0.165,4.854-0.465
	c1.887-0.629,3.775-1.558,4.524-2.696s0.359-2.486-0.674-3.431C45.491,578.096,43.813,577.557,42.15,577.526L42.15,577.526z
	 M53.4,568.778c-1.079,0.389-2.038,1.527-2.592,2.95c-0.554,1.424-0.704,3.132-0.644,4.524c0.06,1.394,0.33,2.472,1.228,2.472
	c0.899,0,2.427-1.078,3.506-2.441c1.078-1.363,1.708-3.011,1.962-4.255c0.255-1.243,0.135-2.082-0.524-2.681
	C55.677,568.748,54.479,568.389,53.4,568.778L53.4,568.778z M63.871,556.719c-1.423,0.465-2.951,1.663-3.49,3.281
	c-0.539,1.617-0.09,3.655,0.824,4.523c0.914,0.869,2.292,0.569,3.461-0.239c1.168-0.81,2.127-2.127,2.636-3.461
	c0.509-1.333,0.569-2.682-0.06-3.49C66.613,556.524,65.294,556.255,63.871,556.719L63.871,556.719z M71.137,614.139
	c-1.003,0.149-2.352,0.839-3.273,1.67c-0.921,0.832-1.416,1.805-1.558,2.659c-0.143,0.854,0.067,1.588,0.629,1.947
	c0.562,0.359,1.476,0.345,2.322-0.143c0.846-0.486,1.625-1.445,2.314-2.441s1.288-2.03,1.258-2.741
	C72.8,614.378,72.141,613.988,71.137,614.139L71.137,614.139z M76.484,590.26c-0.779,0.869-1.139,2.038-1.693,3.296
	c-0.554,1.259-1.303,2.606-1.767,3.716c-0.465,1.108-0.645,1.978-0.465,2.576c0.18,0.6,0.719,0.929,1.813,1.019
	c1.093,0.09,2.741-0.06,4.06-0.869c1.318-0.809,2.307-2.276,2.771-3.97c0.464-1.692,0.404-3.61,0.06-4.943s-0.974-2.082-1.888-2.172
	S77.263,589.392,76.484,590.26L76.484,590.26z M88.453,589.706c-1.124,0.314-2.532,0.734-3.056,1.678
	c-0.524,0.943-0.165,2.412,0.719,3.101c0.884,0.689,2.292,0.6,3.431-0.104c1.138-0.704,2.007-2.022,2.247-3.026
	s-0.15-1.692-0.764-1.932C90.416,589.182,89.577,589.392,88.453,589.706z`,

}).clone({
	name: 'japan_draw',
	startX: 200,
	method: 'draw',
	showBoundingBox: false,

}).clone({
	name: 'japan_drawFill',
	startX: 500,
	method: 'drawFill',

}).clone({
	name: 'japan_fillDraw',
	startX: 350,
	method: 'fillDraw',
	sharedState: true

}).clone({
	name: 'japan_floatOver',
	startX: 50,
	startY: 170,
	method: 'floatOver'

}).clone({
	name: 'japan_sinkInto',
	startX: 200,
	method: 'sinkInto',

}).clone({
	name: 'japan_clear',
	startX: 350,
	method: 'clear'
});

scrawl.makeWheel({
	fillStyle: 'red',
	radius: 5,

	handleX: 'center',
	handleY: 'center',
	
	pivot: 'japan_fill',
	lockTo: 'pivot',
});

// Change the fill and stroke styles on one of the blocks, and any block sharing that block's state
scrawl.library.artefact.japan_fillDraw.set({
	fillStyle: 'blue',
	strokeStyle: 'coral'
});


// Create the drag-and-drop zone
let current = scrawl.makeDragZone({

	zone: canvas,
	endOn: ['up', 'leave'],
	exposeCurrentArtefact: true,
});


// Function to display frames-per-second data, and other information relevant to the demo
let report = function () {

	let testTicker = Date.now(),
		testTime, testNow, dragging,
		testMessage = document.querySelector('#reportmessage');

	return function () {

		testNow = Date.now();
		testTime = testNow - testTicker;
		testTicker = testNow;

		dragging = current();

		testMessage.textContent = `Screen refresh: ${Math.ceil(testTime)}ms; fps: ${Math.floor(1000 / testTime)}
Currently dragging: ${(dragging) ? dragging.artefact.name : 'nothing'}`;
	};
}();


// Create the Animation loop which will run the Display cycle
scrawl.makeRender({

	name: 'demo-animation',
	target: canvas,
	afterShow: report,
});
