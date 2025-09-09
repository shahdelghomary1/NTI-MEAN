
class Counter {
  private counter: number;

  constructor(initial = 0) {
    this.counter = initial;
  }

  increase(): number {
    this.counter += 1;
    return this.counter;
  }

  decrease(): number {
    this.counter -= 1;
    return this.counter;
  }

  reset(): number {
    this.counter = 0;
    return this.counter;
  }

  get value(): number {
    return this.counter;
  }
}

const counter = new Counter(0);
const countEl = document.getElementById("count") as HTMLElement;
const logEl = document.getElementById("log") as HTMLElement;

function updateUI() {
  countEl.textContent = String(counter.value);
  const p = document.createElement("p");
  p.textContent = `Current value: ${counter.value} (at ${new Date().toLocaleTimeString()})`;
  logEl.prepend(p);
}

document.getElementById("inc")?.addEventListener("click", () => {
  counter.increase();
  updateUI();
});

document.getElementById("dec")?.addEventListener("click", () => {
  counter.decrease();
  updateUI();
});

document.getElementById("reset")?.addEventListener("click", () => {
  counter.reset();
  updateUI();
});
updateUI();
