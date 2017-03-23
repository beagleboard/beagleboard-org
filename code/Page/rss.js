function rss_action ()
 {
  // Handles action for displaying the children of a page
  res.handlers["User"] = User();
  res.contentType = "application/rss+xml";
  res.data.title = this.uri + "";
  res.data.href = "https://beagleboard.org" + this.href();
  res.data.body = this.rssBody();
  renderSkin("rss");
 }

function rssBody ()
 {
  function html_escape (str)
   {
    return String(str)
     .replace(/&/g, '&amp;')
     .replace(/"/g, '&quot;')
     .replace(/'/g, '&#39;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;');
   }

  var body = "";
  var collection = [];

  try
   {
    var sort = "time desc";
    var orderedByDate = this.getOrderedView(sort);
    collection = orderedByDate.list();
   }
  catch (ex)
   {
   }
   
  for (var i in collection)
   {
    var rfc882time = "" + collection[i].time;
    rfc882time = rfc882time.substring(0,3) + ',' // Dow
     + ' ' + rfc882time.substring(8,10)          // DD
     + ' ' + rfc882time.substring(4,7)           // Mon
     + ' ' + rfc882time.substring(11,15)         // YYYY
     + ' ' + rfc882time.substring(16,24)         // HH:MM::SS
     + ' UT';
     //+ ' ' + rfc882time.substring(35,38);        // ZZZ
    body += "  <item>\n";
    body += "   <title>" + collection[i].uri + "</title>\n";
    body += "   <link>http://beagleboard.org" + collection[i].href() + "</link>\n";
    body += "   <guid>http://beagleboard.org" + collection[i].href() + "</guid>\n";
    if(typeof collection[i].shortdesc !== 'undefined')
     body += "   <description><![CDATA[" + collection[i].shortdesc + "]]></description>\n";
    else
     //body += "   <description>" + collection[i].uri + "</description>\n";
     body += "   <description>" + html_escape(collection[i].body) + "</description>\n";
    body += "   <dc:creator>" + collection[i].user.replace(/\@.*$/, "") + "</dc:creator>\n";
    body += "   <pubDate>" + rfc882time + "</pubDate>\n";
    body += "  </item>\n";
   }
  return (body);
 }
