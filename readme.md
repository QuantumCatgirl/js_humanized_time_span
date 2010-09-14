js_time_ago
===========

js_time_ago returns the difference between two Dates as a nice, human string.


usage
-----

Include the script (it's native JS so doesn't require anything else) and you're ready to go.

###Syntax
    time_ago(date, ref_date, date_formats, time_units)
  
Only date is required.

###Examples

    time_ago("2010/09/10 10:00:00") => "3 days ago" (using now as a reference)
  
    time_ago("2010/09/10 10:00:00", "2010/09/10 12:00:00") => "2 days ago"


