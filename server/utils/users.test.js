const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },
    {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('Should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Kamran',
      room: 'The office fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('Should remove a user', () => {
    var userid = '1';
    var user = users.removeUser(userid);

    expect(user.id).toBe(userid);
    console.log(users.users.length);
    expect(users.users.length).toBe(2);
  });

  it('Should not remove a user', () => {
    var userid = '99';
    var user = users.removeUser(userid);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('Should find user', () => {
    var userid = '2';
    var user = users.getUser(userid);

    expect(user.id).toEqual(userid);
  });

  it('Should not find user', () => {
    var userid = '99';
    var user = users.getUser(userid);

    expect(user).toNotExist();
  });

  it('Should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('Should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });
});