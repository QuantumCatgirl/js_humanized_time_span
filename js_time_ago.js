function time_ago(date, ref_date, date_formats, time_units) {
  //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
  var date_formats = date_formats || [
    { ceiling: 60, text: "$seconds seconds ago" },
    { ceiling: 3600, text: "$minutes minutes ago" },
    { ceiling: 86400, text: "$hours hours ago" },
    { ceiling: 2629744, text: "$days days ago" },
    { ceiling: 31556926, text: "$months months ago" },
    { ceiling: null, text: "$years years ago" }
  ]
  //Time units must be be ordered largest -> smallest
  var time_units = time_units || [
    [31556926, 'years'],
    [2629744, 'months'],
    [86400, 'days'],
    [3600, 'hours'],
    [60, 'minutes'],
    [1, 'seconds']
  ]
  
  date = new Date(date);
  ref_date = ref_date ? new Date(ref_date) : new Date();
  var seconds_difference = (ref_date - date) / 1000;
  
  function get_format() {
    for (var i=0; i<date_formats.length; i++) {
      if (date_formats[i].ceiling == null || seconds_difference <= date_formats[i].ceiling) {
        return date_formats[i];
      }
    }
  }
  
  function get_time_breakdown() {
    var seconds = seconds_difference;
    var breakdown = {}
    for(var i=0; i<time_units.length; i++) {
      var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
      seconds = seconds - (time_units[i][0] * occurences_of_unit);
      breakdown[time_units[i][1]] = occurences_of_unit;
    }
    return breakdown;
  }

  function render_date(date_format) {
    var breakdown = get_time_breakdown();
    var time_ago_text = date_format.text.replace(/\$(\w+)/g, function() {
      return eval("breakdown." + arguments[1]);
    });
    return depluralize_time_ago_text(time_ago_text, breakdown);
  }
  
  function depluralize_time_ago_text(time_ago_text, breakdown) {
    for(var i in breakdown) {
      if (breakdown[i] == 1) {
        var regexp = new RegExp("\\b"+i+"\\b");
        time_ago_text = time_ago_text.replace(regexp, function() {
          return arguments[0].replace(/s\b/g, '');
        });
      }
    }
    return time_ago_text;
  }
          
  return render_date(get_format());
}