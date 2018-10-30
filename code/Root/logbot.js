global.logdirLocation = '/home/ubuntu/helma-1.6.1/apps/beagle/static/irclog';
global.logbot = false;

function startLogbot() 
 {
  var logdir = new java.io.File(global.logdirLocation);
  logdir.mkdirs();
  if (logdir.isDirectory()) 
   {
    var server = "irc.freenode.net";
    var channel = java.lang.String("#beagle");
    var nick = java.lang.String("BeagleBot");
    var passwd = 'BeNice';  // change password

    var d = new Date();
    var logdate = d.getFullYear() + "-" + ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    var logname = global.logdirLocation + '/' + logdate + '.log';
    try
     {
      var log = new java.io.File(logname);
      var writer = new java.io.FileWriter(log);
      var bufferedWriter = new java.io.BufferedWriter(writer);
     }
    catch (ex)
     {
     }

    var authenticator = new Packages.org.pircbotx.cap.SASLCapHandler(nick, passwd);
    var builder = new Packages.org.pircbotx.Configuration.Builder();
    builder.addServer(server);
    builder.setName(nick);
    builder.setIdentServerEnabled(true);
    builder.addAutoJoinChannel(channel);
    builder.addCapHandler(authenticator);
    var config = builder.buildConfiguration();
    global.logbot = new Packages.org.pircbotx.PirkBotX(config);
    global.logbot.startBot();
   }
  else
   global.logbot = "Couldn't create log directory";
 }

if (!global.logbot) 
 {
  defineLibraryScope('logbot');
  try
   {
    if (false)
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
    var logname = global.logdirLocation + '/' + logdate + '.log';
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
