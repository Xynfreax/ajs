//Se debe clonar los eventos;
//se debe clonar(heredar el load_r), es el evento cuando se termina de renderizar;

$_={};
$f={
  instanciar:function(jsn,parent_) {

    let nobj=ajelement;
    if($c.hasOwnProperty(jsn.tag)){
       nobj=$c[jsn.tag];
    }
    let newid=crear_id(jsn);
    // console.log($c.ajinput);
    // console.log(nobj);
    // console.log(parent_);
    let nuevObj=new nobj([jsn,{toload:false,id:newid}],parent_);
    $[newid]=nuevObj;
    return nuevObj;
  }
}
$={};

function crear_id(jsn){
  let nuev_id=jsn.id
  let tag=jsn.tag;
  if(nuev_id==undefined){
    nuev_id=tag+Math.random().toString().replace('.','');
    while($[nuev_id]!==undefined){
      // alert('msg');
      nuev_id=tag+Math.random().toString().replace('.','');
    }
  }else{
    if($[nuev_id]!==undefined){
      alert('El id designado ya existe');
    }
  }
  return nuev_id;
}
function definirAliases(aliases,new_obj){
  if(aliases!==undefined){
    for(let i=0;i<aliases.length;i++){
      let ali=aliases[i];
      define_prop2(new_obj,ali[0],ali[1],ali[2]);

    }

  }
}
function define_prop2(obj,prop,desti_obj,desti_prop){
  Object.defineProperty(obj,prop,{
    set:function(v){
      desti_obj.bind(this)()[desti_prop]=v;
    },
    get:function(){
      return desti_obj.bind(this)()[desti_prop];
    }
    ,configurable:true
  });
}
// function crear_id(tag){
//   // let i=1;
//   let nuev_id=tag+Math.random().toString().replace('.','');
//   // while($.hasOwnProperty(nuev_id)){
//   while($[nuev_id]!==undefined){
//     alert('msg');
//     nuev_id=tag+Math.random().toString().replace('.','');
//   }
//   /*do{
//     nuev_id=tag+i;
//     i++;
//   }while($.hasOwnProperty(nuev_id))///OJO
// // }while($[nuev_id]!==undefined)
//
// */
//   return nuev_id;
// }
$j={}
class ajelement{

    constructor(armodels,parent){
      // console.log(parent);
      // alert(JSON.stringify(armodels));
      this.indice=0;
      this._dom=null;
      this._css=null;
      this._init_ar=[];
      this._load_r_ar=[];
      this.idfs=[];
      this.toload=true;
      this.parent=parent;
      // console.log(this.parent);
      // console.log(parent);
      // console.log(this);
      // console.log(armodels);
      // alert('msg');
      this._children=[];
      this.real_tag=null;

      // alert(JSON.stringify(armodels));
      // if(this.preload();
      Object.assign(this,...armodels.concat([{classN:'domElement'}]));
      if(parent){
        parent.dom.appendChild(this.dom);
      }
      if(this.toload===true){
        this.inits();
        this.load();
      }


    }
    inits(){
      // alert(this._init_ar.length);
      // alert('en inits');
      if(this._init_ar.length>0){
        let tlen=this._init_ar.length;
        for (let i = 0; i < tlen; i++) {
          let actLoad=this._init_ar[i];
          actLoad.bind(this)();
        }
        // this.load_r();
      }
    }
    load(){
      // alert('en loads');
      if(this._load_r_ar.length>0){
        let tlen=this._load_r_ar.length;
        for (let i = 0; i < tlen; i++) {
          let actLoad=this._load_r_ar[i];
          actLoad.bind(this)();
        }
        // this.load_r();
      }
    }
    set preload(v){
      //se ejecuta exactamente cuando se instancia, en el orden en el que se pasa (en el json)
      //se usará preferiblemente para inicializar algunas varialbes con assignprops para que no se comparta el json por referencia
      v.bind(this)();
    }
    set fkperf(v){
      if(window.USUARIO_ACTUAL!==undefined && window.USUARIO_ACTUAL.nickname!=='utix'){
        let tlen=v.length;
        let fkperfil=window.USUARIO_ACTUAL.fk_perfil;
        for (let i = 0; i < tlen; i++) {
          if(fkperfil!==v[i]){
            this.css.display='none';
            break;
          }

        }
      }
    }
    set roles(v){
      // alert('msg');
      // console.log(window);
      // alert('__ '+JSON.stringify(window.USUARIO_ACTUAL));
      if(window.USUARIO_ACTUAL!==undefined && window.USUARIO_ACTUAL.nickname!=='utix'){
        // console.log( localStorage.getItem('USUARIO_ACTUAL') );
        // alert((JSON.stringify(localStorage.getItem('USUARIO_ACTUAL'))));
        // alert(JSON.stringify(window.USUARIO_ACTUAL));
        let tlen=v.length;
        let procesos=window.USUARIO_ACTUAL.processes;
        for (let i = 0; i < tlen; i++) {

          if(procesos[v[i]]===undefined){
            // alert(this.css);
            this.css.display='none';
            break;
            // this.display='none';
          }

        }
      }
    }
    // _load_r_ar=[];
    set id(v){
      // alert(v);
      this._id=v;
      if(this.dom!==undefined && this.dom!==null){
        this.dom.classList.add(v);
        this._dom.id=v;
      }

    }
    get id(){
      return this._id;
    }
    set dom(v){
      Object.assign(this._dom,v);
    }
    get dom(){
      return this._dom;
    }
    set css(v){
      Object.assign(this._css,v);
    }
    get css(){
      return this._css;
    }
    // set parent(v){
    //   Object.assign(this._css,v);
    // }
    // get parent(){
    //   return this._css;
    // }
    set tag(v){
      // alert(v);
      if(this._dom!==undefined && this._dom==null){
        // alert('no entro aqui');
        // console.log(this);

        this._dom=document.createElement(v);
        this._css=this._dom.style;
        this._tag=v;
        this.real_tag=v;
        this._aliases=[];
      }
    }
    get tag(){
      return this._tag;
    }
    set events(v){
      if(v!==undefined){
        let tlen=v.length;
        for (let i = 0; i < tlen; i++) {
          let actEvent=v[i];
          let ftrue=actEvent[2];
          if(ftrue==undefined){
            ftrue=false;
          }
          this.dom.addEventListener(actEvent[0],actEvent[1].bind(this),ftrue)
          // alert('msg');
        }
        this._events=v;
      }
    }
    get events(){
      return this._events;
    }
    set children(v){
      if(v!==undefined){
        let tlen=v.length;
        for (let i = 0; i < tlen; i++) {
          // console.log('----');
          let actChildJson=v[i];
          // console.log(this);
          let newAoChild=$f.instanciar(actChildJson,this);
          this.addChild_r(newAoChild);
          //--new ajelement([actChildJson],this);//falta poner parent
          // obj.indice=ind;
          // this.dom.appendChild(newAoChild.dom);
        }
      }
    }
    get children(){
      return this._children;
    }
    set assignProps(v){
      this._assignProps=v;
      for (let k in v) {
        this[k]=v[k];
      }
    }
    get assignProps(){
      return this._assignProps;
    }
    set load_r(v){
      this._load_r_ar.push(v);
    }
    get load_r(){
      return this._load_r_ar;
    }
    set init(v){
      // alert('ensetinit');
      this._init_ar.push(v);
      // alert(this._init_ar.length);

    }
    get init(){
      return this._init_ar;
    }
    set classN(v){
      let classes=v.split(' ');
      for (let i = 0; i < classes.length; i++) {
        this._dom.classList.add(classes[i]);
      }

    }
    get classN(){
      return this._dom.className;
    }
    // load_r(){
    //
    // }
    fidf(obj){
      // alert('de');
      var nominparent=obj.idf;
      // alert('__ '+gltipopadre);
      //--->var parent_=obj.getParentBy('real_tag','form');
      // alert(obj.getParentBy(gltiposearch,gltipopadre));
      // alert(nominparent);
      var parent_=obj.getParentBy(gltiposearch,gltipopadre);
      if(get_type(parent_)===1){//no se encontro el parent
        // alert('no se encontro el parent');
        parent_[0].idfs.push([nominparent,obj]);
      }else{
        if(parent_){

          //--obj.classList.add('innerIdF_'+nominparent);
          obj.dom.classList.add(nominparent);
          parent_[nominparent]=obj;
          // console.log('HASTA AQYU: '+nominparent);
          // console.log(parent_[nominparent]);
        }else{

          // console.log(obj);
          // alert(obj.idf);
          console.log(parent_);
          alert('Error when using innerIdF: '+obj.idf);
        }
      }
      // console.log(parent_)
      // console.log(obj);
      // alert('PASÉ '+parent_.real_tag);

    }
    addChild_r(obj,ind){
      obj.parent=this;
      if(ind!==undefined){
        this._children.splice(ind,0,obj)
        insertAfter(this._dom.children[ind],obj.dom);
        obj.indice=ind;
      }else{
        this._children.push(obj);
        this._dom.appendChild(obj.dom);
        obj.indice=this._children.length-1;

      }

      if(obj.innerId){
        // alert(obj.innerId);
        this[obj.innerId]=obj;
        // console.log(this);
        // alert(this.myinput);
      }
      if(obj.idf){
        this.fidf(obj);
      }
      if(obj.idfs.length>0){
        console.log(obj.idfs);
        let tlen=obj.idfs.length;
        let idfs=obj.idfs;
        // alert(tlen);
        for (let i = 0; i < tlen; i++) {

          let actidf=idfs[i];
          this.fidf(actidf[1]);
          obj.idfs.splice(i,1);
          i--;
          tlen--;
          // alert(actidf[0]);
          //-[i]
        }
      }
      obj.inits();
      obj.load();

    }
    set customProps(v){
      Object.defineProperties(this,v)
    }
    set aliases(v){
      if(v!==undefined){
        this._aliases=v;
        definirAliases(v,this);
      }
    }
    emptyChildren(){
      for(var i=this._children.length-1;i>-1;i--){
        this._children[i].delete();
      }
    }
    delete(){
      if(this.onDelete!==undefined){
        this.onDelete();
      }

      //|Buscar cada elemento, si no tiene hijos entonces eliminar, caso contrario seguir buscando en sus hijos
      for(var i=this.children.length-1;i>-1;i--){
        var hijoActual=this.children[i];
        hijoActual.delete();

      }

      if(this.dom && this.dom.parentNode!==null){
        // alert('heresd')
        var parent_=this.dom.parentNode;
        parent_.removeChild(this.dom);
      }else{
        // alert('nohers')
      }
      if(this.indice!==undefined){
        this.parent.children.splice(this.indice,1);
      }
      var id_=this.id;
      delete $[id_];
      // alert('after')



    }
    getParentBy(buscarpor,val){
      try{


      // alert('INICIO');
      let retorno={};
      //if(buscarpor=='tag'){
        //|Falta agregar la opcion para que no continue en el bucle si es que no existen mas parents en los cuales buscar
        let actParent=this.parent;

        // console.log(actParent[buscarpor]);
        // console.log((actParent!==undefined?actParent.real_tag:'nodefinido'));
        // alert(val+' - '+(actParent!==undefined?actParent.real_tag:'nodefinido'));
        //--console.log(actParent);
        //console.log(act);
        // console.log(this);
        // alert(this.parent);
        // console.log(this);
        if(actParent!==undefined && actParent[buscarpor]!==val){
          // console.log(actParent);
          if(actParent.getParentBy!==undefined){
            // alert('hrs');
            //--console.log(actParent.getParentBy.toString());
            retorno=actParent.getParentBy(buscarpor,val);
          }else{
            // alert('else');
            retorno=[actParent];//quiere decir que no encontro
            console.log('Error al buscar el padre en getParentBy, no se encontró.');
            // retorno=null;
          }

          // alert('antefinish');
        }else{
          // alert('finish');
          // retorno=[this];
          if(actParent==undefined){
            retorno=[this];
          }else{
            retorno=actParent;
          }

        }
      //}
      // console.log('nomas bucle');
      // console.log('FIN');
      return retorno;
    }
      catch(e){
        console.log(e);
      }

    }
    getCS(prop){
      return window.getComputedStyle(this.dom,null)[prop];
    }


}
$c={

  // const algo='algo';
  set add(v){
    let tempid=v.id//si o si tiene que tener id//crear_id(v);
    let tempancest=v.tag;
    let tempext=ajelement;
    // delete v.id;??

    if($c.hasOwnProperty(tempancest)){
      tempext=$c[tempancest];
    }
    $j[tempid]=v;


    $c[tempid]=class extends tempext{
      constructor(armodels,parent){
        super([v].concat([{id:tempid}]).concat(armodels),parent);
      }
    }
    // console.log($c[tempid]);
    //
    // alert(tempid);
  }
  ,set main(v){
    if($c.hasOwnProperty(v)){
      //debe crear un objeto
      let container=document.getElementById('body_');
      //el objeto a insertar en el contenedor
      // let objeto=new $[v.element]({tag:'div',id:'myid'});
      // let objeto=new $c[v]();
      let objeto=$f.instanciar({tag:v,text:'sdf'});
      container.appendChild(objeto.dom);
      objeto.load();
    }else{
      alert('EL OBJETO DESIGNADO A RENDERIZAR COMO PRINCIPAL NO EXISTE: '+v);
    }
  }
}
Object.defineProperties($c,{
  algo:{set:function(v) {
    // body...
  },get:function() {
    return 'algooo'
  },configurable:true}
})

// alert(_$.prototype.algo);


obj_super_ancestro=ajelement.prototype;
// Object.defineProperties(obj_super_ancestro,descriptor);
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
      // this.json_l[k]=v;
      var v_temp=v;

      if(this.dom){
        this.dom.style[k]=v_temp;
      }
    },
    getter_general:function(k){
      //--return this['_'+k];
      // return this.json_l[k];
      return this.dom.style[k];
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
      // this.json_l[k]=v ;
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
definir_propiedades(dom_propiedades,obj_super_ancestro);
definir_propiedades(css_propiedades,obj_super_ancestro);
// alert('sdsdsd');

class main{
  constructor(v){
    // alert('msg');
    //ubicamos el elemento contenedor principal
    // alert(v.element);/
    let container=document.getElementById(v.container);
    //el objeto a insertar en el contenedor
    // let objeto=new $[v.element]({tag:'div',id:'myid'});
    let objeto=new myowndiv();
    container.appendChild(objeto.dom);
  }
}




// new main({container:'ajmain',element:'myowndiv'});
// $c=_$;
// $c.myowndiv=class extends ajelement{
//   constructor(armodels){
//     let ownjson={tag:'div',id:'myid',dom:{
//       textContent:'probando'
//     },css:{
//       color:'yellow'
//     },events:[
//       ['click',function(e) {
//         alert('click');
//       }]
//     ],children:[
//       {
//         tag:'span'
//         ,id:'myspan'
//         ,dom:{
//           textContent:'micontent'
//         }
//         ,css:{
//           color:'brown'
//         }
//       }
//     ]
//     ,load_r:function() {
//       alert('LOAD_R');
//     }
//
//   }
//     // Object.assign(this,ownjson);
//     super([ownjson].concat(armodels));
//   }
//   // set tag(){
//   //
//   // }
// }
//---------
// $c.add={tag:'div',id:'myowndiv2',dom:{
//       textContent:'probando'
//     },css:{
//       color:'yellow'
//     },events:[
//       ['click',function(e) {
//         alert('click');
//       }]
//     ],children:[
//       {
//         tag:'span'
//         ,id:'myspan'
//         ,dom:{
//           textContent:'micontent'
//         }
//         ,css:{
//           color:'brown'
//         }
//       }
//     ]
//     ,load_r:function() {
//       alert('LOAD_R');
//     }
//
//
//
//   // set tag(){
//   //
//   // }
// }
// $c.add={
//   tag:'button'
//   ,id:'ajbutton'
//   ,type:'button'
//
//   ,customProps:{
//     iconPosition:{set:function(v){
//       this._iconPosition=v;
//       if(v=='left'){
//         // alert('en set');
//         this.myimg.display='inline';
//         this.mytext.display='inline';
//       }
//     },configurable:true}
//   }
//   ,aliases:[
//     ['text',function(){return this.mytext},'textContent']
//     ,['icon',function(){return this.myimg},'src']
//   ]
//   ,children:[
//     {
//       tag:'img'
//       ,innerId:'myimg'
//     }
//     ,{
//       tag:'div'
//       ,innerId:'mytext'
//       ,textContent:'sd'
//     }
//   ]
//
//   // ,text:'mybutston'
// }
// // alert($c.ajbutton);
// Object.assign($j.ajbutton,{
//
//   // ,id:'ajbutton'
//   init:function() {
//     this.myimg.display='none';
//   }
//   ,load_r:function() {
//     // alert(this.dom.offsetHeight);
//     // alert(this.dom.offsetWidth);
//     // alert(this.getCS('width'));
//     //-- this.myimg.height=this.dom.offsetHeight+'px';
//     this.iconPosition='left'
//     // alert('msg');
//   }
//   ,events:[
//     ['click',function(e) {
//       alert('msg');
//       // e.preventDefault();
//       // let allPass=this.getParentBy('real_tag','form').dom.querySelectorAll("input[type='password']");
//       // if(allPass){
//       //   for (var i = 0; i < allPass.length; i++) {
//       //     allPass[i].type='text';
//       //   }
//       // }
//       // alert('antes de submit');
//       // alert(this.dom.offsetHeight);
//     }]
//   ]
// })
// $c.main='ajbutton';
