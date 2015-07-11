var keypress = require("keypress");

function Navigator(list, format, onSelect) {
  this.list = list;
  this.top = 0;
  this.offset = 0;
  this.limit = 0;
  this.format = format;
  this.onSelect = onSelect;
  this._listening = false;
}

Navigator.prototype.show = function(offset, limit, paginated) {
  var data;
  this.limit = limit > 10 ? 10 : limit;
  this.offset = offset = offset < 0 ? 0 : offset;
  if ((this.list.length - this.offset) < this.limit) {
    this.offset = Math.max(this.list.length - this.limit, 0);
  }

  limit = Math.min(this.offset + this.limit, this.list.length);

  this.moveToTop(true);
  for (var i = this.offset; i < limit; i++) {
    data = this.list[i];
    process.stdout.write((i-this.offset) + ") " + this.format(data) + "\n");
    this.top++;
  }
  if (paginated) this.paginate();
};

Navigator.prototype.paginate = function() {
  var self = this;

  process.stdout.write("Use the arrows to navigate up and down or ESC to exit\n");
  process.stdout.write("Select a row [0-9]: ");
  this.top++;

  if (!this._listening) {
    keypress(process.stdin);
    process.stdin.on('keypress', function (chunk, key) {
      var index, offset = self.offset;
      key = key || { name: chunk };
      index = key.name.charCodeAt(0) - 48;
      if (key.name === "up") {
        self.show(offset-1, self.limit, true);
      } else if (key.name === "down") {
        self.show(offset+1, self.limit, true);
      } else if (key.name === "escape") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        self._listening = false;
      } else if (index >= 0 && index <= 9) {
        process.stdout.write(key.name+"\n");
        process.stdin.setRawMode(false);
        process.stdin.pause();
        self.onSelect(self.list[index + self.offset]);
      }
    });
    this._listening = true;
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
};

Navigator.prototype.clearLine = function() {
  process.stdout.write("\033[K");
};

Navigator.prototype.moveUp = function(clear) {
  clear = clear || typeof clear === undefined;
  if (clear) this.clearLine();
  process.stdout.write("\033[1A");
  if (clear) this.clearLine();
  this.top--;
};

Navigator.prototype.moveToTop = function(clear) {
  this.moveToBeginningOfLine();
  while (this.top > 0) {
    this.moveUp(clear);
  }
};

Navigator.prototype.moveToBeginningOfLine = function(column) {
  process.stdout.write("\033[255D");
};

module.exports = Navigator;
