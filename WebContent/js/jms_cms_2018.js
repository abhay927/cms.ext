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

//get parameter from url
function getParameters(url) {
  var result = {};
  if (!url) url = window.location.href;
  var a = document.createElement('a');
  a.href = url;
  console.log(a.search);
  console.log(decodeURIComponent(a.search));
  var search = decodeURIComponent(a.search);
  var r = search.substring(1).split('&');

  r.forEach(function(p){
    var kv = p.split('=');
    console.log(kv[0], ":", kv[1]);
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
function filter(data, filter){
  return [];
}