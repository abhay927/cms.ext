// Load Test Data
// 

;(function($){
  /**
   * $.ajaxs
   * 批量同时发送异步ajax请求。
   * （注意：请求是无序的，若要有序，则可设置globalOpt为true或{byOrder: true}，此时是非同时的）。
   *
   * @param {Array} opts - 放置ajax配置的数组；
   * 可以是：[{},{},...] 、[url_1,url_2,...]；
   * 每个opt对象的配置就是$.ajax的配置。
   * @param {function} [fn] - 当所有的请求成功时的回调函数。
   * @param {Object|boolean} [globalOpt] - 每个opts配置的共同设置；
   * 类似于$.ajax的配置，多了个byOrder属性；
   * (注意：个别的会覆盖全局的)。
   * @returns {Object} - jQuery对象。
   */
  $.extend({
      ajaxs: function (opts, fn, globalOpt) {
          var times = 0, byOrder = false, datas = [];
          if (typeof globalOpt === 'boolean') {
              byOrder = globalOpt;
              globalOpt = {byOrder: byOrder};
          } else {
              byOrder = globalOpt.byOrder;
          }
          $.each(opts, function (i, opt) {
              opt = typeof opt === 'object' ? opt : {url: opt};
              var _globalOpt = $.extend(true, {}, globalOpt),
                  _success = opt.success || _globalOpt.success || $.noop,
                  _opt = $.extend(_globalOpt, opt, {
                      success: function (data, textStatus, $XHR) {
                          _success(data, textStatus, $XHR, i);
                          datas[i] = data;
                          trigger();
                      }
                  });
              byOrder ? (opts[i] = _opt) : $.ajax(_opt);
          });
          byOrder && $.ajax(opts[times]);

          function trigger() {
              times++;
              if (times === opts.length) {
                  fn && fn(datas);
              } else {
                  byOrder && $.ajax(opts[times]);
              }
          }
          return this;
      }
  });
})(jQuery);

// normalizePivotTable, pivot table created by Libre Spread sheet will blank some field if last line had it.
// this function could refill it to create a normalized table.
function normalizePivotTable(table, keys){
  var privValues = {};
  for (var i = 0; i < table.length; i++){
    var c = table[i];
    keys.forEach(function(key){
      if (c[key] === ''){
        c[key] = privValues[key];
      } else {
        privValues[key] = c[key];
      }
    });
  }
  return table;
}
