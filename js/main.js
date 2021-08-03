// Trigger the domain search when the button is clicked
$( '#search-button' ).on( 'click', this.fakeSearch );

// Trigger the button when enter is hit while search has focus
$( '#search-input' ).keydown( function( event ) {
    var keyCode = ( event.keyCode ? event.keyCode : event.which );
    if ( keyCode == 13 ) {
		$( '#search-button' ).click();
		return false;
	}
});

// Choose a domain
$( '.card', '#search-results' ).on( 'click', function() {
	var selectedCard = $( this ),
	    selectedDomain = $( 'h2', selectedCard ).html(),
	    processedDomain = selectedDomain.replace('Unavailable', '').replace('New', '').replace(/(<([^>]+)>)/ig,"");

	if ( selectedCard.hasClass( 'free' ) ) {
		goToStep( 'plan' );
	} else if ( selectedCard.hasClass( 'upgrade' ) ) {
		var emailDomain = $( '#email-domain' );
		emailDomain.html( '@' + selectedDomain );
		goToStep( 'email' );
	} else if ( selectedCard.hasClass( 'map' ) ) {
		var mappingURL = $( '#mapping-url' );
		mappingURL.val( '' );

		if ( selectedCard.hasClass( 'map-searched' ) ) {
			$( '#mapping-url' ).val( processedDomain );
		}
		goToStep( 'map' );
	}
} );

function fakeSearch() {
	var button = $( this ),
	    searchInput = $( '#search-input' ),
	    searchQuery = query = searchInput.val(),
	    searchResults = $( '#search-results' ),
	    resultsHeading = $( '#results-heading' ),
	    resultsDomains = $( '.search-domain', searchResults );

	searchResults.removeClass( 'is-hidden' );

	searchQuery = searchQuery.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();

	resultsHeading.html( 'Finding domains...' );

	button.addClass( 'is-searching' );
	button.html( 'Looking...' )

	searchResults.addClass( 'is-loading' );

	resultsDomains.html( searchQuery );

	setTimeout( function() {
		resultsHeading.html( 'Available Domains' );

		button.removeClass( 'is-searching' );
		button.html( 'Search' );

		searchResults.removeClass( 'is-loading' );
	}, 2000 );
}
