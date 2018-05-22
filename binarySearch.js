'use strict';

class BinarySearchTree {
    constructor(key=null, value=null, parent=null){
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value){
        if(this.key == null){
            this.key = key;
            this.value = value;
        }
        else if(key < this.key){
            if(this.left == null){
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if(this.right == null){
                this.right = new BinarySearchTree(key, value, this);
            }
            else{
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        if(this.key == key){
            return this.value;
        }
        else if (key < this.key && this.left){
            return this.left.find(key);
        }
        else if(key> this.key && this.right){
            return this.right.find(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node){
        if(this.parent){
            if(this == this.parent.left){
                this.parent.left = node;
            }
            else if(this == this.parent.right){
                this.parent.right = node;
            }
            if(node){
                node.parent = this.parent;
            }
        }
        else {
            if(node){
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else{
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }
    _findMin(){
        if(!this.left){
            return this;
        }
        return this.left._findMin();
    }
    _findMax(){
        if(!this.right){
            return this;
        }
        return this.right._findMax();
    }
    remove(key) {
        if(this.key == key){
            if(this.left && this.right){
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if(this.left){
                this._replaceWith(this.left);
            }
            else if(this.right){
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if(key < this.key && this.left){
            this.left.remove(key);
        }
        else if(key > this.key && this.right){
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

}
function height(BST){
    let leftCounter = 0;
    let rightCounter = 0;
    if(BST == null){
        return 0;
        //height will be zero if no tree
    }
    else {
        leftCounter = height(BST.left);
        rightCounter = height(BST.right);
         if (leftCounter > rightCounter){
             return leftCounter+1;
         }
         else {
             return rightCounter+1;
         }
    }
    
}
function isBST(tree){
    if(!tree) return;
    if(tree.key < tree.right.key && tree.key > tree.left.key){
        return true;
    }
    else{
        return false;
    } 
}
let temp = new BinarySearchTree();
function thirdLargest(tree) {
  if (tree) {
    thirdLargest(tree.left);
    
    temp.insert(tree.key);
    thirdLargest(tree.right);
  }
  
  let curr = temp;

  while (curr.right) {
    curr = curr.right;
  }

  if (curr.parent && curr.parent.parent) {
    return curr.parent.parent.key;
  }
}
function balancedBST(BST){
    if(!BST) return;

    let leftHeight = height(BST.left);
    let rightHeight = height(BST.right);

    let absVal = (Math.abs(leftHeight - rightHeight));
    if(absVal <= 1){
        return true
    }
    return false;
}

function main(){
 let BST = new BinarySearchTree();
    BST.insert('3');
    BST.insert('1');
    BST.insert('4');
    BST.insert('6');
    BST.insert('9');
    BST.insert('2');
    BST.insert('5');
    BST.insert('7');
    //console.log(BST);
    //console.log(height(BST));
    //console.log(isBST(BST));
    console.log(thirdLargest(BST));
    console.log(balancedBST(BST));
}

main();

//Create a BST class turned out to be exactly how we drew it out to be
