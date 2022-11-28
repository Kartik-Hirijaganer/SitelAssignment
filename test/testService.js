const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Users API', () => {
	let counter = 1;
	it(`${counter++} should successfulyl get user by userId`, (done) => {
			const userId = '1';
			chai.request(server)
				.get('/users/' + userId)
				.end((err, response) => {
					response.should.have.status(200);
					const result = response.body;
					result.userId.should.equal('1');
					result.name.should.equal('Alex');
					done();
				});
    });
    it(`${counter++} should succesfully insert a new user`, (done) => {
        const user = {
            name: "Leo",
            email: "leo@foo.com",
            dob: "12/10/22"
        };
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });
    it(`${counter++} should successfully delete a user by userId`, (done) => {
        const userId = '2';
        chai.request(server)
            .delete('/users/' + userId)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });
});
