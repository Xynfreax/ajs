console.log('en ajs main');
//"ajs_main.js"//El script que procesa el json y lo convierte en objetos accesibles
//|Por ahora solo funciona en el frontend
universalvariable='universal';
function extenderObj(obj){
  var returned=obj;
  if(get_type(obj)==0){//objecto
    returned=Object.create(obj);
    for(var k in returned){
      returned[k]=extenderObj(returned[k])
    }
  }else if(get_type(obj)==1){//array
    // returned=obj.slice(0);
    returned=[];
    for(let $ii=0;$ii<obj.length;$ii++){
      returned[$ii]=extenderObj(obj[$ii])//QUE RARO QUE ESTE FUNCIONANDO ASI
    }
  }

  return returned;
}
$={};
$f={};
$_={};

//|El Objeto Principal "$"---------------------------------------------------------------
function crear_objeto_principal(){
  var descriptor=
  {
    add:{
        set:function(v){
          var nuevObj=crear_objeto_js(v);

          nuevObj.path_='';//---document.currentScript['src'];
        },
        configurable:true
      },
    main:{
      set:function(v){

        if($.hasOwnProperty(v)){
          //--console.log('desde aqui anexo: body');
          //--alert('ASIGNADO EL MAIN');
          //-----renderizar($[v],document.body);
          document.body.children[0].innerHTML='';
          renderizar($[v],document.body.children[0]);//es el body_
          //---makedialogs();
          //--document.body.appendChild($[v].dom);
        }else{
          alert('EL OBJETO DESIGNADO A RENDERIZAR COMO PRINCIPAL NO EXISTE: '+v);
        }
        this._main=v;

      },
      get:function(){
        return this._main;
      }
    }

  };
  Object.defineProperties($,descriptor);
}
//Crear los arrays con todas las propiedades--------------------------------------------
function crear_propiedades_css_dom(){

css_propiedades__={
  individual:[
    {
      propiedades:['backgroundColor','color'],
      setter:function(k,v){
        var v_temp=v;
        v_temp=eval_color(v);
        if(this.dom){
          this.dom.style[k]=v_temp;
        }
      }
    },
    {
      propiedades:['width','height','maxWidth','maxHeight','minWidth','minHeight','fontSize','marginLeft','marginRight','paddingLeft','paddingRight','borderRadius','left','top'],
      setter:function(k,v){
        var v_temp=v;
        v_temp=eval_metrics(v);
        //|Si lo que hemos ingresado es un numero, entonces en json_l se almacena como array con unidad y valor
        if(get_type(v)==3){
          this.json_l[k]=['px',v];
        }
        if(this.dom){
          this.dom.style[k]=v_temp;
        }
      }
    },
    {
      propiedades:'gridTemplateRows',
      setter:function(k,v){
        this.tRowsR=generar_tRCR(this,v,0);
      }
    },
    {
      propiedades:'gridTemplateColumns',
      setter:function(k,v){
        this.tColsR=generar_tRCR(this,v,1);
      }
    },
    {
      propiedades:['fontFamily','border','borderTop','borderBottom','backgroundImage',
      'position','margin','padding','paddingLeft','paddingRight','left','top','boxSizing',
      'display','justifyContent','alignItems','color','gridTemplateRows','gridTemplateColumns'
      ,'overflow','overflowX','overflowY','alignContent','flexDirection','flexGrow','zIndex','cursor'
      ,'visibility'],
      setter:function(k,v){
        this.tColsR=generar_tRCR(this,v,1);
      }
    }

  ]
  ,antes:{
    setter:function(k,v){
      //Evaluar si es cadena, numero u otro
      this.json_l[k]=v;
    },
    getter:function(k,v){

    }
  }
  ,despues:{
    setter:function(k,v){
      if(this.dom){
        //--this.dom.style[k]=v_temp;
        this.dom.style[k]=v;
      }
    },
    getter:function(k,v){

    }

  }
  ,general:{
    setter:function(k,v){

    }
    ,getter:function(k){
      //--return this['_'+k];
      return this.json_l[k];
      //--return 400;
    }
  }
}


  css_propiedades_=[//-Otro
    {
      props:[
        'width','height','maxWidth','maxHeight','minWidth','minHeight','fontSize','fontFamily','border','borderTop','borderBottom','borderRadius','backgroundColor','backgroundImage',
        'position','margin','padding','marginLeft','marginRight','paddingLeft','paddingRight','left','top','boxSizing',
        'display','justifyContent','alignItems','color','gridTemplateRows','gridTemplateColumns'
        ,'overflow','overflowX','overflowY','alignContent','flexDirection','flexGrow','zIndex','cursor'
        ,'visibility'

        ,{
          name:'fontSize0',
          setter:function(k,v){},
          getter:function(k){}
        }

      ],
      setter_general:function(k,v){
        this.json_l[k]=v;
        var v_temp=v;
        //|Eval_metrics solo se aplica en las propiedades que llevan unidades numericas
        if(['width','height','maxWidth','maxHeight','minWidth','minHeight','fontSize','marginLeft','marginRight','paddingLeft','paddingRight','borderRadius','left','top'].indexOf(k)>-1){
          v_temp=eval_metrics(v);
          //|Si lo que hemos ingresado es un numero, entonces en json_l se almacena como array con unidad y valor
          if(get_type(v)==3){
            this.json_l[k]=['px',v];
          }

        }else if(['backgroundColor','color'].indexOf(k)>-1){
          v_temp=eval_color(v);
        }else if(['gridTemplateRows'].indexOf(k)>-1){
          //alert('setting: '+this.tRowsR);
          this.tRowsR=generar_tRCR(this,v,0);


          //--this.preinit();
        }else if(['gridTemplateColumns'].indexOf(k)>-1){
          this.tColsR=generar_tRCR(this,v,1);
        }

        //--this['_'+k]=v;

        if(this.dom){
          this.dom.style[k]=v_temp;
        }
      },
      getter_general:function(k){
        //--return this['_'+k];
        return this.json_l[k];
        //--return 400;
      }
    }
    /*
    ,{
      props:[
        'backgroundColor','color',
        {
          name:'backgroundImage',
          setter:function(k,v){},
          getter:function(k){}
        }
      ],
      setter_general:function(k,v){
        this.json_l[k]=v;
        //--alert('lelgoa qui:' + v.toString());
        var v_temp=eval_color(v);
        if(this.dom){
          this.dom.style[k]=v_temp;
        }
      },
      getter_general:function(k){
        return this.json_l[k];
      }
    }*/
  ];

  css_propiedades=[//-Otro
    {
      props:[
        'width','height','maxWidth','maxHeight','minWidth','minHeight','fontSize','fontFamily','borderWidth','borderLeftWidth','borderRightWidth','border','borderTop','borderBottom','borderRight','borderLeft','borderRadius','backgroundColor','backgroundImage',
        'position','margin','padding','marginLeft','marginRight','marginTop','marginBottom','paddingLeft','paddingRight','left','right','top','bottom','boxSizing',
        'display','justifyContent','alignItems','color','gridTemplateRows','gridTemplateColumns'
        ,'overflow','overflowX','overflowY','alignContent','flexDirection','flexGrow','zIndex','cursor'
        ,'textAlign','background','backgroundSize','backgroundPosition','backgroundRepeat','paddingBottom','paddingTop','flexWrap','textOrientation','writingMode'
        ,'transform','verticalAlign','wordWrap','fontWeight'
        ,'borderCollapse','textDecoration','order'
        ,'visibility','whiteSpace','textOverflow','flexShrink'
        ,'transition','opacity','lineHeight'
        ,'tableLayout','textTransform','boxShadow','float','sticky'

        ,{
          name:'fontSize0',
          setter:function(k,v){},
          getter:function(k){}
        }

      ],
      setter_general:function(k,v){
        this.json_l[k]=v;
        var v_temp=v;

        if(this.dom){
          this.dom.style[k]=v_temp;
        }
      },
      getter_general:function(k){
        //--return this['_'+k];
        return this.json_l[k];
        //--return 400;
      }
    }

  ];

  dom_propiedades=[
    {
      props:['textContent','id_dom','classList','src','class'
    ,'placeholder','type','value','tabIndex','name','checked','href'
    ,'rowSpan','colSpan','autofocus','required','selectedIndex','min','max','step','pattern','maxLength','minLength','multiple','readOnly','className','dataset',
  ,'disabled','method','for','autocomplete',/*'show'*/ /*,'offsetWidth','offsetHeight','offsetTop','offsetBottom','offsetRight','offsetLeft'*/],
      setter_general:function(k,v){
        //--console.log(this);
        this.json_l[k]=v;
        //--this['_'+k]=v;
        if(this.dom){
          this.dom[k]=v;
        }

      },
      getter_general:function(k){
        //alert('estoy retornado');
        //--return this['_'+k];
        if(this.dom==undefined)//mucho OJO
        {
          return this.json_l[k];
        }else{
          return this.dom[k];
        }

//        return this.dom[k];

      }
    }
  ];

}


function findStringBetween(str, first, last) {
    var r = new RegExp(first + '(.*?)' + last, 'gm');
    return str.match(r);
}
function eval_metrics(v){

  var v_ret=null;
  if(get_type(v)===1 && v.length>1 && (v[0]=='%' || v[0]=='px')){
    switch (v[0]) {
      case '%':

      case 'px':
        v_ret=v[1]+v[0];
        break;
      default:

    }
  }else{
    v_ret=v+'px';
  }

  return v_ret;
}
function eval_color(v){

  var v_ret=null;
  if(get_type(v)===1){
    //--alert('aqui');

    if(v.length===3){
      v_ret='rgb('+v.toString()+')';
    }else if(v.length===4){
      v_ret='rgba('+v.toString()+')';
    }

  }
  return v_ret;
}
function findStringBetween2(cad,first,last){

var retorno=[];
var test_str = cad;//"|text to get| Other text.... migh have \"|\"'s ...";
var text_to_get='';
//-var text_to_get='';
//alert('TEXTO: '+test_str);
while(test_str.trim().length!==0){
  var start_pos = test_str.indexOf(first);
  var end_pos = test_str.indexOf(last,start_pos+1);
  if(start_pos==-1 || end_pos==-1){
    test_str='';
    break;
  }else{
    text_to_get = test_str.substring(start_pos+first.length,end_pos);
    retorno.push(text_to_get);
    test_str=first+test_str.substring(end_pos+1,test_str.length);

    //alert('text_to_get: '+text_to_get);
    //alert('restante: '+test_str);
  }



}
return retorno;


}
function eval_v(obj,k,v){


  var v_retornado=null;
  if(get_type(v)===1 && v.length>1 && (v[0]=='alias' || v[0]=='calc')){//|Array y al menos debe tener 2 items
    /*console.log('---en eval---');
    console.log(v[1].toString());*/
    //alert('ENTRAMOS EN EVAL_V');
    switch (v[0]) {
      case 'alias':
        var new_k=v[1];
        define_prop(obj,new_k,function(k_,v_){//|k_ y v_ son propios del setter
            obj[k]=v_;

          },function(k_){
            return obj[k];
          });
          //-obj[v[1]]=v[2];
          //--console.log(obj);
            //alert('alias:'+v[2]);
          v_retornado=[v[2],null];
        break;
      case 'calc':
        //|Evaluamos la funcion
        var f_cad=v[1].toString();
        v[1]=v[1].bind(obj);
        var sus_cad=findStringBetween2(f_cad,'s(',')');
        //console.log(v[1]());

        //|Suscribimos
        suscribir(obj,k,sus_cad,v[1].bind(obj));
        //****v_retornado=[null,v[1]];//retornamos null, porque sabemos que luego se ejecutara la funcion v[1]()
        v_retornado=['',null];//retornamos null, porque sabemos que luego se ejecutara la funcion v[1]()
        //---v_retornado=null;
        //console.log();
        break;

      default:

    }

  }else{
    v_retornado=[v,null];
  }
  //--console.log(v_retornado);
  //--alert('asdf');
return v_retornado;
}
//|Suscribir pasando un array------------------------------------------------------------
function suscribir(obj,k,obj_props_ar,funcion_){

  //alert('suscribimos');
  var funcion_s=function(){
    obj[k]=funcion_();//mando cualquier cosa porque ya tiene su presetter;
  }

  //--var funcion_s=[obj,k];
  //--var mySet = new Set(obj_props_ar);
  var mySet = Object.create(obj_props_ar);
  for(var k in mySet){
    var last_index=mySet[k].lastIndexOf('.');
    //--var first_index=item.indexOf('.');
    var obj_cad=mySet[k].substring(0,last_index);
    //var pre_obj=item.substr(0, first_index);
    var prop_=mySet[k].substring(last_index+1,mySet[k].length);
    //var start_obj=null;
    var obj_final=null;
    //--console.log('OBJ_CAD: '+obj_cad);
    //----var obj_ar=new Set(findStringBetween2('.'+obj_cad+'.','.','.'));
    var obj_ar=findStringBetween2('.'+obj_cad+'.','.','.');
    var i=0;
    var tam=obj_ar.length;
    //--console.log(obj_ar);
    //alert('obj_ar: '+obj_cad);
    for(var aa=0;aa<obj_ar.length;aa++){
      var item=obj_ar[aa];
      if((tam>1 && i<tam-1) || tam==1){
        if(item='this'){
          obj_final=obj;
        }else{
          if(i==0){
            obj_final=$;
          }
          obj_final=obj_final[item];
        }
      }else{
        obj_final=obj_final[item];
      }

      i++;
    }
//|Arreglar para que en herencia sea clonado

    obj_final['s_'+prop_].add(funcion_s);
    obj_final['s_'+prop_].delete(funcion_s);
    /*console.log('OBJETO FINAL');
    console.log(obj_final);
    console.log(obj['s_'+k]);
    console.log(obj['s_'+k].size);
    console.log(obj);
    alert('ANTES DE SE SUSCRIBIO');

    console.log(obj_final['s_'+prop_]);
    console.log(obj_final['s_'+prop_].size);
    console.log(obj_final);
    console.log(obj['s_'+prop_]);
    console.log(obj['s_'+prop_].size);
    console.log(obj);
    alert('SE SUSCRIBIO');*/
    //--alert('OBJETO: '+obj_+ ' - '+'PROP: '+ prop_);
  }
}
function generar_tRCR(obj,ar,fc){//|fc=0<-filas, sino columnas
  //--alert('llego a generar: '+ar);
  var return_ar=[];
  var sumatoria_de_nofills=0;
  var total_de_fills=0;
  for(var i=0;i<ar.length;i++){
    if(ar[i]=='auto'){//Si es auto
      return_ar.push(0);
    }
    //|Si es porcentaje
    else if(get_type(ar[i])==1 && ar[i].length==2){//Array
      var w_or_h=null;
      if(fc==0){//fila
        //-tem=getCS(obj,'width');//getComputedStyle

        w_or_h=parseFloat(obj.dom.clientHeight);
      }else{
        //--alert(parseFloat(obj.dom.offsetWidth));
        w_or_h=parseFloat(obj.dom.clientWidth);
      }
      w_or_h=w_or_h*(ar[i][1]/100);
      return_ar.push(w_or_h);
      sumatoria_de_nofills+=w_or_h;

    }//|Si es fill
    else if(ar[i]=='fill'){
      return_ar.push(-1);
      total_de_fills++;
    }else{
      return_ar.push(ar[i]);
      sumatoria_de_nofills+=ar[i];
    }

  }
  //alert(obj.dom.offsetWidth);
  //--var total_de_fills=contar_ocu_ar(return_ar,-1);
  if(fc==0){
    //alert('estoy rellenado filas, '+total_de_fills);
    //---alert('EN generar_tRCR - offsetHeight: '+obj.dom.offsetHeight + ' - scrollHeight: '+obj.dom.scrollHeight+'- gts_height: '+window.getComputedStyle(obj.dom,null)['height']);
    espacio_sobrante=parseFloat(obj.dom.clientHeight)-sumatoria_de_nofills;
    //|OJO: usábamos offsetWidth o offsetHeight
  }else{
    //alert('estoy rellenado columnas, '+total_de_fills);
    //--alert('innerwidth: '+obj.dom.clientWidth);
    espacio_sobrante=parseFloat(obj.dom.clientWidth)-sumatoria_de_nofills;
  }

  for(var i=0;i<return_ar.length;i++){
    if(return_ar[i]==-1){
      return_ar[i]=espacio_sobrante/total_de_fills;
    }
  }
  return return_ar;

}
function sumatoria(ar,inicio,fin){
  var sumatoria_=0;
  for(var i=inicio;i<fin;i++){
    sumatoria_+=ar[i];
  }
  return sumatoria_;
}
//|Creamos al obj_super_ancestro---------------------------------------------------------
function crear_obj_super_ancestro(){
  obj_super_ancestro={};
  var descriptor={
    //renderizado:{configurable:true,writable:true,enumerable:false,value:[]},
    emptyChildren:{configurable:true,enumerable:true,writable:true,value:function(){
      for(var i=this._children.length-1;i>-1;i--){
        this._children[i].delete();
      }
    }}
    ,assignProps:{set:function(v){
      this._assignProps=v;
      var aplicarProps={}
      if(this.json_l.assignProps!==undefined){
        Object.assign(v,this.json_l.assignProps);
      }else{
        aplicarProps=v;
      }
      for(var k in aplicarProps){
        this[k]=aplicarProps[k];
        //--console.log('0en assignprops');
      }
    },configurable:true},
    innerIdTo:{set:function(v){
      v[0][v[1]]=this;
    },configurable:true},
    _events:{configurable:true,writable:true,enumerable:false,value:[]}
    ,events:{set:function(v){
      this._events=clonar_eventos(this._events);
      //---this._events=this._events.slice(0);//|Clonamos el array
      //alert(v);

      let tlength=v.length
      let t_events=this._events;
      let tdom=this.dom;
      for(var i=0;i<tlength;i++){
        let evt=v[i];
        //--new_obj.events[events_length + i]=json_l.events[i];
        t_events[i]=evt;
        if(tdom!==undefined){
            //--if(evt[3]!==false){
              tdom.addEventListener(evt[0],evt[1].bind(this),evt[2]);
              //obj.dom.addEventListener(evt[0],evt[1].bind(obj),true);
            //--}
        }
      }

    },get:function(){return this._events;}
    ,configurable:true},
    aliases:{set:function(v) {

      if(v!==undefined){
        this._aliases=v;
        definirAliases(v,this);
      }


    },get:function() {
      return this._aliases;
    },configurable:true},
    json_l:{configurable:true,writable:true,enumerable:false,value:{}},
    innerId:{configurable:true,writable:true,enumerable:false,value:undefined},
    childrenLoaded:{configurable:true,writable:true,enumerable:false,value:0},
    _aliases:{configurable:true,writable:true,enumerable:false,value:[]},
    _children:{configurable:true,writable:true,enumerable:false,value:[]},
    //|init es cuando el objeto ya fue creado, pero aun no ha sido agregado al body
    init:{configurable:true,writable:true,enumerable:false,value:function(){}},
    preinit:{configurable:true,writable:true,enumerable:false,value:function(){}},
    ante_init:{configurable:true,writable:true,enumerable:false,value:function(){}},
    states:{configurable:true,writable:true,enumerable:false,value:{}},
    customProps:{
      set:function(v){

      //   if(json_l.hasOwnProperty('customProps')){
      //   Object.defineProperties(new_obj,json_l.customProps);
      // }
      // //--alert('en setter');
      if(v!==undefined){
        Object.defineProperties(this,v);
        this._customProps=v;
        // if(this.id='jsdatarow'){
        //   // console.log(v);
        //   // alert('definiendo en jsdatarow')
        // }
      }

    },get:function(){
      return this._customProps;
    },configurable:true},


    getCS:{configurable:true,writable:true,enumerable:false,value:function(prop){
      return window.getComputedStyle(this.dom,null)[prop];
    }},

    getParentBy:{configurable:true,writable:true,enumerable:false,value:function(buscarpor,val){
      var retorno={};
      //if(buscarpor=='tag'){
        //|Falta agregar la opcion para que no continue en el bucle si es que no existen mas parents en los cuales buscar
        var actParent=this.parent;
        //--console.log(actParent);
        //console.log(act);
        if(actParent[buscarpor]!==val){
          //console.log(this);
          if(actParent.getParentBy!==undefined){
            //--console.log(actParent.getParentBy.toString());
            retorno=actParent.getParentBy(buscarpor,val);
          }else{
            retorno=null;
          }



        }else{
          retorno=actParent;
        }
      //}
      return retorno;
    }},
    delete:{configurable:true,writable:true,enumerable:false,value:function(){
      /*while(this.children.length>0){
        console.log('BORRANDO: '+this.children.length);
        var hijoActual=this.children[0];
        hijoActual.delete();
        //-----this.children.splice(0,1);
      }
      */
      if(this.onDelete!==undefined){
        this.onDelete();
      }

      //|Buscar cada elemento, si no tiene hijos entonces eliminar, caso contrario seguir buscando en sus hijos
      for(var i=this.children.length-1;i>-1;i--){
        var hijoActual=this.children[i];
        hijoActual.delete();
        /*

        if(hijoActual.children.length==0){
          if(hijoActual.hasOwnProperty('dom')){
            var parent_=hijoActual.dom.parentNode;
            parent_.removeChild(hijoActual.dom);
          }
          var id_=hijoActual.id;
          delete $[id_];
        }else{
          hijoActual.delete();
        }
        */
      }


      if(this.hasOwnProperty('dom') && this.dom.parentNode!==null){
        var parent_=this.dom.parentNode;
        //--console.log(this.dom);
        parent_.removeChild(this.dom);
      }
      if(this.indice!==undefined){
        //--console.log(this);
        //--console.log('---TENGO INDICE------: '+this.indice);
        this.parent.children.splice(this.indice,1);
      }
      var id_=this.id;
      delete $[id_];
      // alert('after')




    }},
    // close:{configurable:true,writable:true,enumerable:false,value:function(){
    //   if(this.parent!==null &&
    //      this.parent!==undefined &&
    //      this.parent.dom!==undefined &&
    //      this.parent.dom.classList.contains('jswindowmodal')){
    //     this.parent.close();
    //   }else{
    //     this.delete();
    //   }
    // }},
    indice:{configurable:true,writable:true,enumerable:true,value:0},
    _classN:{configurable:true,writable:true,enumerable:true,value:'domElement'},
    // classN:{configurable:true,writable:true,enumerable:true,value:'domElement'},//unseen
    classN:{set:function(v) {
      let temp=v;
      if(this.classN!==undefined){
        temp=this.classN+' '+temp;
      }
      this.className=temp;
      this._classN=temp;
    },get:function() {
      return this._classN;
    },configurable:true},
    //|load_r es cuando ya se creó el objeto y también ya existe en el body
    load_r:{configurable:true,writable:true,enumerable:false,value:function(){}},
    load_r_r:{configurable:true,writable:true,enumerable:false,value:function(){}},
    completed:{configurable:true,writable:true,enumerable:false,value:function(){}},
    nCompletables:{configurable:true,writable:true,enumerable:true,value:0},
    nCompleted:{configurable:true,writable:true,enumerable:true,value:0},
    isCompleted:{configurable:true,writable:true,enumerable:true,value:0},
    countCompletables:{configurable:true,writable:true,enumerable:false,value:function(){
      //Esta funcion evaluará si se ha completado

      //contamos los hijos que tengan completed=true;
      //--var numCompleted=0;
      this.nCompletables=0;
      var numChildren=this.children.length;
      for(var i=0;i<numChildren;i++){
        var actChild=this.children[i];
        if(actChild.completable==true){
          //--alert(this.id+ ' - '+this.nCompletables);

          this.nCompletables++;
          this.completable=true;
        }
      }
      if(this.completable==true && this.parent!==undefined && this.parent.countCompletables!==undefined){
        //--alert('true')
        this.parent.countCompletables.bind(this.parent)();
      }
      if(this.nCompletables>0){
        //--alert(this.nCompletables);
      }

    }},
    evalCompleted:{configurable:true,writable:true,enumerable:true,value:function(){
      //Esta funcion evaluará si se ha completado

      var parent_=this.parent;
      if(parent_!==undefined && parent_.countCompletables!==undefined){
        //-----> parent_.countCompletables.bind(parent_)();
      }
      this.isCompleted++;
      // ---this.completed.bind(this)();

      //ejecutamos completed
      var this_=this;
      var actObj=this_;
      var arObj=[];

      /*while(actObj!==undefined && actObj.completed!==undefined){
        if(actObj.hasOwnProperty('completed')){
          // alert(actObj.json_l.completed);
          // if(arObj[0]!==actObj.completed){
            arObj.unshift(actObj.completed);
          // }
        }
        actObj=actObj.ancestro;
      }*/

      while(actObj!==undefined && actObj.json_l!==undefined && actObj.json_l['completed']!==undefined){

        if(actObj.json_l.hasOwnProperty('completed')){
          //---arObj.push(actObj.json_l.load_r);
          //-----arObj.unshift(actObj.json_l.load_r);
          if(arObj[0]!==actObj.json_l.completed){
            arObj.unshift(actObj.json_l.completed);
          }

        }
        actObj=actObj.ancestro;
      }
      for(var a_=0;a_<arObj.length;a_++){
        arObj[a_].bind(this_)();
      }
      /*for(var a=0;a<arObj.length;a++){
        if(this_.real_tag=='form'){
          console.log(this_.ancestro);
          console.log(this_.ancestro.completed.toString());
          console.log(this_.ancestro.json_l.completed.toString());
          alert(arObj[a]+' -- '+this_.ancestro.completed);
        }

        arObj[a].bind(this_)();
      }*/
      //---------

      parent_.nCompleted++;

      if(parent_!==undefined && parent_.nCompleted>=parent_.nCompletables){
//        alert(this.nCompleted);
        //--alert('no else:'+parent_.id);
        //---alert(parent_.nCompletables);

        //-----> parent_.evalCompleted.bind(parent_)();
      }else{
        //--alert('else:' + parent_);
      }

    }},

    __preinit:{configurable:true,writable:true,enumerable:false,value:function(asf,resi){

      //|Ejecutamos el load_r que es cuando ya se renderizó
      if(resi!=='resize'){


        for(var i=0;i<this._children.length;i++){
          if(this._children[i].id=='loginERP_i'){

          }
          this._children[i].preinit(this._children[i].id,resi);
        }
        //--iba load_r
        var obj=this;


      }



      //-----this.dom.style.overflow='hidden';
      //alert('en pre init');

      //|Comprobamos si tiene pa propiedad display como grid
      if(this.display!==undefined && this.display=='grid' ){
        /*if(asf!==undefined){
          //alert('en preinit de cada hijo?: '+asf+' -offset: '+this.dom.offsetWidth);
          alert('en preinit de cada hijo?: '+asf);

        }*/
        //|Comprobamos que existe la propiedad gridTemplateAreas
        if(this.gridTemplateAreas!==undefined && this.gridTemplateRows!==undefined && this.gridTemplateColumns!==undefined){
          //if(this.tRowsR==undefined){
            this.tRowsR=generar_tRCR(this,this.gridTemplateRows,0);
          //}
          //if(this.tColsR==undefined){
            this.tColsR=generar_tRCR(this,this.gridTemplateColumns,1);
          //}

          //|Creamos el objeto que contendra los nombres de gridTemplateAreas y sus dimensiones x,w,y,h
          //--alert('aqui');
          var tAreas_obj={};
          var tAreas=this.gridTemplateAreas;
          var tRows=this.gridTemplateRows,
              tCols=this.gridTemplateColumns;
              //|tRows,TColsR=el que usamos y que se actualiza cada vez que llamamos a esta funcion;

          /*var tRowsR=this.tRowsR;
          var tColsR=this.tColsR;*/
          //---this.tRowsR=generar_tRCR(this.gridTemplateRows.slice(0));//|Clonamos y reemplazamos auto, porcentaje y fill con su valor en numeros px
          //---this.tColsR=generar_tRCR(this.gridTemplateCols.slice(0));//|Clonamos
          //|Solo esta parte debe ejecutarse en cada cambio;
          //|Por ejemplo cuando modifico el gridTemplateAreas, o gridTemplateRows o gridTemplateColumns
          for(var f=0;f<tAreas.length;f++){
            for(var c=0;c<tAreas[f].length;c++){
              if(f==0 && c==0){

              }
              var ite=tAreas[f][c];
              //console.log(tAreas);
              //alert('item en grid:'+ite);
              var x=0,y=0,w=0,h=0;
              var tRowsR=this.tRowsR;
              var tColsR=this.tColsR;
              //|FALTA: Como se comportará si es porcentaje o auto el tamaño de la fila o columna
              //|Si es "fill" entonces sera la fila o columna su dimension igual a this.width o this.height - x ó -y
              //|FALTA: Saber si un tArea está vacio ono
              //Cambiar su estado a no vacio
              //|Aqui comprobamos si es auto o porcentaje o filll, y de acuerdo a eso lo le ponemos sus dimensiones x,w,y,h
              //--x=sumatoria(tRowsR,0,f);//|(array,inicio,fin);
              //--y=sumatoria(tColsR,0,c);//|(array,inicio,fin);

              //--w=sumatoria(tRowsR,f,f);
              //--h=sumatoria(tColsR,c,c);

              if(ite==''){
                ite='vacio-'+f+'-'+c;
              }
              //alert('ite: '+ite);
              if(!tAreas_obj.hasOwnProperty(ite)){//|Si es que es nuevo, aun no existe en el tAreas_obj

                tAreas_obj[ite]=[0,0,0,0];

                tAreas_obj[ite][0]=f;
                tAreas_obj[ite][1]=f;
                tAreas_obj[ite][2]=c;
                tAreas_obj[ite][3]=c;

              }else{
                tAreas_obj[ite][1]=f;//w+tAreas_obj[ite][1];//= el ancho mas el w ó h anterior
                tAreas_obj[ite][3]=c;//h+tAreas_obj[ite][3];
              }



            }
          }

          posicionar_hijos(this,tAreas_obj);

        }
        //--alert('tengo grid');

      }
    //---this.dom.style.overflow='visible';

    }},
    children:{
      set:function(v){
        // console.log(v);
        // alert('msg');
        //---alert('no llego aqui en set children: '+this.id);
        //--alert(v[0].tag);
        //console.log('en children de: '+this.id);
        //console.log(v);
        //--alert('en children');
        //|Aqui debe continuar el renderizado recursivo
        //--alert('seteando children');
        // this.emptyChildren();

        this._children=[];

        if(v!==undefined){
          // if(v.length==3){
          //   // console.log(v);
          //   alert(JSON.stringify(v));
          //
          // }
        for(var i=0;i<v.length;i++){
          if(window.GLOBLI!==undefined){
            alert('enchildren antse');
            alert(JSON.stringify(v[i]));
          }
          //--if(this.dom!==undefined){
          //---if(this.dom!==undefined){
          //if(this.hasOwnProperty('si tengo dom')){
          // v[i].parent=this;
          objj=crear_objeto_js(v[i],this);
          // objj.parent=this;
          if(window.GLOBLI!==undefined){
            alert('enchildren despueas  ');
          }
          if(objj.tag && objj.tag=='ajgroupbox'){
            alert('=======');
            alert(objj.parent);
          }

            this.addChild_r(objj);
            // alert(objj.dom.textContent+' - '+v[i].textContent);
          //}else{
            //console.log('INICIO - no tengo dom');
            //--this.addChild(crear_objeto_js(v[i]));//el error esta aqui
            //console.log('FIN  - no tengo dom');
          //}
          //this.addChild_r(crear_objeto_js(v[i]));

        }
      }
        //console.log(this._children);
      },
      get:function(){
        return this._children;
      },
      configurable:true
    },
    addChild_r:{configurable:true,writable:true,enumerable:false,value:function(obj,indice){
      //--console.log('estoy aqui');
      //--console.log(this.dom);
      //--alert('en addchild_r: '+this.id);
      /*var indice_=this['_children'].length;
      if(indice!==undefined){
        indice_=indice;
      }*/

      this.addChild(obj,indice);

      //--console.log('desde aqui anexo (addChild_r): '+this.id);
      if(this.dom!==undefined){
        // alert('HERE');
        if(obj.tag=='ajgroupbox'){
          alert('HERE');
          alert(obj.parent);
        }
        renderizar(obj,this.dom,'cargar_load_r');
      }


      }
    },
    addChild:{configurable:true,writable:true,enumerable:false,value:function(obj,indice){
      //console.log('estoy en adchild');
      let indice_=0;
      if(indice!==undefined){
        indice_=indice;
        this['_children'].splice(indice,0,obj);
      }else{
        indice_=this._children.length;
        this['_children'].push(obj);
      }
      //asignar parent
      // obj.parent=this;
      //asignar indice en el child
      obj.indice=indice_;


      //|Asignar el id como una propiedad
      Object.defineProperty(this,obj.id,{
        get:function(){
          return this._children[indice_];
        }
        ,configurable:true});
        //\Asignar el innerId como una propiedad
        if(obj.innerId!==undefined){
          /*console.log(this);
          console.log(obj);
          alert('llego aqui');*/
          Object.defineProperty(this,obj.innerId,{
            get:function(){
              return this._children[indice_];
            }
            ,configurable:true});
        }
        //--> cambie inenridp


    }},
    // parent:{configurable:true,writable:true,enumerable:false,value:{}}
  };
  Object.defineProperties(obj_super_ancestro,descriptor);
  definir_propiedades(dom_propiedades,obj_super_ancestro);
  definir_propiedades(css_propiedades,obj_super_ancestro);
}
//|Posicionar los hijos dentro de un grid------------------------------------------------
function posicionar_hijos(obj,areas_obj){

  for(var k in areas_obj){
    //--alert('k: '+k.substring(0,5));
    if(k.substring(0,5)!=='vacio' /*&& obj[k]!==undefined*/){//si no es vacio el tArea y si el hijo con ese nombre de tArea existe

      var posicion=areas_obj[k];
      /*console.log(posicion);
      console.log(obj.tRowsR);
      console.log(obj.tColsR);*/

      //--var hijo=obj[k];
      var hijo=get_hijos_areas(obj,k)[0];//|Es un hijo que tiene los arrays
      //--if(hijo.width!==undefined && hijo.height!==undefined){
        var x=sumatoria(obj.tRowsR,0,posicion[0]);
        var y=sumatoria(obj.tColsR,0,posicion[2]);
        var h=sumatoria(obj.tRowsR,posicion[0],posicion[1]+1);
        var w=sumatoria(obj.tColsR,posicion[2],posicion[3]+1);
        //--console.log(x+','+y);
        //--console.log(w+','+h);
        //--console.log(areas_obj);
        //--alert('k: '+k);
        //|OJO: Por ahora no funcionara auto
        /*
        if(obj.gridTemplateRows[posicion[0]]=='auto'  && hijo.height!==undefined){
          //--var ante_height=obj.tRowsR[posicion[0]];
          obj.tRowsR[posicion[0]]=hijo.height[1];
          var encontro_fill=obj.gridTemplateRows.indexOf('fill');
          if(encontro_fill>-1){
            obj.tRowsR[encontro_fill]=obj.tRowsR[encontro_fill]-(hijo.height[1]);
          }
          //|Por cada al primer fill que encuentre debe restarle la diferencia entre el nuevo alto y el anterior
          //---obj.preinit();
          break;
        }
        if(obj.gridTemplateColumns[posicion[2]]=='auto' &&  hijo.width!==undefined && obj.tColsR[posicion[2]]!==hijo.width[1]){
          alert('estoy en auto: '+obj.tColsR[posicion[2]]+ ' - '+hijo.width[1]);
          obj.tColsR[posicion[2]] = hijo.width[1]
          var encontro_fill=obj.gridTemplateColumns.indexOf('fill');
          if(encontro_fill>-1){
            obj.tColsR[encontro_fill]=obj.tColsR[encontro_fill]-(hijo.width[1]);
          }
          //--obj.preinit()
          break;
        }
        */
        hijo.position='absolute';
        hijo.left=y;
        hijo.width=w;
        hijo.top=x;
        hijo.height=h;

      //--}
    }


  }
}
//|Obtener los hijos que tienen gridArea especificado....................................
function get_hijos_areas(obj,ga_name){
  var hijos_ar=[];
  for(var i=0;i<obj._children.length;i++){
    //alert('sdfasdf');
    var hijo=obj._children[i];
    if(hijo.gridArea!==undefined && hijo.gridArea==ga_name){
      hijos_ar.push(hijo);
    }
  }
  //alert(hijos_ar);
  return hijos_ar;
}
//|Definir las pripiedades del obj_super_ancestro----------------------------------------
function definir_propiedades(ar_props,objeto){
  for(var a=0;a < ar_props.length;a++){
    var ar_propiedades=ar_props[a];

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
      define_prop(objeto,prop_name,setter_definido,getter_definido,'eval_');
    }
  }
}
//|Crear id--------------------------------------------------------------------------------
function crear_id(tag){
  // let i=1;
  let nuev_id=tag+Math.random().toString().replace('.','');
  // while($.hasOwnProperty(nuev_id)){
  while($[nuev_id]!==undefined){
    alert('msg');
    nuev_id=tag+Math.random().toString().replace('.','');
  }
  /*do{
    nuev_id=tag+i;
    i++;
  }while($.hasOwnProperty(nuev_id))///OJO
// }while($[nuev_id]!==undefined)

*/
  return nuev_id;
}
//|Crear objeto en js a partir de json_like----------------------------------------------
function crear_objeto_js(json_l_,parent){
  // let json_l=extenderObj(json_l_);
  let json_l=json_l_;
  var esnuevid=0;
  //|Comprobamos que tiene tag
  //---->if(json_l.hasOwnProperty('tag')){
  let nuev_id=json_l.id;
  if(json_l.tag!==undefined){
    //|Verificamos si tiene id, y si es válastIndexOf
    nuev_id=json_l.id;
    if(json_l.id==undefined ){
      //|Le creamos un id;
      //--json_l.id
      nuev_id=crear_id(json_l.tag);
      /*if(json_l.id=='div12'){
        console.log(json_l);
        alert('aqui crearmos el div12');
      }*/
      esnuevid=1;
    //--}else if($.hasOwnProperty(json_l.id)){
    }else if($[json_l.id]!==undefined){
      //console.log($.erpjswindow);
      //console.log(json_l);
      alert(JSON.stringify(json_l));
      alert('El id ingresado ya está asignado a otro objeto: '+json_l.id+ ' - '+esnuevid+' - '+json_l.tag);
      //--return
    }else{
      // alert(json_l.id);
    }
    //|Si no hay ningun problema
      var new_obj={};
      var tag=json_l.tag;

      //--alert('TAG:' +tag);

      //|Si el tag es un objeto existente, entonces heredamos de ese objeto
      //---if($.hasOwnProperty(tag)){

      if($[tag]!==undefined){
        //--alert('HEREDAMOS  ');
        //|en heredar_de también clonamos su dom
        new_obj=heredar_de($[tag],json_l,parent);
        /**---if(new_obj.id=='btnFinanzas'){
          console.log(new_obj.id);
          console.log(new_obj.events);
          alert('despues de heredar de: '+new_obj.id)
        }
        */
        //--new_obj

      }else{//|Si no heredamos del super ancestro
        //|Creamos el objeto js heredando de obj_super_ancestro
        //----->new_obj=Object.create(obj_super_ancestro);
        // new_obj=extenderObj(obj_super_ancestro);
        new_obj=Object.create(obj_super_ancestro);
        if(parent!==undefined){
          // alert('TIENE PARENT');
          new_obj.parent=parent;
        }
        new_obj.json_l=extenderObj(json_l);

        new_obj.real_tag=json_l.tag;
        new_obj._children=new_obj._children.slice(0);//|Clonamos el array
        //creamos el dom
        new_obj.dom=document.createElement(new_obj.real_tag);

      }
      // alert(json_l.textContent);
      //....HERE
      let actobj=new_obj;
      let arjson_l=[];
      while(actobj!==undefined && actobj.json_l!==undefined){
        if(actobj.hasOwnProperty('json_l')){
          arjson_l.push(actobj.json_l);
        }
        actobj=actobj.parent;
      }

      let tlength=arjson_l.length;
      alert(tlength);
      alert('anteas');
      alert(JSON.stringify(new_obj));

      for (let i = 0; i < tlength; i++) {
        alert(JSON.stringify(arjson_l[i]));
        Object.assign(new_obj,arjson_l[i]);
      }
      alert('despues');
      ////___ Object.assign(new_obj,new_obj.json_l);

      // if(new_obj.json_l!==undefined){
      //   Object.assign(new_obj.json_l,json_l);
      // }

      // json_l.id=nuev_id;
      // if(new_obj)
      //__ new_obj.id=nuev_id;
      // alert(new_obj.id);

      //---a partir de aqui solo hacemos assign
      //___ Object.assign(new_obj,json_l  );
      //__ new_obj.innerId=json_l.innerId;
      // if(json_l.innerId!==undefined){
      //   new_obj.innerId=json_l.innerId;
      //   // new_obj.classN=new_obj.classN+' innerId_'+json_l.innerId;
      // }
      //--->OJO
      // new_obj._events=new_obj.events.slice(0);//|Clonamos el array
      // new_obj.aliases=new_obj.aliases.slice(0);//|Clonamos el array


      //|Agregamos los aliases al renderizar
      //__ new_obj.aliases=json_l.aliases;
      // if(json_l['aliases']!==undefined){
      //   definirAliases(json_l.aliases,new_obj);
      // }
      //|Agregamos las propiedades personalizadas
      //--if(json_l.customProps!==undefined){
      //   if(json_l.hasOwnProperty('customProps')){
      //   Object.defineProperties(new_obj,json_l.customProps);
      // }
      //__ new_obj.customProps=json_l.customProps;
      // if(json_l.hasOwnProperty('children')){
      //__ new_obj.children=json_l.children;
      // if(json_l.children!==undefined){
      //   //--console.log(json_l.children[0]);
      //   let tamano_=new_obj._children.length;
      //   let tamano_2=json_l.children.length;
      //   for(let i=0;i<tamano_2;i++){
      //     //|Si es que ya tiene children heredado, entonces nolos sobrescribe, sino los agrega al final
      //     //var child_=json_l.children[i];
      //     //--->var child_=Object.assign({},json_l.children[i]);//Casi como clonasr
      //     //------>>var child_=extenderObj(json_l.children[i]);//casi como extende
      //     // let child_=extenderObj(json_l.children[i]);
      //     let child_=json_l.children[i];
      //
      //     // for(var dsd in json_l.children[i]){
      //     //   child_[dsd]=extenderObj(json_l.children[i][dsd]);
      //     // }
      //     //child_.parent=new_obj;
      //     let new_child=crear_objeto_js(child_);
      //     new_child.parent=new_obj;
      //     //--child_.id=json_l.id+'_'+child_.id;
      //     //---new_obj.addChild(new_child,i+new_obj._children.length-1);//|Agreamos el objeto en el indice especificado
      //     new_obj.addChild(new_child,i+tamano_);//|Agreamos el objeto en el indice especificado
      //
      //   }
      // }
      //--console.log(new_obj);
      //--alert('EL NUEVO OBJETO CREADO: '+new_obj.id+' - '+json_l.id);
      //|Agregamos los eventos
      // var events_length=new_obj.events.length;

      // if(json_l.events!==undefined){
      //   /***---if(new_obj.id=='btnFinanzas' && json_l.id=='btnFinanzas' ){
      //     console.log(new_obj.id);
      //     console.log(new_obj.events);
      //     console.log(json_l.events);
      //     alert('aqui agregamos nuevos eventos: '+new_obj.id + ' - '+json_l.id)
      //   }
      //   */
      //   /*console.log(new_obj.id);
      //   console.log(new_obj.events);
      //   alert('tiene eventos');*/
      //   // for(var i=0;i<json_l.events.length;i++){
      //   //   //--new_obj.events[events_length + i]=json_l.events[i];
      //   //   new_obj.events.push(json_l.events[i]);
      //   //
      //   // }
      //   /***--if(new_obj.id=='btnFinanzas' && json_l.id=='btnFinanzas' ){
      //     console.log(new_obj.id);
      //     console.log(new_obj.events);
      //     console.log(json_l.events);
      //     alert('YA LE AGREGAMOS: '+new_obj.id + ' - '+json_l.id)
      //   }*/
      // }
      // //|Asignamos los aliases
      // var aliases_length=new_obj.aliases.length;
      // if(json_l.aliases!==undefined){
      //
      //   for(var i=0;i<json_l.aliases.length;i++){
      //     //alert(i);
      //     new_obj.aliases[aliases_length + i] = json_l.aliases[i];
      //     //alert(new_obj.aliases);
      //   }
      // }


      //|Iteramos las propiedades del json_l
      //-new_obj=
      // var new_props={};
      // new_props.id=nuev_id;//|Aumentar id automàtico;
      // new_obj.classN=new_obj.classN+' '+nuev_id;
      new_obj.classN=nuev_id;
      new_obj.dom.id=nuev_id;


  /*
      if(!new_obj.dom){//|Usualmente no tiene dom cuando no es heredado de otro
        new_obj.dom=crear_dom(json_l);
      }
  */
  //|Clonamos los estados:
  // var newStates={};
  // //----->new_obj.states=Object.assign({},new_obj.states);
  // new_obj.states=extenderObj(new_obj.states);
  // for(var kkk in new_obj.states){
  //   //----->newStates[kkk]=Object.assign({},new_obj.states[kkk]);
  //   newStates[kkk]={};
  //   for(var ddd in new_obj.states[kkk]){
  //     newStates[kkk][ddd]=extenderObj(new_obj.states[kkk][ddd]);
  //   }
  //
  // }
  // new_obj.states=newStates;
  //
  // //|Le asignamos el estado inicial;
  // //----->new_obj.states.initial=Object.assign({},json_l);
  // new_obj.states.initial=extenderObj(json_l);

      // new_obj=Object.assign(new_obj,new_props);
      //--Object.assign(new_obj,extenderObj(new_props));
      // for(var iii in new_props){
      //   new_obj[iii]=extenderObj(new_props[iii]);
      // }

      // $[new_props.id]=new_obj;
      $[nuev_id]=new_obj;

      /***---if(new_obj.id=='btnFinanzas' && json_l.id=='btnFinanzas' ){
        console.log(new_obj.id);
        console.log(new_obj.events);
        console.log(json_l.events);
        console.log($[new_props.id].events);
        console.log($.btnFinanzas);
        alert('AQUI YA DEBE ESTAR: '+new_obj.id + ' - '+json_l.id)
      }*/

      //|Ejecutamos ante_init
      // if(json_l.anteinit!==undefined){
      //   new_obj.ante_init=json_l.ante_init;
      //   new_obj.ante_init.bind(new_obj)();
      // }

      //-renderizar(new_obj);
      return new_obj;


  }
}
function definirAliases(aliases,new_obj){
  if(aliases!==undefined){
    for(var i=0;i<aliases.length;i++){
      var ali=aliases[i];
      //--console.log(json_l.aliases);
      //--ali[1]=ali[1].bind(new_obj);
      //--alert('evt0:'+evt[0]+' - evt1: '+evt[1]().id);
      //alert('id:'+new_obj.id);
      //--alert('msg: '+evt[0]);
      define_prop2(new_obj,ali[0],ali[1],ali[2]);

    }

  }


}
//|Heredar............................................................................

function heredar_de(obj,json_l,parent){
  var new_obj=Object.create(obj);//aqui debemos hacer una funcion que
  if(parent!==undefined){
    // alert('TIENE PARENT');
    new_obj.parent=parent;
  }
  // var new_obj=extenderObj(obj);//aqui debemos hacer una funcion que
  new_obj.ancestro=obj;
///---  new_obj._children=obj._children.slice(0);//|Clonamos el array
  new_obj.id=json_l.id;
  new_obj.tag=obj.real_tag;
  new_obj.dom=document.createElement(new_obj.real_tag);
  //--el nuevo id:
  //----var json_l_sinid=Object.assign({},json_l);//no vale
  //--var o_json_l_sinid=Object.assign({},obj.json_l_sinid);

  //----json_l_sinid.id=undefined;//no vale

  //----->new_obj.json_l=Object.assign(Object.create(obj.json_l),json_l);//casi como extender
  ///////new_obj.json_l=Object.assign(extenderObj(obj.json_l),json_l);//casi como extender
  //-------->Object.assign(new_obj.json_l,extenderObj(json_l));//casi como extende
  //--the key of extension
  //-------____new_obj.json_l=extenderObj(obj.json_l);
  new_obj.json_l=extenderObj(json_l);
  //----____Object.assign(new_obj.json_l,json_l)
  // for(var kkk in json_l){
  //   new_obj.json_l[kkk]=extenderObj(json_l[kkk]);
  // }
  // if(json_l.assignProps!==undefined){
  //   alert('msg');//??????
  //   //----->new_obj.json_l.assignProps=Object.create(json_l.assignProps);
  //   new_obj.json_l.assignProps=extenderObj(json_l.assignProps);
  // }
  // new_obj.id=json_l.id;//esto lo modifiqué recién
  //new_obj.id=obj.id;
  new_obj.tag=json_l.tag;
  new_obj.classN=obj.id;
  //--alert(new_obj.classN);
  //--alert('heredando padre: '+json_l.id);
  //new_obj.json_l.
  // alert(JSON.stringify(new_obj._children));
  new_obj._children=new_obj._children.slice(0);//|Clonamos el array
  //---new_obj.events=new_obj.events.slice(0);//|Clonamos el array
  new_obj._events=clonar_eventos(new_obj.events);

  new_obj.aliases=clonar_eventos(new_obj.aliases,false);
  let tlength=new_obj._children.length;
  if(tlength==8){
    alert(tlength);
  }

  //--->for(let i=0;i<tlength;i++){
  for(let i=0;i<0;i++){
    let myownchild=new_obj._children[i];
    let json_l_for_hijo={
      id:crear_id(new_obj._children[i].tag)
    };
    //|Creamos un id para header
    //--json_l_for_hijo.id=json_l.id+'___'+new_obj._children[i].id;

    //------>>json_l_for_hijo.id=json_l.id+'___'+new_obj._children[i].id+'_'+Math.random().toString().replace('.','');
    //-json_l_for_hijo.id=crear_id(new_obj._children[i])
    // if($[json_l_for_hijo.id]!==undefined){
    //   alert('EL ID DEL HIJO YA EXISTE - f heredar: '+json_l_for_hijo.id);
    // }

    //--alert('heredando cada hijo: '+json_l_for_hijo.id);

    //OJO: Aqui estamos suponiendo que este id nunca va a repetirse, verificar luego
    // alert(json_l_for_hijo.id);
    //---->$[json_l_for_hijo.id]=heredar_de(new_obj._children[i],json_l_for_hijo);//heredamos cada hijo??
    let tempchild=heredar_de(myownchild,json_l_for_hijo);//heredamos cada hijo??
    $[tempchild.id]=tempchild;
    //------>$[json_l_for_hijo.id]=heredar_de(new_obj._children[i],json_l_for_hijo);//heredamos cada hijo??
    //--->new_obj._children[i]=$[json_l_for_hijo.id];
    new_obj._children[i]=tempchild;
    // tempchild.indice=i;
    //--->new_obj._children[i].parent=new_obj;
    tempchild.parent=new_obj;
    //--new_obj._children[i]['id']=json_l.id+'_'+new_obj.id;

  }
  /*for(var i=0;i<new_obj.events.length;i++){
    new_obj.events[i]=json_l.events[i]
  }*/
  //--console.log(new_obj);

  return new_obj;
}
//Clonar eventos-----------------------------------------------------
function clonar_eventos(ar,is_alias){
  var retorno_ar=[];
  let tlength=ar.length;
  for(var i=0;i<tlength;i++){
    //alert('clonando: '+ar);

      retorno_ar[i]=ar[i];
    // if(is_alias==undefined){
    //   //--alert('clonando: '+ar);
    // }
  }
  return retorno_ar;
}
function define_prop2(obj,prop,desti_obj,desti_prop){
  //-obj,['value',function(){return this.children[1]},'value']
  //--obj.json_l[prop]=
  Object.defineProperty(obj,prop,{
    set:function(v){
      //alert('seteando - '+[2]+':'+v);
      //console.log(desti_obj.bind(this)()[desti_prop]);
      //--console.log(v);
      //--alert('en set: '+this.id);
      /*console.log(desti_obj.toString());
      console.log(desti_prop);
      console.log(obj);*/
      if(this.jswindow_content!==undefined)
      {
        /*console.log(this.jswindow_content);
      console.log(this.jswindow_content.children);*/
    }
      //--console.log(desti_obj.bind(this)());
      //console.log(prop);
      //console.log(this);
      //console.log(desti_obj);
      //console.log(desti_obj.toString());

      desti_obj.bind(this)()[desti_prop]=v;
      //console.log(desti_obj.bind(this)()[desti_prop]);
      //alert('despues set: '+v);
    },
    get:function(){
      //--alert('en get:');
      //-return 'si existo';
      //--return desti_obj[desti_prop];
      /*console.log(desti_obj.toString());
      console.log(desti_prop);
      console.log(this);*/
      return desti_obj.bind(this)()[desti_prop];
    }
    ,configurable:true
  });
}
//Funcion que crea dom----------------------------------------
//se invocarà a clonacion recursivas
function crear_dom(props){
  var tag=props.tag;
  /*if($.hasOwnProperty(tag)){
    //aqui se clonara el dom de otro

  }else */if(tag=='text'){
    return document.createTextNode(props.textContent);
  }else{
    return document.createElement(tag);
  }
}
//|Funcion para renderizar
function renderizar(obj,anexar,cargar_load_r){
  // obj.show=obj.json_l.show;
  // alert(obj.id);
  // obj.dom.id=obj.json_l.id;
  if(anexar!==undefined /*&& anexar.querySelector('[id="'+obj.id+'"]')==null*/){
    // obj.dom=document.createElement(obj.real_tag);
    // obj.classN='domElement';
    //
    //
    // obj.dom['className']=obj['classN']+(obj.json_l!==undefined && obj.json_l['classN']!==undefined?' ' +obj.json_l['classN']:'');
    //
    // //--QUITAMOS TODAS LAS PROPIEDADES NO DOM NI CSS
    // // let tjson_l1=obj.json_l;
    // // let tjson_l2={};
    // //    tjson_l2.id=tjson_l1.id;tjson_l1.id=undefined;
    // //    tjson_l2.events=tjson_l1.events;tjson_l1.events=undefined;
    // //    tjson_l2.aliases=tjson_l1.aliases;tjson_l1.aliases=undefined;
    // //    tjson_l2.classN=tjson_l1.classN;tjson_l1.classN=undefined;
    // //    tjson_l2.children=tjson_l1.children;delete tjson_l1.children;//=undefined;
    // // //  Object.assign(tjson_l2,obj.aliases));
    // // let tid=obj.id;
    // obj.json_l.id=obj.id;
    // let taliases=obj.json_l.aliases;
    // obj.json_l.aliases=[];
    // let tclassN=obj.json_l.classN;
    // obj.json_l.classN='';
    // for(let k in obj.json_l){
    //   //---if(/*k!=='id' && k!=='events' && k!=='aliases'&& k!=='classN' &&*/ k!=='children'/*|| k!=='init'*/   && isInAliases(k,obj)==false){
    //     if(['children'].indexOf(k)==-1/*|| k!=='init'*/   && isInAliases(k,obj)==false){
    //
    //     obj[k]=obj.json_l[k];
    //   }
    //   // obj.id=tid;
    //   /*else if(k=='events'){
    //     for(var i=0;i<json_l[k].length;i++){
    //       var ev=obj.json_l[i];
    //       nobj.attr.addEventListener(ev[0],ev[1],ev[2]);
    //     }
    //     obj.dom.add
    //   }*/
    //   /*else{
    //     obj.dom['id']=obj[k];
    //   }*/
    //
    //
    // }
    // obj.json_l.aliases=taliases;
    // obj.json_l.classN=tclassN;
    // // Object.assign(obj.json_l,tjson_l2);
    // // alert(obj.json_l['classN']);



//..............innerIdTo
//..............innerIdO->id to an specdified parent
//iba inneridp

//--ineridp
    if(obj && obj.innerIdP!==undefined){
      var ar=obj.innerIdP;
//--      console.log(obj.getParentBy.toString());
      var parent_=obj.getParentBy('tag',ar[1]);
      if(parent_==null){
        parent_=obj.getParentBy('id',ar[1]);
      }
      if(parent_!==null){
        // obj.classN=obj.classN+' innerIdP_'+ar[0];
        obj.classList.add('innerIdP_'+ar[0]);
        parent_[ar[0]]=obj;
      }else{
        alert('Error when assigning childrenDom to parent on innerIdP');
      }



      //console.log('en innerIdP');
      //--alert('asdfasfd')
    }
    //-----
    /*=============================================>>>>>
    = innerIdF = Se agrega como propiedad del formulario padre mas cercano
    ===============================================>>>>>*/

    if(obj && obj.idf!==undefined){
      var nominparent=obj.idf;
      //--->var parent_=obj.getParentBy('real_tag','form');
      var parent_=obj.getParentBy(gltiposearch,gltipopadre);
      if(parent_!==null){
        //--obj.classList.add('innerIdF_'+nominparent);
        obj.classList.add(nominparent);
        parent_[nominparent]=obj;
      }else{

        console.log(obj);
        alert(obj.idf);

        alert('Error when using innerIdF: '+obj.idf);
      }
    }


    /*= End of innerIdF =*/
    /*=============================================<<<<<*/


//aliases....................
//console.log('en aliases');
// if(obj.aliases){
//   for(var i=0;i<obj.aliases.length;i++){
//
//
//     //--alert('alsdf');
//     if(obj.json_l[ obj.aliases[i][0] ] !==undefined){
//       //console.log('==INICIO - EN FOR DE ALIASES');
//       obj[ obj.aliases[i][0] ]=obj.json_l[ obj.aliases[i][0] ];//obj.aliases[i][0];
//       //console.log('==FIN - EN FOR DE ALIASES');
//     }
//
//   }
// }

    //console.log('-----------ENTRE DE NUEVO A RENDERIZAR -despues de aliases');
    //--definirAliases(obj.aliases,obj);


    //|Agregamos los eventos al renderizar
// if(obj.events){
//   for(var i=0;i<obj.events.length;i++){
//     var evt=obj.events[i];
//     //--if(evt[3]!==false){
//       obj.dom.addEventListener(evt[0],evt[1].bind(obj),evt[2]);
//       //obj.dom.addEventListener(evt[0],evt[1].bind(obj),true);
//     //--}
//   }
//
//   obj.dom['id']=obj.id;
// }


/*----
    var this_=obj;
    var actObj=this_;
    var arObj=[];
    while(actObj!==undefined && actObj['init']!==undefined){
      //--console.log('en init');
      if(actObj.hasOwnProperty('init')){
        //---actObj.init.bind(this_)();
        arObj.push(actObj.init);

      }
      actObj=actObj.ancestro;
    }
    for(var a=0;a<arObj.length;a++){
      arObj[a].bind(this_)();
    }
    */



    //---this.load_r();
    //----}



    //---this.load_r();

    //---obj.init();
    //--console.log(obj);
    //alert('TAMAÑO DE CHILDREN EN RENDERIZAR: '+obj._children.length);
    //console.log(anexar);
    //console.log(obj);


    //------------PREINIT
        var this_=obj;
        var actObj=this_;
        var arObj=[];
        while(actObj!==undefined && actObj!==undefined && actObj['preinit']!==undefined){
          if(actObj.hasOwnProperty('preinit')){
            //--actObj.load_r.bind(this_)();
            //console.log('-en for');
            //console.log(actObj.json_l.load_r.toString());

            // alert(actObj.json_l.preinit);
            if(arObj[0]!==actObj.preinit){
              arObj.unshift(actObj.preinit);
            }
            // arObj.push(actObj.json_l.init);
          }
          actObj=actObj.ancestro;
        }
        //console.log('--------------------');
        arObj.reverse();
        for(var a=0;a<arObj.length;a++){

          arObj[a].bind(this_)();
        }
    //FIN preINIT---------------------------------------

    // for(var i=0;i<obj._children.length;i++){
      // renderizar(obj._children[i],obj.dom);
    // }
    //contamos los completable=true;
    // obj.countCompletables();

/*
    //--load_r


      var this_=obj;
      var actObj=this_;
      var arObj=[];

      //--while(actObj!==undefined && actObj.json_l!==undefined && actObj.json_l['load_r']!==undefined){
      while(actObj!==undefined && actObj.json_l!==undefined && actObj.json_l['init']!==undefined){

        if(actObj.json_l.hasOwnProperty('init')){
          //---arObj.push(actObj.json_l.load_r);
          //-----arObj.unshift(actObj.json_l.load_r);
          if(arObj[0]!==actObj.json_l.init){
            arObj.unshift(actObj.json_l.init);
          }

        }
        actObj=actObj.ancestro;
      }

      //---arObj.reverse();
      for(var a=0;a<arObj.length;a++){

        arObj[a].bind(this_)();
      }
      obj.parent.childrenLoaded++;

    }

*/
    //------
    //------------INIT
        var this_=obj;
        var actObj=this_;
        var arObj=[];
        while(actObj!==undefined && actObj!==undefined && actObj['init']!==undefined){
          if(actObj.hasOwnProperty('init')){

            //--actObj.load_r.bind(this_)();
            //console.log('-en for');
            //console.log(actObj.json_l.load_r.toString());
            if(arObj[0]!==actObj.init){
              arObj.unshift(actObj.init);
            }
            // arObj.push(actObj.json_l.init);
          }
          actObj=actObj.ancestro;
        }
        //console.log('--------------------');
        arObj.reverse();
        for(var a=0;a<arObj.length;a++){
          // alert(arObj[a]);
          arObj[a].bind(this_)();
        }
    //FIN INIT---------------------------------------
    anexar.appendChild(obj.dom);
obj.classList.remove('unseen');

    //alert('pase dodnde hay children: '+ obj.tag );
    //--if(anexar!==undefined){

      //--alert('antes de anexar: '+obj.id+' body.children: '+document.body.children.length);

      // if(obj.dom.autofocus){
      //   // alert('msg');
      //   obj.dom.focus();
      // }
      //--alert('despues de anexar: '+obj.id+' body.children: '+document.body.children.length);
      if(anexar.id=='body_'){

        //--alert('0no llego a esto a menos que sea body_')
        //---> obj.preinit('CUANDO YA RENDERIZO');
      }
      if(cargar_load_r!==undefined){

        //---> obj.preinit('CUANDO YA RENDERIZO');


      }
      //-->cambie a load_r

      //--load_r

      //if(obj.children.length==obj.childrenLoaded){//ejecuta el load_r si sus hijos se han cargado
        var this_=obj;
        var actObj=this_;
        var arObj=[];

        //--while(actObj!==undefined && actObj.json_l!==undefined && actObj.json_l['load_r']!==undefined){
        while(actObj!==undefined && actObj!==undefined && actObj['load_r']!==undefined){

          if(actObj.hasOwnProperty('load_r')){
            //---arObj.push(actObj.json_l.load_r);
            //-----arObj.unshift(actObj.json_l.load_r);
            if(arObj[0]!==actObj.load_r){
              arObj.unshift(actObj.load_r);
            }

          }
          actObj=actObj.ancestro;
        }

        //---arObj.reverse();
        for(var a=0;a<arObj.length;a++){
          // alert(arObj[a]);

          arObj[a].bind(this_)();
        }
        // obj.parent.childrenLoaded++;


      //}

      //------


      //--obj.preinit('CUANDO YA RENDERIZO');


    //--}
  }else{
    if(anexar!==undefined){
      //--console.log(anexar.querySelector('[id="'+obj.id+'"]'));
      if(obj.id!==$.main){
        //---OJO: esto no debe ir, es un truco
        alert('ya está renderizado: '+obj.id);
      }

    }else{
      //--console.log('Anexar es indefinido: '+obj.id);
    }


  }

}
//|Funcion que sirve para marcar a quienes se suscribe
function s(v){
  return v;
}
//|Función que inicializa al script ajs--------------------------------------------------
function start(){
  crear_objeto_principal();
  crear_propiedades_css_dom();
  crear_obj_super_ancestro();
  /***OJO:window.addEventListener('resize',function(){

    if($.main!==undefined){

      if($[$.main]!==undefined){
        var main=$[$.main];
        //alert('rsize');
        //--alert('RESIZESING');
        main.preinit(undefined,'resize');
        //main.width=main.json_l.width;
        //main.height=main.json_l.height;

      }
    }

  });*/

}
function isInAliases(prop,obj){
  var retorno=false;
  let taliases=obj.aliases;
  let tlength=taliases.length;
  for(var i=0;i<tlength;i++){
    if(prop==taliases[i][0]){
      retorno[i]=true;
      break;
    }
  }
  return retorno;
}
function getAliases(prop,obj){
  var retorno=[];
  let taliases=obj.aliases;
  let tlength=taliases.length;
  for(var i=0;i<tlength;i++){
    if(prop==taliases[i][0]){
      retorno[i]=taliases[i];
    }
  }
  return retorno;
}

//|Llamada a todas las funciones:---------------------------------------------------------
start();
