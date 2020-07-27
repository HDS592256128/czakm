import Vue from 'vue';

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 支持分页的select控件
import vSelectPage from '@/components/form/v-selectpage';

import '@/assets/styles/_global.scss';

import '@/assets/iconfont/iconfont.css';

// 接口服务
import API from './api';

import axios from './api/api';

// loading
import Loading from '@/utils/loading';

//常用message
import defaultMessage from '@/utils/defaultMessage';

// 过滤器
import filter from '../filters/strFilter';

// Treeselect
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

import dataEmpty from '@/components/form/dataEmpty';

Vue.use(filter);
Vue.use(Loading);
Vue.use(dataEmpty);
Vue.use(defaultMessage);
Vue.use(ElementUI);
Vue.use(API);

Vue.use(vSelectPage, {
  dataLoad: function (vue, url, params) {
    const {
      pageNumber,
      pageSize
    } = params;

    Object.assign(params, {
      currentPageNo: pageNumber,
      pageSize: pageSize
    });

    params.name ? params.name = params.name.trim() : '';

    delete params.pageNumber;

    return axios({
      url,
      method: 'POST',
      data: params,
      noLoading: true
    });
  }
});

Vue.config.productionTip = false;