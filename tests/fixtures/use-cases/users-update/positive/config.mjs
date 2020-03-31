import UsersUpdate from '../../../../../lib/use-cases/users/Update.mjs';

export default {
    serviceClass : UsersUpdate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const userId = users[0].id;

        return userId;
    }
};