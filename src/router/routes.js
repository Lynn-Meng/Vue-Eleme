/**
 * Created by if-information on 2017/9/16.
 */
import Origin from '@/origin';
import Home from '@/pages/home/home';
import Find from '@/pages/find/find';
import Order from '@/pages/order/order';
import Login from '@/components/login';
import Accounts from '@/components/accounts';
const Mine = () => import('@/pages/mine/mine');
const Shop = () => import('@/pages/shop/shop');
export default
[
    {
        path:'/',
        component:Origin,
        redirect:'/home',
        children:
            [
                {
                    path:'/home',
                    component:Home,
                },
                {
                    path:'/find',
                    component:Find
                },
                {
                    path:'/order',
                    component:Order
                },
                {
                    path:'/mine',
                    component:Mine
                },
                {
                    path:'/shop',
                    component:Shop,
                },
                {
                    path:'/login',
                    component:Login,
                },
                {
                    path:'/accounts',
                    component:Accounts,
                }
            ]



    }
]
