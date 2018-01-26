const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const UserService = require('./user-service');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe("UserService", () => {
    let userRepository;
    let userService;

    beforeEach(() => {
        userRepository = {
            hasUser: sinon.stub(),
            createUser: sinon.spy()
        };
        userService = new UserService(userRepository);
    });

    describe('when user registered', () => {

        it('should throw an error if username is not in valid format', async () => {
            await expect(userService.register({})).to.be.rejectedWith('Username has to be a string!');
        });

        it('should NOT throw an error if username is in valid format', async () => {
            await expect(userService.register('validUsername')).not.to.be.rejectedWith('Username has to be a string!');
        });

        it('should throw an error if password is not in valid format', async () => {
            await expect(userService.register('validUsername', {})).to.be.rejectedWith('Password has to be a string!');
        });

        it('should NOT throw an error if password is in valid format', async () => {
            await expect(userService.register('validUsername', 'validPassword')).not.to.be.rejectedWith(
                'Password has to be a string!'
            );
        });

        it('should throw an error if user already exists', async () => {
            userRepository.hasUser = sinon.stub().returns(true);
            await expect(userService.register('validUsername', 'validPassword')).to.be.rejectedWith(
                'User already exists!'
            );
        });

        it('should properly register user', async () => {
            userRepository.hasUser = sinon.stub().returns(false);
            await userService.register('validUsername', 'validPassword');
            expect(userRepository.createUser).to.have.been.calledWith('validUsername', 'validPassword');
        });

    })

});