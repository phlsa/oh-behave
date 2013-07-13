# Oh Behave!
Easy to use behaviors for your web app. Completely without the addClass/removeClass bonanza you usually have to put up with.

# Usage
Include it in your HTML (you currently need jQuery and Underscore for oh-behave to work).
Now make those buttons jiggle!
```javascript
$( 'button' ).click( function( e ) {
	Behave.jiggle( e.currentTarget );
});
```