var dropdown = document.getElementsByClassName('dropdown')[0],
  oList = elemChildren(dropdown)[1],
  timer = null,
  listHeight = 0,
  speed = 3;

dropdown.onmouseenter = function () {
  clearInterval(timer);
  timer = setInterval(function() {
    if (listHeight >= 200) {
      clearInterval(timer);
    } else {
      listHeight = parseInt(getStyles(oList, 'height')) + speed;
      oList.style.height = listHeight + 'px';
    }
  }, 1);
  this.className += ' up';
};

dropdown.onmouseleave = function () {
  clearInterval(timer);
  timer = setInterval(() => {
    if (listHeight <= 0) {
      clearInterval(timer);
    } else {
      listHeight = parseInt(getStyles(oList, 'height')) - speed;
      oList.style.height = listHeight + 'px';
    }
  }, 1);
  this.classList = 'dropdown';
};


function elemChildren(node) {
  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  };

  var children = node.childNodes,
    len = children.length,
    item;

  for (var i = 0; i < len; i++) {
    item = children[i];

    if (item.nodeType === 1) {
      temp.push(item);
    }
  }
  return temp;
}

function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop];
    } else {
      return window.getComputedStyle(elem, null);
    }
  } else {
    if (prop) {
      return elem.currentStyle[prop];
    } else {
      return elem.currentStyle;
    }
  }
}