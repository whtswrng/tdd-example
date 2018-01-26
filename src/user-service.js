class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(username, password) {
        this._throwIfCredentialsAreInIncorrectFormat(username, password);

        if(await this.userRepository.hasUser(username)) {
            throw new Error('User already exists!');
        }

        await this.userRepository.createUser(username, password);
    }

    _throwIfCredentialsAreInIncorrectFormat(username, password) {
        if (typeof username !== 'string') {
            throw new Error('Username has to be a string!');
        }
        if (typeof password !== 'string') {
            throw new Error('Password has to be a string!');
        }
    }

}

module.exports = UserService;