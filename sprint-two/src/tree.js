var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var someInstance = Tree(value);
  if (!this.children) {
    this.children = [someInstance];
  } else {
    this.children.push(someInstance);
  }
};

treeMethods.contains = function(target) {
  if (this.value === target) {
    return true;
  } else if (this.hasOwnProperty('children')) {
    for (var i = 0; i < this.children.length; i++) {
      if(this.children[i].contains(target)) {
        return true;
      }
    }
  }
  return false;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
