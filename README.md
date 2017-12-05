
自从出了上一篇关于ionic 反向传值的笔记以后,有不少小伙伴留言或者私信我说看不太懂,实现不了效果,我反思了一下,觉得可能由于上一篇的内容比较杂乱,而且当时写博客的水平有限,所以导致有点词不达意,没有把关键内容表达清楚,故又准备了这篇笔记和一个干净整洁、一针见血的[demo](https://github.com/congder/callback),希望对于初学者有所帮助,也欢迎大家与我一起探讨关于ionic 开发的技术点.

本文参考链接:https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104
先上效果图:
![result.gif](http://upload-images.jianshu.io/upload_images/2570735-1a9577c743ef0b61.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### demo代码说明:demo是一个空白的tab项目,逻辑如下图:
![callBackLogic.png](http://upload-images.jianshu.io/upload_images/2570735-b2431d1168df9a5a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### pop with params 回调目前有两种方式 :
* ###### 1 .  Promise 构造函数,详见下文  push方法 1
  参考链接: [关于Typescript的Promise承诺](http://blog.csdn.net/u011537073/article/details/61939223)

* ###### 2 .  观察者模式(publish/subscribe) , 详见下文 push方法 2
   参考链接: [JavaScript观察者模式(publish/subscribe)原理与实现方法](http://www.jb51.net/article/109981.htm)

按照惯例,先贴代码
* push方法 1 ->HomePage (这段是回调的关键)
```javascript
// 用于pop 回调的 block
   myCallbackFunction  =(params) => {
     return new Promise((resolve, reject) => {

      if(typeof(params)!='undefined'){
          resolve('ok');
          console.log('回调1: '+ params);
      }else{

          reject(Error('error'))
      }
            
   });
 }

```
```javascript
// 按钮点击事件
pushClick(){

   this.navCtrl.push(PagePushedPage, {
    callback: this.myCallbackFunction
})
```
* push方法 1 ->pushPage
```javascript
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
```


* push方法 2 ->HomePage
```javascript
push2Click(){
     this.events.subscribe('custom-user-events', (paramsVar) => {

            console.log('回调push2: '+ paramsVar);

            this.push2param = paramsVar
            this.events.unsubscribe('custom-user-events'); 
        })

        this.navCtrl.push(Push2Page);
   }
```
* push方法 2 ->push2Page
```javascript
goBack(){
   this.navCtrl.pop().then(() => {
        this.events.publish('custom-user-events', '我是来自push2页面的值');
    });
  }
```
#####  push方法完毕! So easy , too happy!
* present方法-> HomePage
```javascript
presentClick(){

    let presentPageModal = this.modalCtrl.create(PresentPage)
    presentPageModal.onDidDismiss(data => {
      console.log('回调2: '+ data);

    })
    presentPageModal.present()
     
 }
```
* present方法-> presentPage
```javascript
goback(){
    this.viewCtrl.dismiss("我是来自Present的值")
  }
```
#####present方法完毕! over!
```javascript
注意:本人作为一名原iOS开发者,想从第一语言的角度给大家一些建议
* 1. 在原生里面页面的跳转方式有2种  push , present,返回也有2种方式:pop,dismiss,他们是一一对应的,即: push->pop,present->dismiss,这点大家一定要清楚
* 2. push的效果是从右面出来,present的效果是从下面modal出来的
* 3. push和pop是一个压栈和出栈的过程,所以,千万不要2个页面相互push! 如果你不信,可以试一下,你从A pushB,从B push到C,如果你需要回到B,你用了push,那你数一下吧,你需要点多少次返回按钮才能回到A
* 4. 如果大家在实际开发过程中,有一些解决不了或者非常想探讨的问题,欢迎大家留言或者私信我,也可以加入我们的QQ群:64903116,进群的小伙伴请自觉备注第一开发语言,以便能更精准的帮你解答问题,谢谢!
* 5. 我希望大家发出的问题都是在经过一番查阅无果之后,才提出的,对于那些问:ionic 是什么,怎么搭建环境,用什么开发工具的小伙伴,恕我不知从何说起
```
本文补充链接:
 [ionic跨页面回传值](http://www.cnblogs.com/niejunchan/p/7064956.html)

demo可以在这里[下载](https://github.com/congder/callback)

#####如果我写的文章正好解决了你此时此刻遇到的某个小问题,那么请点个赞吧^^!


 *本人作为一个 ionic 初学者,很多js ,anjular ,cordova ,es6 相关的知识有所欠缺,故很多东西仅停留在会用的层面上,如有不足之处,欢迎大家批评指正,谢谢 !*
[其他关于ionic开发的更多文章请点击:](http://www.jianshu.com/u/d5c9932157ae)




