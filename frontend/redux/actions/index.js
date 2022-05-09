import { ADD_TODO, TOGGLE_TODO } from './actionTypes';

export const addToDoo = text => ({
  type: ADD_TODO,
  text
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
