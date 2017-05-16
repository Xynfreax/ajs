//console.log(noexisteestavariable);
//|"ajs_libraries.js" // Librerías comunes usadas
/*var objeto_={
  array_:[[this]]
}

cl.lg.req(objeto_.array_[0]);*/


//\Funciones para cl.lg.req.....................................................................
//---console.log(NODEBEDARERROR);
globalenlibrerias='globalito';
$$={};

log_=function(cad){
  if(this.enable==true){
    cl.lg.req(cad);
  }
}

cl={
  lg:{
    req:function(cad){
      log_.bind(this)(cad);
    }
    ,enable:false
  }
}

depByLevel=[];
depOrderFunc={};
depObj={};
importCounter=0;
depsExecuted=[];
counterExecuted=0;

//|Obtener el tipo de un obnjeto en letras o numericamente----------------------------
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
        '[object NamedNodeMap]':[5,'html_dom'],
        '[object CSS2Properties]':[6,'css'],
        '[object CSSStyleDeclaration]':[6,'css'],
        '[object Boolean]':[7,'boolean'],
        '[object Date]':[8,'date'],
        '[object Set]':[9,'set'],
        '[object Null]':[9,'null'],

      }
      if(variable!==undefined){
        //--console.log(Object.prototype.toString.call(variable));
        return returns[Object.prototype.toString.call(variable)][yn];
      }else{
        return undefined;
      }

};
function alias(target_obj,target_prop){
  return ['alias',target_obj,target_prop];
}

//|Definir las pripiedades de un objeto-----------------------------------------------
function define_prop(objeto,prop_name,setter,getter,with_calc){//Todo setter tiene k y v como parametros, y getter tiene k
  var predefined_calc=null;
  objeto['s_'+prop_name]=new Set([]);
  var descriptor={};
  descriptor[prop_name]={
    set:function(v){

      if(with_calc){
        //alert('TIENE WITH_CALC');
        var temp_returned=eval_v(this,prop_name,v);
        //alert('paso');
        v=temp_returned[0];
        predefined_calc=temp_returned[1];
        //--v=with_calc.bind(this)();
      }
      if(predefined_calc!==null){

        v=predefined_calc.bind(this)();
        //alert('valor de v despues de calc: '+v);;
      }

      setter.bind(this)(prop_name,v);
      if(prop_name=='width'){
        //--cl.lg.req(this.s_width);
        //alert('WIDTH: '+v);
      }
      for(var item_ of this['s_'+prop_name]){
        //--cl.lg.req(this);
        //--cl.lg.req();
        //alert('ejecutando funciones SUSCRITAS - tamaño: '+this['s_'+prop_name].size);
        item_();
        //--item_[0][item_[1]]='';
      }
    },
    get:function(){
      return getter.bind(this)(prop_name);
    }
  }
  Object.defineProperties(objeto,descriptor);
}
//|Funcion que ejecuta el callback y los callbacks
function exec_callb_s(callback,callback_s_ar){
  callback();
  for(var i=0;i<callbacks_s_ar.length;i++){
    callbacks_s_ar[i]();
  }
}
//|Importa scripts--------------------------------------------------------------------
function importScripts(ar_scripts,callback,callback2){
  var filesloaded=0;
  function checkLoadedS(){
    //var path_=document.currentScript['src'];
    //var lst=path_.lastIndexOf('?');
    //path_=path_.substring(0,lst);
    /*if($$_dependencias.hasOwnProperty(path_))
    {
      alert($$_dependencias[path_][4]);
      $$_dependencias[path_][4]=1;
    }*/
    //--console.log('----->en load');
    //---console.log(this.src);
    name_script=this['src'];
    me=name_script.substring(0,name_script.length-3);
    var first=me.lastIndexOf('/');
    var last=me.indexOf('.',first+1);
    ruta_relativa=me.substring(0,first+1);
    //--alert(ruta_relativa);
    me=me.substring(0,last)+'.js';
    //--console.log(me);
    if(depOrderFunc.hasOwnProperty(me)){

      var actDep=depOrderFunc[me];
      if(isDepEmpty(actDep.deps)==true /*&& actDep.active!==false*/){
        /*---if(me=='file:///D:/dev/ERPUniversidad/cliente/vista/financiero/fi_programarpagos.js'){
          alert(isDepEmpty(depOrderFunc[me].deps))
        }*/

        actDep.active=false;
        depsExecuted.push(me);
        counterExecuted++;
        actDep.func()
        //--alert(me);
        for(var k in actDep.callrs){

          var actCallr=actDep.callrs[k];
          //---var actCallrScript=document.getElementById(k);
          var actCallrScript=document.querySelector('script[src^="'+k+'"]');
          //--alert(me+' - '+k);
          //console.log(this);
          //console.log(actCallrScript);

          if(actCallrScript!==null){
            //---alert(actCallrScript.onload);
            actCallrScript.onload();
          }else{
            //---alert('en el else');
            if(actCallr.order==0){

              actCallr.active=false;
              depsExecuted.push(k);
              counterExecuted++;
              actCallr.func();

            }

          }
        }


      }
    }else{
      //alert(depOrderFunc);
    }

    if(filesloaded===ar_scripts.length){
      //-----callback();
      //--callback2();
    }

  }
  for(var i=0;i<ar_scripts.length;i++){
    importScript(ar_scripts[i],checkLoadedS);
    filesloaded++;
  }



}
function importScriptNormal(script_url,callback){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  //--script.async = false;
  script.async = true;
  script.src = script_url+'.js?q='+Date.now();
  //-----script.id=script_url+'.js';
  //--script.classList.add(script_url+'.js');

  script.onload = callback;

  document.head.appendChild(script);
}
function importScript(script_url,checkloaded){
//---alert('msg');
var path_temp=script_url;//+'.js';
//--cl.lg.req('en importscript: '+path_temp);
//var temp__=document.querySelector('[src^="vista/config_dependencies"]');
//var temp__=document.getElementsByClassName(');
//alert(temp__);
//--if($$_dependencias.hasOwnProperty(path_temp) && $$_dependencias[path_temp][4]==0){
if(0==0){
  //---$$_dependencias[path_temp][2][0]++;//el contador del anterior dependencias se suma en +1
//--if(document.querySelector('[src^="'+path_temp+'"]')==null){
//--cl.lg.req(path_temp);
//--cl.lg.req('aun no programado para importar('+$$_dependencias[path_temp][1]+'): '+path_temp);
cl.lg.req('------------------------------------------------------');
cl.lg.req($$_dependencias);
cl.lg.req(script_url);
cl.lg.req($$_dependencias[script_url]);
//cl.lg.req($$_dependencias[path_temp][1]);
if($$_dependencias[script_url]!==undefined){
  $$_dependencias[script_url][1]=1;
}else{
  cl.lg.req('INDEFINIDO');
}

cl.lg.req('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

//alert('aun no: '+path_temp);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  //---script.async = true;
  script.async = false;
  script.addEventListener('error',function(e){alert('El script '+e.target.src+' no existe');},false);
  script.src = script_url+'?q='+Date.now();
  //--script.classList.add(script_url+'.js');
  script.onload = checkloaded;
  document.head.appendChild(script);
  //--cl.lg.req('cambiando estado a programado('+$$_dependencias[path_temp][1]+'): '+path_temp);

  return script;
}else{
  //--cl.lg.req('Ya se importó: '+path_temp);
  //alert('ya se importo: '+path_temp);
}

}

function get_name_dependencias(ar){
  var returned_ar=[];
  for (var i=0;i<ar.length;i++){
    var me=ar[i];
    var first=me.lastIndexOf('/');
    var last=me.length;//indexOf('.',first+1);
    me=me.substring(first+1,last);
    returned_ar.push(me);
  }
  //alert(ar);
  //alert(returned_ar);
  return returned_ar;
}
function clonarDependenciasConRuta(depe,ruta){
  var returned=[];
  for(var i=0;i<depe.length;i++){
    returned.push(fixPath(ruta+depe[i]+'.js'));
  }
  return returned;
}
function isDepEmpty(objDep){
  var isEmpty=true;
  for(var k in objDep){
    if(objDep.hasOwnProperty(k)){
      if( objDep[k].active!==false){
        isEmpty=false;
        break;
      }

    }
  }
  return isEmpty;
}

$$={


  require:function(dependencias_0,callback0,level){//|dependencias_, callback
    //console.log('--------->en require');
    //console.log(document.currentScript['src']);


//amount of resources imported !== amount of functions executed?

//first require && first dependencies


// When no more resources




    cl.lg.req('EN INICIO DE REQUIRE DE: '+document.currentScript['src']);

    var dependencias_=[], callback=function(){};
    if(arguments.length==1){
      if(get_type(arguments[0])==4){//|es funcion
        callback=arguments[0];
      }else{
        alert('No pasó una funcion como parametro, y ademas solo hay un parámetro');
        callback=null;
      }


    }else if(arguments.length>=2){//|Por ahora suponemos que es un array y una funcion
      dependencias_=arguments[0];
      callback=arguments[1];
    }
    //-----AQUI MODIFICO HOY
    var actLevel=0;
    if(level==undefined){
      actLevel=0;
    }else{
      actLevel=level;
    }
    if(depByLevel[actLevel]==undefined){
      depByLevel.push([]);
      //--alert('en aqui');
      //actLevel=0;
    }
    depByLevel[actLevel].push(callback);

    //---

    //----AQUI FIN

    var name_script='';
    var ruta_relativa='';
    var me='';

    /*---if(path==undefined){
      name_script=document.currentScript['src'];

    }else{
      name_script=path;
      //--cl.lg.req('aqui esoy: '+name_script);
      //ruta_relativa='path';
      //
    }
    */
    name_script=document.currentScript['src'];
    me=name_script.substring(0,name_script.length-3);
    var first=me.lastIndexOf('/');
    var last=me.indexOf('.',first+1);
    ruta_relativa=me.substring(0,first+1);
    //--alert(ruta_relativa);
    me=me.substring(first+1,last);
    //--me=name_script;//-----me.substring(first+1,last);
    me=fixPath(ruta_relativa+me+'.js');
    /*cl.lg.req(me);
    cl.lg.req(ruta_relativa);*/

    //-----me=ruta_relativa+me+'.js';

//----NUIEVO DEP
var actOrder=0;
var actDepObj={};
if(Object.keys(depObj).length==0){
  depObj[me]={};
  depObj[me].func=callback;
  depObj[me].deps={};
  actDepObj=depObj[me];
}else{

}

if(Object.keys(depOrderFunc).length==0 /*&& depOrderFunc[me]==undefined*/){
  //--alert('asdfasdfsfd');
  actOrder=0;
  depOrderFunc[me]={};
  depOrderFunc[me].order=0;//---actLevel;
  depOrderFunc[me].func=callback;
  depOrderFunc[me].deps={};
  depOrderFunc[me].active=true;
  //----depOrderFunc[me].linkDepObj=actDepObj;
  //--depOrderFunc[me].callr=null;
}else{

  if(depOrderFunc[me]!==undefined){
    //--alert('asdfasdfasdf');
    actOrder=depOrderFunc[me].order;
    depOrderFunc[me].func=callback;
    depOrderFunc[me].deps={};
    depOrderFunc[me].active=true;

  }
}





//------FIN NUEVO DEP


    //--alert('msg: '+me);
    cl.lg.req('ANTES DE CLONAR DEPENDENCIAS DE: '+me+' Dependencias: '+dependencias_);
    cl.lg.req('LA RUTA: '+ruta_relativa);
    //--var dependencias_for_import=dependencias_.slice(0);//Clonamos
    var dependencias_for_import=clonarDependenciasConRuta(dependencias_,ruta_relativa);
    cl.lg.req('DESPUES DE CLONAR DEPENDENCIAS DE: '+me+' Dependencias: '+dependencias_for_import);
    //--AQUI MODIFICO DEP
    for(var a=0;a<dependencias_for_import.length;a++){
      var actDepName=dependencias_for_import[a];
      if(depOrderFunc[actDepName]==undefined){
        depOrderFunc[actDepName]={};
        depOrderFunc[actDepName].order=actOrder+1;
        //---depOrderFunc[actDepName].callr=depOrderFunc[me];
        depOrderFunc[actDepName].callrs={};
        depOrderFunc[actDepName].callrs[me]=depOrderFunc[me]

        depOrderFunc[me].deps[actDepName]=depOrderFunc[actDepName];
      }else{
        var newOrder=actOrder+1;
        //------if(actDepName=='file:///D:/dev/ERPUniversidad/cliente/framework/all.js'){
        if(actDepName=='file:///D:/dev/ERPUniversidad/cliente/vista/erpjswindow.js'){

          //console.log('En: '+me+' | '+actDepName+' - '+depOrderFunc[actDepName].order+ ' - '+(newOrder));
          //alert('En: '+me+' | '+actDepName+' - '+depOrderFunc[actDepName].order+ ' - '+(newOrder));
        }

        //-----if(depOrderFunc[actDepName].order<(newOrder)){
          //--depOrderFunc[actDepName]={};

/*--
          //------------------------------------

          depOrderFunc[actDepName+'_'+me]={};

          depOrderFunc[actDepName+'_'+me].order=newOrder;
          //---depOrderFunc[actDepName+'_'+me].callr=depOrderFunc[me];
          depOrderFunc[actDepName+'_'+me].callr={name:me,obj:depOrderFunc[me]};
          depOrderFunc[me].deps[actDepName+'_'+me]=depOrderFunc[actDepName+'_'+me];

          //------------------------------------

          */

          //--depOrderFunc[actDepName+'_'+me].order=newOrder;
          depOrderFunc[actDepName].callrs[me]=depOrderFunc[me];
          depOrderFunc[me].deps[actDepName]=depOrderFunc[actDepName];

          //-----var difOrder=newOrder-depOrderFunc[actDepName].order;
          //if(depOrderFunc)
          //---aqui aumentar tambien el order de sus dependencias en la diferencia
          //--depOrderFunc[actDepName].order=newOrder;
          //---        }

      }
    }
    //--FIN MODIFICO DEP

//---when a child and siblings get executed=> then the parent will execute.
//------->>>>>>>>>>>>
/*--------o={
    a:{
      b1:{

        c1:{
          d1:{}
        },

        c2:{}
      },
      b2:{
        c3:{},
        c4:{
          d3:{},

          c1:{
            d1:{}//<<----
          }

        }
      }
    }
}

*/

//----funcion que recorre
//---------->>>>>>>>>>>>>


    var meAgregue=false;
    if(dependencias_.length>0){
      var contador1=[0];
      var contador2=[dependencias_.length];
      for(var i=0;i<dependencias_.length;i++){

        var path_=fixPath(ruta_relativa+dependencias_[i]+'.js');
        cl.lg.req('RECORRIENDO DEPENDENCIAS ->> '+(path_+ ' || '+ruta_relativa+dependencias_[i]+'.js'));
        cl.lg.req(dependencias_);
        cl.lg.req($$_dependencias);
        //--dependencias_for_import[i]=path_;
        if($$_dependencias.hasOwnProperty(path_)){
          cl.lg.req('ESTOY AQUI');
          //--cl.lg.req('Dependencia ya existe('+$$_dependencias[path_][1]+'): '+path_);
          //--cl.lg.req(dependencias_);

          if($$_dependencias[path_][1]==1 || $$_dependencias[path_][1]==0){//Si esta programado para importar ó simplemente está en la lista de dependencias
            cl.lg.req('Programado para importar: '+path_);
            //--dependencias_.splice(i,1);
            //Me agrego a la sublista en dependencias
            $$_dependencias[path_][0][me]=[callback, contador2, contador1, me, 0];//0 significa que aun no se ha importado
            meAgregue=true;
          }else{
            cl.lg.req('me quito');

            /*cl.lg.req('NO Programado para importar');
            cl.lg.req('Antes cantidad de dependecias que debe alcanzar: '+$$_dependencias[path_][1][0]);
            cl.lg.req('Antes cantidad de dependecias que debe alcanzar: '+$$_dependencias['file:///media/Datos/Cristian/Works/Webs%206-05-2014-0/webs/aula_virtual/vista/login_frm.js'][1][0]);

            $$_dependencias[path_][1][0]--;
            cl.lg.req('Despues cantidad de dependecias que debe alcanzar: '+$$_dependencias[path_][1][0]);
            cl.lg.req('Despues cantidad de dependecias que debe alcanzar: '+$$_dependencias['file:///media/Datos/Cristian/Works/Webs%206-05-2014-0/webs/aula_virtual/vista/login_frm.js'][1][0]);
            */
            /*
            var dependiente_name=$$_dependencias[path_][3];
            cl.lg.req('NOMBRE DE DEPENDENCIA');
            cl.lg.req(dependiente_name);
            var ind_temp=$$_dependientes[dependiente_name].indexOf(path_)
            cl.lg.req('Antes de quitar de los programados para importar: '+$$_dependientes[dependiente_name]);
            $$_dependientes[dependiente_name].splice(ind_temp,1);
            cl.lg.req('Despues de quitar de los programados para importar: '+$$_dependientes[dependiente_name]);
            */

          }
          //En cualquiera de los casos, elimino de mis dependencias porque
          //--cl.lg.req('Dependencias antes: '+dependencias_);
          //--cl.lg.req('Dependencias antes: '+dependencias_for_import);
          dependencias_for_import.splice(i,1);
          dependencias_.splice(i,1);
          i--;
          //--cl.lg.req('Dependencias_despues: '+dependencias_);
          //--cl.lg.req('Dependencias_despues: '+dependencias_for_import);

          //--i--;

          //--$$_dependencias[path_][2]++;//el contador del anterior dependencias se suma en +1
          //luego se le asignara otro contador
        }else{
          cl.lg.req('NO ESTOY ACA_'+i);
          cl.lg.req(me);
          cl.lg.req(contador2);
          cl.lg.req(contador1);
          cl.lg.req([path_]);
          cl.lg.req($$_dependencias[path_]);
          cl.lg.req(dependencias_.length);
          $$_dependencias[path_]=[{},0];
          //--$$_dependencias[path_][0][me]=[callback, contador2, contador1, me, 0];//0 significa que aun no se ha importado
          contador2[0]=dependencias_.length;//-IMPORTANTE: aQUI ACTUALIZAMOS a contador2, porque sino... estariamos ref
          $$_dependencias[path_][0][me]=[callback, contador2, contador1, me, 0];//0 significa que aun no se ha importado
        }
      }
    }
    $$_dependientes[me]=dependencias_for_import;
    //--cl.lg.req('Dependencias mandas a importScripts');
    //--cl.lg.req($$_dependientes[me]);
    //--cl.lg.req('$$_dependencias: ');
    //--cl.lg.req($$_dependencias);
    if(meAgregue==false && dependencias_.length==0){
      cl.lg.req('NO DEPENDO DE NADIE');
      /*cl.lg.req('aqui--------: '+me);
      cl.lg.req(callback.toString());*/

      //----wrapper_callback(callback,me);
    }
    //cl.lg.req(dependencias_for_import[0]);
    importScripts($$_dependientes[me]);//--,wrapper_callback)



    //--dependencias_for_import=[];


  }
}

$$_dependencias={};
$$_dependientes={};
function wrapper_callback(callback_in,yo){
  //--alert('en el callback de: yo');
  //--------callback_in();


cl.lg.req('yo: >>>>>: '+ yo);
//--cl.lg.req('yo_calback: >>>>>: '+ callback_in.toString());
callback_in();

  if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]<2){
    cl.lg.req('->__>_>_>->_>_>>_Ya estoy ejecutado: '+yo);
    $$_dependencias[yo][1]=2;//Significa que ya me importé
//---}else if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]==2){
}else if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]>=2){
    $$_dependencias[yo][1]=9;//Significa que ya me recontra importé

  }

  /*------if(($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]!==9 && $$_dependencias[yo][1]>=2) || $$_dependencias.hasOwnProperty(yo)==false){
    //-cl.lg.req('--ejecutando---------------------');
    //-cl.lg.req(callback_in.toString());
      callback_in();
  }

  */

  //---cl.lg.req(callback_in.toString());
   /*if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]==2){
     cl.lg.req($$_dependencias[yo][1]);
   }else{
     cl.lg.req('no existe en $$_dependencias');
     callback_in();
   }*/


//----------callback_in();

   //--}


  //alert('yo: '+me+ ' dependencias: '+dependencias);
  //cl.lg.req($$_dependencias);
  //alert('wrapper - '+me+': '+callback_in.toString());
  //alert('wrapper - '+me+': ');

  if($$_dependencias.hasOwnProperty(yo)){
    cl.lg.req('EXISTO EN DEPENDENCIAS: '+yo);

    var dependiente_macro=$$_dependencias[yo][0];

    cl.lg.req($$_dependencias[yo]);
    for(var k in dependiente_macro){
      var dependiente=dependiente_macro[k];
      dependiente[2][0]++;//|cantidad de dependeicas que falta cargar
      cl.lg.req('==Comprobando la cantidad: '+dependiente[1]+' || '+dependiente[2][0]);
      if(dependiente[1][0]===dependiente[2][0]){
      //--if(dependiente[1][0]<=dependiente[2][0]){
        cl.lg.req('es igual');
        //--dependiente[0](dependiente[3]);//La funcion que debe cargar: el wrapper
        wrapper_callback(dependiente[0],dependiente[3]);//La funcion que debe cargar: el wrapper
        //--break;
        /*for(var i=0;i<dependiente[0].length;i++){
          wrapper_callback(dependiente[0][i],dependiente[3]);//La funcion que debe cargar: el wrapper
        }*/
      }else if(dependiente[1][0]<dependiente[2][0]){
        //--alert('la dependencia ya fue llamada');
      }
    }

    /*cl.lg.req();
    cl.lg.req(dependiente[1]+' , '+dependiente[2]);
    cl.lg.req($$_dependencias['aula_virtual'][1]+' , '+$$_dependencias['aula_virtual'][2]);
    cl.lg.req($$_dependencias);
    cl.lg.req('dependen de mi: '+yo+' - ');
    */

  }
}

//\Funcion para convertir path a version correcta (eliminar los ..)
//Solo sirve para rutas relativas
function fixPath(path){
  //--alert(path);
  var arPath=path.split('/');
  var returnedPath='';
  for(var i=0;i<arPath.length;i++){

    if(arPath[i]=='..'){
      //-arPath[i]='';
      arPath.splice(i,1);
      if(i>0){
        //--arPath[i-1]='';
        arPath.splice(i-1,1);
        i--;
      }
      i--;

    }
  }
  returnedPath=arPath.join('/');
  //-returnedPath='/'+arPath.join('/');

  return returnedPath;
}
function getCS(dom,prop){
  return window.getComputedStyle(dom,null)[prop];
}
function getSelectedRadio(obj,name){
  //cl.lg.req(obj.dom.querySelector('input[name="'+name+'"]'));
  //alert('llego aqui');
  return obj.dom.querySelector('input[name="'+name+'"]:checked');
  /*for(var i=0;i<obj.children.length;i++){
    var actChild=obj.children[i];
  }*/
}
function openWIn(obj,dest){
  dest.emptyChildren();
  if(dest.dom==undefined){
    dest.addChild(obj);
  }else{
    dest.addChild_r(obj);
  }

}

function convertToAbs(obj){
  var objReturned=null;
  var left_=obj.dom.offsetLeft;
  var right_=obj.dom.offsetRight;
  var top_=obj.dom.offsetTop;
  var bottom_=obj.dom.offsetBottom;
  var width=obj.dom.offsetWidth;
  var height=obj.dom.offsetHeight;

  objReturned=$f.instanciar({tag:obj.id});
  return objReturnedM;






}
