import { Todo } from './todo';

describe('Todo', () => {
  it('deve criar uma instância', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('deve aceitar valores no constructor', () => {
    let todo = new Todo({
      title: 'Fazer o teste da Geru',
      date: '30/09/2018',
      complete: true
    });
    expect(todo.title).toEqual('Fazer o teste da Geru');
    expect(todo.complete).toEqual(true);
  });
});