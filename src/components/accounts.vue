<template>
    <div id="accounts">
        这里是结算页面
    </div>
</template>
<script type="text/ecmascript-6">
    import {
        setStorage,
        getStorage
    } from '@/config/location';
    export default
    {
        name:'accounts',
        data()
        {
            return{
                accout:this.$route.query.zj
            }
        },
        beforeRouteEnter(to,from,next)
        {
            console.log('beforeEnter');
            console.log('to',to);
            console.log('from',from);
            console.log('this',this);
            next(
                vm => {
                    if(!getStorage('Meng'))
                    {
                        next('/login');
                    }
                    else
                    {
                        console.log(this.$route.query.shopId);
                    }
                }


            )
        },
        beforeRouteLeave(to,from,next)
        {
            console.log('beforeLeave');
            console.log('to',to);
            console.log('from',from);
            console.log('this',this);
            next();
        },
    }

</script>
<style>

</style>