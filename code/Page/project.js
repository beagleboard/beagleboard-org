function ownername_macro (param)
 {
  return ("" + this.ownername);
 }

function updateViewCount_macro (param)
 {
	if (this.pvCount == undefined) {
		this.pvCount = 0;
	}

	this.pvCount = this.pvCount+1;

	return this.pvCount;
 }

function getImageFile_macro (param)
 {
  if (this.imageFile == undefined || this.imageFile == '') {
	return "/static/graphics/coolboris.png";
  } else {
	return this.imageFile;
  }
 }

function getContactInfo_macro (param)
 {
  if (this.contactInfo == undefined)
   return '';
  else
   return this.contactInfo;
 }

function edit_macro (param)
 {
  var uri = req.path.replace(/\/$/,"");
  if (uri != "")
   uri = "/" + uri + "/";
  promptString = '<a href="' + uri + 'edit">Edit</a>';
  if (session.user && session.user["name"] == this.registrant && uri != "")
   return (promptString);
  return ("");
 }

function gethomepage_macro (param)
 {
	if (this.homepage != undefined && this.homepage != "") {
	  if ((this.homepage).indexOf("http", -1)) {
		return ('Homepage: <a class="external" href="http://' + this.homepage + '" target="_projhome">' + this.homepage + '</a>');
	  } else {
		return ('Homepage: <a class="external" href="' + this.homepage + '" target="_projhome">' + this.homepage + '</a>');
	  }
	}
 }

function getregistrant_macro (param)
 {

	if (this.registrar != undefined && this.registrar != "") {
	  if ((this.registrar ).indexOf("mailto", -1)) {
		return ('Homepage: <a href="mailto:' + this.registrar + '">' + this.registrar + '</a>');
	  } else {
		return ('Homepage: <a href="' + this.registrar + '">' + this.registrar + '</a>');
	  }
	} else { return('')}
 }

function gettags_macro (param)
 {
  var tagString = 'Tags: ';
  if (this.category)
   tagString += this.category;
  if (this.prj_Status)
   tagString += this.prj_Status;
  if (this.boardType)
   tagString += this.boardType;
  return(tagString);
 }

function updatetime_macro (param)
 {
  return ("" + this.updatetime);
 }

function shortdesc_macro (param)
 {
  return ("" + this.shortdesc);
 }

function htmlencode_macro (param)
 {
  return encode("" + eval(param.param));
 }

function image_action ()
 {
  if (this.imageFile)
   {
    res.data.body = '<img src="' + this.imageFile + '" />\n';
    renderSkin("bare");
   }
  else
   {
    return (this.notfound_action());
   }
 }
 
function edit_project_action ()
 {
  if (!session.user || !session.user["name"])
   {
    var targetURL = root.href("login") + "?target=" + this.href();
    res.redirect(targetURL);
    return;
   }
  res.handlers["User"] = User();
  
  function cleanField(param)
  {
   if (param)
    return param.replace("\"","&quot;");
   else
    return "";
  }

  this.errmsg = "";

  this.uri = cleanField(this.uri);
  this.lang = cleanField(this.lang);
  this.pname = cleanField(this.pname);
  this.shortdesc = cleanField(this.shortdesc);
  this.category = cleanField(this.category);
  this.homepage = cleanField(this.homepage);
  this.rssfeed = cleanField(this.rssfeed);
  this.prj_Status = cleanField(this.projstatus);
  this.boardType = cleanField(this.boardtype);
  this.imageFile = this.imageFile;
 
  if
   (
    req.data["submit"]
    && req.data["uri"]
    && req.data["body"]
    && req.data["pname"]
    && req.data["shortdesc"]
   )
   {
    this.user = "" + session.user["name"];
    this.body = req.data["body"];
    this.lang = req.data["lang"];
    this.pname = req.data["pname"];
    this.shortdesc = req.data["shortdesc"];
    this.category = req.data["category"];
    this.homepage = req.data["homepage"];
    this.rssfeed = req.data["rssfeed"];
    this.projstatus = req.data["prj_Status"];
    this.boardtype = req.data["boardType"];
    this.updatetime = new Date();
    this.imageFile = "" + req.data["imageFile"];

    this.render_skin = "project";
    this.edit_skin = "edit_project";
    if (this.isTransient())
     {
      this.time = new Date();
      this.uri = req.data["uri"];
      this.registrant = "" + session.user["name"];
      app.log("Creating '" + this.uri + "'");
      this.pseudoParent.add(this);
     }
    else
     {
      app.log("Replacing project '" + this.uri + "' with '" + req.data["uri"] + "'");
      //app.log("Categories = " + this.categories);
      this.uri = req.data["uri"];
     }
    res.redirect(this.href());
    return;
   }
  else if(req.data["submit"])
   {
    if (!req.data["body"]) this.errmsg += "* Full Description is a required field<br />\n";
    if (!req.data["shortdesc"]) this.errmsg += "* About/Summary is a required field<br />\n";
    if (!req.data["pname"]) this.errmsg += "* Project Name is a required field<br />\n";
    if (!req.data["uri"]) this.errmsg += "* Project Shortname/URI is a required field<br />\n";
   }
  res.data.title = this.uri + " - edit_project";
  if (this.edit_skin)
   res.data.body = this.renderSkinAsString(this.edit_skin);
  else
   res.data.body = this.renderSkinAsString("edit_project");
  renderSkin("index");
 }

function showProjectInfoTbl_macro (param)
 {
  var str = "";

  function fixUrl (param)
   {
    param = "" + param;
    if
     (
      (param.search("http://") == -1)
      && (param.search("https://") == -1)
     )
     param = "http://" + param;
    return (param);
   }
	
  if (("" + this.homepage) != "")
   {
    str += "<tr>\n"
     + "  <td valign=\"top\" class=\"tbl3\" align=\"right\">Homepage</td>\n"
     + "  <td class=\"tbl5\"><a href=\"" + fixUrl(this.homepage) + "\" target=\"_blank\">"
     + fixUrl(this.homepage)
     + "</a></td>"
     + "</tr>";
   }

  if (("" + this.rssfeed) != "")
   {
    str += "<tr>\n"
     + "  <td valign=\"top\" class=\"tbl3\" align=\"right\">RSS Feed</td>\n"
     + "  <td class=\"tbl5\"><a href=\"" + fixUrl(this.rssfeed) + "\" target=\"_blank\">"
     + fixUrl(this.rssfeed)
     + "</a></td>"
     + "</tr>";
   }

  return (str);
 }

