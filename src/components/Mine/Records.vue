<template>
  <div id="records">
    <MineTop title="消费记录"></MineTop>
    <!-- 消费记录 -->
    <div>
      <ul class="records-list" v-for="(val,index) in recordlist" :key="index">
        <li class="list-title" v-show="val.show">
          <span>{{val.data}}</span>
        </li>
        <li class="list-item">
          <div class="list-item-l p-gray f12">
            {{val.week}}
            <br>
            {{val.day}}
          </div>
          <div class="list-item-r">
            <div>
              <p class="f14 f-p">
                {{val.name}}
                <span class="p-blue f12">-{{val.bool}}金币</span>
              </p>
              <p class="p-gray f12">{{val.chapter}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import MineTop from "../Book/Topbar.vue";
export default {
  name: "records",
  components: {
    MineTop
  },
  data() {
    return {
      recordlist: [],
      datashow: false
    };
  },
  computed: {},
  methods: {
    //获取数据
    getData() {
      var _this = this;
      this.Http.post({
        action: 1010,
        success: function(result) {
          var recordlist = [];
          result.list.forEach((element, index) => {
            var s = _this.getFormatDate(element.time * 1000, "yyyy-MM");
            var d = _this.getFormatDate(element.time * 1000, "MM-dd");
            var w = _this.getFormatDate(element.time * 1000, "w");
            if (element.chapterInfo == null) {
              element.chapter = "章节已调整";
            } else {
              element.chapter = "第" + element.chapterInfo.sort + "话";
            }
            var json = {
              data: s,
              day: d,
              week: w,
              name: element.bookInfo.title,
              chapter: element.chapter,
              bool: element.book_bean
            };
            recordlist.push(json);
          });
          for (let index = 0; index < recordlist.length; index++) {
            console.log(recordlist.length);
            var maxL = 0;
            if (index + 1 >= recordlist.length) {
              maxL = recordlist.length - 1;
            } else {
              maxL = index + 1;
            }
            if (recordlist[index].data != recordlist[maxL].data) {
              if (index == 0) {
                recordlist[0].show = true;
              } else {
                recordlist[maxL].show = true;
              }
            } else {
              if (index == 0) {
                recordlist[0].show = true;
              } else {
                recordlist[maxL].show = false;
              }
            }
          }
          console.log(recordlist);
          _this.recordlist = recordlist;
        }
      });
    },
    getFormatDate(timestamp, type) {
      var newDate = new Date(timestamp);
      Date.prototype.format = function(format) {
        var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          w: this.getDay(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
        };
        if (date.w == 0) date.w = "周日";
        if (date.w == 1) date.w = "周一";
        if (date.w == 2) date.w = "周二";
        if (date.w == 3) date.w = "周三";
        if (date.w == 4) date.w = "周四";
        if (date.w == 5) date.w = "周五";
        if (date.w == 6) date.w = "周六";
        if (/(y+)/i.test(format)) {
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? date[k]
                : ("00" + date[k]).substr(("" + date[k]).length)
            );
          }
        }
        return format;
      };
      // return newDate.format("yyyy-MM-dd h:m");
      return newDate.format(type);
    }
  },
  mounted() {
    this.getData();
  },
  props: {}
};
</script>
<style lang="scss" scoped>
.records-list {
  .list-title {
    background: #f4f4f4;
    color: rgba(0, 0, 0, 0.54);
    padding: 0 1rem;
    height: 1.75rem;
    line-height: 1.75rem;
  }
  .list-item {
    padding: 0.6rem 1rem;
    display: flex;
    border-bottom: 1px solid #f4f4f4;
    .list-item-l {
      width: 2.5rem;
      line-height: 1.1rem;
    }
    .list-item-r {
      width: 100%;
      line-height: 1.1rem;
      position: relative;
      p {
        margin-left: 1.2rem;
      }
      .f-p {
        display: flex;
        justify-content: space-between;
      }

      &::before {
        position: absolute;
        content: "";
        width: 2px;
        height: 2.2rem;
        line-height: 2.2rem;
        background: #f4f4f4;
      }
    }
  }
  .p-gray {
    color: #9e9e9e;
  }
  .p-blue {
    color: #f44336;
  }
}
</style>


