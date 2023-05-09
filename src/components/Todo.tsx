import React, { forwardRef, ForwardedRef, useState } from 'react';
import { Button, ButtonGroup, Div, Textarea } from '@vkontakte/vkui';
import { Icon20DeleteOutline, Icon20CheckAlt, Icon20Write } from '@vkontakte/icons';
import { ITodo } from '../pages/TodoList';

interface TodoProps {
  todo: ITodo;
  toggleComplete: (todo: ITodo) => Promise<void>;
  handleEdit: (id: string, text: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

const Todo = forwardRef(function Todo(
  { todo, toggleComplete, handleEdit, handleDelete }: TodoProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [newText, setNewText] = useState(todo.text);

  return (
    <div ref={ref}>
      <Div>
        <Textarea
          disabled={todo.completed}
          style={{
            textDecoration: todo.completed ? 'line-through' : undefined,
            maxWidth: '600px',
            marginBottom: '10px'
          }}
          value={newText}
          className="list"
          onChange={(e) => setNewText(e.target.value)}
        />
        <ButtonGroup>
          <Button
            before={<Icon20CheckAlt />}
            appearance="positive"
            onClick={() => toggleComplete(todo)}>
            Mark as {todo.completed ? 'uncompleted' : 'completed'}
          </Button>
          <Button
            disabled={todo.text == newText}
            before={<Icon20Write />}
            onClick={() => handleEdit(todo.id, newText)}>
            Save Editing
          </Button>
          <Button
            before={<Icon20DeleteOutline />}
            appearance="negative"
            onClick={() => handleDelete(todo.id)}>
            Delete
          </Button>
        </ButtonGroup>
      </Div>
    </div>
  );
});

export default Todo;
