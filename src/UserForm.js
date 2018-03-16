import React, { Component } from 'react';
import store, { deleteUser, saveUser } from './store';

class UserUpdate extends Component{
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDestroy = this.onDestroy.bind(this);

    const user = this.findUser(); 
    this.state = {
      name: user ? user.name : '' 
    };
  }
  onDestroy(ev){
    ev.preventDefault();
    deleteUser(this.props.id)
    .then(()=> {
      this.props.history.push('/');
    });
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.id){
      this.setState({ name: '' });
    }
  }
  findUser(){
    return store.getState().users.find( user=> user.id === this.props.id);

  }
  componentDidMount(){
    this.unsubscribe = store.subscribe(()=> {
      const user = this.findUser();
      if(user){
        this.setState({ name: user.name });
      }
    });
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  onSave(ev){
    ev.preventDefault();
    const user = { id: this.props.id, name: this.state.name };
    saveUser(user)
      .then(()=> {
        this.props.history.push('/');
      });
  }
  onChangeName(ev){
    this.setState({ name: ev.target.value });
  }
  render(){
    const { onChangeName, onSave, onDestroy } = this;
    const { name } = this.state;
    const { id } = this.props;
    return (
      <div>
      <form onSubmit={ onSave }>
        <input value={ name } onChange={ onChangeName }/>
        <button>{ id ? ('Update') : ('Create') }</button>
      </form>
      {
        id && (
          <button onClick={ onDestroy }>Delete</button>
        )
      }
      </div>
    );
  }
}

export default UserUpdate;
