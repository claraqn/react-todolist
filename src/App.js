import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  id = 3; //이미 0,1,2 가 존재하므로 3으로 설정
  state = {
    input: '',
    todos: [
      { id: 0, text: '리액트 소개', checked: false },
      { id: 1, text: '리액트 소개', checked: true },
      { id: 2, text: '리액트 소개', checked: false },
    ],
  };

  handleChange = (e) => {
    // handleChange(e){} 이렇게 써도될듯
    this.setState({
      input: e.target.value, //input의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    const { input, todos } = this.state;
    console.log(todos);
    console.log(input);
    this.setState({
      //이 input 은 추가해야할 일을 적는 input 단을 초기화해주는 것
      input: '', //인풋 비우고
      //concat 사용해 새 배열을 만들어 배열에 추가->push 사용은 안됨!
      todos: todos.concat({
        id: this.id++,
        // text: input,
        // 여기서의 input 은 추가된 일
        text: this.state.input,
        checked: false,
      }),
    });
    console.log(todos);
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  };

  handleToggle = (id) => {
    const { todos } = this.state;
    //파라미터로 받은 id 값으로 몇번째 아이템인지 찾기
    const index = todos.findIndex((todo) => todo.id === id);
    const selectd = todos[index];
    const nextTodos = [...todos];

    //기존의 값들을 복사해 넣고 checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selectd, // ... 의미 = 기존의 객체안에 있는 내용을 해당 위치에다가 풀어준다
      checked: !selectd.checked,
    };

    this.setState({
      todos: nextTodos,
    });
  };

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      // 지워야하는 할일의 id와 일치하지 않으면(지워야할 일이 아니면) filter로 솎아줘서 나온 값들을 todos에 넣어줌
      todos: todos.filter((todo) => todo.id !== id),
    });
  };

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
    } = this;
    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />
        }
      >
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoListTemplate>
    );
  }
}

// setting.json의 prettier에 prettier.printWidth 를 변경하면 줄바꿈 글자수 변경 가능
// https://velog.io/@bori9412/React-todolist-1 <= 요 사이트 설명 도움됨

export default App;
