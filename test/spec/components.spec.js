'use strict';

describeComponent('lib/components', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  describe('Lisents to ui-needs-flight-components', function () {
    describe('With a successful response', function () {
      it('and calls the success callback', function () {
        var successSpy = spyOn(this.component, 'successCallback');
        spyOn($, "ajax").andCallFake(function(options) { options.success(); });

        $(document).trigger('ui-needs-flight-components');
        expect(successSpy).toHaveBeenCalled();
      });
    });

    describe('With an unsuccessful response', function () {
      it('and calls the error callback', function () {
        var errorSpy = spyOn(this.component, 'errorCallback');
        spyOn($, "ajax").andCallFake(function(options) { options.error(); });

        $(document).trigger('ui-needs-flight-components');
        expect(errorSpy).toHaveBeenCalled();
      });
    });
  });

  describe('#successCallback', function () {
    it('triggers flight-components-served', function () {
      var eventSpy = spyOnEvent(document, 'flight-components-served');
      this.component.successCallback([{name: 'flight-js'}]);
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  });

  describe('#errorCallback', function () {
    it('triggers flight-components-error', function () {
      var eventSpy = spyOnEvent(document, 'flight-components-error');
      this.component.errorCallback([{name: 'flight-js'}]);
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  });

  describe('#filterComponents', function () {
    var components;

    beforeEach(function () {
      components = [
        {name: 'flight-one'},
        {name: 'not-flight'},
        {name: 'flight-two'},
        {name: 'something-else'}
      ];
    });

    it('filtes the components matching the matchRegex', function () {
      var flightComponents = [{name: 'flight-one'}, {name: 'flight-two'}];
      expect(this.component.filterComponents(components, /^flight-/)).toEqual(flightComponents);
    });
  });
});
