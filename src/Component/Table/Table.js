import { get } from "jquery";
import React, {UseState} from "react";
import { Table } from "reactstrap";

const TableComp = (props) => {
  
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Studio Name</th>
          <th>Address</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map(item => {return(
            <tr>
            <td>{item.vendorId}</td>
            <td>{item.vendorName}</td>
            <td>{item.Address}</td>
            <td>{item.PhoneNumber}</td>
          </tr>
        )})} 
        </tbody>
    </Table>
  );
};

export default TableComp;
