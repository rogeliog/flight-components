'use strict';

describeComponent('lib/components', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });


  describe('Lisents to ui-needs-flight-components', function () {
    describe('With a successful response', function () {
      it('and calls the success callback', function () {
        var successSpy = spyOn(this.component, 'success');
        spyOn($, "ajax").andCallFake(function(options) { options.success(); });

        $(document).trigger('ui-needs-flight-components');
        expect(successSpy).toHaveBeenCalled();
      });
    });

    describe('With an unsuccessful response', function () {
      it('and calls the error callback', function () {
        var errorSpy = spyOn(this.component, 'error');
        spyOn($, "ajax").andCallFake(function(options) { options.error(); });

        $(document).trigger('ui-needs-flight-components');
        expect(errorSpy).toHaveBeenCalled();
      });
    });
  });
});
