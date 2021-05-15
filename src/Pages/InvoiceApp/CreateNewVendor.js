import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";


const AddNewVendor = (props) => {
 
   return (
    <Form>
   <FormGroup>
     <Label for="Name">Studio Name</Label>
     <Input
       type="Studio Name"
       name="Studio Name"
       id="StudioName"
       placeholder="Name of Studio"
     />
   </FormGroup>
   <FormGroup>
     <Label for="Address">Address</Label>
     <Input
       type="Address"
       name="Address"
       id="Address"
       placeholder="Address"
     />
   </FormGroup>
   <FormGroup>
     <Label for="Phone Number">Phone Number</Label>
     <Input
       type="phonenumber"
       name="phonenumber"
       id="PhoneNumber"
       placeholder="Phone Number"
     />
   </FormGroup>
   <Button onClick={props.addInsertVendor}>Add</Button>
 </Form>
   )
}

export default AddNewVendor;