var Animal = {
	initialize: function() {
		Animal.browserPrefix = "-webkit-"; // insert actual browser prefix via script
	},

	// Common Interface:
	// First parameter is the element, second is an object with options

	jiggle: function( elem, opts ) {
		if ( opts == undefined ) opts = {};
		_.defaults( opts, {
			"duration": "1s",
			"magnitude": 1,
			"onFinish": function(){}
		});
		var animation = Animal.createKeyframes({
			"0%": "-webkit-transform: scale( 1 );",
			"10%": "-webkit-transform: scale( "+ (1+0.2*opts.magnitude) +" );",
			"25%": "-webkit-transform: scale( "+ (0.9*opts.magnitude) +" );",
			"40%": "-webkit-transform: scale( "+ (1+0.1*opts.magnitude) +" );",
			"60%": "-webkit-transform: scale( "+ (0.95*opts.magnitude) +" );",
			"80%": "-webkit-transform: scale( "+ (1+0.05*opts.magnitude) +" );",
			"100%": "-webkit-transform: scale( 1 );"
		});
		$( elem ).css({ "-webkit-animation": "testAnimation "+opts.duration+" ease-out 1" });
		_.delay( function() {
			$( elem ).css({ "-webkit-animation": "none" });
			opts.onFinish( $( elem ) );
		}, 1000 );
		return $( elem );
	},

	fall: function( elem, opts ) {
		if ( opts == undefined ) opts = {};
		_.defaults( opts, {
			"duration": "1s",
			"onFinish": function(){}
		});
		$( elem ).css({ "-webkit-transform-origin": "50% 100%" });
		var animation = Animal.createKeyframes({
			"from": "-webkit-transform: rotateX( 0 )",
			"to": "-webkit-transform: rotateX( -90deg ); opacity:0"
		});
		$( elem ).css({ "-webkit-animation": "testAnimation "+opts.duration+" ease-in 1" });
		_.delay( function() {
			$( elem ).css({ "-webkit-animation": "none", "-webkit-transform": "rotateX( -90deg )", "opacity": 0 });
			opts.onFinish( $( elem ) );
		}, 1000 );
		return $( elem );
	},

	shake: function( elem, opts ) {
		if ( opts == undefined ) opts = {};
		_.defaults( opts, {
			"duration": "0.5s",
			"magnitude": 1,
			"onFinish": function(){}
		});
		var animation = Animal.createKeyframes({
			"0%": "-webkit-transform: translate( 0, 0 );",
			"10%": "-webkit-transform: translate( "+ (10*opts.magnitude) +"px, 0 );",
			"25%": "-webkit-transform: translate( "+ (-10*opts.magnitude) +"px, 0 );",
			"40%": "-webkit-transform: translate( "+ (6*opts.magnitude) +"px, 0 );",
			"60%": "-webkit-transform: translate( "+ (-6*opts.magnitude) +"px, 0 );",
			"80%": "-webkit-transform: translate( "+ (2*opts.magnitude) +"px, 0 );",
			"100%": "-webkit-transform: translate( 0, 0 );"
		});
		$( elem ).css({ "-webkit-animation": "testAnimation "+opts.duration+" ease-out 1" });
		_.delay( function() {
			$( elem ).css({ "-webkit-animation": "none" });
			opts.onFinish( $( elem ) );
		}, 500 );
		return $( elem );
	},

	fallIn: function( elem, opts ) {
		if ( opts == undefined ) opts = {};
		_.defaults( opts, {
			"duration": "1s",
			"onFinish": function(){}
		});
		$( elem ).css({ "-webkit-transform-origin": "50% 100%" });
		var animation = Animal.createKeyframes({
			"0%": "-webkit-transform: translate( 0, -100px ); opacity: 0",
			"20%": "-webkit-transform: translate( 0, 0 ); opacity: 1",
			"25%": "-webkit-transform: scale( 1, 0.8 );",
			"35%": "-webkit-transform: scale( 1, 1.2 );",
			"50%": "-webkit-transform: scale( 1, 0.9 );",
			"65%": "-webkit-transform: scale( 1, 1.05 );",
			"85%": "-webkit-transform: scale( 1, 0.97 );",
			"100%": "-webkit-transform: none;"
		});
		$( elem ).css({ "-webkit-animation": "testAnimation "+opts.duration+" linear 1" });
		_.delay( function() {
			$( elem ).css({ "-webkit-animation": "none" });
			opts.onFinish( $( elem ) );
		}, 1000 );
		return $( elem );
	},

	createKeyframes: function( opts ) {
		// generate random class identifier and add keyframes to the document
		// return the class identifier
		var animationName = "testAnimation";
		var keyframeString = "<style type='text/css'>";
		keyframeString += "@-webkit-keyframes " + animationName + " {";
		_.each( opts, function( item, key ) {
			keyframeString += key + " {";
			keyframeString += item;
			keyframeString += "}";
		});
		keyframeString += "}</style>";
		$( 'head' ).append( $( keyframeString ) );
		return animationName;
	}
}