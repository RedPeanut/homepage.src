import $ from "jquery";
import "jquery.cookie";

export default function load(component, cb) {
  component.then(loadRouteDefault(cb))
    .catch((error) => {
      console.log(error);
    })
}

function loadRouteDefault(cb) {
  return (module) => {
    cb(null, module.default);
    return module;
  }
}
