//|aula virtual

$$.require([
'av_header'
],function(){
//--alert('eb aula_virtual');
  $.add={
    tag:'div'
    ,id:'aula_virtual'
    ,position:'absolute'
    ,width:['%',100]
    ,height:['%',100]
    ,backgroundColor:[250,250,250]
    ,display:'grid'
    ,gridTemplateRows:[50,50,'fill']
    ,gridTemplateColumns:[250,'fill',250]
    ,gridTemplateAreas:[
      ['header','header','header'],
      ['menu','menu','menu'],
      ['conte1','conte1','conte1']
      //,['footer','footer','footer']
    ]
    ,children:[
      {
        tag:'header_'
        ,id:'header'
        ,gridArea:'header'
        ,backgroundColor:[0,76,153]
        //,textContent:'header'
      }
      ,{
        tag:'div'
        ,id:'menu_principal'
        ,gridArea:'menu'
        ,textContent:'menu'
        ,borderTop:'solid 2px rgb(89, 10, 25)'
        ,backgroundColor:[0, 63, 141]
        ,color:[255,255,255]
      }
      ,{
        tag:'div'
        ,id:'inicio_conte_av'
        ,gridArea:'conte1'
        ,display:'grid'
        ,gridTemplateRows:['fill']
        ,gridTemplateColumns:[150,'fill',150]
        ,gridTemplateAreas:[
          ['','conte_2','']
        ]
        ,textContent:'contenido'
        ,overflow:'auto'
      }
      /*,{
        tag:'div'
        ,id:'footer_av'
        ,gridArea:'footer'
        ,textContent:'footer'
      }*/
    ]
  }
}
)
