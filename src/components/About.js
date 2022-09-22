import React, { Component } from "react";


export default class About extends Component {
    
    constructor(props){
        super(props);
        document.title = "About - Columns";
        this.state = {
          email : ""
        }
        
    }
    
  handleEmails=(event)=>{
    this.setState({
      email:event.target.value
    })
  
  }
  printEmail = ()=>{console.log(this.state.email)}
  render() {
    return (
      <div className="my-3 mx-5">
        <div className="card"  style={{marginTop: "90px"}}>
          <div className="card-header">About - Columns</div>
          <div className="card-body">
            <h5 className="card-title">Subscribe to Our Newsletter -</h5>
            <div className="my-3">
            <input type="email" className="form-control" id="inputEmail" value={this.state.email} onChange={this.handleEmails} aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            
            
            <button href="/" className="btn btn-dark" onClick={this.printEmail}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }
}
