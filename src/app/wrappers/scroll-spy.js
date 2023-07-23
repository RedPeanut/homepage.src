export default class ScrollSpy {
  
    constructor(tableOfContents, contentHeadings, sensitivity) {
      this.tableOfContents = Array.from(tableOfContents.querySelectorAll("a"));
      this.contentHeadings = contentHeadings;
      this.sensitivity = sensitivity || -10;
        window.addEventListener("scroll", () => this.onScroll());
    }
  
    onScroll() {
      let _ref = null;
      this.contentHeadings.forEach(ref => {
        if(this.isOnTopOfDoc(ref)) {
          _ref = ref;
        }
      });

      if(_ref != null) {
        const t = this.findTarget(_ref.id);
        if(t) {
          if(!t.classList.contains("active")) {
            this.deactiveateTargets();
            this.activate(t);
          }
        }
      } else
        this.deactiveateTargets();
    }
  
    isOnTopOfDoc(ref) {
      return (
        document.documentElement.scrollTop - ref.offsetTop >= this.sensitivity
      )
    }
  
    deactiveateTargets() {
      this.tableOfContents.forEach(a => this.deactivate(a));
    }
  
    findTarget(id) {
      return this.tableOfContents.filter(
        a =>
          decodeURIComponent(a.attributes["href"].value.replace(/^#/, "")) === id
      )[0];
    }
  
    activate(el) {
      el.classList.add("active");
    }
  
    deactivate(el) {
      el.classList.remove("active");
    }
  }
  