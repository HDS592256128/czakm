import axios from '@/common/api/api';
import _ from 'lodash';

const state = {
    applyData: {},
    vChartsData: {},
    brightNumData: {},
}

const mutations = {
    updateApplyData(state, data) {
        state.applyData = data;
    },
    updateVChartsData(state, data) {
        state.vChartsData = data;
    },
    updateBrightNumData(state, data) {
        state.brightNumData = data;
    },
}

const actions = {
    //申领安康码人数
    getApplyData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryAkmHealthTotalByTimeXzqhCode',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateApplyData', res.data);
        }).catch(err => {
            commit('updateApplyData', {});
        });
    },
    //图形接口
    getVChartsData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryAkmHealthXzqhGraphByTimeXzqhCode',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateVChartsData', res.data);
        }).catch(err => {
            commit('updateVChartsData', {});
        });
    },
    //亮码次数
    getBrightNumData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryAkmShowTotalByTimeXzqhCode',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateBrightNumData', res.data);
        }).catch(err => {
            commit('updateBrightNumData', {});
        });
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}