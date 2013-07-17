var Behave = {
	initialize: function() {
		//Behave.browserPrefix = "-webkit-"; // insert actual browser prefix via script
		//Behave.generateBrowserPrefix();
	},

	// Common Interface:
	// First parameter is the element, second is an object with options

	jiggle: function( elem, opts ) {
		opts = Behave.defaultOptions( opts, {
			magnitude: 1
		});
		var animation = Behave.createKeyframes({
			"0%": Behave.prefix()+"transform: scale( 1 );",
			"10%": Behave.prefix()+"transform: scale( "+ (1+0.2*opts.magnitude) +" );",
			"25%": Behave.prefix()+"transform: scale( "+ (0.9*opts.magnitude) +" );",
			"40%": Behave.prefix()+"transform: scale( "+ (1+0.1*opts.magnitude) +" );",
			"60%": Behave.prefix()+"transform: scale( "+ (0.95*opts.magnitude) +" );",
			"80%": Behave.prefix()+"transform: scale( "+ (1+0.02*opts.magnitude) +" );",
			"100%": Behave.prefix()+"transform: scale( 1 );"
		});
		$( elem ).css( Behave.prefixedCss( "animation", animation + " "+opts.duration+"ms ease-out "+ opts.delay +"ms" ));
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	fall3d: function( elem, opts ) {
		opts = Behave.defaultOptions( opts );
		var css =
		$( elem ).css( Behave.prefixedCss( "transform-origin", "50% 100%" ));
		var animation = Behave.createKeyframes({
			"from": Behave.prefix()+"transform: rotateX( 0 )",
			"to": Behave.prefix()+"transform: rotateX( -90deg ); opacity:0"
		});
		$( elem ).css( Behave.prefixedCss( "animation", animation + " "+opts.duration+"ms ease-in "+ opts.delay +"ms" ));
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
			"0%": Behave.prefix()+"transform: translate( 0, 0 );",
			"10%": Behave.prefix()+"transform: translate( "+ (10*opts.magnitude) +"px, 0 );",
			"25%": Behave.prefix()+"transform: translate( "+ (-10*opts.magnitude) +"px, 0 );",
			"40%": Behave.prefix()+"transform: translate( "+ (6*opts.magnitude) +"px, 0 );",
			"60%": Behave.prefix()+"transform: translate( "+ (-6*opts.magnitude) +"px, 0 );",
			"80%": Behave.prefix()+"transform: translate( "+ (2*opts.magnitude) +"px, 0 );",
			"100%": Behave.prefix()+"transform: translate( 0, 0 );"
		});
		$( elem ).css( Behave.prefixedCss( "animation", animation + " "+opts.duration+"ms ease-out "+ opts.delay +"ms" ));
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	fallIn: function( elem, opts ) {
		opts = Behave.defaultOptions( opts );
		$( elem ).css( Behave.prefixedCss( "transform-origin", "50% 100%" ));
		var animation = Behave.createKeyframes({
			"0%": Behave.prefix()+"transform: translate( 0, -100px ); opacity: 0",
			"20%": Behave.prefix()+"transform: translate( 0, 0 ); opacity: 1",
			"25%": Behave.prefix()+"transform: scale( 1, 0.8 );",
			"35%": Behave.prefix()+"transform: scale( 1, 1.2 );",
			"50%": Behave.prefix()+"transform: scale( 1, 0.9 );",
			"65%": Behave.prefix()+"transform: scale( 1, 1.05 );",
			"85%": Behave.prefix()+"transform: scale( 1, 0.97 );",
			"100%": Behave.prefix()+"transform: none;"
		});
		$( elem ).css( Behave.prefixedCss( "animation", animation + " "+opts.duration+"ms ease-out "+ opts.delay +"ms" ));
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	fallOff: function( elem, opts ) {
		opts = Behave.defaultOptions( opts, {
			maximumRotation: 180
		});
		$( elem ).css( Behave.prefixedCss( "transform-origin", "100% 100%" ));
		var animation = Behave.createKeyframes({
			"0%": Behave.prefix()+"transform: none",
			"15%": Behave.prefix()+"transform: rotate( -" + opts.maximumRotation*1 + "deg );",
			"30%": Behave.prefix()+"transform: rotate( -" + opts.maximumRotation*0.38 + "deg );",
			"45%": Behave.prefix()+"transform: rotate( -" + opts.maximumRotation*0.77 + "deg );",
			"60%": Behave.prefix()+"transform: rotate( -" + opts.maximumRotation*0.55 + "deg );",
			"80%": Behave.prefix()+"transform: rotate( -" + opts.maximumRotation*0.66 + "deg ); opacity: 1;",
			"100%": Behave.prefix()+"transform: translate( 0, 200% ) rotate( -" + opts.maximumRotation*0.53 + "deg ); opacity: 0;"
		});
		$( elem ).css( Behave.prefixedCss( "animation", animation + " "+opts.duration+"ms ease-out "+ opts.delay +"ms" ));
		Behave.cleanupDelayed( elem, opts );
		return $( elem );
	},

	cascade: function( elems, opts ) {
		opts = Behave.defaultOptions( opts, {
			behavior: 'jiggle',
			offset: 500,
			options: {}
		});
		_.each( elems, function( item, index ) {
			_.delay( function() {
				Behave[opts.behavior]( $( item ), opts.options )
			}, opts.offset*index);
		});
	},

	defaultOptions: function( opts, localDefaults ) {
		if ( opts == undefined ) opts = {};
		_.defaults( opts, localDefaults, {
			duration: 1000,
			delay: 0,
			onFinish: function(){}
		});
		return opts;
	},

	cleanupDelayed: function( elem, opts, actions ) {
		_.delay( function() {
			$( elem ).css( Behave.prefixedCss( "animation", "none" ));
			opts.onFinish( $(elem) );
			if ( actions ) actions();
		}, opts.duration+opts.delay );
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
		keyframeString += "@"+ Behave.prefix() +"keyframes " + animationName + " {";
		_.each( opts, function( item, key ) {
			keyframeString += key + " {";
			keyframeString += item;
			keyframeString += "}";
		});
		keyframeString += "}";
		
		styleElement.text( keyframeString );
		return animationName;
	},

	generateBrowserPrefix: function( str ) {
		Behave.browserPrefix = (function() {
			if( 'result' in arguments.callee ) return arguments.callee.result;
			var regex = /^(moz|webkit|khtml|o|ms|icab)(?=[A-Z])/;
			var someScript = document.getElementsByTagName('script')[0];

			for( var prop in someScript.style ) {
				if( regex.test( prop ) ) {
					return arguments.callee.result = prop.match( regex )[0];
				}
			}
			if( 'WebkitOpacity' in someScript.style ) return arguments.callee.result = 'webkit';
			if( 'KhtmlOpacity' in someScript.style ) return arguments.callee.result = 'khtml';
			return arguments.callee.result = '';
		})();
		
		if ( Behave.browserPrefix === "moz" ) {
			Behave.browserPrefix = "";
		}
	},

	prefix: function() {
		if ( Behave.browserPrefix === undefined ) {
			Behave.generateBrowserPrefix();
		}
		if ( Behave.browserPrefix == "" ) {
			return Behave.browserPrefix;
		} else {
			return "-" + Behave.browserPrefix + "-";
		}
	},

	prefixedCss: function( property, opts, more ) {
		var css = {};
		css[Behave.prefix() + property] = opts;
		_.extend( css, more );
		return css;
	}
}