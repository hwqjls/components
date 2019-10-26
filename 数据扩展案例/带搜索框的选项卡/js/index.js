;var initCourse = (function(doc){
  var oCourseLk= doc.getElementsByClassName('tab-lk'),
    oCourseCardList = doc.getElementsByClassName('course-card-list')[0],
    oSearchInput = doc.getElementById('js-course-input'),

    data = JSON.parse(doc.getElementById('js-course-data').innerHTML),
    oCardTpl = doc.getElementById('js-card-tpl').innerHTML,

    oCourseLkLen = oCourseLk.length;

  return {
    courseSearch: function(){
      var val = oSearchInput.value,
        len = val.length;

      if(len > 0){
        var information = this.searchData(val, data);

        if(information && information.length > 0){
          this.makeLIst(information);
        }else{
          oCourseCardList.innerHTML = this.showTip('没有搜索到相关课程');
        }
      }else{
        this.restorList();
      }
    },

    searchData: function(keyword, data){
      return data.reduce(function(prev, elem){
        var res = elem.course.indexOf(keyword);

        res !== -1 && prev.push(elem);
        return prev;
      }, []);
    },

    courseClick: function(e){
      oSearchInput.style.placeHouder = '搜索课程';
      oSearchInput.value = '';
      
      var e = e || window,
        tar = e.target || e.srcElement,
        item;
      if(tar.className === 'tab-lk'){
        var field = tar.getAttribute('data-field');

        this.changeTabCurrent(tar);
      }
      
      this.makeLIst(this.filterData(field, data));
    },

    initCourseList: function(){
      this.makeLIst(data);
    },

    makeLIst: function(data){
      var list = '';

      data.forEach(function(elem){
        list += setTplToHTML(oCardTpl, regTpl, {
          img: elem.img,
          courseName: elem.course,
          isFree: elem.is_free === '1' ? 'free' : 'vip',
          price: elem.is_free === '1' ? '免费' : ('￥' + elem.price+'.00'),
          hours: elem.classes
        });
      });

      oCourseCardList.innerHTML = list;
    },

    restorList: function(){
      this.makeLIst(data);
      this.changeTabCurrent(oCourseLk[0]);
    },

    changeTabCurrent: function(currentDom){
      for(var i = 0; i < oCourseLkLen; i++){
        item = oCourseLk[i];      
        item.className = 'tab-lk';
      }

      currentDom.className += ' current';
    },    
    
    showTip: function(text){
      return '<div class="course-list-tip"><span>'+ text +'</span></div>'
    },

    filterData: function(field, data){
      if(field === 'all'){
        return data;
      }

      return data.filter(function(elem){
        switch(field){
          case 'free':
            return elem.is_free === '1';
            break;
          case 'vip':
            return elem.is_free === '0';
            break;
          default:
            return true;
        }
      });
    }
  }
})(document);

;(function(doc){
  var oCourseSearch = doc.getElementById('js-course-input'),
    oCourseTabLIst = doc.getElementsByClassName('js-course-tab-list')[0];

  var init = function(){
    initCourse.initCourseList();
    bindEvent();
  }

  function bindEvent(){
    addEvent(oCourseSearch, 'input', initCourse.courseSearch.bind(initCourse));
    addEvent(oCourseTabLIst, 'click', initCourse.courseClick.bind(initCourse));
  }

  init();
})(document);