// Taken from zumbrunn (http://helma.zumbrunn.net/hopbot/2008-03-07)
// Uses http://www.jibble.org/logbot/ and http://www.jibble.org/pircbot.php
// Patched with http://rbach.priv.at/Patches/LogBot-20051116.diff
// Built into mflogbot.jar.
function startLogbot() 
 {
  var logdir = new java.io.File('./apps/beagle/static/irclog');
  logdir.mkdirs();
  if (logdir.isDirectory()) 
   {
    var server = "irc.freenode.net";
    var channels = ["#beagle", "#beagleboard", "#beaglebone"];
    var nick = "BeagleBot";
    var passwd = 'BeNice';  // change password
    var joinMessage = "This channel is logged: http://beagleboard.org/irclogs";

    global.logbot = new Packages.org.jibble.logbot.LogBot(nick, logdir, joinMessage);
    global.logbot.setUseSasl(true);
    global.logbot.setSaslCredentials(nick, passwd);
    global.logbot.connect(server);
    for (var channel in channels) {
     global.logbot.joinChannel(channels[channel]);
    }
    global.logbot.sendMessage('NickServ','IDENTIFY '+ passwd);
    for (var channel in channels) {
     global.logbot.sendMessage('ChanServ','OP '+ channels[channel]);
    }
    //global.logbot.setTopic(channel,'Welcome to #Beagle | Discussion about the OMAP3 Beagle Board - http://beagleboard.org | Beagle search tools are on #dashboard at irc.gimp.org, NOT here ;) | Log is at http://beagleboard.org/chat');
   }
  else
   global.logbot = "Couldn't create log directory";
 }

if (!global.logbot) 
 {
  defineLibraryScope('logbot');
  try
   {
    if (true)
     startLogbot();
    else
     global.logbot = "disabled";
   }
  catch(ex)
   {
    app.log("Could not start the logbot due to execption: " + ex);
   }
 }

/**
 * Copyright (C) 2008 Jason Kridner
 */

function chat_action ()
 {
  var x = root.get("chat");
  res.handlers["User"] = User();
  res.handlers["Page"] = Page();
  res.data.title = x.uri;
  res.data.body = x.renderSkinAsString("page");
  if(req.data["date"])
   {
    var logdate = req.data["date"];
    res.data.title += " - " + logdate;
    var logname = './apps/beagle/static/irclog/' + logdate + '.log';
    res.data.irclog = '<ol id="log">\n';
    try
     {
      var log = new java.io.File(logname);
      var reader = new java.io.FileReader(log);
      var bufferedReader = new java.io.BufferedReader(reader);
      do
       {
        line = bufferedReader.readLine();
        if (line)
         res.data.irclog += line + "\n";
       } while (line);
     }
    catch (ex)
     {
     }
    // The point of putting the values into a new variable is to try to figure out
    // how I can put something in the page that is parsed for live replacement.
    res.data.irclog += '</ol>';
    res.data.body += res.data.irclog;
   }
  else
   {
    // TODO: add date listings for browsing
   }
  renderSkin("index");
 }
