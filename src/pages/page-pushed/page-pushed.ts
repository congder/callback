import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PagePushedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-pushed',
  templateUrl: 'page-pushed.html',
})
export class PagePushedPage {
  callback
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.callback = this.navParams.get("callback")
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PagePushedPage');
  }
  
  goBack(){
   let param = '我是来自Push的值'
   this.callback(param).then(()=>{
    this.navCtrl.pop();
   });
  }
}
