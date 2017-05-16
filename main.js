$={
  set unk(v){
    var tag_t=v.tag;
    var nuev_id=null;
    cont_t=0;
    do{
      cont_t++;
      nuev_id = tag_t + (cont_t);
      //--nuev_id = v.tag + (cont_t);
    }while($.hasOwnProperty(nuev_id))//|Si existe en el objeto entonces continúa el while
    //--v['id']=nuev_id;
    $[nuev_id]=v;
  }
};
$_main=null;
function importScripts(ar_scripts,callback,callback2){


  var filesloaded=0;
  for(var i=0;i<ar_scripts.length;i++){
    importScript(ar_scripts[i],checkLoadedS);
    filesloaded++;
  }

  function checkLoadedS(){

    if(filesloaded===ar_scripts.length){
      callback();
      callback2();
    }

  }

}
function importScript(script_url,checkloaded){
alert('llego aqui');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  //--script.async = false;
  script.src = script_url+'?q='+Date.now();
  script.onload = checkloaded;
  document.head.appendChild(script);

  return script;
}
$$={
  require:function(a,b){
    importScripts(a,b,ajs)
  }
}
$$.require([
  'mi_head.js'
],function(){
  $.div1={
    tag:'div',
    css:{
      backgroundColor:'#00ff00'
    },
    attr:{
      textContent:'un texto'
    }
  }

  $.div3={
    tag:'div2'
  }

  $.mi_body={
    tag:'body',
    strc:[
      'div1',
      'div3'
    ]

  }
  $.mi_title={
    tag:'title',
    attr:{
      textContent:'titulo de la pagina'
    },
    strc:[
    ]
  }
  $.mi_head={
    tag:'head',
    attr:{
      'data-tt':'mi titulo'
    },
    css:{
      color:'black',
      backgroundColor:'white'
    },
    evt:[
      ['click',function(e){alert(e.type);},false,false],
      ['click',function(e){alert(e.type);},true,false],
    ],
    strc:[
      'mi_title'
    ]
  }

  $.mi_html={
    tag:'html',
    strc:[
      'mi_head',
      'mi_body'
    ]
  }


  //--$_main='mi_html';

});
$_main='mi_html';
console.log('6666666');
console.log($);

arS=[
  {'head':['title','meta','style']},
  'body'
]
