init();

function init() {
  initTodoList;
}

var initTodoList = (function () {
  var showInput = document.getElementsByClassName('j-show-input')[0], //显示input按钮
    inputWrap = document.getElementsByClassName('input-wrap')[0],     //内容框
    addItem = document.getElementsByClassName('j-add-item')[0],       //新增项目按钮
    textInput = document.getElementById('textInput'),                 //输入框
    oList = document.getElementsByClassName('j-list')[0],             //ul子项列表
    inputShow = false,  //内容输入显示隐藏状态
    isEdit = false,     //内容输入是否编辑状态
    curIdx = null;      //当前子项所在索引

    /* 
    *@desc 添加显示(隐藏)添加(编辑)输入框点击事件
    */
    myEventUtils.addEvent(showInput, 'click', function() {
      if (inputShow) {
        inputWrap.style.display = 'none';
        inputShow = false;
        isEdit = false;
        curIdx = null;
        textInput.value = '';
        addItem.innerText = '增加项目';
      } else {
        inputWrap.style.display = 'block';
        inputShow = true;
      }
    });

    /* 
    *@desc 添加(编辑)子项点击事件
    */
    myEventUtils.addEvent(addItem, 'click', function () {
      var oItems = document.getElementsByClassName('item'),
        itemLen = oItems.length,
        content = textInput.value,
        contentLen = content.length,
        itemText;

      if (contentLen <= 0) {
        return;
      }

      if (itemLen > 0) {
        for (var i = 0; i < itemLen; i++) {
          itemText = myElemNodeUtils.elemChild(oItems[i]).innerText;
        
          if (content === itemText) {
            alert('已存在此项目');
            return;
          }
        }
      }

      if (isEdit) {
        var itemContent = myElemNodeUtils.elemChild(oItems[curIdx])[0];

        itemContent.innerText = content;
        addItem.innerText = '增加项目';
        isEdit = false;
        curIdx = null;
      } else {
        var oLi = document.createElement('li');
        oLi.className = 'item';
        oLi.innerHTML = itemTpl(content);
        oList.appendChild(oLi);
      }

      textInput.value = '';
      inputWrap.style.display = 'none';
      inputShow = false;
    });

    myEventUtils.addEvent(oList, 'click', function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className,
        oItems = document.getElementsByClassName('item'),
        liParent = myElemNodeUtils.elemParent(tar, 2);

        if (className === 'edit-btn fa fa-edit') {
          var itemLen = oItems.length,
            tarIdx = Array.prototype.indexOf.call(oItems, liParent),
            item;

            inputWrap.style.display = 'block';
            inputShow = true;

            for (var i = 0; i < itemLen; i++) {
              item = oItems[i];
              item.className = 'item';
            }

            curIdx = tarIdx;
            liParent.className += ' active';
            addItem.innerHTML = '编辑第' + (curIdx + 1) + '项';
            isEdit = true;
        } else if (className === 'remove-btn fa fa-times') {
          liParent.remove();
          isEdit = false;
          curIdx = null;
          textInput.value = '';
          addItem.innerText = '增加项目';
        }
    });

    //子项内容模板
    function itemTpl(text) {
      return (
        '<p class="item-content">' + text + '</p>' +
        '<div class="btn-group">'+
        '<a href="javascript:;" class="edit-btn fa fa-edit"></a>'+
        '<a href="javascript:;" class="remove-btn fa fa-times"></a>'+
        '</div>'
      );
    }
})();