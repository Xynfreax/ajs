//|Index de aula virtual
loged=true;
$$.require([
  'login','aula_virtual'
],function(){
//--alert('en aula_virtual index');
  $.add={
    tag:'div'
    ,id:'super_container'
    ,position:'absolute'
    ,width:['%',100]
    ,height:['%',100]
    ,backgroundColor:[250,250,250]

    ,init:function(){
      if(loged==false){
        this.addChild($.container);
      }else{
        //--console.log($.aula_virtual);
        //-alert('else');
        this.addChild($.aula_virtual);
      }
    }
  }
  $.main='super_container';
}
)
