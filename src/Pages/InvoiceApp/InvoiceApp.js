import React from "react";
import axios from "axios";
// Load the full build.
import _ from "lodash";

//import login
import InitialPage from "../InvoiceApp/logIn";
import CreateNewVendor from "./CreateNewVendor";
import PopUpModal from "../../Component/Modals/PopUpModals";
import ToggleComp from "../../Component/Toggle/Toggle";
import OrderDetails from "./OrderDetails";

//css

import "../InvoiceApp/InvoiceApp.css";
import MediaBody from "react-bootstrap/lib/MediaBody";

class InvoiceApp extends React.Component {
  state = {
    dataObj: [],
    items: [],
    vendorInfo: {
      studioName: null,
      managerName: null,
    },
    inputValue: false,
    namePut: "",
    userExist: false,
    userSearchStudioName: "",
    isLoaded: false,
  };

  //api call to get all data

  //component Did Mount

  // componentDidMount = () => {
  //   this.isVendorAvailable();
  // };

  //API call to get table Data
  componentDidMount() {
    fetch("http://localhost:2015/getVendorData/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  // GetInput From search and find in database and popup message
  userSearch = () => {
    const userSearchStudioName = document.getElementById("searchInputBox").value;
    const userExist = this.state.items
      .map((Element) => Element.vendorName)
      .find((us) => us == userSearchStudioName)
      ? true
      : false;

    this.setState({
      userSearchStudioName,
      userExist,
    });
  };

  // get value from child functional component

  getvalueFromChildComponent = (value) => {
    const x = value === "Yes" ? true : false;
    let renderNewForm = x;
    this.setState({
      renderNewForm,
    });
  };

  // //add/Insert vendor
  // addInsertVendor = (e) => {
  //   const studioObj = {}

  //   studioObj.studioName = document.getElementById('StudioName').value
  //   studioObj.Address = document.getElementById('Address').value
  //   studioObj.PhoneNumber = document.getElementById('PhoneNumber').value
  //    return studioObj;

  // }

  addInsertVendor = (e) => {
    e.preventDefault();
    const url = "http://localhost:2015/insertVendorInfo";
    const data = {
      userExists: !this.state.userExist ? 0 : 1,
      vendorId: Math.floor(Math.random() * 1000) + 1,
      vendorName: document.getElementById("StudioName").value,
      Address: document.getElementById("Address").value,
      PhoneNumber: document.getElementById("PhoneNumber").value,
    };

    axios
      .post(url, data)
      .then(() => console.log("Item Created"))
      .catch((err) => {
        console.error(err);
      });
  };

  //check input box

  checkInputBox = (e) => {
    return e.target.value;
  };

  //ButtonCheck
  buttonCheck = (e) => {
    let x = document.getElementById("searchInputBox");
    let z = e.target.value

    let y = x && x.value;
    console.log("test", x && x.value);

    return y == "" && z == ""
      ? (document.getElementById("SearchButtonId").disabled = true)
      : document.getElementById("SearchButtonId") &&
          (document.getElementById("SearchButtonId").disabled = false);

    // if(  y && y == "") {
    //   document.getElementById('SearchButtonId').disabled = true;
    // }
    // else {
    //   document.getElementById('SearchButtonId').disabled = false;
    // }
  };

  //Add Vendor in FireBase DataBase
  // addVendor = () => {
  //   let studioName =
  //     this.state.vendorInfo && this.state.vendorInfo["studioName"];
  //   let managerName =
  //     this.state.vendorInfo && this.state.vendorInfo["managerName"];
  //   firebase
  //     .database()
  //     .ref("vendor")
  //     .child(studioName)
  //     .child("Manager")
  //     .set(managerName);
  // };

  //when click add button
  // addButton = () => {
  //   this.getStudioAndManagerName();
  // };

  //get Studio Name and Managername and set it to state
  // getStudioAndManagerName = () => {
  //   const studioName = document.getElementById("StudioName").value;
  //   const managerName = document.getElementById("ManagerName").value;
  //   this.setState(
  //     {
  //       vendorInfo: {
  //         studioName,
  //         managerName,
  //       },
  //     },
  //     () => this.addVendor()
  //   );
  // };

  // inputValue = () => {
  //   const namePut = document.getElementById("searchText").value;
  //   const inputValue = this.state.dataObj.hasOwnProperty(namePut);

  //   console.log(namePut)
  //   console.log(inputValue)
  //   this.setState({
  //     inputValue,
  //     namePut,
  //   });
  // };

  studioNameWithLink = () => {
    return (
      this.state.inputValue &&
      this.state.namePut && (
        <button
          className="underline ButtonButLinkStyle"
          onClick={() => console.log("hello")}
        >
          {this.state.namePut}
        </button>
      )
    );
  };

  // //add new vendor
  // addNewvendor = () => {
  //   return (
  //     <div>
  //       <CreateNewVendor addButton={this.addButton} />
  //     </div>
  //   );
  // };

  render() {
    return (
      <div>
        <div>
          <div className="mainTitle">
            <p className="titleContext">Vendor Billing System</p>
          </div>
          <div className="margin-top titleJustify">
            <span className="searchText">Search Vendor</span>
            <input
              className="searchBox"
              type="text"
              placeholder="Type Vendor.."
              id="searchInputBox"
              //onChange = {this.checkInputBox}
              onkeyup={this.buttonCheck()}
            />

            <PopUpModal
              dataObj={this.state.dataObj}
              searchValue={this.userSearch}
              userExist={this.state.userExist}
              getvalueFromChildComponent={this.getvalueFromChildComponent}
              buttonText="Search"
              buttonId="SearchButtonId"
              modalTitle="Confirm"
              modalBodyText={
                this.state.userExist
                  ? "Found in system"
                  : "Vendor does not exist in System. Are you sure you want to add new vendor?"
              }
            />
          </div>
        </div>
        {this.studioNameWithLink()}
        <div className="tableAndNewVendor">
          <div className="tableWidth">
            <ToggleComp tableData={this.state.items} />
          </div>
          <div className="tableWidth">
            {this.state.renderNewForm && (
              <CreateNewVendor addInsertVendor={this.addInsertVendor} />
            )}
          </div>
        </div>
        <OrderDetails />
      </div>
    );
  }
}

export default InvoiceApp;
