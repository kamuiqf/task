export default function Table() {
  return {
    _cols: [],
    _rows: [],

    get rows() {
      return this._rows.slice();
    },

    initColumns(cols) {
      let idx = 0;
      for (const col of Object.keys(cols)) {
        this._cols.push([String(col), idx, cols[col]]);
        idx++;
      }
    },

    addRow(row) {
      if (!Array.isArray(row) || row.length != this._cols.length) {
        console.error("\x1b[38;5;124mInvalid row: \x1b[0m", row);
        return;
      }
      this._rows.push(row);
    },

    max(key) {
      for (const col of this._cols) {
        const title = col[0];
        const type = col[2];
        if (title === key && type === "number") {
          let max = 0;
          for (let row of this._rows) {
            const idx = col[1];
            const value = parseInt(row[idx]);
            if (value > max) max = value;
          }
          return max;
        }
      }
      console.error("\x1b[38;5;124mInvalid param: \x1b[0m", key);
    },

    addColumn(title, type, callback) {
      callback(this._rows);
      this._cols.push([title, this._cols.length, type]);
      return title;
    },

    sort(title) {
      for (const col of this._cols) {
        if (col[0] == title) {
          const idx = col[1];
          this._rows.sort((r1, r2) => r2[idx] - r1[idx]);
          return;
        }
      }
      console.error("\x1b[38;5;124mInvalid param: \x1b[0m", title);
    },

    print() {
      for (const row of this._rows) {
        console.log(row);
      }
    },
  };
}
