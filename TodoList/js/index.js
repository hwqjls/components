; (function (node) {
  var TodoList = function () {
    this.node = node;
    this.inpuShow = false;
    this.isEdit = false;
    this.curIdx = null;
    this.dConfig = {
      "plusBtn": "",
      "inputArea": "",
      "addBtn": "",
      "list": "",
      "item": ""
    };

    var _self = this;
    this.config = this.getConfig();
    this.item = this.config.item;

    for (var key in this.dConfig) {
      if (!this.config.hasOwnProperty(key)) {
        console.log(errorInfo(key));
      }
    }

    this.setConfig();

    addEvent(this.plusBtn, 'click', function () {
      _self.showInput.call(_self);
    });

    addEvent(this.addBtn, 'click', function () {
      _self.addBtnClick.call(_self);
    });

    addEvent(this.oList, 'click', function(e){
      var e = e || window.event,
        tar = e.target || e.srcElement;
      
      _self.listClick.call(_self, tar);
    });
  }

  TodoList.prototype = {
    getConfig: function () {
      return JSON.parse(this.node.getAttribute('data-config'));
    },

    setConfig: function () {
      var config = this.config,
        node = this.node;

      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
      this.inputArea = node.getElementsByClassName(config.inputArea)[0];
      this.addBtn = this.inputArea.getElementsByClassName(config.addBtn)[0];
      this.content = this.inputArea.getElementsByClassName('content')[0];
      this.oList = node.getElementsByClassName(config.list)[0];
      
    },

    addBtnClick: function () {
      var _self = this,
        content = this.content.value,
        contentLen = content.length,
        oItems = this.oList.getElementsByClassName(_self.item),
        itemLen = oItems.length,
        text;

      if(contentLen <= 0){
        return;
      }

      if(itemLen > 0){
        for(var i = 0; i < itemLen; i++){
          text = elemChild(oItems[i])[0].innerText;
          
          if(text === content){
            alert('已存在该项！');
            return;
          }
        }
      }

      if(_self.isEdit){
        elemChild(oItems[_self.curIdx])[0].innerText = content;
        setInputStatus.apply(_self, [oItems, null, 'add']);
      }else{
        var oLi = document.createElement('li');

        oLi.className = this.item;
        oLi.innerHTML = itemTpl(content);
        this.oList.appendChild(oLi);
      }
      setInputShow.call(_self, 'close');
    },

    listClick: function(tar){
      var _self = this,
        className = tar.className,
        oParent = elemParent(tar, 2),
        oItems = _self.oList.getElementsByClassName(_self.item),
        itemLen = oItems.length,
        item;

      if(className === 'edit-btn fa fa-edit'){
        for(var i = 0; i < itemLen; i++){
          item = oItems[i];
          item.className = _self.item;
        }

        oParent.className += ' active';
        setInputShow.call(_self, 'open');
        setInputStatus.apply(_self, [oItems, oParent, 'edit']);

      }else if(className === 'remove-btn fa fa-remove'){
        oParent.remove();
      }
    },

    showInput: function () {
      var _self = this;

      if (this.inputShow) {
        setInputShow.call(_self, 'close');
      } else {
        setInputShow.call(_self, 'open');
      }
    }

  }

  function setInputStatus(oItems, target, status){
    var _self = this;

    if(status === 'edit'){
      var idx = Array.prototype.indexOf.call(oItems, target),
        text = elemChild(target)[0].innerText;

      _self.addBtn.innerText = '编辑第' + (idx + 1) + '项';
      _self.isEdit = true;
      _self.curIdx = idx;
      _self.content.value = text;

    }else if(status === 'add'){
      var itemLen = oItems.length,
        item;
      
      for(var i = 0; i < itemLen; i++){
        item = oItems[i];

        item.className = _self.item;
        _self.addBtn.innerText = '增加项目';
        _self.isEdit = false;
        _self.curIdx = null;
      }
    }
  }

  function setInputShow(action) {
    var oItems = this.oList.getElementsByClassName(this.item);

    if (action === 'open') {
      this.inputArea.style.display = 'block';
      this.inputShow = true;
    } else if (action === 'close') {
      this.inputArea.style.display = 'none';
      this.inputShow = false;
      this.content.value = '';
      setInputStatus.apply(this, [oItems, null, 'add']);
    }
  }

  function itemTpl(text) {
    return ('<p class="item-content">' + text + '</p>' +
      '<div class="btn-group">' +
      '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
      '<a href="javascript:;" class="remove-btn fa fa-remove"></a>' +
      '</div>');
  }

  function errorInfo(key) {
    return new Error(
      '您没有配置参数' + key + '\n' +
      '必须配置的参数列表如下:\n' +
      '打开输入框按钮元素类名: plusBtn\n' +
      '输入框区域元素类名: inputArea\n' +
      '增加项目按钮元素类名: addBtn\n' +
      '列表承载元素类名: list\n' +
      '列表项承载元素类名: item'
    );
  }

  new TodoList();
})(document.getElementsByClassName('wrap')[0]);