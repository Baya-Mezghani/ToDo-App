import axios from 'axios';
import React, { createContext }  from 'react';
import { toast } from 'react-toastify';

export const TodoContext= createContext();

class TodoContextProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
        };

        this.readTodo();
    }

// create 
createTodo(todo, event)
{ event.preventDefault(); 
  axios.post('/api/todo/create',todo) 
    .then(response=>{ 
      if (response.data.type === 'success') 
      {toast.success( response.data.text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        let data = [...this.state.todos]; 
        data.push(todo);
        this.setState( {todos: data,
        });
      } else {
        toast.error( response.data.text, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }) 
    .catch(error=>{ 
      console.error(error); }) 
}

// read 
readTodo(){
    axios.get('/api/todo/read')
    .then(response => {
      this.setState({todos:response.data})
      console.log(response.data);
  })
    .catch(error=>{
      console.error(error);
    })
}

//update 
updateTodo(data){
  axios.put('/api/todo/update/' +data.id, data)
  .then( response =>{
    if (response.data.type === 'success') {
      toast.success( response.data.text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    let todos= [...this.state.todos];
    let todo= todos.find(todo=> {
      return todo.id === data.id  ; 
    });
    todo.task=response.data.todo.task;
    todo.description=response.data.todo.description;
    this.setState({
      todos: todos,
    })
  } else {
    
    toast.error( response.data.text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  }
})

   .catch(error=>{
      console.error(error);
    })
  

}

//delete 
deleteTodo(data){

  axios.delete('/api/todo/delete/'+ data.id)
  .then(response => { 
    if (response.data.type === 'success') {
      toast.success( response.data.text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    let todos=[...this.state.todos];
    let todo=todos.find(todo=>{
        return todo.id === data.id;
  });

    todos.splice(todos.indexOf(todo),1);

    this.setState({
      todos:todos,
    });
  } else {
    toast.error( response.data.text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  }
    }) 
    .catch(error => {
      console.log(error);
    });

  }

  render() {
    return (
      <TodoContext.Provider value={{
        ...this.state,
        createTodo: this.createTodo.bind(this),
        updateTodo: this.updateTodo.bind(this),
        deleteTodo: this.deleteTodo.bind(this),
      }
      }>
         {this.props.children}
      </TodoContext.Provider>
    );
  }
}


export default TodoContextProvider;
