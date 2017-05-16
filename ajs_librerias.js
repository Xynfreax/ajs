console.log('>>_>_>_EN AJS_LIBRERIAS-->_->_');
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// function extenderObj(obj){
//   var returned=obj;
//   if(get_type(obj)==0){//objecto
//     returned=Object.create(obj);
//     for(var k in returned){
//       returned[k]=extenderObj(returned[k])
//     }
//   }else if(get_type(obj)==1){//array
//     // returned=obj.slice(0);
//     returned=[];
//     for(let $ii=0;$ii<obj.length;$ii++){
//       returned[$ii]=extenderObj(obj[$ii])//QUE RARO QUE ESTE FUNCIONANDO ASI
//     }
//   }
//
//   return returned;
// }
function extenderObj(obj){
  var returned=obj;
  if(get_type(obj)==0){//objecto
    returned=Object.create(obj);
    for(var k in returned){
      returned[k]=extenderObj(returned[k])
    }
  }else if(get_type(obj)==1){//array
    returned=obj.slice(0);
    /*for(var $ii=0;$ii<obj.length;$ii++){
      // returned[k]=extenderObj(obj[k])//QUE RARO QUE ESTE FUNCIONANDO ASI
    }*/
  }

  return returned;
}
// minext='.min';
window.$$={};

window.$$_dependencias={};
window.$$_dependientes={};

window.depByLevel=[];
window.depOrderFunc={};
window.depObj={};
window.depsExecuted=[];
window.counterExecuted=0;

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
        '[object Null]':[9,'null'],
        '[object AsyncFunction]':[10,'asyncfunction'],
        '[object Set]':[11,'set'],
        '[object Error]':[12,'error'],
        // '[object HTMLUnknownElement]':[5,'html_dom'],

      }
      if(variable!==undefined){
        // console.log(Object.prototype.toString.call(variable));
        // Sirve para comprobar porque da error
        // if(returns[Object.prototype.toString.call(variable)]==undefined){
        //   console.log(Object.prototype.toString.call(variable))
        // }
        return returns[Object.prototype.toString.call(variable)][yn];

        //--para ajs_mainx
        // let asd=returns[Object.prototype.toString.call(variable)]
        // if(asd){
        //   return asd[yn];
        // }else{
        //   return undefined;
        // }

      }else{
        return undefined;
      }

}
function alias(target_obj,target_prop){
  return ['alias',target_obj,target_prop];
}

//|Funcion que ejecuta el callback y los callbacks
function exec_callb_s(callback,callback_s_ar){
  callback();
  for(var i=0;i<callbacks_s_ar.length;i++){
    callbacks_s_ar[i]();
  }
}

//|Definir las pripiedades de un objeto-----------------------------------------------
function define_prop(objeto,prop_name,setter,getter,with_calc){//Todo setter tiene k y v como parametros, y getter tiene k
  var predefined_calc=null;
  //---objeto['s_'+prop_name]=new Set([]);
  // objeto['s_'+prop_name]={};
  var descriptor={};
  descriptor[prop_name]={
    set:function(v){

      // if(with_calc){
      //   //alert('TIENE WITH_CALC');
      //   var temp_returned=eval_v(this,prop_name,v);
      //   //alert('paso');
      //   v=temp_returned[0];
      //   predefined_calc=temp_returned[1];
      //   //--v=with_calc.bind(this)();
      // }
      // if(predefined_calc!==null){
      //
      //   v=predefined_calc.bind(this)();
      //   //alert('valor de v despues de calc: '+v);;
      // }

      setter.bind(this)(prop_name,v);
      // if(prop_name=='width'){
      //   //--cl.lg.req(this.s_width);
      //   //alert('WIDTH: '+v);
      // }
      // for(var k in this['s_'+prop_name]){
      //   //--cl.lg.req(this);
      //   //--cl.lg.req();
      //   //alert('ejecutando funciones SUSCRITAS - tamaño: '+this['s_'+prop_name].size);
      //   this['s_'+prop_name][k]();
      //   //----item_();
      //   //--item_[0][item_[1]]='';
      // }
    },
    get:function(){
      return getter.bind(this)(prop_name);
    }
  }
  Object.defineProperties(objeto,descriptor);
}

//|Importa scripts--------------------------------------------------------------------
function importScripts(ar_scripts,callback,callback2){
  var filesloaded=0;
  function checkLoadedS(){

    name_script=this['src'];
    me=name_script.substring(0,name_script.length-3);
    var first=me.lastIndexOf('/');
    var last=me.indexOf('.',first+1);
    ruta_relativa=me.substring(0,first+1);
    me=me.substring(0,last)+'.js';
    if(depOrderFunc.hasOwnProperty(me)){

      var actDep=depOrderFunc[me];
      if(isDepEmpty(actDep.deps)==true){
        actDep.active=false;
        depsExecuted.push(me);
        counterExecuted++;
        actDep.func()
        //--alert(me);
        for(var k in actDep.callrs){

          var actCallr=actDep.callrs[k];
          var actCallrScript=document.querySelector('script[src^="'+k+'"]');
          if(actCallrScript!==null){
            actCallrScript.onload();
          }else{
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

    }

    if(filesloaded===ar_scripts.length){
    }

  }
  for(var i=0;i<ar_scripts.length;i++){
    importScript(ar_scripts[i],checkLoadedS);
    filesloaded++;
  }



}
datenow=Date.now();
function importScriptNormal(script_url,callback){
  //--var mewname= script_url+'.js?q='+datenow;
  var mewname= script_url+'.js';

  var existeScript=document.querySelector("script[src^='"+script_url+"']");;
  if(existeScript==null){

  }else {

  }


  //




  var mypos=arscripts.indexOf(mewname);
  var existo=document.querySelector("script[src='"+mewname+"']");
  //--if(mypos>-1){
  //---if(existo!==null){
  /*if(arscriptsf[mewname]!==undefined){
    arscripts.push(mewname);

    //--ndeps--;
    //--arscripts.splice(arscripts.length-1, 0, arscripts.splice(mypos, 1)[0]);
    // existo.onload=callback;

    // existo.async=true;
    //--existo.onload();
    //--alert(arscriptsf[mewname])
    $$.require(arscriptsf[mewname].deps,arscriptsf[mewname].call,arscriptsf[mewname].caller);
    //---arscriptsf[mewname]();

    // ---callback();
    // existo.async=false;


  }else{




  }
  */
  arscripts.push(mewname);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = false;
  if(existo!==null){
    script.src=existo.src;
  }else{
    script.src = mewname;
  }

  //alert(script_url+'.js?q='+Date.now());
  script.onload = callback;
  document.head.appendChild(script);
  if(etapa>1){
    // callback();
  }



}
etapa=1;
arscripts=[];
arscripts2=[];
function reloadScripts(){
  etapa=2;
  var head= document.getElementsByTagName('head')[0];
  arscripts=arscripts.reverse();
  for (var i = 0; i < arscripts.length; i++) {
    if(arscripts2.indexOf(arscripts[i])==-1){
      // var myhead=document.head;
        var script= document.createElement('script');
        // script.type= 'text/javascript';
        script.async=false;
        script.src= arscripts[i];

        arscripts2.push(arscripts[i]);
        if(arscripts[i].includes('http://localhost:3000/vista/formBaseR.js')){
          // alert('http://localhost:3000/vista/formBaseR.js');
        }
        head.appendChild(script);
    }else{
      // alert('msg');
    }
  }
}
function importScriptsNormal(scriptfolder,arscriptsurl,callback1){
  var lenghtScripts=arscriptsurl.length;
  var numScriptsLoaded=0;

  var callbackScript=function() {
    ndeps--;
    //---console.log(ndeps);
    if(ndeps==0){

      //aqui recorremos el array y re-cargamos los scrips en forma ordenada del ultimo al primero
      //----console.log('FINALIZADO');
      reloadScripts();
      //----console.log('en calback');
      //--callback();
    }
    //---console.log(arscripts);
    // alert(fixPath(scriptfolder+arscriptsurl));
    //-+ alert(numScriptsLoaded);
    if(numScriptsLoaded==lenghtScripts){
      // alert(fixPath(scriptfolder+arscriptsurl));
      // alert(arscriptsurl+'--'+numScriptsLoaded);
      //-->callback1();
    }
  }

  for(var i=0;i<arscriptsurl.length;i++){

    numScriptsLoaded++;
    // importScriptNormal(arscriptsurl,callbackScript);
    importScriptNormal(fixPath(scriptfolder+arscriptsurl[i]),callbackScript)
  }
}
function importScript(script_url,checkloaded){
  var path_temp=script_url;//+'.js';
    if($$_dependencias[script_url]!==undefined){
      $$_dependencias[script_url][1]=1;
    }
      //--var existescript=document.querySelector("script[src^='"+script_url+"']");
      var existescript=document.querySelector("script[src='"+script_url+'?q='+datenow+"']");
      if(existescript==null){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.addEventListener('error',function(e){alert('El script '+e.target.src+' no existe');},false);
        //--script.src = script_url+'?q='+Date.now();
        script.src = script_url+'?q='+datenow;
        script.onload = checkloaded;
        document.head.appendChild(script);
        return script;
      }else{
        alert('msg');
        return existescript;
      }
}

function get_name_dependencias(ar){
  var returned_ar=[];
  for (var i=0;i<ar.length;i++){
    var me=ar[i];
    var first=me.lastIndexOf('/');
    var last=me.length;
    me=me.substring(first+1,last);
    returned_ar.push(me);
  }
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
function wrapper_callback(callback_in,yo){

  callback_in();

  if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]<2){
    cl.lg.req('->__>_>_>->_>_>>_Ya estoy ejecutado: '+yo);
    $$_dependencias[yo][1]=2;//Significa que ya me importé

}else if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]>=2){
    $$_dependencias[yo][1]=9;//Significa que ya me recontra importé

  }


  if($$_dependencias.hasOwnProperty(yo)){

    var dependiente_macro=$$_dependencias[yo][0];


    for(var k in dependiente_macro){
      var dependiente=dependiente_macro[k];
      dependiente[2][0]++;//|cantidad de dependeicas que falta cargar

      if(dependiente[1][0]===dependiente[2][0]){

        wrapper_callback(dependiente[0],dependiente[3]);//La funcion que debe cargar: el wrapper

      }else if(dependiente[1][0]<dependiente[2][0]){

      }
    }
  }
}

//\Funcion para convertir path a version correcta (eliminar los ..)
//Solo sirve para rutas relativas
function getJustUrl(url) {
  var me=url;
  var last=me.lastIndexOf('.');
  me=me.substring(0,last+1);
  return me;
}

function fixPath(path){

  var arPath=path.split('/');
  var returnedPath='';
  for(var i=0;i<arPath.length;i++){

    if(arPath[i]=='..'){

      arPath.splice(i,1);
      if(i>0){

        arPath.splice(i-1,1);
        i--;
      }
      i--;
    }
  }
  returnedPath=arPath.join('/');
  return returnedPath;
}
function getCS(dom,prop){
  return window.getComputedStyle(dom,null)[prop];
}
function getSelectedRadio(obj,name){

  return obj.dom.querySelector('input[name="'+name+'"]:checked');

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

ndeps=0;
arscriptsf={};
arResolves={};
arscripts=[];
arPromises=[];
arRequires=[];
nResolved=0;
function toImportScript(src,srccaller,randomClass){
  if(arPromises[src]!==undefined){
    // if(get_type(arResolves[src])!==4){
    //   arPromises[src].resolve();
    // }
  }else{
    arPromises[src]=new Promise(function(resolve,reject){
      // if(src=='http://localhost:3000/vista/formBaseR.js'){
      //   alert('llamando a formBaseR: ');
      // }
      var type_resource='script'
      var existo=null;
      if(src.includes('.s.')){
        type_resource='css'
      }

      /*--porsiaca
      if(type_resource!=='css'){
        existo=document.querySelector("script[src='"+src+"']");
      }else{
        existo=document.querySelector("link[href='"+src+"']");
      }

      //-----var existo2=arscripts.indexOf(src);
      //--alert(src+'-'+existo);
      if(existo!==null){//si existo
        // if(existo2>-1){//si existo
        //   resolve();
        // }
      }else{

        //--alert(arResolves[src]);
      }

      */
      if(type_resource!=='css'){
        if(!document.querySelector("script[src='"+src+"']")){
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = false;
          // script.className=randomClass;//ajscripts_
          // script.className=Math.random().toString().replace('.','');;//ajscripts_
          script.className=randomClass+'_child '+Math.random().toString().replace('.','');;
          script.src = src;
          script.defer=true;

          script.onload = function() {
            // ----arscriptsresolved.push(src);
            //---arscripts.push(src);
          };
          //--document.head.appendChild(script);
          //---let headScript = document.querySelector('.ajscripts');

          // let headScript = document.querySelector("script[src='"+srccaller+"']");
          // document.head.insertBefore(script, headScript);

          let tmm=document.getElementsByClassName(randomClass+'_child');
         let headScript = null;//tmm[tmm.length-1];
         if(tmm!==null && tmm.length>0){
           headScript = tmm[tmm.length-1];
            insertAfter(script,headScript);
          }else{
            headScript = document.getElementsByClassName(randomClass)[0];
            document.head.insertBefore(script, headScript);
          }

          arResolves[src]=resolve;
        }else{
          // arResolves[src](src)
          if(arRequires[src]!==undefined){
            // console.log(Object.prototype.toString.call(arRequires[src]));
            //---$$.require.apply($$,arRequires[src]);

          }
          nResolved++;
          resolve(src);
        }

      }else{
        // alert(document.querySelector("link[href='"+src.replace('.js','.css')+"']"));
        if(!document.querySelector("link[href='"+src.replace(/*'.s'+*/minext+'.js','.css')+"']")){
          // alert('here');
          let link = document.createElement('link');
          link.type = 'text/css';
          link.rel = 'stylesheet';

          link.onload = function(){nResolved++;resolve()};
          // link.className=randomClass;
          link.className=randomClass+'_schild '+Math.random().toString().replace('.','');;
 // alert(minext);
          link.href = src.replace(/*'.s'+*/minext+'.js','.css');

          // --document.head.appendChild(link);
          // let headScript = document.querySelector('script');
          // alert(document.getElementsByClassName(randomClass)[0]);
          // let headScript = document.querySelector('.'+randomClass);//.ajlinks
          console.log(link.href);
          console.log(randomClass);
            let tmm=document.getElementsByClassName(randomClass+'_schild');
           let headScript = null;//tmm[tmm.length-1];
           if(tmm!==null && tmm.length>0){
            //  alert('sddf')
              headScript = tmm[tmm.length-1];
             insertAfter(link,headScript);
           }else{
             headScript = document.getElementsByClassName(randomClass)[0];
             document.head.insertBefore(link, headScript);
           }


          //---let headScript = document.querySelector("link[href='"+srccaller.replace('.js','.css')+"']");
          // headScript.parentNode.insertBefore(link, headScript);



          arResolves[src]=resolve;
          // resolve(src);
          //--document.body.insertBefore(link, headScript);
        }else{
          // arResolves[src](src)
          if(arRequires[src]!==undefined){
            //---$$.require.apply($$,arRequires[src]);

          }
          nResolved++;
          resolve(src);


        }


      }


      //----arResolves[src]=resolve;
      //--console.log(arResolves[src]);

    });


  }
  return arPromises[src];

}
$el={};
$$={
  require:async function(dependencias_,callback_,callerscriptsrc,execlater) {
    var dependencias=[];
    var callback=function() {};
    if(arguments.length==1){
      if(get_type(arguments[0])==4){//|es funcion
        callback=arguments[0];
      }else{
        alert('No pasó una funcion como parametro, y ademas solo hay un parámetro');
        callback=null;
      }

    }else if(arguments.length>=2){//|Por ahora suponemos que es un array y una funcion
      dependencias=arguments[0];
      callback=arguments[1];
    }


    //----
    var actscsrc=callerscriptsrc;
    // var randomClass='';
    if(actscsrc==undefined){
      actscsrc=(document.currentScript!==null?document.currentScript.src:undefined);
    }
    if(actscsrc==undefined){
      alert('No se puede referenciar al script especificado. ( funcion $$.require() )');
    }else{
      //-------------------------
      var caller=null;
      var randomClass='';
      //let thescript = document.querySelector("script[src='"+actscsrc+"']");
      if(Object.keys(arPromises).length==0){
        caller=document.currentScript;
        randomClass=Math.random().toString().replace('.','');
        // alert('antes: '+randomClass);

      }else{
        let tempscript=document.querySelector("script[src='"+actscsrc+"']");
        if(tempscript!==null){

          randomClass=tempscript.className;
          // alert('despues: '+tempscript.className);
        }else{
          //alert('en el else');
        }
      }
      //-------------------------


      callback.scriptsrc=actscsrc;
      // arRequires[actscsrc]=;
      // arRequires[actscsrc].=this;
      arRequires[actscsrc]=arguments;
      /*try{*/
        var tempProm=[];
        /*
        for (var i = 0; i < dependencias.length; i++) {
          // toImportScript(dependencias[i]);
          //--tempProm.push( toImportScript(fixPath(getUrlFolder(actscsrc).folder+dependencias[i]+'.js')) );
          await toImportScript(fixPath(getUrlFolder(actscsrc).folder+dependencias[i]+'.js'));
        }
        */

        // fixPath(getUrlFolder(actscsrc).folder+dependencias[i]+'.js')
        //Promise.all(dependencias.map(toImportScript(src))).then(function(){

          let reqs=dependencias.map(async function(x) {
            var mysrc=fixPath(getUrlFolder(actscsrc).folder+x+minext+'.js');
            await toImportScript(mysrc,actscsrc,randomClass);
          })

          await Promise.all(reqs);

          // if(actscsrc=='http://localhost:3000/vista/formBaseR.js'){
          // if(actscsrc=='http://localhost:3000/vista/login.js'){
          //   alert('se ersolviendo todas las dependencias de login: '+dependencias);
          // }

          console.log('antes de callback');
          if(execlater===true){
            let nameScript=getNameFromUrl(fixPath(getUrlFolder(actscsrc).folder),2);
            let nameScript2=getNameFromUrl(getUrlFolder(actscsrc).script);
            $el[nameScript+'_'+nameScript2]=callback.bind(callback);
          }else{
            callback.bind(callback)();
          }


          if(get_type(arResolves[actscsrc])!==4){
            // if(arResolves[actscsrc]==undefined){
            //   arResolves[actscsrc]==callback.bind(callback);
            // }
            console.log('arResolves no es funcion: '+arResolves[actscsrc]) ;
            // arResolves={};
            // arPromises={};
            // nResolved=0;
          }else{

            nResolved++;
            arResolves[actscsrc](actscsrc);
            console.log('-->>RESOLVES: ',Object.keys(arResolves).length);
            console.log('-->>PROMISES: ',Object.keys(arPromises).length);
            console.log('-->>nRESOLVED: ',nResolved);
            if(Object.keys(arPromises).length==nResolved /* && nResolved==Object.keys(arResolves).length*/){
              arResolves={};
              arPromises={};
              nResolved=0;
            }
          }




      /*}catch(e){
        alert(e);
      }*/



        // if(ndeps==0){
        //   console.log('FINALIZADO');
        //   alert('sdfsdf');
        //   console.log('en calback');
        //   //--callback();
        // }
    }

  }
  ,__require:function(dependencias_,callback_,callerscriptsrc) {

    var dependencias=[];
    var callback=function() {};
    if(arguments.length==1){
      if(get_type(arguments[0])==4){//|es funcion
        callback=arguments[0];
      }else{
        alert('No pasó una funcion como parametro, y ademas solo hay un parámetro');
        callback=null;
      }

    }else if(arguments.length>=2){//|Por ahora suponemos que es un array y una funcion
      dependencias=arguments[0];
      callback=arguments[1];
    }
    /*
    var dependencias=[];
    var callback=function() {};
    if(get_type(dependencias_)==1){
      dependencias=dependencias_;
    }
    if(callback_!==undefined && get_type(callback_)==4){
      callback=callback_;
    }

    */
    if(etapa==1){
      if(arscripts.length==0){
        arscripts.push(document.currentScript.src);

      }

      var actscsrc=callerscriptsrc;
      if(actscsrc==undefined){
        actscsrc=document.currentScript.src;
      }
      if(actscsrc==undefined){
        alert('No se puede referenciar al script especificado. ( funcion $$.require() )');
      }else{
        var src_=actscsrc;
        arscriptsf[actscsrc]={deps:dependencias_,call:callback_,caller:callerscriptsrc};
        callback.scriptsrc=actscsrc;
          //---alert(fixPath(getUrlFolder(actscsrc).folder+dependencias[i]));
          if(dependencias.length>0){
            // for(var i=dependencias.length;i>-1;i++){
            //   actpos=
            // }
            ndeps+=dependencias.length;
          }
          importScriptsNormal(getUrlFolder(actscsrc).folder,dependencias,callback)
          // if(ndeps==0){
          //   console.log('FINALIZADO');
          //   alert('sdfsdf');
          //   console.log('en calback');
          //   //--callback();
          // }
      }

    }else if(etapa==2){
      //console.log('heress');
      //console.log(callback);

      callback();
    }
  }
  ,_require:function(dependencias_0,callback0,level,mycurrenscript){//|dependencias_, callback
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

    var actLevel=0;
    if(level==undefined){
      actLevel=0;
    }else{
      actLevel=level;
    }
    if(depByLevel[actLevel]==undefined){
      depByLevel.push([]);
    }
    depByLevel[actLevel].push(callback);


    var name_script='';
    var ruta_relativa='';
    var me='';

    //----->name_script=document.currentScript['src'];
    //OJO: USAR SOLO PARA CASOS PUNTUALES, donde solo se carge un solo script, y en un especificado tiempo.
    if(mycurrenscript!==undefined){
      //--->name_script=mycurrenscript.src;
      name_script=mycurrenscript;
      alert(name_script);
    }else{
      if(document.currentScript==null){
        alert('EL currentScript ES NULL');
        alert(globalPath);//----NUNCA LLEGAR A ESTA PARglobalPath

      }else{

        name_script=document.currentScript['src'];
        callback.scriptsrc=document.currentScript['src'];
        //--callback.scriptsrc='algooogogo';
        // alert('aasndfonasdof')
      }

    }

    //---me=name_script.substring(0,name_script.length-3);
    me=name_script
    var first=me.lastIndexOf('/');
    var last=me.indexOf('.',first+1);//deberia ser lastIndexOf
    ruta_relativa=me.substring(0,first+1);
    me=me.substring(first+1,last);
    me=fixPath(ruta_relativa+me+'.js');


var actOrder=0;
var actDepObj={};
if(Object.keys(depObj).length==0){

  depObj[me]={};
  depObj[me].func=callback;
  depObj[me].deps={};
  actDepObj=depObj[me];
}else{

}

if(Object.keys(depOrderFunc).length==0){

  actOrder=0;
  depOrderFunc[me]={};
  depOrderFunc[me].order=0;//---actLevel;
  depOrderFunc[me].func=callback;
  depOrderFunc[me].deps={};
  depOrderFunc[me].active=true;

}else{

  if(depOrderFunc[me]!==undefined){
    actOrder=depOrderFunc[me].order;
    depOrderFunc[me].func=callback;
    depOrderFunc[me].deps={};
    depOrderFunc[me].active=true;

  }
}


    var dependencias_for_import=clonarDependenciasConRuta(dependencias_,ruta_relativa);

    for(var a=0;a<dependencias_for_import.length;a++){
      var actDepName=dependencias_for_import[a];
      if(depOrderFunc[actDepName]==undefined){
        depOrderFunc[actDepName]={};
        depOrderFunc[actDepName].order=actOrder+1;
        depOrderFunc[actDepName].callrs={};
        depOrderFunc[actDepName].callrs[me]=depOrderFunc[me]

        depOrderFunc[me].deps[actDepName]=depOrderFunc[actDepName];
      }else{
        var newOrder=actOrder+1;
        if(actDepName=='file:///D:/dev/ERPUniversidad/cliente/vista/erpjswindow.js'){

        }
          depOrderFunc[actDepName].callrs[me]=depOrderFunc[me];
          depOrderFunc[me].deps[actDepName]=depOrderFunc[actDepName];
      }
    }

    var meAgregue=false;
    if(dependencias_.length>0){
      var contador1=[0];
      var contador2=[dependencias_.length];
      for(var i=0;i<dependencias_.length;i++){

        var path_=fixPath(ruta_relativa+dependencias_[i]+'.js');

        if($$_dependencias.hasOwnProperty(path_)){

          if($$_dependencias[path_][1]==1 || $$_dependencias[path_][1]==0){

            $$_dependencias[path_][0][me]=[callback, contador2, contador1, me, 0];//0 significa que aun no se ha importado
            meAgregue=true;
          }else{

          }
          dependencias_for_import.splice(i,1);
          dependencias_.splice(i,1);
          i--;
        }else{

          $$_dependencias[path_]=[{},0];
          contador2[0]=dependencias_.length;//-IMPORTANTE: aQUI ACTUALIZAMOS a contador2, porque sino... estariamos ref
          $$_dependencias[path_][0][me]=[callback, contador2, contador1, me, 0];//0 significa que aun no se ha importado
        }
      }
    }
    $$_dependientes[me]=dependencias_for_import;

    if(meAgregue==false && dependencias_.length==0){

    }
    importScripts($$_dependientes[me]);//--,wrapper_callback)

  }
}
function getUrlFolder(name_script){
  var me=name_script
  var first=me.lastIndexOf('/');
  var last=me.indexOf('.',first+1);//deberia ser lastIndexOf
  var ruta_relativa=me.substring(0,first+1);
  me=me.substring(first+1,last);
  // me=fixPath(ruta_relativa+me+'.js');
  return {folder:fixPath(ruta_relativa),script:fixPath(me),folderScript:fixPath(ruta_relativa+me+'.js')};
}
function bindear(objeto,nomPropiedad,newWidget){
// alert(nomPropiedad+': '+objeto[nomPropiedad]+'-objeto: '+JSON.stringify(objeto));
  //--if(objeto[nomPropiedad]!==undefined){

    var actObj=newWidget;

    while(actObj!==undefined){
      if(actObj.id=='erp-jsselect'){
        // alert(nomPropiedad+': '+objeto[nomPropiedad]+'-objeto: '+JSON.stringify(objeto));
        newWidget.events=[
          ['change',function(e){
            // alert(JSON.stringify(objeto));
            objeto[nomPropiedad]=this.jsvalue;
          },false]
        ];
        if(objeto[nomPropiedad]!==undefined){
          /*alert(nomPropiedad+': '+objeto[nomPropiedad]+'-objeto: '+JSON.stringify(objeto));*/
          //alert(JSON.stringify(objeto));
          newWidget.selectValue(objeto[nomPropiedad]);
        }
        actObj=undefined;
        break;
      }else if(actObj.id=='jsinput'){
        //alert(nomPropiedad+': '+objeto[nomPropiedad]+'-objeto: '+JSON.stringify(objeto));
        newWidget.events=[
          ['change',function(e){
            objeto[nomPropiedad]=this.value;
          },false]
        ];
        if(objeto[nomPropiedad]!==undefined){
          /*alert(nomPropiedad+': '+objeto[nomPropiedad]+'-objeto: '+JSON.stringify(objeto));*/
          //alert(JSON.stringify(objeto));
          newWidget.value=objeto[nomPropiedad];
        }
        actObj=undefined;
        break;
      }else if(actObj.id=='jsinputcheck'){
        // alert(nomPropiedad+': '+objeto[nomPropiedad]+'-objeto: '+JSON.stringify(objeto));
        newWidget.events=[
          ['change',function(e){
            // alert(objeto[nomPropiedad]);
            objeto[nomPropiedad]=this.checked;
          },false]
        ];
        if(objeto[nomPropiedad]!==undefined){
          /*alert(nomPropiedad+': '+objeto[nomPropiedad]+'-objeto: '+JSON.stringify(objeto));*/
          //alert(JSON.stringify(objeto));
          newWidget.children[1].value=nomPropiedad;
          newWidget.children[1].dom.checked=objeto[nomPropiedad];
        }
        actObj=undefined;
        break;
      }
      actObj=actObj.ancestro;
    }
  //--}


}
function getFechaSlash (fecha) {
  var returned='';
  var dia=fecha.substring(8,10);
  var mes=fecha.substring(5,7);
  var anio=fecha.substring(0,4);
  returned=dia+'/'+mes+'/'+anio;
  return returned;
}
function getFecha(fecha) {
  if(fecha!==undefined){
    var returned={}
    var meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var dia=fecha.substring(8,10);
    var mes=fecha.substring(5,7);
    var anio=fecha.substring(0,4);

    var lmes=meses[parseInt(mes)-1]
    returned.slashes=dia+'/'+mes+'/'+anio;
    returned.dia=dia;
    returned.mes=mes;
    returned.anio=anio;
    returned.letras=dia+' de ' +lmes+' de '+anio;
    returned.lmes=lmes;
    return returned;
  }else{
    return ''
  }

}

function getNameFromUrl(url,ind_){
  var arUrl=url.split('/');
  let ind=1;
  if(ind_!==undefined){
    ind=ind_
  }
  return arUrl[arUrl.length-ind];
}
function mixObj(objA,objB){

}
function triggerEvent (aobj,eventname) {
  if(aobj.dom){
    let event = new Event(eventname,{ bubbles: true });
    aobj.dom.dispatchEvent(event);
  }
}
function dd_mm_yyyy(fec) {
  //-url: http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
  var returned='';
  // console.log(fec);
  if(get_type(fec)==8 && fec!=='0000-00-00'){//8=date
    returned=fec.toISOString().slice(0,10).replace(/-/g,"-");
  }
  return returned;
}
async function ajalert() {
  // if($_ && $ && $.ajalert){
  if($_ && $ ){
    return await $_.ajalert.apply($_,arguments)
  }
}
function parseValue (val) {
  if(val==='null'){
    return null;
  }else{
    return val;
  }
}

async function imagesLoaded (el) {
  // let th=this;
  let imgs=el.dom.querySelectorAll('img');
  // alert(imgs.length)
  let promises=[];
  let prob;
  for (let i = 0; i < imgs.length; i++) {
    let actimg=imgs[i];
    let newResolve=null;
    let newProm=new Promise(function(resolve) {
      newResolve=resolve
    });
    promises.push(newProm);
    // alert(actimg.onload);
    actimg.onload=function() {
      // alert('loaded');
      console.log('LA IMAGEN SE HA CARGADO EN LOAD');
      prob='enload';
      newResolve();
    }
    if(actimg.complete==true && actimg.naturalWidth>0){
      console.log('LA IMAGEN YA ESTABA CARGADA');
      prob='yaestaba+src='+actimg.naturalWidth+'----'+actimg.src;
      newResolve();
    }

    // alert(actimg.onload);
    actimg.onerror=function(e) {
      console.log('LA IMAGEN NO SE CARGO POR ERROR');
      prob='nocargo';
      // console.log(e);
      // console.log(JSON.stringify(e));
      // console.log('FIN ERROR');
      // alert('errors');
      newResolve();
    }
  }
  // alert(imgs[0]);
  await Promise.all(promises);
  // alert(prob);
  return true;
}
function in_model(model,field,val) {
  let rt=null;
  for (let i = 0; i < model.length; i++) {
    let actItem=model[i];
    if(actItem[field]==val){
      // alert('esta');
      rt=actItem;
      break;
    }
  }
  return rt;
}
function getComputedTranslateY(obj,xy)
{
    if(!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
}


function convertToRoman(num) {
  var romanMatrix = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  if (num === 0) {
    return '';
  }
  for (var i = 0; i < romanMatrix.length; i++) {
    if (num >= romanMatrix[i][0]) {
      return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
    }
  }
}
function encjstourl(jsobj) {
  return encodeURIComponent(JSON.stringify(jsobj))
}
function decjstourl(jsobj) {
  return JSON.parse(decodeURIComponent(jsobj))
}
console.log('>>_>_>_fin EN AJS_LIBRERIAS-->_->_');
