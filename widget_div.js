//|"widget div"
$$.require([],
  function(){
  $.add=
  {
    tag:'div',
    id:'widget_div',
    width:300
    ,textContent:'soy un texto0',
    children:[
      {
        tag:'div'
        ,id:'soy_un_hijo'
        ,textContent:'soy un hijo'
      }
    ]
  }

}
)
