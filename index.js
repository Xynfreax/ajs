//|"index.js"//|El json_like principal que se usa para compilar
$$.require([
  'widget_div'
],function(){
  $.add=
  {
    tag:'div'
    ,position:'absolute'
    ,id:'un_div'
    ,width:['%',100]
    ,height:['%',100]
    ,display:'grid'
    ,gridTemplateRows:[100,'fill']
    ,gridTemplateColumns:[100,'fill']
    ,gridTemplateAreas:[
      ['','un_div_hijo'],
      ['','un_div_hijo']
    ]

    /*height:['calc',function(){
      console.log(this.width);

      return s(this.width)/2+s(this.width);
    }],*/
    ,color:[250,250,250]
    //,textContent:'asdf'
    //--,backgroundColor:['alias','fondo',[124,125,156]]
    ,backgroundColor:[124,125,156]
    ,events:[
      ['click',function(e){
        console.log('---------------------');
        console.log(this.dom.offsetWidth);
        console.log(this.dom.offsetHeight);
        console.log('--------------------');
        console.log(this.dom.offsetWidth);
        console.log(this.dom.offsetHeight);
        console.log(this.tRowsR);
        console.log(this.tColsR);
        console.log(window.getComputedStyle(this.dom,null)['width']);
        console.log(window.getComputedStyle(this.dom,null)['height']);
        console.log(window.getComputedStyle(this.dom,null)['overflow']);
        console.log(this.dom.style.overflow);
      },false,false],
    ]
    ,children:[
      {
        tag:'div'
        ,id:'un_div_hijo'
        ,position:'absolute'
        ,border:'solid 1px white'
        ,backgroundColor:[0,0,0]
        ,color:[250,0,250]
        ,boxSizing:'border-box'
        ,textContent:'Un_div_hijo'
      }
    ]
    //,textContent:'soy un texto'
    /*,color:['bind',[120,120,123],function(v){
      this.un_div_hijo_alias.color=v;
    }]*/

    /*
    ,children:[
      'un texto',
      {
        tag:'div',
        id:'un_div_hijo'
      },
      ['alias','un_div_hijo_alias',{
        tag:'div',
        id:'un_div_hijo2',
      }]
    ]
    */

  }
  console.log('--------------');
  console.log($);
  console.log('--------------');
  $.main='un_div';
//  alert($.un_div.dom.offsetWidth);
  //$.un_div.fondo='sadfnl';

}
)

//ejemplo de un estado
/*
$.state={
  tipos:[],
  width:100,
  height:100,
  textContent:'cambiado',
  children:[
    {
      tipos:['div','span','#mi_div'],
      width:40,
      height:50,
      textContent:'otro'
    }
  ]

}
*/
