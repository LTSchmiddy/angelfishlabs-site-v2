
// Including Bootstrap:
import 'bootstrap';
// If we're not going to use Bootstrap SCSS, import Bootstrap Precompiled CSS here:
// import 'bootstrap/dist/css/bootstrap.min.css';


import './style/main.scss';


import * as React from "react";
import * as ReactDOM from "react-dom";

import {SiteRoot} from "./site_root";

ReactDOM.render(
  <SiteRoot/>,
  document.getElementById('site-root')
);

console.log("React site loaded.");