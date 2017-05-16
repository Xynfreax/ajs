function get_type(variable,yn){
      if(yn==undefined){
        yn=0;
      }
      var returns={
        '[object Object]':[0,'objeto'],
        '[object Array]':[1,'array'],
        '[object String]':[2,'cadena'],
        '[object Number]':[3,'numero'],
        '[object Function]':[4,'funcion'],
        '[object HTMLDocumentPrototype]':[5,'html_dom'],
        '[object NamedNodeMap':[5,'html_dom'],
        '[object CSS2Properties]':[6,'css'],
        '[object CSSStyleDeclaration':[6,'css'],

      }
      return returns[Object.prototype.toString.call(variable)][yn];
    };
function alias(target_obj,target_prop){
  return ['alias',target_obj,target_prop];
}
