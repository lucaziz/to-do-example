import {TestBed, async, inject} from '@angular/core/testing';
import {Todo} from '../models/todo';
import {TodoDataService} from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('deve ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTasks()', () => {

    it('deve retornar um array vazio', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTasks()).toEqual([]);
    }));

    it('deve retornar todas as tasks', inject([TodoDataService], (service: TodoDataService) => {
      let task01 = new Todo({title: 'Fazer o teste da Geru', date: '30/09/2018', complete: true});
      let task02 = new Todo({title: 'Ser aprovado pela Geru', date: '30/09/2018', complete: false});
      let task03 = new Todo({title: 'Compartilhar conhecimento', date: '30/09/2018', complete: true});
      service.addTask(task01);
      service.addTask(task02);
      service.addTask(task03);
      expect(service.getAllTasks()).toEqual([task01, task02, task03]);
    }));

  });

  describe('#saveTask(todo)', () => {
    it('deve incrementar id automaticamente', inject([TodoDataService], (service: TodoDataService) => {
      let task01 = new Todo({title: 'Fazer o teste da Geru', date: '30/09/2018', complete: true});
      let task02 = new Todo({title: 'Ser aprovado pela Geru', date: '30/09/2018', complete: false});
      let task03 = new Todo({title: 'Compartilhar conhecimento', date: '30/09/2018', complete: true});
      service.addTask(task01);
      service.addTask(task02);
      service.addTask(task03);
      expect(service.getTask(1)).toEqual(task01);
      expect(service.getTask(2)).toEqual(task02);
      expect(service.getTask(3)).toEqual(task03);
    }));

  });

  describe('#deleteTask(id)', () => {
    it('deve remover a task que corresponde ao id', inject([TodoDataService], (service: TodoDataService) => {
      let task01 = new Todo({title: 'Fazer o teste da Geru', date: '30/09/2018', complete: true});
      let task02 = new Todo({title: 'Ser aprovado pela Geru', date: '30/09/2018', complete: false});
      let task03 = new Todo({title: 'Compartilhar conhecimento', date: '30/09/2018', complete: true});
      service.addTask(task01);
      service.addTask(task02);
      service.addTask(task03);
      expect(service.getAllTasks()).toEqual([task01, task02, task03]);
      service.deleteTask(1);
      expect(service.getAllTasks()).toEqual([task02, task03]);
      service.deleteTask(2);
      expect(service.getAllTasks()).toEqual([task03]);
      service.deleteTask(3);
      expect(service.getAllTasks()).toEqual([]);
    }));

  });

  describe('#editTask(id, values)', () => {
    it('deve editar a task que corresponde ao id', inject([TodoDataService], (service: TodoDataService) => {
      let task01 = new Todo({title: 'Fazer o teste da Geru', date: '30/09/2018', complete: true});
      service.addTask(task01);
      let updatedTask = service.editTask(1, {
        title: 'Completar o teste da Geru'
      });
      expect(updatedTask.title).toEqual('Completar o teste da Geru');
    }));
  });

});