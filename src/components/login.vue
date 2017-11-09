<template>
    <div id="login">
        <form>
            <label>用户名</label>
            <input type="text" v-model="username"><br>
            <label>密  码</label>
            <input type="password" ref="pass"><br>
            <button v-on:click="check">提交</button>
        </form>
    </div>
</template>
<script type="text/ecmascript-6">
    import {
        setStorage,
        getStorage
    } from '@/config/location';
    export default
    {
        name:'login',
        data()
        {
            return {
                username:null
            }
        },
        methods:{
            check:function () {
                setStorage('Meng',this.username);
                this.$router.push({
                    path:'/accounts',
                });
            }
        },

    }
</script>
<style>
form{
    font-size: 50px;
    width: 100%;
    height: 100%;
}
</style>