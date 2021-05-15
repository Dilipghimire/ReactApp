import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import InvoiceApp from "../src/Pages/InvoiceApp/InvoiceApp";
import AppointmentApp from "../src/Pages/AppointmentApp/AppointmentApp"

//css
import "./App.css";

const App = () => {
  return (
    <Router>
      <button>
        <Link className="dropdown-item" to="/InvoiceApp">
          InvoiceApp
        </Link>
      </button>
      <button>
        <Link className="dropdown-item" to="/AppointmentApp">
          Appointment App
        </Link>
      </button>

      <Switch>
        <Route exact path="/InvoiceApp">
          <InvoiceApp />
        </Route>
        <Route exact path="/AppointmentApp">
          <AppointmentApp />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
