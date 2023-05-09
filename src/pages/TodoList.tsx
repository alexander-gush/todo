import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  where,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Card, Div, Group, Header, Separator, Spacing, Spinner } from '@vkontakte/vkui';
import { useAuth } from '../context/AuthContext';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          completed: doc.data().completed
        }));
        setTodos(todosData);
        setIsLoading(false);
      });
      return unsubscribe;
    }
  }, [user]);

  const addTodo = async (text: string) => {
    if (!user?.uid) {
      return;
    }
    try {
      await addDoc(collection(db, 'todos'), {
        text,
        completed: false,
        timestamp: serverTimestamp(),
        userId: user.uid
      });
    } catch (e) {
      console.log('Error adding new todo:', e);
    }
  };
  const toggleComplete = async (todo: ITodo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), { completed: !todo.completed });
    } catch (e) {
      console.log('Error changing todo complete status:', e);
    }
  };
  const handleEdit = async (id: string, text: string) => {
    try {
      await updateDoc(doc(db, 'todos', id), { text: text });
    } catch (e) {
      console.log('Error editing todo:', e);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (e) {
      console.log('Error deleting todo:', e);
    }
  };

  if (isLoading) {
    return (
      <Div>
        <Spinner size="large" />
      </Div>
    );
  }

  return (
    <Group mode="plain" header={<Header mode="primary">Your Todos:</Header>}>
      <Card mode="outline">
        <AddTodo addTodo={addTodo} />
        {todos.length > 0 && (
          <Spacing size={24}>
            <Separator />
          </Spacing>
        )}
        <FlipMove enterAnimation="fade" leaveAnimation="fade">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </FlipMove>
      </Card>
    </Group>
  );
};

export default TodoList;
