Number.prototype.comma = function () {
  return this.toLocaleString("ko-KR");
};

String.prototype.comma = function () {
  return parseInt(this).comma();
};
