<template>
    <div id="shop">
        <div class="entirety" v-if="shopmessage" ref="entirety">
            <div class="header" ref="sdf">
                <!--头部的蒙版-->
                <div class="shopHeader" v-bind:style="{backgroundImage:getBackgroundImgUrl(shopmessage.image_path)}">
                    <div class="meng"></div>
                </div>
                <!--头部的返回按钮-->
                <div class="shopHeader-back">
                    <button @click="$router.go(-1)"><i class="fa fa-angle-left"></i></button>
                </div>
                <!--头部的主要信息-->
                <div class="header-main">
                    <img :src="getImg(shopmessage.image_path,'130x130')">
                    <div class="header-main-content">
                        <h2>{{shopmessage.name}}</h2>
                        <p class="header-main-delivery">
                            <span v-if="shopmessage.delivery_mode">蜂鸟配送</span><span v-else>商家配送</span> / </span>
                            <span v-if="shopmessage.order_lead_time">{{shopmessage.order_lead_time}}分钟送达 /</span>
                            <span v-if="shopmessage.piecewise_agent_fee">{{shopmessage.piecewise_agent_fee.tips}}</span>
                        </p>
                        <div class="header-main-notice">公告:{{shopmessage.promotion_info}}</div>
                    </div>
                </div>
                <!--头部活动信息-->
                <div class="activity" v-on:click="toggleGongGao">
                    <activity :activity="shopmessage.activities"></activity>
                    <div class="num-of-activity">{{shopmessage.activities.length}}个活动></div>
                </div>

            </div>
            <transition name="fade">
                <div class="particulars" v-show="isShowGongGao">
                    <h2>{{shopmessage.name}}</h2>
                    <span class="star">
                    <stars :star="shopmessage.rating"></stars>
                </span>
                    <h3 class="youhuimsg">
                        <span>优惠信息</span>
                    </h3>
                    <div class="activity-hidden">
                        <activity :activity="shopmessage.activities"></activity>
                    </div>
                    <h3 class="youhuimsg">
                        <span>商家公告</span>
                    </h3>
                    <div class="iiiiiii">公告:{{shopmessage.promotion_info}}</div>

                    <div class="clsoe"><span class="fa fa-times" v-on:click="hiddenGongGao"></span></div>

                </div>
            </transition>

            <div class="shop-tab-container">
                <div class="shop-tab-tab " v-on:click="checkSelect($event),isCommodity=true,isEvaluate=false,isStore=false">
                    <span class="shop-tab-title selected " >商品</span>
                </div>
                <div class="shop-tab-tab" v-on:click="checkSelect($event),isEvaluate=true,isCommodity=false,isStore=false">
                    <span class="shop-tab-title">评价</span>
                </div>
                <div class="shop-tab-tab" v-on:click="checkSelect($event),isStore=true,isCommodity=false,isEvaluate=false">
                    <span class="shop-tab-title">店铺</span>
                </div>
            </div>
            <div v-show="isCommodity">
                <div class="commodity-main">
                    <ul class="commodity-main-left" ref="commodityMainLeft">
                        <li class="liList" v-for="(item,key) in commoditylist" v-on:click="getIndex(key)"  :class="(key == 0 ? 'activeted' : '')" ref="commodityMainLeftLis" ><img v-if="item.icon_url"     :src="getImg(item.icon_url,'18x20')" ><span class="redNum" v-show="buyNums[key]">{{buyNums[key]}}</span><span v-show="item.name">{{item.name}}</span></li>
                    </ul>
                    <section class="commodity-main-right">
                        <div ref="commodityScroll" class="commodity-scroll" id="commodity-scroll"  v-on:scroll="scrollListen">
                            <dl v-for="(item,dlIndex) in commoditylist" ref="dls">
                                <dt>
                                    <div class="dt-left">
                                        <strong>{{item.name}}</strong>
                                        <!--<span>{{item.description}}</span>-->
                                    </div>
                                    <div class="dt-right">
                                        <span v-on:click="showBlackBox">...</span>
                                        <p>{{item.name}}{{item.description}}</p>
                                    </div>
                                </dt>


                                <dd v-for="(items,index) in item.foods" ref="dds">
                                    <div class="list-food-box">
                                        <div class="list-food-content">
                                            <img :src="getImg(items.image_path,'140x140')"  v-if="items.image_path">
                                            <section class="list-food-content-right">
                                                <strong class="list-food-header-price">
                                                    <span>¥<span ref="prices">{{items.specfoods[0].price}}</span><span v-if="items.specfoods[0].specs.length >= 1">起</span></span>
                                                </strong>



                                            <div class="addAndSubtract">
                                                <div class="list-food-header-subtract" v-if="dlDdArray.length > 0  && dlDdArray[dlIndex][index]">
                                                    <a class="subtract-yuan-a">
                                                        <span class="subtract-yuan" v-on:click="subtractNum(dlIndex,index)">
                                                            -
                                                       </span>
                                                    </a>
                                                </div>
                                                <div class="list-food-header-num" v-if="dlDdArray.length > 0  && dlDdArray[dlIndex][index]">{{dlDdArray[dlIndex][index]}}</div>
                                                <div class="list-food-header-add">
                                                    <a>
                                                       <span class="add-yuan" v-if="items.specfoods[0].specs.length < 1" v-on:click="addNum(dlIndex,index)">
                                                            +
                                                       </span>
                                                        <span class="add-yuan-select" v-if="items.specfoods[0].specs.length >= 1" :data-guige="items.virtual_food_id" v-on:click="selectBig(items,dlIndex,index)">
                                                            选规格
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>







                                                <section class="list-food-header">
                                                    <span  v-for="attributes in items.attributes" :style="{backgroundColor:'#' + attributes.icon_color}">
                                                        {{attributes.icon_name}}
                                                    </span>
                                                </section>
                                                <header>
                                                    {{items.name}}
                                                </header>
                                                <p class="list-food-header-description">{{items.description}}</p>
                                                <p class="list-food-header-sales">
                                                    <span>
                                                        月售
                                                        {{items.month_sales}}
                                                        份
                                                    </span>
                                                    <span>
                                                        好评率
                                                        {{items.satisfy_rate}}
                                                        %
                                                    </span>
                                                </p>
                                            </section>

                                        </div>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <transition name="select" >
                            <div class="guige" v-if="guigemessage" v-show="closeIsDispaly">
                                <h1>{{guigemessage.name}}</h1>
                                <div class="guiges">
                                    <div class="guiges-content" ref="guigesContent">
                                        <h2>{{guigemessage.specifications[0].name}}</h2>
                                        <a  v-for="(item,index) in guigemessage.specifications[0].values" v-on:click="pitchGuige(index)" ref="guigeAs">{{item}}</a>
                                    </div>
                                    <div class="guiges-content" v-for="(item,divIndex) in guigemessage.attrs" ref="spicContent">
                                        <h2>{{item.name}}</h2>
                                        <a v-for="(items,index) in item.values" v-on:click="pitchSpic(index,divIndex)" ref="spicAs">{{items}}</a>
                                    </div>
                                </div>
                                <div class="guiges-price">
                                    <p>¥{{guigemessage.specfoods[priceIndex].price}}</p>
                                    <div class="xuanhaole">
                                        <button v-on:click="addNum(dlIndexXuanHaole,indexXuanHaole)">选好了</button>
                                    </div>
                                    <a href="javascript:" role="button" class="close" @click="closeguige">X</a>
                                </div>
                            </div>
                        </transition>

                    </section>
                </div>
                <div class="commodity-footer">

                </div>

            </div>
            <div v-show="isEvaluate">评价</div>
            <div v-show="isStore">店铺</div>


        </div>
        <div  ref="mengban" class="mengban" v-show="closeIsDispaly" ></div>
        <footer>
            <div class="footerMeng" v-show="isCartShow"></div>

            <transition name="cart">
                <div class="cart-body" v-if="shopCarList"  v-show="isCartShow" >
                    <div class="cartHeader">
                        <span>购物车</span>
                        <a v-on:click="clearCar">清空</a>
                    </div>
                    <div class="cartBody">
                        <ul>
                            <li v-for="(item , key) in shopCarList" v-if="item.count">
                                <span>{{item.name}} : {{item.price}}</span>
                                <div class="list-food-header-subtract">
                                    <a class="subtract-yuan-a">
                                                        <span class="subtract-yuan"  v-on:click="subCount(item)">
                                                            -
                                                       </span>
                                    </a>
                                </div>
                                <span>{{item.count}}</span>
                                <div class="list-food-header-add">
                                    <a>
                                                       <span class="add-yuan" v-on:click="addCount(item)">
                                                            +
                                                       </span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <div class="entityList">
                        </div>
                    </div>
                </div>
            </transition>
            <div class="cart-footer" v-on:click="isShowcart">

                <span class="carticon" :class="{buybuybuy:isCartHave}">
                    <i class="fa fa-shopping-cart"></i>
                                    <span class="redNum" v-show="buySum">{{buySum}}</span>

                </span>
                <div class="cartInfo">
                    <p class="sumPrice" v-if="total">
                        {{total}}
                    </p>
                    <p class="sendPrice">
                        配送费¥4
                    </p>
                </div>
                <a class="quJiesuan" @click="$router.push({
            path:'/accounts',
            query:{
                shopId:shopId
            }
        })">
                    去结算
                </a>
            </div>
        </footer>
        <!--<button @click="$router.go(-1)">Back</button>-->
        <div class="ball-container">
            <!--<transition name="drop"-->
                        <!--v-on:before-enter="beforeEnter"-->
                        <!--v-on:enter="enter"-->
                        <!--v-on:after-enter="afterEnter">-->
                    <!--<div class="bally" v-show="ballIsShow">-->
                        <!--<div class="ballx" ref="ballX"></div>-->
                    <!--</div>-->
            <!--</transition>-->

            <transition-group tag="div" name="drop" v-on:before-enter="beforeEnter"
                              v-on:enter="enter"
                              v-on:after-enter="afterEnter">

                <div class="bally" v-for="(ball, index) in balls" v-show="ball.show" :key="index">
                    <div class="ballx" ref="innerHook"></div>
                </div>

            </transition-group>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    import activity from '@/components/activitys2';
    import stars from '@/components/star';
    import {
        getShopmessage,
        getCommoditylist,
        myMixin,

    } from '@/data/getData';

    import {
        mapState,mapMutations
    } from 'vuex';
    export default
    {
        name: 'shop',
        mixins: [myMixin],
        components: {
            activity,
            stars
        },
        data()
        {
            return {
                id: '',
                latitude: '',
                longitude: '',
                shopmessage: null,

                commoditylist: null,

                isShowGongGao: false,

                isCommodity:true,
                isEvaluate:false,
                isStore:false,
                guigemessage:false,
                liIndex:-1,

                dlHeightArrs:[],


                //规格里面的特殊要求 大div的下表
                divIndexxx:0,




                priceIndex :0,
                //规格界面是否显示
                closeIsDispaly:false,

                //二维数组   分别代表 dl  dd
                dlDdArray:[],

                //每个li里面购买的总量
                buyNum:0,

                //购买总量的数组
                buyNums : [],
                //购物车总量
                buySum:null,

                //购物车里面是否有东西
                isCartHave:false,

                //购物车是否显示
                isCartShow:false,



                dlIndexXuanHaole:null,
                indexXuanHaole:null,
                //掉落小球是否显示
//                ballIsShow:false,


                balls: [
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                ],



                dropBalls: [],
                isAnimation: false,


                //点击加号时小球的坐标
                ballPlus:null,

                //通过route传过来的店铺Id
                shopId : this.$route.query.id,



            }
        },

        computed:{
            ...mapState(['carList']),
            shopCarList()
            {
                return this.carList[this.shopId];
            },
            total()
            {
                let price = 0;

                if (this.shopCarList) {
                    Object.values(this.shopCarList).forEach(function (food) {
                        price += food.count * Math.round(food.price * 100);
                    });
                }


                return price / 100;
            }
        },
        watch:{
              liIndex:function () {
                  let lis =  this.$refs.commodityMainLeft.children;
                  for (let i = 0; i < lis.length; i++)
                  {
                      lis[i].classList.remove('activeted');
                  }
                  this.$refs.commodityMainLeftLis[this.liIndex].classList.add('activeted');
              }
        },
        methods: {


            ...mapMutations(['ADD_CAR','SUB_CAR','CLEAR_CAR']),

            addFood:function (foodId,name,original_price,price,spec,dlIndex,ddIndex) {
                  this.ADD_CAR({shopId:this.shopId,foodId,name,original_price,price,spec,dlIndex,ddIndex});
//                this.total = Math.round((this.total + price) * 100);
//                this.total /= 100;
//                console.log(this.total);
            },



            //清空购物车
            clearCar:function () {
//                console.log('come in');
                this.CLEAR_CAR(this.shopId);
                this.dlDdArray = [];
                this.$nextTick(function () {
//                        console.log('next dlArrs');
                    let dlArr = this.$refs.dls;
//                        console.log(dlArr);
                    let dlHeightArr = [];
                    let sum = 0;
                    let i = 0;
                    for ( i; i < dlArr.length; i++)
                    {
                        sum = sum + dlArr[i].clientHeight;
                        dlHeightArr.push(sum);
                    }
                    this.dlHeightArrs = dlHeightArr;


//                        console.log(this.dlDdArray);
                    this.dlDdArray.length = dlArr.length;
                    for (let j = 0;j < this.dlDdArray.length;j++)
                    {
                        let num = dlArr[j].children.length - 1;
                        this.dlDdArray[j] = [];
                        this.dlDdArray[j].length = num;

                        for (let k = 0; k < this.dlDdArray[j].length; k++)
                        {
                            this.dlDdArray[j][k] = 0;
                        }
                    }




                    this.buyNums.length = dlArr.length;

                    for (let i = 0; i < dlArr.length; i++)
                    {
                        this.buyNums[i] = 0;
                    }

                    this.$set(this.dlDdArray,this.buyNums);
                });
                this.buyNums = [];
                this.buySum = 0;
            },

            drop(el) {
                for (let i=0; i< this.balls.length; i++){
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },



            //是否显示购物车
            isShowcart:function () {
                if(this.isCartShow)
                {
                    this.isCartShow = false;
                }
                else
                {
                    this.isCartShow = true;
                }
            },

            //过度  钩子函数

            beforeEnter:function (el) {
//                  let message = this.ballPlus.getBoundingClientRect();
//                  console.log(message);
//                  let x = message.left;
//                  let y = -(window.innerHeight - message.top);
//
//                  el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
//                  el.style.transform = 'translate3d(0,' + y + 'px,0)';
//
//                let ballX = el.getElementsByClassName('ballx')[0];
//                ballX.style.webkitTransform = 'translate3d('+x+'px, 0, 0)';
//                ballX.style.transform = 'translate3d('+x+'px, 0, 0)';


//                console.log('beforeEnter');

                let count = this.balls.length;


                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        // 获取元素位于屏幕中的位置
                        let rect = ball.el.getBoundingClientRect();
//                        console.log(rect);
                        let x = rect.left - 74;
                        let y = - (window.innerHeight - rect.top - 141);

                        // 外层元素控制y轴方向的过渡
                        el.style.webkitTransform = 'translate3d(0, ' +y+'px, 0)';
                        el.style.transform = 'translate3d(0, ' +y+'px, 0)';

                        // 获取里层元素
                        let inner = el.getElementsByClassName('ballx')[0];
                        // 里层元素控制x轴方向的过渡
                        inner.style.webkitTransform = 'translate3d('+x+'px, 0, 0)';
                        inner.style.transform = 'translate3d('+x+'px, 0, 0)';
                    }
                }

            },
            enter:function (el) {
//                console.log('22');
                let rel = el.offsetHeight;
                this.$nextTick(function () {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';

                    let ballX = el.getElementsByClassName('ballx')[0];
                    ballX.style.webkitTransform = 'translate3d(0, 0, 0)';
                    ballX.style.transform = 'translate3d(0, 0, 0)';
                })
            },
            afterEnter:function (el) {
//                this.ballIsShow = false;
//                console.log('afterEnter');

                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                }
                this.isAnimation = true;


            },


            subCount:function (food) {

                let foodId = this.commoditylist[food.dlIndex].foods[food.ddIndex].specfoods[0].food_id;
                this.dlDdArray[food.dlIndex][food.ddIndex]--;
                this.SUB_CAR({shopId:this.shopId,foodId});
                this.buyNums[food.dlIndex]--;
                this.buySum--;
                if(this.buySum == 0)
                {
                    this.isCartHave = false;
                }
            },

            addCount:function (food) {
//                let foodId = this.commoditylist[food.dlIndex].foods[food.ddIndex].specfoods[0].food_id;
//                this.addFood(food.food_id);

                let foods = this.commoditylist[food.dlIndex].foods[food.ddIndex].specfoods[0];
//                console.log(food);
                this.dlDdArray[food.dlIndex][food.ddIndex]++;
                this.buyNums[food.dlIndex]++;
                this.buySum++;
                this.addFood(foods.food_id);



            },





            //增加一个 个数
            addNum:function(dlIndex,index)
            {
                var arr = this.dlDdArray[dlIndex];
                arr[index] += 1;
                let buySum = 0;
                let cartSum = 0;
                for (let i = 0; i < arr.length; i++)
                {
                    buySum += arr[i];
                }
                this.buyNums[dlIndex] = buySum;
//                console.log(this.buyNums);
                for(let j = 0; j < this.buyNums.length; j++)
                {
                    cartSum += this.buyNums[j];
                }
                this.buySum = cartSum;
//                console.log(this.buySum);

                this.isCartHave = true;

                this.$set(this.dlDdArray,dlIndex,arr,this.buyNums,this.buySum);
                this.isSelectContent = false;

                this.closeIsDispaly = false;


                //点击加号  让小球显示   并且获取小球的定位信息
//                this.ballPlus = event.currentTarget;
////                console.log(this.ballPlus);
//                this.ballIsShow = true;

                this.drop(event.currentTarget);




                //让规格成为初始状态
                if(this.closeIsDispaly)
                {
                    let guigesContentChilds = this.$refs.guigesContent.children;

                    for (let i = 0; i < guigesContentChilds.length; i++)
                    {
                        guigesContentChilds[i].classList.remove('pitchUp');
                    }

                    let spicContentChilds = this.$refs.spicContent;
//                console.log(divIndex);
//                console.log(spicContentChilds[divIndex].children);
//                console.log(this.divIndexxx);
                    for (let i = 0; i < spicContentChilds[this.divIndexxx].children.length; i++)
                    {
                        spicContentChilds[this.divIndexxx].children[i].classList.remove('pitchUp');
                    }

                    this.priceIndex = 0;
                }




                //更新购物车里面的东西
                let food = this.commoditylist[dlIndex].foods[index].specfoods[0];
//                console.log(food);
                this.addFood(food.food_id,food.name,food.original_price,food.price,food.specs,dlIndex,index);



                //总价增加



            //减掉一个数量
            },
            subtractNum:function (dlIndex,index) {

                var arr = this.dlDdArray[dlIndex];
                arr[index] -= 1;

                this.buyNums[dlIndex] -= 1;

                this.$set(this.dlDdArray,dlIndex,arr,this.buyNums);
                this.isSelectContent = false;
                this.buySum--;
                if(this.buySum == 0)
                {
                    this.isCartHave = false;
                }
//                console.log(this.buySum);




                //从购物车里面删除一个数据

//                console.log();
                let food = this.commoditylist[dlIndex].foods[index].specfoods[0];
                let foodId = food.food_id;

//                this.total = Math.round((this.total - this.carList[this.shopId][foodId].price) * 100);
//                this.total /= 100;
//
                this.SUB_CAR({shopId:this.shopId,foodId});

//                if (!this.carList[this.shopId][foodId].count)
//                {
//                }
            },



            //选择规格
            pitchGuige:function (index) {
                let guigesContentChilds = this.$refs.guigesContent.children;

                for (let i = 0; i < guigesContentChilds.length; i++)
                {
                    guigesContentChilds[i].classList.remove('pitchUp');
                }
//
                this.$refs.guigeAs[index].classList.add('pitchUp');


                this.priceIndex = index;

            },
            pitchSpic:function (index,divIndex) {

                let spicContentChilds = this.$refs.spicContent;
//                console.log(divIndex);
//                console.log(spicContentChilds[divIndex].children);
                for (let i = 0; i < spicContentChilds[divIndex].children.length; i++)
                {
                    spicContentChilds[divIndex].children[i].classList.remove('pitchUp');
                }
                spicContentChilds[divIndex].children[index+1].classList.add('pitchUp');

//                console.log();
                this.divIndexxx = divIndex;


            },


            getIndex:function (key) {

                if(key !== 0)
                {
                    this.$refs.commodityScroll.scrollTop = this.dlHeightArrs[key - 1];
                }
                else
                {
                    this.$refs.commodityScroll.scrollTop = 0;
                }



            },


            scrollListen:function () {
//                if(this.$refs.commodityScroll.scrollTop = 0)
//                {
//                    let nowScroll = this.$refs.commodityScroll.scrollTop;
                this.$refs.entirety.scrollTop += this.$refs.commodityScroll.scrollTop - this.scrollCom;
//

                this.scrollCom = this.$refs.commodityScroll.scrollTop
//                }
//                else
//                {
//                    console.log(this.$refs.commodityScroll.scrollTop);
//                }

                let dlArr = this.$refs.dls;
                let dlHeightArr = [];
                let sum = 0;
                for (let i = 0; i < dlArr.length; i++)
                {
                    sum = sum + dlArr[i].clientHeight;
                    dlHeightArr.push(sum);
                }
                this.dlHeightArrs = dlHeightArr;


//                console.log('dl',this.dlHeightArrs);


                for (let j = 0; j < this.dlHeightArrs.length;j++)
                    {
                        if(this.$refs.commodityScroll.scrollTop < this.dlHeightArrs[j])
                        {
                            this.liIndex = j;
                            break;
                        }
                    }
                if(this.$refs.commodityScroll.scrollTop > this.dlHeightArrs[7])
                {
                    let ScrollJuli = (this.liIndex - 7) * 130 ;
                    this.$refs.commodityMainLeft.scrollTop = ScrollJuli;
                }
                else
                {
                    this.$refs.commodityMainLeft.scrollTop = 0;
                }
            },

            selectBig:function (guige,dlIndex,index) {
                this.guigemessage = guige;
                if(this.guigemessage)
                {
//                    console.log(this.$refs.mengban);
                    this.$refs.mengban.classList.add('display');
                    this.dlIndexXuanHaole = dlIndex;
                    this.indexXuanHaole = index;

                }


                this.closeIsDispaly = true;
            },

            closeguige:function()
            {
                this.closeIsDispaly = false;
                let guigesContentChilds = this.$refs.guigesContent.children;

                for (let i = 0; i < guigesContentChilds.length; i++)
                {
                    guigesContentChilds[i].classList.remove('pitchUp');
                }

                let spicContentChilds = this.$refs.spicContent;
//                console.log(divIndex);
//                console.log(spicContentChilds[divIndex].children);
//                console.log(this.divIndexxx);
                for (let i = 0; i < spicContentChilds[this.divIndexxx].children.length; i++)
                {
                    spicContentChilds[this.divIndexxx].children[i].classList.remove('pitchUp');
                }

                this.priceIndex = 0;
//
            },
            showBlackBox:function () {
                this.closeIsDispaly = true;
            },


            //切换   商品评价店铺  类
            checkSelect: function (ev) {
                if(ev.target.classList.value == 'shop-tab-title selected')
                {
                    return false;
                }else
                {
                    if (ev.target.classList.value == 'shop-tab-title') {
                        document.getElementsByClassName('selected')[0].classList.remove('selected');
                        ev.target.classList.add('selected');
                    }
                    else {
                        document.getElementsByClassName('selected')[0].classList.remove('selected');
                        ev.target.childNodes[0].classList.add('selected');
                    }
                }

            },
            //给活动区添加点击事件  让详情显示出来
            toggleGongGao: function () {
                this.isShowGongGao = true;
            },
            hiddenGongGao: function () {
                this.isShowGongGao = false;
            },


//            getImgurl: function (hash) {
//                let one = hash.sub(0, 1);
//                let two = hash.sub(1, 3);
//                let type = hash.sub(32);
//                let main = hash.sub(3);
//                const url ='url'+'("'+'https://fuss10.elemecdn.com/'+one+'/'+two+'/'+main+'.'+type+'?imageMogr/format/webp/thumbnail/!40p/blur/50x40/'+'")';
//                console.log(url);
//                return url;
//            },




            getBackgroundImgUrl: function (hash) {

                let dir1 = hash.substring(0, 1);
                let dir2 = hash.substring(1, 3);
                let img = '';
                if(hash.substring(hash.length - 4) === 'jpeg'){
                    img = hash.substring(hash.length - 4);
                } else {
                    img = hash.substring(hash.length - 3);
                }
                let strContent = hash.substr(3);
                //覆盖背景url:background-image: url("https://fuss10.elemecdn.com/f/8d/f29dbf20be425fc12426c0b1f90b7jpeg.jpeg?imageMogr/format/webp/thumbnail/!40p/blur/50x40/");
                const url = "url('"+'https://fuss10.elemecdn.com/' + dir1 + '/' + dir2 + '/' + strContent + '.' + img + '?imageMogr/format/webp/thumbnail/!40p/blur/50x40/'+ "')";
                return url;
            }
        },
        async mounted()
        {



//            console.log('mounted');



//            console.log('created');
            this.$nextTick(function () {

            });
            //获取由列表发过来的数据
            this.id = this.$route.query.id;
            this.latitude = this.$route.query.latitude;
            this.longitude = this.$route.query.longitude;
            await getShopmessage(this.id, this.latitude, this.longitude).then(response => {
                this.shopmessage = response;
//                console.log(this.shopmessage);
            }).catch(error => {
                console.log(error);
            });




            await getCommoditylist(this.id).then(response => {
//                console.log(this.id);
//                console.log('commod');
//                console.log(this.commoditylist);
                this.commoditylist = response;
//                console.log(this.commoditylist);


//                console.log(this.commoditylist);

                //必须等到DOM加载完成后  DOM需要在过去数据后完成
                    this.$nextTick(function () {
//                        console.log('next dlArrs');
                        let dlArr = this.$refs.dls;
//                        console.log(dlArr);
                        let dlHeightArr = [];
                        let sum = 0;
                        let i = 0;
                        for ( i; i < dlArr.length; i++)
                        {
                            sum = sum + dlArr[i].clientHeight;
                            dlHeightArr.push(sum);
                        }
                        this.dlHeightArrs = dlHeightArr;


//                        console.log(this.dlDdArray);
                        this.dlDdArray.length = dlArr.length;
                        for (let j = 0;j < this.dlDdArray.length;j++)
                        {
                            let num = dlArr[j].children.length - 1;
                            this.dlDdArray[j] = [];
                            this.dlDdArray[j].length = num;

                            for (let k = 0; k < this.dlDdArray[j].length; k++)
                            {
                                this.dlDdArray[j][k] = 0;
                            }
                        }




                        this.buyNums.length = dlArr.length;

                        for (let i = 0; i < dlArr.length; i++)
                        {
                            this.buyNums[i] = 0;
                        }

                        this.$set(this.dlDdArray,this.buyNums);
                    });





//                document.getElementsByClassName('liList')[0].classList.add('activeted');

//                console.log(this.Commoditylist);
            }).catch(error => {
                console.log(error);
            });





        },
        created()
        {
//            console.log(this.carList);

        },


        beforeUpdate() {
//            console.log('bu');
        },

        updated() {

//            console.log('up');
        }




    }
</script>
<style lang="scss" type="text/scss">

    @import "../../scss/mixin.scss";

    .entirety
    {
        overflow-y: auto;
        height: 100%;
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s
        }

        .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
        {
            opacity: 0
        }
    }
    #shop
    {
        overflow-x: hidden;
        height: 100vh;
        //  1 vh = 1/100 手机屏幕的高度
    }
    .cart-enter-active, .cart-leave-active {
        transition: all 0.5s ease;
    }

    .cart-enter, .cart-leave-to /* .fade-leave-active in below version 2.1.8 */
    {
        transform: translate(0,100%);
        opacity: 1;
    }
    body, html {
        height: 100%;
    }
    .header {
        height: pxToRem(283px);
        position: relative;
    }
    .shopHeader {
        box-sizing: content-box;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-text-size-adjust: 100%;
        height: pxToRem(283px);
        z-index: 0;
        color: rgb(255, 255, 255);
        /*background-color: rgb(49, 144, 232);*/
        /*opacity: 0.9;*/

        .meng
        {
            background-color: rgb(49, 144, 232);
            opacity: 0.2;
            width: 100%;
            height: 100%;
        }

    }
    .shopHeader-back {
        position: relative;
        z-index: 1;
        height: pxToRem(71px);
        padding: pxToRem(8px) pxToRem(20px);
        i {

            display: inline-block;
            font-size: pxToRem(60px);
            width: pxToRem(50px);
            height: pxToRem(50px);
            font-weight: bold;
            color: white;
        }
    }
    .header-main {
        position: relative;
        z-index: 1;
        box-sizing: content-box;
        padding: pxToRem(20px) pxToRem(30px) pxToRem(0px) pxToRem(30px);
        @include flex();
        img {
            border-radius: pxToRem(4px);
            border: 1px solid white;
            height: pxToRem(130px);
            width: pxToRem(130px);
            margin-right: pxToRem(20px);
        }
        .header-main-content {
            font-weight: bold;
            font-size: pxToRem(22px);
            color: white;
            width: 100%;
            text-align: left;
            h2 {
                height: pxToRem(50px);
                font-size: pxToRem(35px);
                overflow-x: hidden;
                overflow-y: hidden;
                text-overflow: ellipsis;
            }
            .header-main-delivery {
                height: pxToRem(50px);
                width: 100%;
                white-space: nowrap;
                line-height: pxToRem(50px);
            }
            .header-main-notice {
                line-height: pxToRem(40px);
                overflow-y: hidden;
                height: pxToRem(40px);

            }
        }
    }
    .activity {
        display: flex;
        justify-content: space-between;
        font-size: pxToRem(22px);
        color: white;
        height: pxToRem(36px);
        line-height: pxToRem(36px);
        position: absolute;
        z-index: 1;
        bottom: pxToRem(10px);
        overflow-y: hidden;
        margin-left: pxToRem(30px);
        margin-right: pxToRem(30px);
        width: pxToRem(690px);
        .num-of-activity {

            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
    .particulars {
        border-style: solid;
        border-color: rgb(38, 38, 38);
        border-left-width: pxToRem(60px);
        border-right-width: pxToRem(60px);
        border-top-width: pxToRem(80px);

        box-sizing: border-box;
        text-align: center;
        color: white;
        position: absolute;
        z-index: 222;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(38, 38, 38);
        .clsoe {
            width: 100%;
            position: absolute;
            color: rgb(222, 222, 222);
            text-align: center;
            bottom: pxToRem(50px);
            font-size: pxToRem(100px);
        }
        .star {
            margin-top: pxToRem(10px);
            font-size: pxToRem(50px);
            display: inline-block;
        }
        .youhuimsg {
            margin-top: pxToRem(60px);
            margin-bottom: pxToRem(40px);
            span {
                font-size: pxToRem(24px);
                padding: pxToRem(10px) pxToRem(28.8px);
                border: 1px solid rgb(85, 85, 85);
                border-bottom-left-radius: pxToRem(50px);
                border-bottom-right-radius: pxToRem(50px);
                border-top-left-radius: pxToRem(50px);
                border-top-right-radius: pxToRem(50px);
            }
        }
        .activity-hidden {
            text-align: left;
            div {
                line-height: pxToRem(40px);
            }
        }
        .iiiiiii {
            text-align: left;
        }
    }

    .shop-tab-container {
        z-index: 200;
        position: sticky;
        top:pxToRem(-1px);
        box-sizing: content-box;
        line-height: pxToRem(80px);
        background-color: white;
        border: 1px solid rgb(238, 238, 238);
        @include flex();
        .shop-tab-tab {
            box-sizing: content-box;
            font-size: pxToRem(28px);
            line-height: pxToRem(80px);
            text-align: center;
            width: 100%;
            span {
                box-sizing: border-box;
                display: inline-block;
                height: pxToRem(80px);
            }
            .selected {
                border-bottom: 6px solid rgb(49, 144, 232);
                color: rgb(49, 144, 232);
                font-weight: bold;
            }

        }
    }
    .commodity-main{
        display: flex;
        position: relative;
        line-height: pxToRem(29px);
        .commodity-main-left{
            flex-basis: auto;
            flex-grow: 0;
            flex-shrink: 0;
            height: pxToRem(1156px);
            background-color: rgb(248,248,248);
            display: block;
            font-size: pxToRem(24px);
            list-style-position: outside;
            list-style-type: none;
            overflow-y: scroll;
            width: pxToRem(170px);
            img
            {
                margin-right: pxToRem(10px);
                text-align: left;
                width: pxToRem(18px);
                height: pxToRem(25px);
            }
            li
            {
                display: block;
                border-bottom: 1px solid rgb(237,237,237);
                color: rgb(102,102,102);
                font-size: pxToRem(26px);
                line-height: pxToRem(31.2px);
                padding: pxToRem(35px) pxToRem(15px);
                position: relative;
                text-align: left;
                .redNum
                {
                    background-color: rgb(255,70,29);
                    border-radius: pxToRem(15px);
                    color: white;
                    font-size: pxToRem(20px);
                    font-weight: bold;
                    line-height: pxToRem(28px);
                    padding-right: pxToRem(8px);
                    padding-left: pxToRem(8px);
                    position: absolute;
                    top:pxToRem(6px);
                    right: pxToRem(6px);

                }
            }
            .activeted
            {
                border-left: 5px solid blue;
                background-color: white;
            }


        }
        .commodity-main-right{
            -webkit-text-size-adjust: 100%;
            display: block;
            width: pxToRem(580px);
            height: pxToRem(1255px);
            flex-basis: 0;
            flex-grow:1;
            flex-shrink: 1;
            position: relative;
            .commodity-scroll
            {
                height: 100%;
                line-height: pxToRem(28.8px);
                overflow-y: scroll;
                dl
                {
                    dd
                    {
                        position: relative;
                        .list-food-content
                        {

                            .addAndSubtract
                            {
                                vertical-align: baseline;
                                /*padding-right: pxToRem(40px);*/
                                text-align: right;
                                width: 100%;
                                height: pxToRem(54px);
                                line-height: pxToRem(54px);
                                display: inline-block;
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                /*line-height: pxToRem(54px);*/

                                .list-food-header-add
                                {

                                    display: inline-block;
                                    /*margin-bottom: pxToRem(10px);*/
                                    .add-yuan
                                    {
                                        line-height: pxToRem(30px);
                                        font-size: pxToRem(50px);
                                        text-align: center;
                                        color: white;
                                        display: inline-block;
                                        /*<!--margin-right: pxToRem(-30px);-->*/
                                        /*position: absolute;*/
                                        /*bottom: 0;*/
                                        width: pxToRem(40px);
                                        height: pxToRem(40px);
                                        border-radius: pxToRem(50px);
                                        background-color: rgb(49,144,232);
                                    }
                                    .add-yuan-select
                                    {


                                        /*display: none;*/
                                        text-align: center;
                                        background-color: rgb(49,144,232);
                                        /*padding-top: pxToRem(10px);*/
                                        line-height: pxToRem(40px);
                                        color: white;
                                        border-radius: pxToRem(26px);
                                        display: inline-block;
                                        width: pxToRem(102px);
                                        height: pxToRem(40px);
                                        /*margin-top: pxToRem(20px);*/
                                        /*padding-bottom: pxToRem(20px);*/
                                        transform: translate(0,-10%);


                                    }
                                }
                                .list-food-header-subtract
                                {
                                    display: inline-block;
                                    /*margin-right: pxToRem(50px);*/
                                    /*<!--margin-bottom: pxToRem(-10px);-->*/

                                    .subtract-yuan
                                    {
                                        line-height: pxToRem(30px);
                                        font-size: pxToRem(50px);
                                        text-align: center;
                                        color: rgb(49,144,232);
                                        display: inline-block;
                                        /*position: absolute;*/
                                        /*bottom: 0;*/
                                        /*margin: 0 auto;*/
                                        width: pxToRem(40px);
                                        height: pxToRem(40px);
                                        border-radius: pxToRem(50px);
                                        border: 1px solid rgb(49,144,232);
                                    }

                                }
                                .list-food-header-num
                                {
                                    margin-right: pxToRem(4px);
                                    /*<!--margin-bottom: pxToRem(-5px);-->*/
                                    display: inline-block;
                                    font-size: pxToRem(28px);
                                    /*margin-right: pxToRem(20px);*/
                                    line-height: pxToRem(33.6px);
                                    overflow: hidden;
                                    text-align: center;
                                    white-space: nowrap;
                                }

                            }


                            .list-food-header-price
                            {
                                color: rgb(255,102,0);
                                font-size: pxToRem(32px);
                                align-items: baseline;
                                display: flex;
                                font-weight: bold;
                                line-height: pxToRem(32px);
                                padding-bottom: pxToRem(7px);
                                position: absolute;
                                bottom: 0;
                            }
                            .list-food-content-right
                            {

                                .list-food-header-sales
                                {
                                    margin-top: pxToRem(13px);
                                    margin-bottom: pxToRem(13px);
                                    font-size: pxToRem(22px);
                                    line-height: pxToRem(22px);

                                }
                                .list-food-header-description
                                {
                                    color: rgb(153,153,153);
                                    font-size: pxToRem(19px);
                                    line-height: pxToRem(22.8px);
                                    margin-top: pxToRem(10px);
                                    margin-bottom: pxToRem(10px);
                                    overflow: hidden;
                                    white-space: nowrap;
                                }
                                header
                                {
                                    color: rgb(51,51,51);
                                    font-size: pxToRem(30px);
                                    line-height: pxToRem(33px);
                                    overflow-x: hidden;
                                    font-weight: bold;
                                }
                                padding-bottom: pxToRem(50px);
                                padding-left: pxToRem(182px);
                                width: 100%;
                                position: relative;
                            }
                            border-bottom: 1px solid rgba(46,46,46,0.2);
                            position: relative;
                            width: 100%;
                            padding: pxToRem(30px) pxToRem(20px);
                            @include flex();
                            img{
                                margin-right: pxToRem(-162px);
                                display: inline-block;
                                width: pxToRem(162px);
                                height: pxToRem(170px);
                                position: absolute;
                                top:pxToRem(30px);
                            }
                            .list-food-header
                            {
                                left: 0;
                                width: 100%;
                                @include flex();
                                position: absolute;
                                top:0;
                                span{
                                    color: white;
                                }
                            }
                        }
                    }
                    list-style: none;
                    dt
                    {
                        @include flex();
                        font-size: pxToRem(24px);
                        padding: pxToRem(15px) pxToRem(60px) pxToRem(15px) pxToRem(20px);
                        background-color: rgb(241,241,241);
                        .dt-left
                        {
                            display: flex;
                            overflow: hidden;
                            strong{
                                font-size: pxToRem(28px);
                                margin-right: pxToRem(10px);
                                overflow: auto;
                                white-space: nowrap;
                            }
                            /*span*/
                            /*{*/
                                /*color: rgb(153,153,153);*/
                                /*flex-grow: 1;*/
                                /*flex-shrink: 1;*/
                                /*font-size: pxToRem(20px);*/
                                /*white-space: nowrap;*/
                                /*overflow-x: hidden;*/
                                /*text-overflow: ellipsis;*/
                            /*}*/
                        }
                        .dt-right
                        {
                            position: relative;
                            span
                            {
                                color: rgb(51,51,51);
                                font-size: pxToRem(24px);
                            }
                            p
                            {
                                display: none;
                                border-radius: pxToRem(8px);
                                font-size: pxToRem(24px);
                                font-weight: normal;
                                opacity: 0.97;
                                position: absolute;
                                top:pxToRem(30px);
                                z-index: 200;
                                padding: pxToRem(18px) pxToRem(20px);
                                color: rgb(238,238,238);
                                background-color: #39373a;
                                width: pxToRem(364px);
                                right: pxToRem(10px);
                            }
                            .showPbox
                            {
                                display: block;
                            }
                        }

                    }
                }
            }
            & .select-enter-active, .select-leave-active {
                transition: all .5s ease;
            }

            & .select-enter, .select-leave-to
            {
                transform: translate3d(-50%,-50%,0) scale(0.5);
                opacity : 0;
            }


            /*& .select-leave-active {*/
                /*transition: all 5s;*/

            /*}*/


            & .select-leave {
                /*transform:  scale(1);*/
                opacity: 1;

                /*background-color: red;*/
            }

            /*& .select-leave-to*/
            /*{*/
                /*!*background-color: green;*!*/
                /*opacity: 0.5;*/
                /*!*transform: scale(0);*!*/
            /*}*/



        }

    }
    .guige
    {
        width: 600px;
        overflow: visible;
        border: 1px solid white;
        border-radius: pxToRem(8px);
        background-color: white;
        position: fixed;
        top:50%;
        z-index: 201;
        left: 50%;
        transform: translate(-50%,-50%);
        h1
        {
            line-height: pxToRem(45px);
            text-align: center;
            border-radius: pxToRem(8px);
            background-color: rgb(255,255,255);
            font-size: pxToRem(32px);
            padding: pxToRem(25px) pxToRem(60px);
        }
        .guiges
        {
            overflow: visible;
            overflow-y: auto;
            max-height: pxToRem(500px);
            padding-left: pxToRem(30px);
            padding-bottom: pxToRem(40px);
            font-size: pxToRem(24px);
            h2
            {
                font-size: pxToRem(26px);
                line-height: pxToRem(40px);
                color: rgb(102,102,102);
            }
            .guiges-content
            {
                margin-top: pxToRem(20px);
                a
                {
                    color: rgb(51,51,51);
                    display: inline-block;
                    border: 1px solid rgb(153,153,153);
                    border-radius: pxToRem(40px);
                    margin-right: pxToRem(30px);
                    margin-top: pxToRem(13px);
                    height: pxToRem(48px);
                    padding-left: pxToRem(18px);
                    padding-right: pxToRem(18px);
                    font-size: pxToRem(26px);
                    line-height: pxToRem(48px);
                    white-space: nowrap;
                }
                .pitchUp
                {
                    color: cornflowerblue;
                    border-color: cornflowerblue;
                }
            }

        }
        .guiges-price
        {
            @include flex();
            align-items: center;
            background-color: rgb(249,249,249);
            border:1px solid rgb(238,238,238);
            padding: pxToRem(25px) pxToRem(30px);
            font-size: pxToRem(24px);
            line-height: pxToRem(28.8px);
            p
            {
                font-size: pxToRem(42px);
                line-height: pxToRem(42px);
                color: rgb(255,96,0);
            }
            .xuanhaole
            {
                button
                {
                    background-color: rgb(49,153,232);
                    color: white;
                    border-radius: pxToRem(6px);
                    padding: 0 pxToRem(25px);
                    font-size: pxToRem(28px);
                    line-height: pxToRem(65px);
                }

            }
            .close
            {
                display: inline-block;
                position: absolute;
                right: pxToRem(30px);
                top:pxToRem(30px);
                font-size:pxToRem(60px) ;
                height: pxToRem(35px);
                color: rgb(51,51,51);
                opacity: 0.4;
            }
        }
    }
    .mengban
    {
        display: none;
        width: 100%;
        height: 100%;
        background-color: black;
        position: absolute;
        top:0;
        z-index: 200;
        opacity: 0.3;
    }
    .display
    {
        display: block;
    }

    footer
    {

        .list-food-header-add
        {

            display: inline-block;
            /*margin-bottom: pxToRem(10px);*/
            .add-yuan
            {
                line-height: pxToRem(30px);
                font-size: pxToRem(50px);
                text-align: center;
                color: white;
                display: inline-block;
                /*<!--margin-right: pxToRem(-30px);-->*/
                /*position: absolute;*/
                /*bottom: 0;*/
                width: pxToRem(40px);
                height: pxToRem(40px);
                border-radius: pxToRem(50px);
                background-color: rgb(49,144,232);
            }
            .add-yuan-select
            {


                /*display: none;*/
                text-align: center;
                background-color: rgb(49,144,232);
                /*padding-top: pxToRem(10px);*/
                line-height: pxToRem(40px);
                color: white;
                border-radius: pxToRem(26px);
                display: inline-block;
                width: pxToRem(102px);
                height: pxToRem(40px);
                /*margin-top: pxToRem(20px);*/
                /*padding-bottom: pxToRem(20px);*/
                transform: translate(0,-10%);


            }
        }
        .list-food-header-subtract
        {
            display: inline-block;
            /*margin-right: pxToRem(50px);*/
            /*<!--margin-bottom: pxToRem(-10px);-->*/

            .subtract-yuan
            {
                line-height: pxToRem(30px);
                font-size: pxToRem(50px);
                text-align: center;
                color: rgb(49,144,232);
                display: inline-block;
                /*position: absolute;*/
                /*bottom: 0;*/
                /*margin: 0 auto;*/
                width: pxToRem(40px);
                height: pxToRem(40px);
                border-radius: pxToRem(50px);
                border: 1px solid rgb(49,144,232);
            }

        }

        .cart-footer
        {
            @include flex();
            padding-left: pxToRem(158px);
            position: fixed;
            bottom: 0;
            width: 100%;
            height: pxToRem(96px);
            background-color: rgba(61,61,63,0.9);
            color: rgb(51,51,51);
            line-height: pxToRem(38.4px);
            z-index: 11;
            .carticon
            {
                .redNum
                {
                    background-color: rgb(255,70,29);
                    border-radius: pxToRem(15px);
                    color: white;
                    font-size: pxToRem(20px);
                    font-weight: bold;
                    line-height: pxToRem(28px);
                    padding-right: pxToRem(8px);
                    padding-left: pxToRem(8px);
                    position: absolute;
                    top:pxToRem(6px);
                    right: pxToRem(6px);

                }
                font-size: pxToRem(50px);
                color: grey;
                text-align: center;
                line-height: pxToRem(80px);
                background-color: rgb(54,54,54);
                bottom: pxToRem(15px);
                border: 10px solid rgb(68,68,68);
                border-top-left-radius: 100%;
                border-top-right-radius: 100%;
                border-bottom-left-radius: 100%;
                border-bottom-right-radius: 100%;
                display: block;
                width: pxToRem(100px);
                height: pxToRem(100px);
                position: absolute;
                left: pxToRem(24px);
                /*line-height: pxToRem(38.4px);*/
                will-change: transform;
            }
            .buybuybuy
            {
                background-color: cornflowerblue;
                color: white;
            }
            .cartInfo
            {
                flex-grow: 1;
                flex-shrink: 1;
                font-size: pxToRem(32px);
                line-height: pxToRem(38.4px);
                .sumPrice
                {
                    color: white;
                    font-size: pxToRem(36px);

                }
                .sendPrice
                {
                    color: white;
                    font-size: pxToRem(20px);
                    line-height: pxToRem(24px);
                }
            }
            .quJiesuan
            {
                color: white;
                background-color: rgb(76,217,100);
                font-size: pxToRem(30px);
                font-weight: bold;
                height: pxToRem(96px);
                line-height: pxToRem(96px);
                text-align: center;
                width: pxToRem(210px);
            }
        }
        .cart-body
        {
            background-color: white;
            position: fixed;
            bottom: pxToRem(96px);
            color: rgb(51,51,51);
            font-size: pxToRem(32px);
            left: 0;
            line-height: pxToRem(38.4px);
            width: 100%;
            .cartHeader
            {
                border: pxToRem(1px) solid rgb(221,221,221);
                background-color: rgb(236,239,241);
                display: block;
                font-size: pxToRem(32px);
                line-height: pxToRem(80px);
                padding-left: pxToRem(25px);
                padding-right: pxToRem(25px);
                span
                {
                    border-left:pxToRem(7px) solid rgb(49,144,232);
                    font-size: pxToRem(32px);
                    color: rgb(102,102,102);
                    line-height: pxToRem(80px);
                    padding-left: pxToRem(10px);
                }
                a
                {
                    color: rgb(102,102,102);
                    background-size: pxToRem(20px);
                    float: right;
                    display: block;
                    font-size: pxToRem(26px);
                    line-height: pxToRem(80px);
                    padding-left: pxToRem(30px);

                }
            }
            .cartBody
            {
                .entityList
                {
                    @include flex();
                }
                .entirety-name
                {
                    align-items: center;
                    border-bottom: pxToRem(1px) solid rgb(238,238,238);
                    color: rgb(51,51,51);
                    font-size: pxToRem(32px);
                    line-height: pxToRem(38.4px);
                    margin-left: pxToRem(25px);
                    padding-top: pxToRem(15px);
                    padding-right: pxToRem(25px);
                    padding-bottom: pxToRem(15px);
                    text-align: left;
                }
                .entirety-price
                {
                    flex-grow: 2.5;
                    flex-shrink: 1;
                    font-size: pxToRem(32px);
                    font-weight: bold;
                    line-height: pxToRem(38.4px);
                    text-align: right;
                    white-space: nowrap;
                    color:rgb(255,102,0);
                    display: inline-block;
                }
                ul
                {
                    line-height: pxToRem(38.4px);
                    font-size: pxToRem(32px);
                    li
                    {
                        align-items: center;
                        border-bottom: pxToRem(1px) solid rgb(238,238,238);
                        color: rgb(51,51,51);
                        font-size: pxToRem(32px);
                        line-height: pxToRem(38.4px);
                        margin-left: pxToRem(25px);
                        padding-top: pxToRem(15px);
                        padding-right: pxToRem(25px);
                        padding-bottom: pxToRem(15px);
                        text-align: left;
                        @include flex();
                        .cart-body-price
                        {
                            flex-grow: 2.5;
                            flex-shrink: 1;
                            font-size: pxToRem(32px);
                            font-weight: bold;
                            line-height: pxToRem(38.4px);
                            text-align: right;
                            white-space: nowrap;
                            color:rgb(255,102,0);
                        }
                        .cart-body-add
                        {
                            flex-grow: 3;
                            flex-shrink: 1;
                            text-align: right;

                        }
                    }
                }
            }
        }

    }

    .ball-container
    {
        .bally {

            position: fixed;
            left: pxToRem(54px);
            bottom: pxToRem(115px);
            z-index: 22222222;

            &.drop-enter-active {
                transition: all .5s cubic-bezier(.62, -0.5, .89, .76);
                .ballx {
                    width: pxToRem(40px);
                    height: pxToRem(40px);
                    border-radius: 50%;
                    background-color: rgb(0, 160, 220);
                    transition: all .5s linear;
                }
            }
        }
    }

</style>