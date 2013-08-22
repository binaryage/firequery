// this code wraps jQuery's data-related methods
// wrapped methods send events to firequery when data is manipulated on element
// this code is compatible with jQuery 2.0+
(function($) {

  // wrap data calls on collections

  var originalDataFn = $.fn.originalDataReplacedByFireQuery = $.fn.data;
  var originalRemoveDataFn = $.fn.originalRemoveDataReplacedByFireQuery = $.fn.removeData;

  var wrap = function(originalImp) {
    return function() {
      // snapshot previous state, apply original implementation, snapshot new state
      var oldValues = $.extend(true, {}, originalDataFn.apply(this)); // need to do a deep copy of the whole structure
      var res = originalImp.apply(this, arguments);
      var newValues = $.extend(true, {}, originalDataFn.apply(this)); // need to do a deep copy of the whole structure
      // prepare event payload
      var detail = {
        bubbles: true,
        oldValues: oldValues,
        newValues: newValues
      };
      // send event for each matched element
      this.each(function() {
        var event = new CustomEvent("firequery-event", { "detail": detail });
        this.dispatchEvent(event);
      });
      // simulate original return value
      return res;
    };
  };

  $.fn.data = wrap(originalDataFn);
  $.fn.removeData = wrap(originalRemoveDataFn);

  // wrap data calls on jQuery object

  var originalData = $.originalDataReplacedByFireQuery = $.data;
  var originalRemoveData = $.originalRemoveDataReplacedByFireQuery = $.removeData;

  var wrap2 = function(originalImp) {
    return function(elem) {
      // snapshot previous state, apply original implementation, snapshot new state
      var oldValues = $.extend(true, {}, originalData.apply(this, [elem])); // need to do a deep copy of the whole structure
      var res = originalImp.apply(this, arguments);
      var newValues = $.extend(true, {}, originalData.apply(this, [elem])); // need to do a deep copy of the whole structure
      // prepare event payload
      var detail = {
        bubbles: true,
        oldValues: oldValues,
        newValues: newValues
      };
      // send event
      var event = new CustomEvent("firequery-event", { "detail": detail });
      elem.dispatchEvent(event);
      // simulate original return value
      return res;
    };
  };

  $.data = wrap2(originalData);
  $.removeData = wrap2(originalRemoveData);

})(jQuery);