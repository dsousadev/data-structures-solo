var BinarySearchTree = function(value) {
  var bst = Object.create(BinarySearchTree.prototype);
  bst.left = null;
  bst.right = null;
  bst.value = value;
  return bst;
};


BinarySearchTree.prototype.insert = function (value) {
  var newNode = BinarySearchTree(value);
  if (this.left === null && this.value > value) {
    this.left = newNode;
  } else if (this.right === null && this.value < value) {
    this.right = newNode;
  } else if (this.value < value) {
    this.right.insert(value);
  } else if (this.value > value) {
    this.left.insert(value);
  }
};

BinarySearchTree.prototype.contains = function (value) {
  if (this.value === value) {
    return true;
  }
  if (this.value > value && this.left) {
    if (this.left.contains(value)) {
      return true;
    }
  } else if (this.value < value && this.right) {
    if (this.right.contains(value)) {
      return true;
    }
  }
  return false;
};

BinarySearchTree.prototype.depthFirstLog = function (cb) {
  cb(this.value);
  if (this.left) {
    this.left.depthFirstLog(cb);
  }
  if (this.right) {
    this.right.depthFirstLog(cb);
  }
};
/*
 * Complexity: What is the time complexity of the above functions?
 */
