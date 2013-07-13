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
			"magnitude": 1
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