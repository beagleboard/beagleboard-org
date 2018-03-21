// This action adds custom flags to Page objects that can be used
// to trigger additional behaviors, such as other skins for rendering.
function set_action ()
 {
  //if (!session.user || !session.user["name"])
   //res.redirect(this.href());
  //this.user = session.user["name"];
  if (req.data["alt"])
   {
    if (typeof this.alt == 'undefined')
     this.alt = {};
    var alt_name = req.data["alt"];
    var alt = root.get("alternates");
    var x = { "body": this.body, "lang": this.lang };
    this.alt[req.data["alt"]] = x;
   }
  var alt = req.data["use_alt"];
  if (alt && this.alt && this.alt[alt])
   {
    if (req.data["render_skin"])
     this.alt[alt].render_skin = req.data["render_skin"];
    if (req.data["edit_skin"])
     this.alt[alt].edit_skin = req.data["edit_skin"];
    if (req.data["skin_is_outer"])
     this.alt[alt].skin_is_outer = req.data["skin_is_outer"];
    if (req.data["list_children"])
     if (req.data["list_children"] == "delete")
      delete this.alt[alt].list_children;
     else
      this.alt[alt].list_children = req.data["list_children"];
    if (req.data["registrant"])
     this.alt[alt].registrant = req.data["registrant"];
   }
  else
   {
    if (req.data["render_skin"])
     this.render_skin = req.data["render_skin"];
    if (req.data["edit_skin"])
     this.edit_skin = req.data["edit_skin"];
    if (req.data["skin_is_outer"])
     this.skin_is_outer = req.data["skin_is_outer"];
    if (req.data["mimetype"])
     this.mimetype = req.data["mimetype"];
    if (req.data["list_children"])
     if (req.data["list_children"] == "delete")
      delete this.list_children;
     else
      this.list_children = req.data["list_children"];
    if (req.data["registrant"])
     this.registrant = req.data["registrant"];
   }
  res.redirect(this.href());
 }
