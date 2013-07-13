define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(components);

  /**
   * Module function
   */

  function components() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
