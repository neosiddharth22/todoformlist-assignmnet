import React , {Component} from 'react'
import axios from 'axios'
import {Container,Row,Button,InputGroup,Form,Col, FormControl} from 'react-bootstrap';
import { Redirect } from 'react-router';
//defining  the validations
const regForName=RegExp(/^[a-zA-Z]{3,100}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
class Registration extends Component {
    constructor(props){
        super(props)
        this.state={firstname:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        confirm:"",
            error:{firstname:"",lastname:"",username:"",email:"",password:"",confirm:""}
        }
    }
 //for check the  validations and handling errors in registration
    handler=(event)=>{
        const {name,value}=event.target
        let error = this.state.error
        switch(name){
            case 'firstname':
                error.firstname=regForName.test(value)?'':'Name should be in aplahbets';
                break;

            case 'lastname':
                error.lastname=regForName.test(value)?'':'Last Name should be in aplahbets';
                break;

            case 'username':
                error.username=regForName.test(value)?'':'userName should be in aplahbets';
                break;

            case 'email':
                error.email=regForEmail.test(value)? '':'Email is  invalid';
                 break;

            case 'password':
                error.password=regForPass.test(value)? '':'password should be in aplhanumeric & special chars';
                console.log(this.state.password)
                 break;

            case 'confirm':
                error.confirm= this.state.password===value ?'': 'password should be matched';
                console.log(this.state.confirm)
                break;
       
            default:
        }
        this.setState({error:error,[name]:value})
    }

       //after submitting registration form 
    formSubmit=(event)=>{
        event.preventDefault()
        if(this.validate(this.state.error)){
            let info = {"firstname":this.state.firstname,"lastname":this.state.lastname,"username":this.state.username,"email":this.state.email,"password":this.state.password}
            console.log(info)
            const URL="http://localhost:3001/local"
            axios.post(URL,info).then((response)=>{alert('Registered successfully')})
            window.location.replace("/")
        }
        else{
            alert('invalid form')
        }
    }

    //for validating errors in registration form
    validate=(error)=>{
        let valid = true
        for(let value of Object.values(error)){
            if(value.length>0){
                valid = false
            }
        }
        return valid
    }

    //registration form
    render(){
        return(
            <Container  className="container1   text-dark">
                <h2 className="pt-2 pb-3  text-center text-warning">Registration Form</h2>
                <Row>
                <Col  lg={8}>
                <form id="myform"   onSubmit={this.formSubmit} className=" p-4 ml-5">
              
                <Form.Group className="mb-3 ">
                   <Form.Label> First Name:</Form.Label>
                    <Form.Control type="text" className="form-control" name="firstname" onChange={this.handler} />
                    <Container  className="form-text text-danger">{this.state.error.firstname}</Container>
               </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label> Last Name</Form.Label>
                    <Form.Control type="text" className="form-control" name="lastname" onChange={this.handler} />
                    <Container  className="form-text text-danger">{this.state.error.lastname}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                   <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" className="form-control" name="username" onChange={this.handler} />
                    <Container  className="form-text text-danger">{this.state.error.username}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                    <Form.Control type="text" className="form-control" name="email" onChange={this.handler} />
                    <Container  className="form-text text-danger">{this.state.error.email}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="form-control" name="password" onChange={this.handler} />
                    <Container className="form-text text-danger">{this.state.error.password}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type="password" className="form-control" name="confirm" onChange={this.handler} />
                    <Container  className="form-text text-danger">{this.state.error.confirm}</Container>
                </Form.Group>

                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </Col>
                </Row>
                
            </Container>
        )
    }
}

export default Registration