//ajs2.js
anterior_html=document.getElementsByTagName('html')[0];
anterior_head=document.getElementsByTagName('head')[0];
//|Estilo en el cual todos ponen sus rules
var estilo_principal=document.createElement('style');
estilo_principal.id='estilo_en_ajs';
document.head.appendChild(estilo_principal);

/*
  start={
    dependencias:{
      a:{},
      b:{objetos:[o4,o5]}
    },
    objetos:[o1,o1]
  }

*/
//|Aqui estan todos los objetos
$={
  set add(v){
    render(v);
  },
  set main(v){
    var main=$[v];

    if(main.tag=='html'){
      var nuevo_head=main._children
      for(var i=0;i<main.children.length;i++){
        var hijo=main.children[i];
        console.log('MMMMMM '+i);
        console.log(hijo);
        if(hijo.tag=='head'){
          console.log('entro');
          for(var ii=0;ii<hijo.children.length;ii++){
            //alert('asdfsdf');

            var hijo_head=hijo.children[ii];
            console.log('algo - '+ii);
            console.log(hijo_head.dom);
            anterior_head.appendChild(hijo_head.dom);
          }
        }else if(hijo.tag=='body'){
          var ant_body=document.getElementsByTagName('body')[0];
          console.log(ant_body);
          anterior_html.removeChild(ant_body);
          anterior_html.appendChild(hijo.dom);

        }else{
          anterior_html.appendChild(hijo.dom);
          alert('llego aqui');
        }
      }
    }else{
      document.appendChild(main.dom);
    }
  }
};

var css_propiedades={
  props:[
    'width','backgroundColor',
    {
      name:'height',
      setter:function(k,v){},
      getter:function(k){}
    },
    'position'
  ],
  setter_general:function(k,v){
    console.log(this._css);
    console.log(k);
    console.log(v);

    this._css[k]=v;
    console.log(estilo_principal.sheet.cssRules);
    alert('en css');
  },
  getter_general:function(k){

  }
}
var dom_propiedades={
  props:['textContent','id','classList'],
  setter_general:function(k,v){
    console.log(this);
    this.dom[k]=v;
  },
  getter_general:function(k){
    alert('estoy retornado');
    return this.dom[k];
  }
}
//|Objeto principal de donde heredamos
var ancestro_general={
  _children:[],
  set children(v){

      if(get_type(v)==1){//|Array
        var hijos=v;
        console.log('HIJOJO');
        console.log(v);

        for(var i=0;i<hijos.length;i++){

          var hijo_props=hijos[i];
          console.log('THIS');
          console.log(this);
          console.log('HIJO_PROPS');
          console.log(hijo_props);
          var nuev_hijo=render(hijo_props);

          console.log('NUEV_HIJO');
          console.log(nuev_hijo);
          alert(this._children.length+' - '+hijos.length);
          console.log('A ESTE THIS lo apend');
          console.log(this.dom);
          this._children.push(nuev_hijo);
          this.dom.appendChild(nuev_hijo.dom);
          //--this.dom.appendChild(document.createElement('head'));
          console.log(nuev_hijo.dom);
          console.log(this);
        }
      }

  },
  get children(){
    return this._children;
  }
};
function definir_propiedades(ar_propiedades,objeto){
  for(var i = 0;i<ar_propiedades.props.length;i++){
    var prop=ar_propiedades.props[i],
        setter_definido=ar_propiedades.setter_general,
        getter_definido=ar_propiedades.getter_general,
        prop_name=null;

    if(get_type(prop)==2){//|Si la pripiedad es una cadena
      //|le mandamos el setter general y getter general
      prop_name=prop;
    }else if(get_type(prop)==0){
      //|Le mandamos el setter especifico y el getter especifico;
      if(prop.setter){//|Si existe el setter especifico
        setter_definido=prop.setter;
      }
      if(prop.getter){//|Si existe el getter especifico
        getter_definido=prop.getter;
      }
      prop_name=prop.name;
    }
    define_prop(objeto,prop_name,setter_definido,getter_definido);
  }
}
//|Funcion para crear y definir propiedades del ancestro general
function crear_ancestro_general(){
  definir_propiedades(dom_propiedades,ancestro_general);
  definir_propiedades(css_propiedades,ancestro_general);


}
//|Funcion que define las propiedades de un objeto
function define_prop(objeto,prop_name,setter,getter){
  var descriptor={};

  descriptor[prop_name]={
    set:function(v){
      setter.bind(this)(prop_name,v);
    },
    get:function(){
      getter.bind(this)(prop_name);
    }
  }
  Object.defineProperties(objeto,descriptor);
}
//!Funcion para heredar
function heredar(tag,id,propiedades){
  var heredero=null,
      nuev_obj=null;
  var otras_propiedades={};
  otras_propiedades.tag=tag;
  otras_propiedades.id=id;
  //alert('id: '+id);
  if(!$.hasOwnProperty(tag)){
    //|Heredamos del ancestro_general
    heredero=Object.create(ancestro_general);
    heredero._children=heredero._children.slice(0);
      //|Le creamos el css en un rule
      estilo_principal.sheet.insertRule('.'+id+'{}',estilo_principal.sheet.cssRules.length);
      heredero._css=estilo_principal.sheet.cssRules[estilo_principal.sheet.cssRules.length-1].style;
      heredero._css_index=estilo_principal.sheet.cssRules.length-1;


    if(tag==='text'){//|Si es texto
      heredero.dom=document.createTextNode('propiedades');
      nuev_obj=Object.assign(heredero,otras_propiedades);

    }else{
      heredero.dom=document.createElement(tag);
      nuev_obj=Object.assign(heredero,propiedades,otras_propiedades);
    }
    //|Agregamos el nombre como clase
    //--heredero.classList.add(id);
    heredero.dom.classList.add(id);

    /*for(var prop in propiedades){
      var prop_val=propiedades[prop]
      if(){

      }
      heredero[prop]=prop_val;

    }*/
  }else{
    //|Clonamos el tag
  }

  return nuev_obj;

}
//|Funcion para renderizar el json
function render(v){
  //|v debe ser un objeto;
  var propiedades=v,
    tag=null,id=null;
  if(get_type(propiedades)==0){
    tag=propiedades.tag;
    id=propiedades.id;

  }else if(get_type(propiedades)==2){
    tag='text';
    id='mi_text'//|OJO:Corregir
  }
  var nuevo_obj=heredar(tag,id,propiedades);
  $[id]=nuevo_obj;
  return nuevo_obj;

}
crear_ancestro_general();
