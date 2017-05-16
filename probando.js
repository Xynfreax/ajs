$.add=
{
  tag:'html',
  id:'mi_html',
  children:
  [
    {
      tag:'head',
      id:'mi_head',
      children:
      [
        {
          tag:'title',
          id:'mi_title',
          textContent:'Probando'
          /*,
          textContent:bind($.mi_title+$.mi_title);
          textContent:alias(this.id);*/
        }
      ]
    },
    {
      tag:'body',
      id:'mi_body',
      children:[
        {
          tag:'div',
          id:'mi_div',
          textContent:'soy un div'
          ,backgroundColor:'yellow'
        }
      ]
    }
  ]
}

/*
[
  {
    tag:'div',
    id:'div1'
    position:'absolute',
    width:'100%',
    textContent:'Soy un texto',
    children:[
      'soy un texto',
      {
        tag:'div',
        position:'absolute',
        width:'20%',
        textContent:'este es mi contenido'
      },
      'texto final',
      {
        tag:'span',
        textContent:'soy un span'
      }
    ]
  },
  init:function(){
    this.fondito=alias($.div2.css,'backgroundColor');
    suscribe(
      {
        'backgroundColor':$.div1.css,
      },
      function(){
        $.div2.color=$.div1.css['backgroundColor']+$.div1.css['backgroundColor'];
      }
    );
    this.color=alias($.div1.css,'backgroundColor')+alias($.div1.css,'backgroundColor');
  },
]
*/
console.log($);
$.main='mi_html';
