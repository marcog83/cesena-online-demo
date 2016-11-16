const noop = _=> {
};


var Stack = function (filter) {
    function next_callback(...args) {
        return next_stack &&
            next_stack.apply(next_stack, args);
    }

    var next_stack = null;
    var callback = function (...args) {
        return filter.apply(filter, [next_callback].concat(args));
    };

    callback.next = function (stack) {
        next_stack = stack;
        return next_stack;
    };

    return callback;
};

var RenderFilters = function (first, ...filters) {
    // Create the stacks of money
    // We'll show you the implementation for this next
    var firstStack = Stack(first);
    filters.reduce((prev_stack, filter)=> {
        return prev_stack.next(Stack(filter));
    }, firstStack);
    // Set the top stack as a property

    return firstStack;
};

module.exports = RenderFilters;