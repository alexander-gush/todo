import React, { useState } from 'react';
import { Button, FormItem, FormLayout, Textarea } from '@vkontakte/vkui';
import { useAuth } from '../context/AuthContext';

interface AddTodoProps {
  addTodo: (text: string) => Promise<void>;
}

const AddTodo = ({ addTodo }: AddTodoProps) => {
  const [text, setText] = useState('');

  const { user } = useAuth();

  const onClickHandler = () => {
    if (!text || !user?.uid) {
      return;
    }
    addTodo(text);
    setText('');
  };

  return (
    <FormLayout>
      <FormItem top="Create new todo:">
        <Textarea
          placeholder="Enter todo..."
          style={{ maxWidth: '600px' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <Button align="center" size="m" disabled={!text} onClick={onClickHandler}>
          Add
        </Button>
      </FormItem>
    </FormLayout>
  );
};

export default AddTodo;
