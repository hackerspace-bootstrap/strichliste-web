
function Boundary(lower, upper) {
    this.lower = lower;
    this.upper = upper;
}

Boundary.prototype.exceedsUpperLimit = function(value) {
    return (value > this.upper);
};

Boundary.prototype.exceedsLowerLimit = function(value) {
    return (value < this.lower);
};

module.exports = Boundary;