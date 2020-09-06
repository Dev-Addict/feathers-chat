import { Hook, HookContext } from '@feathersjs/feathers';

export default (): Hook => {
  return async (context: HookContext) => {
    const { app, method, result, params } = context;
    const addUser = async (message: any) => {
      const user = await app.service('users').get(message.userId, params);

      return {
        ...message,
        user
      };
    };

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addUser));
    } else {
      context.result = await addUser(result);
    }
    return context;
  };
};
