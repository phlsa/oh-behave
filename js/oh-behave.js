var Behave = {
	initialize: function() {
		Behave.browserPrefix = "-webkit-"; // insert actual browser prefix via script
	},

	// Common Interface:
	// First parameter is the element, second is an object with options

	jiggle: function( elem, opts ) {
		opts = Behave.defaultOptions( opts, {
			magnitude: 1
		});
		var animation = Behave.createKeyframes({
			"0%": "-webkit-transform: scale( 1 );",
			"10%": "-webkit-transform: scale( "+ (1+0.2*opts.magnitude) +" );",
			"25%": "-webkit-transform: scale( "+ (0.9*opts.magnitude) +" );",
			"40%": "-webkit-transform: scale( "+ (1+0.1*opts.magnitude) +" );",
			"60%": "-webkit-transform: scale( "+ (0.95*opts.magnitude) +" );",
			"80%": "-webkit-transform: scale( "+ (1+0.02*opts.magnitude) +" );",
			"100%": "-webkit-transform: scale( 1 );"
		});
		$( elem ).css({ "-webkit-animation": animation + " "+opts.duration+"ms ease-out 1" });
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	fall3d: function( elem, opts ) {
		opts = Behave.defaultOptions( opts );
		$( elem ).css({ "-webkit-transform-origin": "50% 100%" });
		var animation = Behave.createKeyframes({
			"from": "-webkit-transform: rotateX( 0 )",
			"to": "-webkit-transform: rotateX( -90deg ); opacity:0"
		});
		$( elem ).css({ "-webkit-animation": animation + " "+opts.duration+"ms ease-in 1" });
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	sheetIn: function( elem, opts ) {
		// like the sheets in OSX
	},
	sheetOut: function( elem, opts ) {
		// like the sheets in OSX
	},

	shake: function( elem, opts ) {
		opts = Behave.defaultOptions( opts, {
			magnitude: 1,
			duration: 500
		});
		var animation = Behave.createKeyframes({
			"0%": "-webkit-transform: translate( 0, 0 );",
			"10%": "-webkit-transform: translate( "+ (10*opts.magnitude) +"px, 0 );",
			"25%": "-webkit-transform: translate( "+ (-10*opts.magnitude) +"px, 0 );",
			"40%": "-webkit-transform: translate( "+ (6*opts.magnitude) +"px, 0 );",
			"60%": "-webkit-transform: translate( "+ (-6*opts.magnitude) +"px, 0 );",
			"80%": "-webkit-transform: translate( "+ (2*opts.magnitude) +"px, 0 );",
			"100%": "-webkit-transform: translate( 0, 0 );"
		});
		$( elem ).css({ "-webkit-animation": animation + " "+opts.duration+"ms ease-out 1" });
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	fallIn: function( elem, opts ) {
		opts = Behave.defaultOptions( opts );
		$( elem ).css({ "-webkit-transform-origin": "50% 100%" });
		var animation = Behave.createKeyframes({
			"0%": "-webkit-transform: translate( 0, -100px ); opacity: 0",
			"20%": "-webkit-transform: translate( 0, 0 ); opacity: 1",
			"25%": "-webkit-transform: scale( 1, 0.8 );",
			"35%": "-webkit-transform: scale( 1, 1.2 );",
			"50%": "-webkit-transform: scale( 1, 0.9 );",
			"65%": "-webkit-transform: scale( 1, 1.05 );",
			"85%": "-webkit-transform: scale( 1, 0.97 );",
			"100%": "-webkit-transform: none;"
		});
		$( elem ).css({ "-webkit-animation": animation + " "+opts.duration+"ms linear 1" });
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	fallOff: function( elem, opts ) {
		opts = Behave.defaultOptions( opts, {
			maximumRotation: 180
		});
		$( elem ).css({ "-webkit-transform-origin": "100% 100%" });
		var animation = Behave.createKeyframes({
			"0%": "-webkit-transform: none",
			"15%": "-webkit-transform: rotate( -" + opts.maximumRotation*1 + "deg );",
			"30%": "-webkit-transform: rotate( -" + opts.maximumRotation*0.38 + "deg );",
			"45%": "-webkit-transform: rotate( -" + opts.maximumRotation*0.77 + "deg );",
			"60%": "-webkit-transform: rotate( -" + opts.maximumRotation*0.55 + "deg );",
			"80%": "-webkit-transform: rotate( -" + opts.maximumRotation*0.66 + "deg ); opacity: 1;",
			"100%": "-webkit-transform: translate( 0, 200% ) rotate( -" + opts.maximumRotation*0.53 + "deg ); opacity: 0;"
		});
		$( elem ).css({ "-webkit-animation": animation + " "+opts.duration+"ms ease-out 1" });
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	defaultOptions: function( opts, localDefaults ) {
		if ( opts == undefined ) opts = {};
		_.defaults( opts, localDefaults, {
			duration: 1000,
			onFinish: function(){}
		});
		return opts;
	},

	cleanupDelayed: function( elem, opts, actions ) {
		_.delay( function() {
			$( elem ).css({ "-webkit-animation": "none" });
			opts.onFinish( $(elem) );
			if ( actions ) actions();
		}, opts.duration );
	},

	createKeyframes: function( opts ) {
		// generate random class identifier and add keyframes to the document
		// return the class identifier
		var styleElement;
		if ( $( '#oh-behave-styles' ).length === 0 ) {
			styleElement = $( "<style type='text/css' id='oh-behave-styles'></style>" );
			$( 'head' ).append( styleElement );
		} else {
			styleElement = $( '#oh-behave-styles' );
		}
		var animationName = "ohBehaveAnimation";
		var keyframeString = "";
		keyframeString += "@-webkit-keyframes " + animationName + " {";
		_.each( opts, function( item, key ) {
			keyframeString += key + " {";
			keyframeString += item;
			keyframeString += "}";
		});
		keyframeString += "}";
		
		styleElement.text( keyframeString );
		return animationName;
	}
}