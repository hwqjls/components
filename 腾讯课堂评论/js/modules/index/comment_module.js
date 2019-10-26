var initPageBtns = function(pages, curPage){

}

var initCommentModule = (function(document, initPageBtns){
  var oCommentEditBoard = $get('.J_commentEditBoard')[0],
    oStarTip = $get('.J_starTip')[0],
    oStarItems = $get('.J_hoverStar'),
    oTxtCount = $get('.J_txtCount')[0],
    oEditTxt = $get('.J_editTxt')[0],
    oSubmitBtn = $get('.J_submitBtn')[0],


    starNum = 5;


  var APIs = {
    submitComment: 'http://localhost/api_for_study/index.php/Comment/submitComment',
  }

  return {
    openBoard: function(){
      /* 评论面板打开 */
      oCommentEditBoard.style.display = 'block';
    },

    closeBoard: function(){
      /* 评论面板关闭 */
      oCommentEditBoard.style.display = 'none';
    },

    starsHover: function(e){
      /* 好评程度设置 */
      var e = e || window.event,
        tar = e.target || e.srcElement,
        tagName = tar.tagName.toLowerCase();

      if(tagName === 'i'){
        var thisIdx = [].indexOf.call(oStarItems, tar),
          thisStarItem = oStarItems[thisIdx],
          len = oStarItems.length,
          item;

        oStarTip.innerHTML = thisStarItem.getAttribute('data-title');
        starNum = thisStarItem.getAttribute('data-count');

        for(var i = 0; i < len; i++){
          item = oStarItems[i];

          if(i <= thisIdx){
            if(item.className.indexOf('active') === -1){
              item.className += ' active';
            }
          }else{
            item.className = 'fa fa-star J_hoverStar';
          }
        }
      }
    },

    editInput: function(){
      /* 评论编辑框输入设置 */
      var val = trimSpace(oEditTxt.value),
        valLen = val.length;

      oTxtCount.innerHTML = valLen;

      if(valLen >= 15 && valLen <= 1000){
        this.submitBtnChange({
          txtChange: false,
          isDisabled: false
        });
      }else{
        this.submitBtnChange({
          txtChange: false,
          isDisabled: true
        });
      }
    },

    submitBtnChange: function(opt){
      /*评论提交按钮状态改变*/
      var txtChange = opt.txtChange,
          isDisabled = opt.isDisabled;

      if(txtChange){
        oSubmitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
      }else{
        oSubmitBtn.innerHTML = '提交评论';
      }

      if(isDisabled){
        oSubmitBtn.className += ' disabled';
        oSubmitBtn.setAttribute('disabled', 'disabled');
      }else{
        oSubmitBtn.className = 'comment-btn submit J_submitBtn';
        oSubmitBtn.removeAttribute('disabled');
      }
    },

    submitComment: function(userId){
      var val = oEditTxt.value,
        len = trimSpace(val).length,
        _self = this;

      if(len >= 15 && len <= 1000){
        xhr.ajax({
          url: APIs.submitComment,
          type: 'POST',
          data: {
            userId: userId,
            starNum: starNum,
            comment: val
          },
          success: function(data){
            console.log(data);
          },

          error: function(){
            alert('对不起，提交评论失败，请重试');
          }
        })
      }
    },

  
  }
})(document, initPageBtns);