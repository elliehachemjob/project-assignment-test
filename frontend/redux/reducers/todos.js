let newState = [];

const todos = (state = { nextId: 0, list: [] }, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      newState = {
        ...state,
        nextId: state.nextId + 1,
        list: state.list.concat({
          id: state.nextId,
          text: action.text,
          completed: false,
        }),
      };
      return newState;
    case 'TOGGLE_TODO':
      return state.list.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todos;
