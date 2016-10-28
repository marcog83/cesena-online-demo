const defaultFilter = require("./default-filter");
const movieFilter = require("./movie-filter");

var Stack = function (filter) {
    this.filter = filter;
    this.next = null;
};
Stack.prototype = {
    render: function (id, res) {
        //id rientra nel filtro
        this.filter.match(id).then(idMatch=> {

            if (idMatch) {
                // renderizza con le logiche del filtro
                this.filter.render(id, res);

            } else {
                this.next && this.next.render(id, res);
            }
        });

        // If there is any money left to withdraw and if we have
        // another stack in the line, pass the request on

    },
    // set the stack that comes next in the chain
    setNextStack: function (stack) {
        this.next = stack;
    }
};
var RenderFilters = function () {
    // Create the stacks of money
    // We'll show you the implementation for this next
    var movieStack = new Stack(movieFilter),
        defaultStack = new Stack(defaultFilter);
    // Set the hierarchy for the stacks
    movieStack.setNextStack(defaultStack);

    // Set the top stack as a property
    this.stack = movieStack;
};
RenderFilters.prototype.render = function (id, res) {
    this.stack.render(id, res);
};


exports.details = function (id, res) {
    var renderFilter = new RenderFilters();
    renderFilter.render(id, res);
};