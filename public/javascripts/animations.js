angular
  .module('mySite')
  .animation('.slideDown', function() {
    return {
  		addClass: function(element, className, done) {
              jQuery(element).slideDown(done);
  		},
  		removeClass: function(element, className, done) {
  			jQuery(element).slideUp(done);
  		}
  	}
  });
