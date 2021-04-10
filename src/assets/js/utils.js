import store from '../../store';

function addStoreEchart(newEchart) {
    let echartList = store.state.echartList;
    echartList.push(newEchart);
    store.commit("updateStateByKey", {
        key: "echartList",
        value: echartList,
    });
}

function clearStoreEchart() {
    store.commit("updateStateByKey", {
        key: "echartList",
        value: [],
    });
}


export default {
    addStoreEchart,
    clearStoreEchart,
}