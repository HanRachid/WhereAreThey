export default class Time {
  deciseconds: number;
  seconds: number;
  minutes: number;

  constructor(
    deciseconds: number = 0,
    seconds: number = 0,
    minutes: number = 0
  ) {
    this.deciseconds = deciseconds;
    this.seconds = seconds;
    this.minutes = minutes;
  }

  add(amount: number) {
    if (this.deciseconds + amount < 10) {
      this.deciseconds += amount;
    } else if (this.deciseconds + amount + this.seconds * 10 < 600) {
      this.seconds += Math.floor(amount + 1 / 10);
      this.deciseconds = (this.deciseconds + amount) % 10;
    } else if (
      this.deciseconds + amount + this.seconds + this.minutes <
      36000
    ) {
      this.minutes += Math.floor(amount + 1 / 600);
      this.seconds = (this.seconds + Math.floor(amount + 1 / 10)) % 60;
      this.deciseconds = (this.deciseconds + amount) % 10;
    }
  }
  reset() {
    this.deciseconds = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
  toDeci() {
    return this.deciseconds + this.seconds * 10 + this.minutes * 600;
  }

  toString() {
    if (this.seconds < 10 && this.minutes < 10) {
      return (
        "" +
        "0" +
        this.minutes +
        ":" +
        "0" +
        this.seconds +
        ":" +
        this.deciseconds
      );
    } else if (this.seconds < 10 && this.minutes > 10) {
      return (
        "" + this.minutes + ":" + "0" + this.seconds + ":" + this.deciseconds
      );
    } else if (this.seconds >= 10 && this.minutes < 10) {
      return "0" + this.minutes + ":" + this.seconds + ":" + this.deciseconds;
    } else {
      return "" + this.minutes + ":" + this.seconds + ":" + this.deciseconds;
    }
  }
}
