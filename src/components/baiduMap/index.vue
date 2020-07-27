<template>
  <div>
    <!-- 初始化一个空地图，用于加载百度mapapi 获取gps对应的地址 -->
    <span v-show="showAddress">{{address}}</span>&nbsp;
    <span class="pos-icon-priv" @click="show" v-if="location">
      <i class="el-icon-map-location"></i>
    </span>
    <baidu-map style="width:0;height:0;" @ready="mapReady" :ak="ak"></baidu-map>
    <el-dialog
      :append-to-body="true"
      title="查看详情"
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
    >
      <baidu-map
        v-if="dialogFormVisible"
        class="bmView"
        :scroll-wheel-zoom="true"
        :center="location"
        :zoom="zoom"
        :ak="ak"
      >
        <bm-view style="width: 100%; height:400px; flex: 1"></bm-view>
        <BmMarker @click="isShowInfo = true" :position="location">
          <bm-info-window
            :show="isShowInfo"
            @close="infoWindowClose"
            @open="infoWindowOpen"
          >{{address}}</bm-info-window>
        </BmMarker>
      </baidu-map>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BaiduMap from "@comp/vue-baidu-map/components/map/Map.vue";
import BmView from "@comp/vue-baidu-map/components/map/MapView.vue";
import BmMarker from "@comp/vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "@comp/vue-baidu-map/components/overlays/InfoWindow"; //标注弹窗
export default {
  components: {
    BaiduMap,
    BmView,
    BmInfoWindow,
    BmMarker
  },
  props: ["lat", "lng", "title", "showAddress"],
  data() {
    return {
      dialogFormVisible: false,
      isShowInfo: false,
      BMap: null,
      address: "暂无数据",
      zoom: 12.8
    };
  },
  computed: {
    location() {
      if (this.lng && this.lat) {
        return {
          lng: this.lng,
          lat: this.lat
        };
      } else {
        return null;
      }
    },
    ak() {
      const config = this.$store.state.systemConfig;
      return config ? config.baiduMapKey : "";
    }
  },
  methods: {
    mapReady({ BMap, map }) {
      this.BMap = BMap;
      this.checkAddress();
    },
    show() {
      if (!this.ak) {
        this.$message.warning("系统缺少百度地图ak码");
        return false;
      }
      this.dialogFormVisible = true;
    },
    infoWindowClose() {
      this.isShowInfo = false;
    },

    infoWindowOpen() {
      this.isShowInfo = true;
    },
    checkAddress() {
      if (this.showAddress && this.lng && this.lat && this.BMap) {
        // 根据gps反查地址
        let geoc = new this.BMap.Geocoder();
        let point = new BMap.Point(this.lng, this.lat);
        geoc.getLocation(point, rs => {
          let addComp = rs.addressComponents;
          let _cll = [
            addComp.province,
            addComp.city,
            addComp.district,
            addComp.street
          ];
          _cll = _.compact(_cll);
          this.address = _cll.join(",");
        });
      } else {
        this.address = "暂无数据";
      }
    }
  },
  watch: {
    location() {
      this.checkAddress();
    }
  }
};
</script>

<style lang="scss">
.bmView {
  height: 400px;
}
.pos-icon-priv {
  color: $theme-color;
  cursor: pointer;
}
</style>