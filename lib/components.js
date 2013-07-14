define(function (require) {

  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(dataFlightComponents);

  function dataFlightComponents() {
    this.defaultAttrs({
      url: 'http://bower-component-list.herokuapp.com/',
      matchRegex: /^flight-/
    });

    this.filterComponents = function (components, regex) {
      return components.filter(function (component) {
        return component.name.match(regex);
      });
    }

    this.error = function (data) {
      this.trigger("data-flight-components-error", {
        error: data
      });
    };

    this.success = function (data) {
      this.trigger("data-flight-components-served", {
        components: this.filterComponents(data, this.attr.matchRegex)
      });
    };

    this.fetchComponents = function () {
      $.ajax({
        dataType: 'json',
        url: this.attr.url,
        success: this.success,
        error: this.error
      });
    };

    this.after('initialize', function () {
      this.on(document, "ui-needs-flight-components", this.fetchComponents);
    });
  }

});
