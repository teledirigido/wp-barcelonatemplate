import mediaQueries from "../scss/global/mediaqueries.module.scss"; // Would be nice to make this more elegant/modular

export default {

  getMediaQueries() {
    return mediaQueries;
  },

  getViewport() {
    var e = window;
    var a = "inner";
    if (!("innerWidth" in window)) {
      a = "client";
      e = document.documentElement || document.body;
    }
    return { width: e[a + "Width"], height: e[a + "Height"] };
  },

  isMobileMenuLayout() {
    return (
      this.getViewport().width <
      parseInt(this.getMediaQueries().mobileMenuLayout)
    );
  },

  isMobileLayout() {
    return (
      this.getViewport().width < parseInt(this.getMediaQueries().mobileLayout)
    );
  },

  onDocumentReady(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  },
};
