import React from 'react';
import {Provider} from "react-redux";
import store from './store/store'
import {AuthProvider} from "./providers/AuthProvider";
import {BrowserRouter} from "react-router-dom";
import Router from "./router";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter  {...{basename: '/'}}>
          <AuthProvider>
            <Router/>
            {/*<NotificationsList/>*/}
          </AuthProvider>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
