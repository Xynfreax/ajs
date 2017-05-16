//|"login.js"
$$.require([],function(){
  //en login
  $.add={
    tag:'div',
    id:'container',
    position:'absolute',
    backgroundColor:[0, 76, 153],
    width:['%',100],
    height:['%',100],
    fontFamily:'Helvetica,Arial'
    ,display:'grid'
    ,gridTemplateRows:[150,'fill']
    ,gridTemplateColumns:[350,'fill']
    ,gridTemplateAreas:[
      ['header','header'],
      ['login','conte']
    ]
    /*,display:'flex'
    ,justifyContent:'center'
    ,alignItems:'top'*/
    /*,events:[
      ['click',function(e){alert(e.type);},false,false],
      ['click',function(e){alert(e.type);},true,false]
    ]*/
    ,children:[
      {
        tag:'div'
        ,id:'titulo'
        ,width:['%',100]
        ,height:150
        ,gridArea:'header'
        ,backgroundColor:[0, 76, 153]
        ,display:'flex'
        ,justifyContent:'center'
        ,alignItems:'center'
        ,children:[
          {
            tag:'img'
            ,id:'logo'
            ,src:'logo.png'
            ,height:['%',90]
          }
        ]
      }
      ,
      {
        tag:'div',
        id:'login'
        ,width:['%',100]
        ,height:400
        ,gridArea:'login'
        ,borderRadius:0
        ,padding:'10px'
        ,backgroundColor:[255,255,255]
        ,display:'flex'
        ,justifyContent:'center'
        ,alignItems:'center'
        ,children:[
          {
            tag:'form'
            ,id:'login_form'
            ,children:[
              {
                tag:'label'
                ,display:'block'
                ,id:'usuario_l'
                ,height:50
                ,textContent:'Usuario: '
                ,children:[
                  {
                    tag:'input'
                    ,id:'usuario_i'
                    ,type:'text'
                    ,placeholder:'Ingrese Usuario'
                  }
                ]
              }
              ,{
                tag:'label'
                ,id:'contrasena_l'
                ,display:'block'
                ,height:50
                ,textContent:'Contraseña: '
                ,children:[
                  {
                    tag:'input'
                    ,type:'password'
                    ,id:'contrasena_i'
                    ,placeholder:'Ingrese Contraseña'
                  }
                ]
              }
              ,{
                tag:'input'
                ,id:'enviar_f'
                ,type:'submit'
                ,value:'Acceder'
              }
            ]
          }
        ]
      }
      ,{
        tag:'div'
        ,id:'conte'
        ,gridArea:'conte'
        ,display:'flex'
        ,justifyContent:'center'
        ,alignItems:'center'
        ,textContent:'Bienvenido al Aula Virtual de la UST'
      }


    ]
  }
//--$.usuario.width=1000;



  /*$.usuario.width=['calc',function(){
    console.log(this);
    alert('ME EJECUTO DESPUES: ');
    return s(this.parent.width)*0.8
  }];
$.mi_login.width=1000;*/
//--  $.usuario.width=['%',80];
  //$.usuario.width=1000;
  //$.un_div.fondo='sadfnl';
}
)
