import React, { Component } from 'react';
import '../App.css';
import FlipMove from 'react-flip-move'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Bank Management System',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.accname.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let accname = this.refs.accname.value;
    let accnumba = this.refs.accnumba.value;
    let bankname = this.refs.bankname.value;
    let bankbranch = this.refs.bankbranch.value

    if(this.state.act === 0){   //new
      let data = {
        accname, accnumba, bankname, bankbranch
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].accname = accname;
      datas[index].accnumba = accnumba;
      datas[index].bankname = bankname;
      datas[index].bankbranch = bankbranch;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.accname.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.accname.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.accname.value = data.accname;
    this.refs.accnumba.value = data.accnumba;
    this.refs.bankname.value = data.bankname;
    this.refs.bankbranch.value = data.bankbranch;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.accname.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="Ap">
          <div className="container-fluid">
              <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 title">
                  <h2>{this.state.title}</h2>
                    <form ref="myForm" className="myForm">
                        <input type="text" ref="accname" placeholder="Account Name" className="formField" />
                        <input type="text" ref="accnumba" placeholder="Account Number" className="formField" />
                        <input type="text" ref="bankname" placeholder="Bank Name" className="formField" />
                        <input type="text" ref="bankbranch" placeholder="Bank Branh" className="formField" />
                        <button onClick={(e)=>this.fSubmit(e)} className="myButton">Add Account </button>
                    </form>
                  </div>
                  <div className="col-md-3">
                      
                  </div>
              </div>
          </div>
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    
                        <div className="results">
                            {datas.map((data, i) =>
                            <FlipMove duration = {500} easing="ease-in-out">
                            <li key={i} className="myList ">
                                {i+1}. Account Name: {data.accname} <br/> Account No: {data.accnumba}<br/>
                                Bank Name: {data.bankname} <br/> Bank Branch: {data.bankbranch}
                                <i onClick={()=>this.fRemove(i)} class=" fa fa-trash myListButton pull-left"> </i>
                                <i onClick={()=>this.fEdit(i)} class="fa fa-edit myListButton pull-right"> </i>
                            </li>
                            </FlipMove>
                            )}
                        </div>
                    
                    
                </div> 
                <div className="col-md-3"></div>  
            </div>
        </div>
        
      </div>
    );
  }
}

export default App;