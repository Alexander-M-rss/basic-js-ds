const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    function addData(node, data){
      if(!node)
        return new Node(data);
      if(node.data === data)
        return node;
      if(node.data > data)
        node.left = addData(node.left, data);
      else
        node.right = addData(node.right, data);

      return node;
    }

    this._root = addData(this._root, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    function findData(node, data){
      if(!node)
        return null;

      if(node.data === data)
        return node;

      return node.data > data ? findData(node.left, data) : findData(node.right, data);
    }

    return findData(this._root, data);
  }

  remove(data) {
    function removeData(node, data) {
      if(!node)
        return null;

      if(node.data > data){
        node.left = removeData(node.left, data);
        return node;
      } else if(node.data < data) {
        node.right = removeData(node.right, data);
        return node;
      }

      if(!node.left && !node.right)
        return null;

      if(!node.left){
        node = node.right;
        return node;
      }

      if(!node.right){
        node = node.left;
        return node;
      }

      node.data = BinarySearchTree.prototype.min(node.right);
      node.right = removeData(node.right, node.data);

      return node;
    }

    this._root = removeData(this._root, data);
  }

  min(start = this._root) {
    if(!start)
      return null;

    let node = start;

    while(node.left)
      node = node.left;

    return node.data;
  }

  max() {
    if(!this._root)
      return null;

    let node = this._root;

    while(node.right)
      node = node.right;

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
