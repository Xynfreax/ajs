//alert('mihead');
$.div2={
  tag:'div',
  css:{
    backgroundColor:'#00ffff'
    //backgroundColor:alias('fondito','#00ffff')
    //fondito:alias('backgroundColor','#00ffff')
    ,color:susc([$.div1.css,'backgroundColor'],[$.div1.css,'backgroundColor'],function(){alert(v1+v2);return v1});
  },
  attr:{
    textContent:'otro texto'
  },
  nprop:{
    fondito:alias('$.div2.css','backgroundColor')
    //fondito:function(){alias(this.css,'backgroundColor')};
    /*alias:{
      fondito:function(){return [this.css,'backgroundColor']}
    }*/


  },
  init:function(){
    /*
    this.fondito=alias(this.div2.css,'backgroundColor');

    suscribe(
      {
        'backgroundColor':$.div1.css,
        'backgroundColor':$.div1.css
      },
      function(){
        $.div2.color=$.div1.css['backgroundColor']+$.div1.css['backgroundColor'];
      }
    );
    this.color=alias($.div1.css,'backgroundColor')+alias($.div1.css,'backgroundColor');
    */
  },
  strc:[
    { id:'un_div_hijo',
      tag:'div',
      attr:{
        textContent:'un div hijo'
      }
    }
  ]
}
