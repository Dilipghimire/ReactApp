import React, { useState } from "react";
import OrderDetailsDictionary from "./OrderDetailsDictionary";
import "../InvoiceApp/OrderDetails.css";
import { Table, Button } from "reactstrap";

class OrderDetails extends React.Component {
  mapping = {
    "4R": 10,
    "5R": 15,
    "6R": 20,
    "8R": 25,
    "10R": 30,
    "12R": 35,
  };

  totalCalculation = (e, index) => {
    const ID = e.target.id;
    const getPerSizeAmount = this.mapping[ID];
    const getQuantity = e.target.value;

    //populate total field for each row
    const total = (document.getElementById("total-value" + ID).value =
      getPerSizeAmount * getQuantity);

    //get Grand subTotal
    let totalFields = document.querySelectorAll(".total-value");
    let grandTotal = 0;
    for (let i = 0; i < totalFields.length; i++) {
      grandTotal += Number(totalFields[i].value);
    }

    //assign value to grandTotal/ subTotal
    document.getElementById("productSubTotal").value = grandTotal;
  };

  //confirm Button
  confirmButton = () => {
    alert('confirm Button clicked!!')
  }

  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Photo Size</th>
            <th>Quantity</th>
            <th>X</th>
            <th>Unit Price</th>
            <th>=</th>
            <th>Totals</th>
          </tr>
        </thead>
        <tbody>
          {OrderDetailsDictionary.map((item, index) => (
            <tr>
              <th scope="row">{item.size}</th>
              <td>
                <input
                  className="quantity-box"
                  id={item.size}
                  onKeyUp={this.totalCalculation}
                ></input>
              </td>
              <td>X</td>
              <td>{item.cost}</td>
              <td>=</td>
              <td>
                <input
                  className="total-value"
                  id={"total-value" + item.size}
                ></input>
              </td>
            </tr>
          ))}
          <tr className="subTotal">
            <td>
              Product Subtotal Nrs <input id="productSubTotal"></input>
              <Button className="confirmButton" onClick={this.confirmButton}>Order Confirm</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default OrderDetails;
