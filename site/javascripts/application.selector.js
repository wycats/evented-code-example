jQuery(function($) {
  S("body")
    .def("tabs", "div.ui-tabs")
    .def("nav", "ul")
    .def("tab",  "li")
    .def("link", "a");

  S("tabs")
    .def("panel", "div.ui-tabs-panel");

  /**
   * The Plumbing
   **/

  // Step 1: Create a plumbing event and define its default behavior
  jQuery.event.special.tabactivate = {
    _default: function(e) {
      e.tab.up("tabs").down("tab")
        .not(e.tab).removeClass("ui-tabs-selected");

      e.tab.addClass("ui-tabs-selected");

      e.tab.up("tabs").down("panel").
        addClass("ui-tabs-hide");

      e.pane.removeClass("ui-tabs-hide");
    }
  }






  // Step 2: Define the normal way that the plumbing event will be triggered
  S("link").click(function(e) {
    if(this.up("tab").hasClass("ui-tabs-selected")) return false;

    this.up("tabs").trigger({
      type: "tabactivate",
      tab: this.up("tab"),
      link: this,
      pane: $(this.attr("href"))
    });

    return false;
  });







  /**
   * Userland
   **/

  // Step 3: Add support for disabled tabs. Disabled tabs should
  // block the default behavior
  $("div.ui-tabs").live("tabactivate", function(e) {
    if(e.tab.hasClass("ui-state-disabled")) return false;
  });












  // Step 4: Add support for Ajax. Tabs with a data-ajax property
  // should wipe out the content, replace it with a loading bar
  // and get the new content.
  $("div.ui-tabs").live("tabactivate", function(e) {
    if(e.tab.is("[data-ajax]")) {
      e.pane.html("<h3>Loading</h3><img src='images/loader.gif' />");

      $.get(e.tab.attr("data-ajax"), function(html) {
        e.pane.html(html);
      })
    }
  });








  // Step 5: Add support for the back button
  $(window).bind("hashchange", function() {
    $("a[href='" + location.hash + "']").click();
  });

  $("div.ui-tabs").live("tabactivate", function(e) {
    location.hash = e.link.attr("href");
  })

  $(window).trigger("hashchange");
});