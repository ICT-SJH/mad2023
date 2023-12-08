import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';
import Input from './Input';

const Container1 = styled.View`
  flex-direction: column;
  border-radius: 10px;
  margin: 3px 0px 9px 0px;
`;

const Container11 = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Container12 = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 10px;
`;

const Container121 = styled.View`
  width: 2px;
  height: 50px;
  background-color: #5423305c;
  margin: 0 5px;
`

const Container122 = styled.View`
  flex-direction: column;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 10px;
`;

const Feeling = styled.Text`
  flex: 0.3;
  font-size: 48px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [text1, setText1] = useState(item.text1);
  const [text2, setText2] = useState(item.text2);

  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };
  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text2 });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };
  const _onBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setText2(item.text2);
    }
  };
  const feel = () => {

  }
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  let date = currentDate.getDate();
  let day = currentDate.getDay();
  let days = ['일', '월', '화', '수', '목', '금', '토'];

  return isEditing ? (
    <Input
      value={text2}
      onChangeText={text2 => setText2(text2)}
      onSubmitEditing={_onSubmitEditing}
      onBlur={_onBlur}
    />
  ) : (
    <Container1>
      <Container11>
        {item.completed || (
          <IconButton
            type={images.update}
            onPressOut={_handleUpdateButtonPress}
          />
        )}
        <IconButton
          type={images.delete}
          id={item.id}
          onPressOut={deleteTask}
          completed={item.completed}
        />
      </Container11>
      <Container12>
        <Feeling>😃</Feeling>
        <Container121/>
        <Container122>
          <Contents completed={item.completed}>{year + '년 ' + month + '월 ' + date + '일 ' + '(' + days[day] + ')'}</Contents>
          <Contents completed={item.completed}>{item.text2}</Contents>
        </Container122>
      </Container12>
    </Container1>
    
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
