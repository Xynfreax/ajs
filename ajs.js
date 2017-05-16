/*|
css->devuelve los estilos del sty. rule
css_->devuelve los estilos asignados y tambien heredados
css_c->devuelve el estilo computado
css__->devuelve los estilos asignados menos los heredados

*/
//|Todo el ajs----------------------------------------------------------------------
function ajs(){

  /*function clone_classlist(elm){
    for(var i=0;i<elm.classList.length;i++){

    }
  }*/
  //|Wrapper del cual todos heredan
  var obj_modelo={
    get next(){
      return this.parent.children[this.index];
    },
    get next(){
      return $[this.attr.nextSibling.id];
    },
    _css_:{},
    set css_(v){
      for(var k in v){
        this._css_[k]=v[k];
      }
    },
    get css_(){
      return this._css_;
    }
  }

  //|Estilo en el cual todos ponen sus rules
  var sty=document.createElement('style');
  sty.id='estilo_en_ajs';
  document.head.appendChild(sty);
  delete $.unk;

//|Creamos el objeto----------------------------------------------------
  function crea_obj(obj){

    //|Nuevo Objeto
    var nobj=null;
    //|Ancestro definido
    console.log(obj);
    console.log(obj.tag);
    var anc=$[obj.tag];//|
    alert(anc);
    //|Si existe en $
    if(anc!==undefined){//|Clonamos
      console.log('llegamos a este lugar');
        //--nobj=Object.create(anc);
        nobj = Object.create(anc);//|Hereda
        nobj._css_=Object.create(anc.css_);//Clonamos el estilo para css_ (el estilo asignado)
        nobj.attr=anc.attr.cloneNode(false);
        if(anc.attr.children.length==0 && get_type(anc.attr.textContent)==2){
          nobj.attr.textContent=anc.attr.textContent;
        }



        for(var i=0;i<anc.attr.classList.length;i++){
          //alert(anc.attr.classList[i]);
          nobj.attr.classList.add(anc.attr.classList[i]);
        }
          //nobj.attr.classList.add(anc.attr.classList[i]);
          console.log(anc.attr);
        alert(nobj.attr.textContent);
        alert('clonamos el attr');
        if(obj.evt_d===undefined || obj.evt_d===true){

          var evt_=anc.evt;

          for(var i=0;i<evt_.length;i++){
            var ev=evt_[i];
            nobj.evt[i]=ev;
            nobj.attr.addEventListener(ev[0],ev[1],ev[2]);
          }
        }
        //|Clonamos los hijos
        var hijos = anc.strc;
        for(var i=0;i<hijos.length;i++){

          var nuev_hijo_def = {};

          nuev_hijo_def.id=anc.id+'_'+hijos[i].id;
          nuev_hijo_def.tag=hijos[i].id;
            console.log(anc);
            alert('ANCESTROO');


          var nuev_hijo = crea_obj(nuev_hijo_def);
          console.log('--------------');
          console.log(nuev_hijo);
          console.log('-+-+-+-+-+-+-+-+--+');
          nobj.attr.appendChild(nuev_hijo.attr);
        }

    }else{
      nobj=Object.create(obj_modelo);
      nobj.evt=[];

      nobj._css_={};
      nobj.attr=document.createElement(obj.tag);
    }

    //|Creamos un rule para el objeto nuevo
    sty.sheet.insertRule('.'+obj.id+'{}',sty.sheet.cssRules.length);
    nobj._css=sty.sheet.cssRules[sty.sheet.cssRules.length-1].style;
    //|Definimos la propiedad css y css_c
    Object.defineProperties(nobj,
        {
        css:{
        get:function(){
        return this._css;
      },configurable:true,},
      'css_c':{
        get:function(){
        return window.getComputedStyle(this.attr,null);
      },configurable:true}
    });

    nobj.css_index=sty.sheet.cssRules.length-1;
    var attr_s=obj.attr||{};
    var css_s=obj.css||{};
    var evt_s=obj.evt||{};

    var strc_s=obj.strc||[];


    for(var k1 in attr_s){
      nobj.attr[k1]=attr_s[k1];
    }

    for(var k2 in css_s){
      nobj.css[k2]=css_s[k2];
    }
    //|Le estamos agregando cada estilo;
    nobj.css_=css_s;//|Ojo: debe ser corregido en herencia
    nobj.css__=css_s;


    for(i=0;i<evt_s.length;i++){
      var ev=evt_s[i];
      nobj.attr.addEventListener(ev[0],ev[1],ev[2]);
    }

    nobj.evt=evt_s;
    for(var i=0;i<evt_s.length;i++){
      nobj.evt=evt_s[i];
    }
    nobj.strc=strc_s;

var k=obj.id;
    nobj.attr.classList.add(k);
    nobj.attr.id=obj.id;
    nobj.id=obj.id;


  //-----nobj.attr.appendChild(document.createTextNode('asdf'))




  $[k]=nobj;
//|Recorremos los hijos definidos
  var strc_s=$[k].strc||[];
  var obj=$[k];
  nobj.strc=[];
  append_c(nobj,strc_s);
  return nobj;
  }
//|Recorremos el $
for(var k in $){
  //alert(k);
  var obj=$[k];
  obj.id=k;
  crea_obj(obj);

}

  function append_c(obj,ar){
    for(var i=0;i<ar.length;i++){
      var nam=ar[i];
      //var obj=$[ar[i]];
      console.log('===');
      //--console.log($[ar[i]].attr);
      if(get_type(nam)==0){
        /*for(var k in nam){
          obj.attr.appendChild($[k].attr);
          append_c(nam[k]);
          break;
        }*/
        var nuev_obj=crea_obj(nam);
        console.log(nuev_obj);

        obj.strc.push(nuev_obj);
        obj.attr.appendChild(nuev_obj.attr);
        console.log(obj.attr);
        alert('hijo tipo obj');
      }else{
        //console.log($[nam].attr);
        obj.strc.push($[nam]);
        obj.attr.appendChild($[nam].attr);
      }

    }
  }

  /*for(var k in $){
    var obj=$[k]
    var strc_s=obj.strc||[];
    append_c(strc_s);
    console.log("|||||||");
    console.log(obj);

  }
  */
  console.log('-------');
  console.log($_main);
  //--$_main=$[$_main];


  anterior_html=document.getElementsByTagName('html')[0];
  anterior_head=document.getElementsByTagName('head')[0];
  nuev_dom=$[$_main].attr;
  console.log($[$_main].attr.tagName);
  console.log(sty.sheet.cssRules);
  //--var tempp=sty.sheet;
  if($[$_main].attr.tagName.toLowerCase()=='html'){
    for(var i=0;i<nuev_dom.children.length;i++){
      var act_child=nuev_dom.children[i];
      if(act_child.tagName=='HEAD'){
        //--anterior_head.

        for(var ii=0;ii<act_child.children.length;ii++){
          //alert('asdfsdf');
          var act_child_2=act_child.children[ii];
          anterior_head.appendChild(act_child_2);
        }
      }else if(act_child.tagName=='BODY'){
        var ant_body=document.getElementsByTagName('body')[0];
        console.log(ant_body);
        anterior_html.removeChild(ant_body);
        anterior_html.appendChild(act_child);
      }else{
        anterior_html.appendChild(act_child);
      }
    }
          /*anterior_html.parentNode.removeChild(anterior_html);//|parent === document
          document.appendChild(nuev_dom);
          */
          //console.log(a);
  }else{
    document.appendChild($[$_main].attr);
  }

  /*
  var act_head=document.head;
  for(var i=anterior_head.children.length-1;i>=0;i--){
    act_head.insertBefore(anterior_head.children[i],act_head.firstChild);
  }
  */
  //-sty=document.getElementById('estilo_en_ajs');
  //--sty.sheet=tempp;
  console.log(sty);
  console.log($.div1.css__.backgroundColor);
  /*
  if($[$_main].tagName.toLowerCase()=='head'){
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(anterior_head.cloneNode(true));
    for(var i=anterior_head.children.length-1;i>=0;i--){
      nuev_dom.insertBefore(anterior_head.children[i],nuev_dom.firstChild);
    }
    //----estilo_principal=document.getElementById('principal_style').sheet;//|Esto actualiza el sheet ya que cuando se mueve el dom, el sheet no se mueve
    //|Si llamamos a document.head devuelve nuev_dom, es decir el nuevo head, ya no el anterior
    console.log('=========================================================================');
    console.log(document.head);
  }
  */

  /*
  var a = document.createElement("div");
  //a.order = 50;
  a.setAttribute('order',50);
  alert(a.getAttribute('order'));
  b = a.cloneNode(true);
  //alert(b.order);
  alert(b.getAttribute('order'));
  */

}
