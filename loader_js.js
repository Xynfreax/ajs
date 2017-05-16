//|loader_scripts.js


//--load_dependencies();
/*--function agregar_dependencias(ar){
  function load_dependencies(){

    var depen_load=[];
    for(var i=0;i<ar.length;i++){
      depen_load.push(ar[i]+'.js?q='+Date.now());
    }
    depen_load.forEach(function(src){
      var script = document.createElement('script');
      //script.defer=true;
      script.src = src;
      script.async = false;
      document.head.appendChild(script);
    });

  }
document.addEventListener('DOMContentLoaded', load_dependencies, false);
}--*/
//console.log('en loader');
/*--function agregar_dependencias(ar){
  for(var i=0;i<ar.length;i++){
      var script = document.createElement('script');
      //script.defer=true;
      script.src = ar[i]+'.js?q='+Date.now();
      script.async = false;
      document.head.appendChild(script);
  }
}*/
//para phantom pdf
function agregar_dependencias(ar){
  // var counter=0;
  // var finish=ar.length;
  // var domScripts=[];
  // function agregarEsperar(src){
  //   var script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   //script.defer=true;
  //   script.async = false;
  //   script.src = src+'.js?q='+Date.now();
  //
  //   domScripts.push(script);
  //   //--counter++;
  //   if(ar[counter+1]!==undefined){
  //     ar.shift();
  //     script.onload=function(){agregarEsperar(ar[counter]);}
  //   }
  //   document.head.appendChild(script);
  // }
  // if(ar.length>0){
  //   agregarEsperar(ar[0])
  // }



  for(var i=0;i<ar.length;i++){

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.defer=true;
      script.async = false;
      script.src = ar[i]+minext+'.js?q='+Date.now();

      // domScripts.push(script);

      //---document.head.appendChild(script);
      // alert(document.getElementsByClassName('condep')[0]);
      let headScript = document.getElementsByClassName('condep')[0];
      // alert(headScript);
      //----> document.head.insertBefore(script, headScript.nextSibling);
      document.head.appendChild(script);

  }

}
