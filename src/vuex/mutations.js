/**
 * Created by if-information on 2017/9/27.
 */

//本文件存储一些 突变具体函数
import {
    SAVE_LOCATION,
    ADD_CAR,
    SUB_CAR,
    CLEAR_CAR,
} from './mutation-types';


export default
{
    [SAVE_LOCATION](state,location)
    {
        state.location = location;
    },

    [ADD_CAR](state,{shopId,foodId,name,original_price,price,spec,dlIndex,ddIndex})
    {
        let car = state.carList;
        let shop = car[shopId] = (car[shopId] || {});
        if (shop[foodId])
        {
            // console.log('come in');
            shop[foodId].count += 1;
        }
        else
        {
            shop[foodId] = {
                name,
                original_price,
                price,
                spec,
                count:1,
                dlIndex,
                ddIndex
            }
        }
        state.carList = {...car};
        // console.log(state.carList);
    },



    [SUB_CAR](state,{shopId,foodId})
    {
        let car = state.carList;
        let shop = car[shopId];
        shop[foodId].count--;

        if(shop[foodId].count === 0)
        {
            delete shop[foodId];

            if(Object.keys(shop).length === 0) {

                car[shopId] = null;
            }
            // shop[foodId] = null;





        }

        state.carList = {...car};
    },


    [CLEAR_CAR](state,shopId)
    {
        let car = state.carList;
        car[shopId] = null;
        state.carList = {...car};
    }

}