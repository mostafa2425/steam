import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import "./styelSheets/css/style.css"; 
import LayoutSite from "./containers/LayoutSite/LayoutSite";
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return ( 
    <Provider store={store}>
      <LayoutSite />
    </Provider>
  );
}

export default App;
