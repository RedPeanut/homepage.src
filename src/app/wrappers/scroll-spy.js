export default class ScrollSpy {
  
    constructor(target, refs, sensitivity) {
      this.targets = Array.from(target.querySelectorAll("a"));
      this.refs = refs;
      this.sensitivity = sensitivity || -10;
        window.addEventListener("scroll", () => this.onScroll());
    }
  
    onScroll() {
      if (!this.isOnTopOfDoc(this.refs[0])) {
        this.deactiveateTarget();
      }
  
      this.refs.forEach(ref => {
        if (this.isOnTopOfDoc(ref)) {
          this.deactiveateTarget();
          const t = this.findTarget(ref.id);
          if (t) {
            this.activate(t);
          }
        }
      })
    }
  
    isOnTopOfDoc(ref) {
      return (
        document.documentElement.scrollTop - ref.offsetTop >= this.sensitivity
      )
    }
  
    deactiveateTarget() {
      this.targets.forEach(a => this.deactivate(a));
    }
  
    findTarget(id) {
      return this.targets.filter(
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
  