var User = /** @class */ (function () {
    function User(name, _email) {
        this.name = name;
        this._email = _email;
    }
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.getDetails = function () {
        return "Name: ".concat(this.name, " | Email: ").concat(this._email);
    };
    User.prototype.updateEmail = function (newEmail) {
        this._email = newEmail;
    };
    return User;
}());
var u1 = new User("shahd", "shahdelghomary@example.com");
console.log(u1.getDetails());
var u2 = new User("Ali", "ali@oldmail.com");
console.log(u2.getDetails());
u2.updateEmail("ali@newmail.com");
console.log("Updated email", u2.getDetails());
