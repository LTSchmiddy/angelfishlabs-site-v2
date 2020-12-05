
import * as React from "react";
import * as ReactDOM from "react-dom";

import {SiteRoot} from "./site_root";

ReactDOM.render(
  <SiteRoot/>,
  document.getElementById('site-root')
);

console.log("React site loaded.");