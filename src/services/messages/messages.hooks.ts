import { Hook, HookContext } from '@feathersjs/feathers';

export default () : Hook => {
  return async (context: HookContext) => {
    const { data } = context;

    if(!data.text) {
      throw new Error('A message must have a text');
    }

    const user = context.params.user;
    const text = data.text
      .substring(0, 400);

    context.data = {
      text,
      userId: user._id,
      createdAt: new Date().getTime()
    };

    return context;
  };
};
