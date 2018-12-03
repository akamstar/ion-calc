import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public expVal:string;
  public newOp:boolean;

  //public resVal:string;
  constructor(public navCtrl: NavController) {
    this.expVal="";
    this.newOp=false;
    //this.resVal="";
  }

  public setExp(exp:string){
    this.expVal=exp;
  }
  public concatExp(exp){
    var arr=[0,1,2,3,4,5,6,7,8,9];
    if(exp.toString().length>0){
      if(this.expVal==''){
        
        if(arr.indexOf(exp)!=-1){
          this.expVal+=exp;
        }
        
      }else{
        if(this.newOp){
          
          if(arr.indexOf(exp)==-1){
            this.expVal+=exp;
          }else{
            this.clrExp();
            this.expVal+=exp;
          }
          this.newOp=false;
        }else{
          this.expVal+=exp;
        }
      }
    }
    
  }
  public clrExp(){
    this.expVal='';
    
  }

  public delExp(){
    this.expVal=this.expVal.toString().slice(0,-1);
  }

  public puissance(initial:string,puss:number=4){
    if(initial!=''){
      this.setExp(Math.pow(parseFloat(initial),puss)+'');
    }
    return this.expVal;
  }

  public carre(){
    this.puissance(this.expVal,2);
  }
  getNum(num:number):number{

    return num;
  }

  public calculer(){
    //this.expVal.substr(-1);
    let resu=this.evaluer(this.expVal)+'';
    if(resu!=undefined){
      this.setExp(resu);
      this.newOp=true;
    }
  }
  //

  public recineCarre(){
    if(this.expVal!=''){
      let val:number=parseFloat(this.evaluer(this.expVal));
      this.setExp(Math.sqrt(val)+'');
    }
  }

  //eval native mais modifiE
  private evaluer(exp:any):string{
    var l:number=0;
    var initial:string;
    var reste:string;
    initial='0';
    reste='0';

    exp=exp.toString().replace("x","*");

    l=exp.indexOf('^');
    if(l>-1){
      //ka suite ici
      if(l>=exp.length-1){
        this.delExp();

      }else{
    
      
      initial=exp.substring(0,l);
      l++;
      reste=exp.substring(l,exp.length);
      }

      exp=this.puissance(eval(initial),parseFloat(eval(reste)));
    }

    
    
    //console.log(initial+' =>'+reste);
    
    return eval(exp);
    //return '0';
  }

  private bindec(val:any,type:string){
    
    if(type=='bin'){
      return parseInt(val,10).toString(2);
    }else if(type=='dec'){
      return parseInt(val,2).toString(10);
    }
    return 0;

    }
  
  public toDec(){
    this.setExp(this.evaluer(this.bindec(this.expVal,'dec')));
  }
  public toBin(){
    this.setExp(this.evaluer(this.bindec(this.expVal,'bin')));
  }

  public sohcah(type:string){
    switch(type){
      case 'sin': this.setExp(Math.sin(parseFloat(this.evaluer(this.expVal)))+'');
      break;
      case 'cos':this.setExp(Math.cos(parseFloat(this.evaluer(this.expVal)))+'');
      break;
      case 'tan': this.setExp(Math.tan(parseFloat(this.evaluer(this.expVal)))+'');
      break;
    }
  }
}
