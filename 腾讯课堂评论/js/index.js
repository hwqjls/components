;(function(document, Comment){

  var oOpenBtn = $get('.J_openBtn')[0],
    oCloseBtn = $get('.J_closeBtn')[0],
    oStars = $get('.J_stars')[0],
    oEditTxt = $get('.J_editTxt')[0],
    oSubmitBtn = $get('.J_submitBtn')[0],
    oRadioTabs = $get('.J_radioTabs')[0],
    oBtnBox = $get('.J_btnBox')[0];

  var userId = 1;

  var init = function(){
    /* Comment.getComments({
      fieldId: 0,
      pageNum: 0
    }); */
    bindEvent();
  }

  function bindEvent(){
    addEvent(oOpenBtn, 'click', Comment.openBoard);
    addEvent(oCloseBtn, 'click', Comment.closeBoard);
    addEvent(oStars, 'mouseover', Comment.starsHover);
    addEvent(oEditTxt, 'input', Comment.editInput.bind(Comment));
    addEvent(oSubmitBtn, 'click', Comment.submitComment.bind(Comment, userId));
  }

  init();

})(document, initCommentModule);