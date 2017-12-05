import { Component } from '@angular/core';
import { NavController ,ModalController,Events} from 'ionic-angular';
import { PagePushedPage } from '../page-pushed/page-pushed';
import { PresentPage}from '../present/present'
import {Push2Page} from '../push2/push2'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   // 用于接收回调值的参数
   param 
   push2param
   callbackData 

   // 用于pop 回调的 block
   myCallbackFunction =(params) =>{
     return new Promise((resolve, reject) => {
       if(typeof(params)!='undefined'){
          resolve('ok');
          
          console.log('回调1: '+ params);
          // 1.赋值给全局变量
          this.param = params
          // 2. 传值给func
          this.printClick(params)
      }else{
          reject(Error('error'))
      }
  
   });
 }
 
  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private events: Events) {

  }
  // push 方法 1             
  pushClick(){

   this.navCtrl.push(PagePushedPage, {
    callback: this.myCallbackFunction
    })

  }
  // push 方法 2
  push2Click(){
     this.events.subscribe('custom-user-events', (paramsVar) => {

            console.log('回调push2: '+ paramsVar);

            this.push2param = paramsVar
            this.events.unsubscribe('custom-user-events'); 
        })

        this.navCtrl.push(Push2Page); 

   }
  // modal 
  presentClick(){

    let presentPageModal = this.modalCtrl.create(PresentPage)
    presentPageModal.onDidDismiss(data => {
      console.log('回调2: '+ data);
      
      // 取出回调的值
      this.callbackData = data

    })
    presentPageModal.present()
     
 }
  // 取出回调的值
   printClick(param){

   console.log('把回调的值取出来:'+this.param)
   console.log('把push2的值取出来:'+this.push2param)
  }
}
