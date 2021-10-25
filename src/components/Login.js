import React, { Component } from 'react';
import axios from 'axios'
import {Container,Row,Button,InputGroup,Form,Col} from 'react-bootstrap';
import {BrowserRouter as Router,Route,Link,withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';
const regForName=RegExp(/^[a-zA-Z]{3,100}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
const isLogin=false

class Login extends Component {
    constructor(props){
        super(props)
           this.state={
        username:"",
        email:"",
        password:"",
        
            error:{username:"",email:"",password:""}
        }
    }



    //for checking valiadations and handling errors
    handler=(event)=>{
        const {name,value}=event.target
        let error = this.state.error
        switch(name){
           
            case 'username':
                error.uname=regForName.test(value)?'':'userName should be in aplahbets';
                break;

            case 'email':
                error.email=regForEmail.test(value)? '':'Email is  invalid';
                 break;

            case 'password':
                error.password=regForPass.test(value)? '':'password should be in aplhanumeric & special chars';
                 break;

           
       
            default:
        }
        this.setState({error:error,[name]:value})
    }
    
    
     //after submiting  loginform
       formSubmit=(event)=>{
        event.preventDefault()
        if(this.validate(this.state.error)){
            let info = {"username":this.state.username,"email":this.state.email,"password":this.state.password}
            console.log(info)
            const URL="http://localhost:3001/local"
            axios.post(URL,info).then((response)=>{alert('Login successfully')})
            window.location.replace("/addtask")
        }
        else{
            alert('invalid form')
        }
    }
       
        //for validating errors in login form
            validate=(error)=>{
                let valid = true
                for(let value of Object.values(error)){
                    if(value.length>0){
                        valid = false
                    }
                }
                return valid
            }
        
   
       //main body
    render() {
        const {errors}=this.state;
        const {email,password}=this.state;
        const {logIn}=this.state
       
            return (
                <>
                <Container className="bg-info text-light">
                <Container className="bg-reg p-4 mt-3 mb-3">
                    <h2 className="pt-2 pb-3 text-center text-green text-warning">Login Form</h2>
                    <Row>
                    <Col lg={4}>
                        <Form  >

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                        <Form.Control type="text" className="form-control" name="email" onChange={this.handler}/>
                        <Container  className="form-text text-danger">{this.state.error.email}</Container>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className="form-control" name="password" onChange={this.handler} />
                        <Container  className="form-text text-danger">{this.state.error.password}</Container>
                    </Form.Group>
                        <Button variant="success" type="submit" href="/addtask" onClick={this.formSubmit}> Login</Button>
                        <Button variant="warning" type="submit" href="/registration" className="ml-3"> Sign Up</Button>
                            </Form>
                            </Col>
                            </Row>
                        </Container>  
                    </Container>
                </>
            )

        }  
        }
        export default Login;
            


                        
                                            
                            
                   
    
           

  
 