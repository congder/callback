import { Component } from '@angular/core';
import { NavController ,ModalController} from 'ionic-angular';
import { PagePushedPage } from '../page-pushed/page-pushed';
import { PresentPage}from '../present/present'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   // 用于pop 回调的 block
  
   param 
   myCallbackFunction =(params) =>{
     return new Promise((resolve, reject) => {
       
       
      if(typeof(params)!='undefined'){
          resolve('ok');

          this.param = params
          console.log('回调1: '+ params);
          this.printClick(params)
      }else{

          reject(Error('error'))
      }
            
   });
 }
  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController) {

  }
  pushClick(){

   this.navCtrl.push(PagePushedPage, {
    callback: this.myCallbackFunction
})

  }

  printClick(param){

   console.log('把回调的值取出来:'+this.param)

  }
  presentClick(){

    let presentPageModal = this.modalCtrl.create(PresentPage)
    presentPageModal.onDidDismiss(data => {
      console.log('回调2: '+ data);

    })
    presentPageModal.present()
     
 }

}
