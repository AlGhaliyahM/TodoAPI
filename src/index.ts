import { AppDataSource } from './data-source';
import { Todo } from './entity/Todo';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');
    const todo = new Todo();
    todo.task = 'task1';
    await AppDataSource.manager.save(todo);
    console.log('Saved a new todo with id: ' + todo.id);

    console.log('Loading todo from the database...');
    // const users = await AppDataSource.manager.find(User);
    // console.log('Loaded users: ', users);

    // console.log(
    //   'Here you can setup and run express / fastify / any other framework.',
    // );
  })
  .catch((error) => console.log(error));
