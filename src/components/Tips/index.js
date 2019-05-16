import tipsComponent from './tips.vue';
import lastreadComponent from './lastread.vue';

export const tips = {
    install : function (Vue){
        Vue.component('tips',tipsComponent)
    }
};

export const lastread = {
    install : function (Vue){
        Vue.component('lastread',lastreadComponent)
    }
};
