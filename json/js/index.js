window.onload = function(){
  init();
}

function init(){
  render();
}

var render = (function(){
  var data = JSON.parse(document.getElementById('J_data').innerHTML),
    len = data.length,
    oList = document.getElementsByClassName('list')[0],
    list = '',
    tpl = document.getElementById('J_tpl').innerHTML,
    item;

  for(var i = 0; i < len; i++){
    item = data[i];
    list += setTplToHTML(tpl, regTpl, setData(item));
  }
  oList.innerHTML = list;

  function setData(data){
    return {
      career: data.career,
      city: data.city,
      salary: data.salary,
      img: data.img
    }
  }
});

