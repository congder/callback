import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

/**
 * Generated class for the Push2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-push2',
  templateUrl: 'push2.html',
})
export class Push2Page {

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
              private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Push2Page');
  }
  goBack(){
   this.navCtrl.pop().then(() => {

        this.events.publish('custom-user-events', '我是来自push2页面的值');
    });

  }
}
