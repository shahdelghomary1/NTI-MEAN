var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (book) {
        if (this.books.some(function (b) { return b.id === book.id; })) {
            console.warn("Book with id ".concat(book.id, " already exists. Skipping add."));
            return;
        }
        this.books.push(book);
    };
    Library.prototype.removeBook = function (id) {
        var originalLength = this.books.length;
        this.books = this.books.filter(function (b) { return b.id !== id; });
        return this.books.length < originalLength;
    };
    Library.prototype.getAllBooks = function () {
        return __spreadArray([], this.books, true);
    };
    Library.prototype.displayBooks = function () {
        if (this.books.length === 0) {
            console.log("Library is empty.");
            return;
        }
        console.log("Library books:");
        this.books.forEach(function (b) {
            console.log("- [".concat(b.id, "] \"").concat(b.title, "\" by ").concat(b.author));
        });
    };
    return Library;
}());
var lib = new Library();
lib.addBook({ id: 1, title: "1984", author: "George Orwell" });
lib.addBook({ id: 2, title: "Clean Code", author: "Robert C. Martin" });
lib.addBook({ id: 3, title: "You Don't Know JS", author: "Kyle Simpson" });
lib.displayBooks();
console.log("إزالة الكتاب ذو id=2: ", lib.removeBook(2) ? "تم" : "لم يتم");
lib.displayBooks();
console.log("جميع الكتب كقائمة:", lib.getAllBooks());
