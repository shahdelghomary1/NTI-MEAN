
interface Book {
  id: number;
  title: string;
  author: string;
}

class Library {
  private books: Book[] = [];

  addBook(book: Book): void {
    if (this.books.some(b => b.id === book.id)) {
      console.warn(`Book with id ${book.id} already exists. Skipping add.`);
      return;
    }
    this.books.push(book);
  }

  removeBook(id: number): boolean {
    const originalLength = this.books.length;
    this.books = this.books.filter(b => b.id !== id);
    return this.books.length < originalLength; 
  }
  getAllBooks(): Book[] {
    return [...this.books];
  }

  displayBooks(): void {
    if (this.books.length === 0) {
      console.log("Library is empty.");
      return;
    }
    console.log("Library books:");
    this.books.forEach(b => {
      console.log(`- [${b.id}] "${b.title}" by ${b.author}`);
    });
  }
}

const lib = new Library();

lib.addBook({ id: 1, title: "1984", author: "George Orwell" });
lib.addBook({ id: 2, title: "Clean Code", author: "Robert C. Martin" });
lib.addBook({ id: 3, title: "You Don't Know JS", author: "Kyle Simpson" });

lib.displayBooks();

console.log("إزالة الكتاب ذو id=2: ", lib.removeBook(2) ? "تم" : "لم يتم");
lib.displayBooks();

console.log("جميع الكتب كقائمة:", lib.getAllBooks());
