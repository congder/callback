import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Constants} from '../Constant/constants';
import { Observable } from "rxjs";
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
ipaddress
  constructor(public navCtrl: NavController,
              public http: Http) {

  }
  ionViewDidLoad(){

    this.getUrl();
  }
     get(url: string): Observable<any> {
    return this.http.get(url, {
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      })
    })
      .map(res => res.json());
  }
  getUrl() {    
    this.get("http://192.168.22.22:8889/url.json")
      .subscribe(res => {
        //返回结果，直接是json形式
        this.ipaddress = res.url;
        Constants.url = res.url
        console.log("Constants.url" + Constants.url);
      }, error => {
        console.log("获取url错误" + error);
      });
  }

}
