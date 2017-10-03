function delete_action ()
 {
  if (!session.user || !session.user["name"])
   res.redirect(this.href());
  var parent = this._parent;
  parent.removeChild(this);
  this.remove();
  res.redirect(parent.href());
 }
