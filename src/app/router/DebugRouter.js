import {Router, Route, BrowserRouter} from "react-router";

class DebugRouter extends Router {
  constructor(props) {
    super(props);
    //console.log("this.history = " + JSON.stringify(this.history, null, 2));
    //console.log("this.history.listen = " + this.history.listen);
    /*this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });*/
  }

  componentDidMount() {
    /*if(this.history) {
      this.history.listen((location, action) => {
        /!*console.log(
          `The current URL is ${location.pathname}${location.search}${location.hash}`
        );*!/
        console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
      });
    }*/
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log("componentWillUpdate() is called...", nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    //console.log("componentDidUpdate() is called...", prevProps);
    //console.log("this.history = " + JSON.stringify(this.history, null,2));
  }
}

export default DebugRouter