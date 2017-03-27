

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this.locationOfK = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[index];

  if (this._storage.length > (0.75 * this._limit)) {
    var copy = this._storage;
    this._limit *= 2;
    this._storage = LimitedArray(this._limit);
    for (var i = 0; i < copy.length; i++) {
      this.insert(copy[i]);
    }
  }
  if (!bucket) {
    this._storage[index] = [[k, v]];
  } else {
      for (var j = 0; j < bucket.length; j++) {
        if (bucket[j][0] === k) {
          this._storage[index][j][1] = v;
        } else if (j === bucket.length - 1) {
          bucket.push([k, v]);
          break;
        }
      }
  }

};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[index];
  if (bucket) {
    if (bucket.length > 1) {
      for (var i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === k) {
          this.locationOfK = i;
          return bucket[i][1];
        }
      }
    } else if (bucket.length === 0) {
      return undefined;
    } else {
      this.locationOfK = 0;
      return bucket[0][1];
    }
  }
  return undefined;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[index];
  if (this.retrieve(k)) {
    bucket.splice(this.locationOfK);
  }

  if (this._storage.length < 0.25 * this._limit) {
    var copy = this._storage;
    this.limit /= 2;
    this._storage = LimitedArray(this._limit);
    for (var i = 0; i < copy.length; i++) {
      this.insert(copy[i]);
    }
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
