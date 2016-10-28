//Direct object Model for routing
var Direct = {
    signUp: function(cb) {
        orm.all('burgers', function(res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create('burgers', cols, vals, function (res) {
            cb(res);
        })
    },
    update: function (objColVals, condition, cb) {
        var conditionString = 'burger_id = ' + condition;
        var objColValsObject = { devoured : objColVals };
        orm.update('burgers', objColValsObject, conditionString, function(res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        var conditionString = 'burger_id = ' + condition;
        orm.delete('burgers', conditionString, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;
