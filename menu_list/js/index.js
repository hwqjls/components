window.onload = function () {
  init();
}

function init() {
  menu_list();
}

var menu_list = (function () {
  var oMenu = document.getElementsByClassName('menu-wrap')[0],
    oMain = oMenu.getElementsByClassName('main')[0],
    oMainList = oMain.getElementsByClassName('main-list')[0],
    oMainItems = oMainList.getElementsByClassName('main-item'),
    mItemsLen = oMainItems.length,
    mItem,
    oSub = oMenu.getElementsByClassName('sub')[0],
    oSubList = oSub.getElementsByClassName('sub-list')[0],
    oSubItems = oSubList.getElementsByClassName('sub-item'),
    sItem,
    t = null,
    isFirst = true,
    isInSub = false,
    mousePoses = [];

  addEvent(oMenu, 'mouseenter', function () {
    addEvent(document, 'mousemove', mouseMove);
  });

  addEvent(oMenu, 'mouseleave', menuMouseOut);

  for (var i = 0; i < mItemsLen; i++) {
    mItem = oMainItems[i];
    addEvent(mItem, 'mouseenter', menuItemMouseEnter);
  }

  addEvent(oSub, 'mouseenter', function () {
    isInSub = true;
  });

  addEvent(oSub, 'mouseleave', function () {
    isInSub = false;
  });

  function menuItemMouseEnter(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      thisIdx = Array.prototype.indexOf.call(oMainItems, tar),
      posLen = mousePoses.length,
      curPos = mousePoses[posLen - 1] || { x: 0, y: 0 },
      lastPos = mousePoses[posLen - 2] || { x: 0, y: 0 },
      toDelay = doTimeout(curPos, lastPos);

    oSub.className = 'sub';

    if (t) {
      clearTimeout(t);
    }

    if (!isFirst) {
      if (toDelay) {
        t = setTimeout(function () {
          if (isInSub) {
            return;
          }
          addActive(thisIdx);
          t = null;
        }, 200);
      } else {
        addActive(thisIdx);
      }
    } else {
      addActive(thisIdx);
      isFirst = false;
    }
  }

  function addActive(index) {
    removeAllActive();
    oMainItems[index].className += ' active';
    oSubItems[index].className += ' active';
  }

  function removeAllActive() {
    for (var i = 0; i < mItemsLen; i++) {
      mItem = oMainItems[i];
      sItem = oSubItems[i];
      mItem.className = 'main-item';
      sItem.className = 'sub-item';
    }
  }

  function menuMouseOut() {
    oSub.className += ' hide'
    removeAllActive();
    removeEvent(document, 'mousemove', mouseMove);
  }

  function mouseMove(e) {
    var e = e || window.event;

    mousePoses.push({
      x: pagePos(e).X,
      y: pagePos(e).Y
    });

    if (mousePoses.length >= 3) {
      mousePoses.shift();
    }
  }

  function doTimeout(curPos, lastPos) {
    var TL = {
      x: parseInt(getStyles(oMain, 'margin-left'), 10) + getStyles(oMain, 'width'),
      y: getStyles(oMain, 'margin-top')
    },
      BL = {
        x: parseInt(getStyles(oMain, 'margin-left'), 10) + getStyles(oMain, 'width'),
        y: parseInt(getStyles(oMain, 'margin-top'), 10) + getStyles(oMain, 'height')

      }
    return pointInTriangle({
      curPos: curPos,
      lastPos: lastPos,
      topLeft: TL,
      bottomLeft: BL
    });
  }
});