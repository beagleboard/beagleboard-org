app.addRepository('modules/core/JSON.js');

function updateViewCount_macro (param)
 {
  if (this.pvCount == undefined) {
    this.pvCount = 0;
  }

  //this.pvCount = this.pvCount+1;

  return this.pvCount;
 }

function main_action ()
 {
  if (this.isTransient())
   {
    return (this.notfound_action());
   }

  var alt = req.data["use_alt"];
  var body, render_skin, skin_is_outer, mimetype;
  if (alt && this.alt && this.alt[alt])
   {
    body = this.alt[alt].body;
    render_skin = this.alt[alt].render_skin;
    skin_is_outer = this.alt[alt].skin_is_outer;
    mimetype = this.alt[alt].mimetype;
   }
  else
   {
    body = this.body;
    render_skin = this.render_skin;
    skin_is_outer = this.skin_is_outer;
    mimetype = this.mimetype;
   }

  res.data.title = this.uri;
  if (mimetype)
   res.setContentType(mimetype);
  if (render_skin == "project" && this.pname)
   res.data.title = this.pname;
  if (render_skin == "homepage" || skin_is_outer)
   {
    res.data.body = body;
    renderSkin(render_skin);
    return;
   }
  if (render_skin)
   res.data.body = this.renderSkinAsString(render_skin);
  else
   res.data.body = this.renderSkinAsString("page");
  renderSkin("index");
 }

function constructor(user, uri, body)
 {
  this.user = "" + user;
  this.uri = "" + uri;
  this.body = "" + body;
  this.time = new Date();
 }

function hopper_action ()
 {
  var saveEdit = false;

  //if(this.edit_skin == 'edit_project') return(res.redirect());
  //return;

  if (false)
   {
    //var targetURL = root.href("login") + "?target=" + this.href();
    var targetURL = this.href();
    res.redirect(targetURL);
    return;
   }

  if
   (
    req.data["submit"]
    && req.data["body"]
   )
   {
    this.user = "default";
    if (true)
     {
      saveEdit = true;
     }
    else if (this.cleanBody())
     {
      this.is_xhtml = true;
      try
       {
        if (this.pseudoparent.uri == "project")
         {
          saveEdit = true;
         }
       }
      catch(ex)
       {
        app.log("Failed attempt to edit '" + this.uri + "': " + ex);
       }
     }
    var blocked_attribute = 
     {
      uri: true,
      submit: true,
      user: true,
      time: true,
      body: true,
      lang: true,
      use_alt: true
     };
    for (var x in req.data)
     {
      if (!blocked_attribute[x])
       this[x] = req.data[x];
     }
    var alt = req.data["use_alt"];
    if (alt && this.alt && this.alt[alt])
     {
      this.alt[alt].body = req.data.body;
      this.alt[alt].lang = req.data.lang;
     }
    else
     {
      this.body = req.data.body;
      this.lang = req.data.lang;
     }
    if (saveEdit)
     {
      if (this.isTransient())
       {
        this.uri = req.data["uri"];
        app.log("Creating '" + this.uri + "'");
        this.pseudoParent.add(this);
       }
      else
       {
        app.log("Replacing page '" + this.uri + "' with '" + req.data["uri"] + "'");
        this.uri = req.data["uri"];
       }
      var runtime = Packages.java.lang.Runtime.getRuntime();
      var message = "http://beagleboard.org" + this.href() + " was edited by default";
      runtime.exec("scripts/beagle/edit.sh");
      var currentTime = new Date();
      if (typeof bot === 'undefined')
       {
        global.defineLibraryScope("bot");
        bot.lastSpoke = currentTime;
       }
      var timeSinceUpdate = currentTime - this.time;
      var timeSinceNotice = currentTime - bot.lastSpoke;
      app.log("Previous edit was " + timeSinceUpdate/1000 + "s ago");
      app.log("Previous notice was " + timeSinceNotice/1000 + "s ago");
      if
       (
        (timeSinceUpdate > (1000*60*60*24))
	&& (timeSinceNotice > (1000*60*60))
       )
       {
        global.logbot.sendMessage('#beagle', message);
	global.logbot.append(3, message, "BeagleBot");
	bot.lastSpoke = currentTime;
        bot.lastSpokePage = this.href();
       }
      this.time = new Date();
      res.redirect(this.href());
      return;
     }
   }
  res.data.title = this.uri + " - edit";
  if (this.edit_skin)
   res.data.body = this.renderSkinAsString(this.edit_skin);
  else
   res.data.body = this.renderSkinAsString("edit");
  renderSkin("index");
 }

function info_action ()
 {
  res.data.title = "Page information";
  res.data.body = "<h1>Page information</h1>";
  res.data.body += this.toJSON();
  renderSkin("index");
 }

function cleanBody()
 {
  return (true);
  try
   {
    XML.prettyIndent = 1;
    var cleaner = new Packages.org.htmlcleaner.HtmlCleaner
     (
      '<html><body><div id="body">' 
      + req.data["body"] +
      '</div></body></html>'
     );
    cleaner.setOmitUnknownTags(true);
    cleaner.setTreatDeprecatedTagsAsContent(true);
    //cleaner.useCdata(true);
    //cleaner.clean();
    var s = "" + cleaner.getXmlAsString();
    var x = new XML(s);
    req.data["body"] = "" + x..body.div;
    req.data["body"] = req.data["body"]
     .replace(/^<div id="body">/, "")
     .replace(/<\/div>$/, "");
    return (true);
   }
  catch (ex)
   {
    app.log("cleanBody failed with exception: " + ex);
    return (false);
   }

  return (false);
 }

function href (action)
 {
  if
   (
    this.pseudoParent 
    && (this.isTransient() || ("" + this.pseudoParent != "[object Page]"))
   )
   {
    return (this.pseudoParent.href() + this.uri + '/' + (action || ''));
   }
  return HopObject.prototype.href.apply(this, arguments);
 }

function notfound_action ()
 {
  res.data.body = "";

  try
   {
    var x = root.get("notfound");
    res.data.title = "" + x.uri;
    res.data.body += "" + x.body;
    res.data.lang += "" + x.lang;
   }
  catch(e)
   {
    res.data.title = "Page not found";
    res.data.body += "<h1>Error: Page not found</h1>";
    res.data.body += "<p>The requested page does not currently exist.</p>";
   }

  renderSkin("index");
 }

function getChildElement (name)
 {
  var x = this.get(name);
  if (!x)
   {
    x = root.get("default").get(name);
   }
  if (!x)
   {
    var notfound_body = "<h1>Error: Page not found</h1>";
    notfound_body += "<p>The requested page does not currently exist.</p>";
    x = new Page("system", name, notfound_body);
    x.pseudoParent = this;
    try
     {
      var orderedByDate = this.getOrderedView("time desc");
      var collection = orderedByDate.list();
      var edit_skin = collection[0].edit_skin || "edit";
      var redirectURL = this.href() + "new/" + edit_skin;
      session.data.edit_new = redirectURL;
      app.log("Setting session.data.edit_new=" + redirectURL);
     }
    catch(e)
     {
      //app.log("session.data.edit_new: No exiting children found for " + this.href() + " exception: " + e);
     }

   }
  return (x);
 }

