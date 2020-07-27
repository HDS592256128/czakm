import axios from '@/common/api/api';
import _ from 'lodash';

const state = {
    checkTypeData: {},
    siteRankData: {},
    clockCountData: {},
    appealTotalData: {},
    unusualData: {}
}

const mutations = {
    updateCheckTypeData(state, data) {
        state.checkTypeData = data;
    },

    updateSiteRankData(state, data) {
        state.siteRankData = data;
    },

    updateClockCountData(state, data) {
        state.clockCountData = data;
    },

    updateAppealTotalData(state, data) {
        state.appealTotalData = data;
    },

    updateUnusualData(state, data) {
        state.unusualData = data;
    },
}

const actions = {
    // 核验类型
    getCheckTypeData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryAkmCheckTotalByTimeXzqhCode',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateCheckTypeData', res.data);
        }).catch(err => {
            commit('updateCheckTypeData', {});
        });
    },

    // 检查点检查TOP10
    getSiteRankData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryAkmSiteTotalByTimeXzqhCode',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateSiteRankData', res.data);
        }).catch(err => {
            commit('updateSiteRankData', {});
        });
    },

    // 打卡人数
    getClockCountData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryClockUserTotal',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateClockCountData', res.data);
        }).catch(err => {
            commit('updateClockCountData', {});
        });
    },

    // 申诉总数
    getAppealTotalData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryAppealHisTotal',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateAppealTotalData', res.data);
        }).catch(err => {
            commit('updateAppealTotalData', {});
        });
    },

    // 异常总数
    getUnusualData({
        commit,
        state
    }, params) {
        axios({
            url: '/dataStatistics/queryUnusualRecordTotal',
            method: 'post',
            data: params,
            noLoading: true
        }).then(res => {
            commit('updateUnusualData', res.data);
        }).catch(err => {
            commit('updateUnusualData', {});
        });
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}