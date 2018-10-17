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

function up2Quarter(cost){
    var x = parseFloat(cost, 10);
    
    var ip = Math.floor(x);
    var fp = x - ip;
    if (fp > 0 && fp <= 0.25){
        return ip + 0.25;
    } 
    if (fp > 0.25 && fp <= 0.50){
        return ip + 0.50;
    }
    if (fp > 0.50 && fp <= 0.75){
        return ip + 0.75;
    }
    if (fp > 0.75 && fp <= 0.99){
        return ip + 1.00;
    }
    return ip;
}

function verifyQuarter(sender){
    if (sender.value == ""){
        return;
    }
    var q = up2Quarter(sender.value);

    if (q != sender.value){
        msg = "By JMS project quarter, only '.00, .25, .50, .75' are valid,\nDo you want to update '" 
            + sender.value 
            + "' to '" 
            + q.toFixed(2) + "'";
        if (confirm(msg)) {
            sender.value = q.toFixed(2);
        } else {
            sender.value = "";
            sender.focus();
        }
    }
}

//get parameter from url
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//get parameters from url
function getParameters(url) {
  var result = {};
  if (!url) url = window.location.href;
  var a = document.createElement('a');
  a.href = url;

  var search = decodeURIComponent(a.search);
  var r = search.substring(1).split('&');

  r.forEach(function(p){
    var kv = p.split('=');
    result[kv[0]] = kv[1];
  });
  return result;
}

// return true if obj exactly has all same attributes in filter and value must equals.
function isMatch(obj, filter){
  for(k in filter){
    if (! k in obj || filter[k] != obj[k]){
      return false;
    }
  }
  return true;
}
