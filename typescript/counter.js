var _a, _b, _c;
var Counter = /** @class */ (function () {
    function Counter(initial) {
        if (initial === void 0) { initial = 0; }
        this.counter = initial;
    }
    Counter.prototype.increase = function () {
        this.counter += 1;
        return this.counter;
    };
    Counter.prototype.decrease = function () {
        this.counter -= 1;
        return this.counter;
    };
    Counter.prototype.reset = function () {
        this.counter = 0;
        return this.counter;
    };
    Object.defineProperty(Counter.prototype, "value", {
        get: function () {
            return this.counter;
        },
        enumerable: false,
        configurable: true
    });
    return Counter;
}());
var counter = new Counter(0);
var countEl = document.getElementById("count");
var logEl = document.getElementById("log");
function updateUI() {
    countEl.textContent = String(counter.value);
    var p = document.createElement("p");
    p.textContent = "Current value: ".concat(counter.value, " (at ").concat(new Date().toLocaleTimeString(), ")");
    logEl.prepend(p);
}
(_a = document.getElementById("inc")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    counter.increase();
    updateUI();
});
(_b = document.getElementById("dec")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    counter.decrease();
    updateUI();
});
(_c = document.getElementById("reset")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    counter.reset();
    updateUI();
});
updateUI();
