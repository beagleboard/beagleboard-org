// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-3429714-1', 'beagleboard.org');
ga('require', 'linkid', 'linkid.js');
ga('require', 'displayfeatures');
ga('send', 'pageview');

$(document).ready(findLinks);

function findLinks() {
    $("a[class='External']").each(trackExitLink);
    $("a[class='external']").each(trackExitLink);
    $("a[target='_blank']").each(trackExitLink);
}

function trackExitLink() {
    try {
        var old_link = this.href;
        var a = $(this);
        if(old_link.indexOf('#') >= 0) return;
        if(a.attr('onClick')) return;
        var action = a.attr('data-action');
        if(!action) action = 'link-external';
        var new_link = 'goTracked("' + action + '", "' + old_link + '");';
        //console.log("Replacing external link " + this.href + " with: " + new_link);
        //a.attr('href', '#');
        a.attr('target', '_self');
        a.attr('onClick', new_link);
    } catch(ex) {
        console.log("Error: " + ex);
    }
}

function goTracked(action, link, label, category) {
    label = label || link;
    category = category || 'exit';
    ga('send', 'event', category, action, label, {'hitCallback': hitCallback});

    function hitCallback() {
       document.location = link;
    }
}

