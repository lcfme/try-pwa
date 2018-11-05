<template>
  <div class="page-container md-layout-column" @click="captureCurrentPage">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click.stop="toggleDrawer">
        <md-icon>list</md-icon>
      </md-button>
      <span class="md-title">职尚课程回放</span>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button">
          <md-icon>share</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-drawer :md-active.sync="showSlide" md-persistent="full">
      <div @click.stop="captureDrawer">
        <md-list class="md-double-line">
          <md-subheader>课程列表</md-subheader>
          <md-list-item v-for="(item, index) in replayList"
            :key="index"
            @click.stop="setCurrentCourseIndex(index)"
          >
            <div class="md-list-item-text">
              <span>{{item.className}}</span>
              <span>{{formatDuration(item.duration)}}</span>
            </div>
          </md-list-item>
          <md-divider></md-divider>
        </md-list>
      </div>
    </md-drawer>
    <div class="main-app">
      <div v-if="currentCourseObject">
        <div class="course-name">{{currentCourseObject.className}}</div>
        <player :src="currentCourseObject.fileUrl || currentCourseObject.videoUrl"/>
      </div>
      <div v-else>
        <div class="choose-reply-course">请选择回放课程</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getRecords, formatDuration } from '@/logic';
import Player from '@/components/common/Player';
import emptyFunction from '@/utils/emptyfunction';

export default {
  name: 'Index',
  components: {
    Player
  },
  data() {
    return {
      showSlide: true,
      replayList: [],
      currentCourseIndex: null,
    };
  },
  computed: {
    currentCourseObject() {
      return this.currentCourseIndex === null ? null : this.replayList[this.currentCourseIndex];
    }
  },
  created() {
    getRecords().then((data) => {
      this.replayList = data;
    });
  },
  methods: {
    captureDrawer: emptyFunction,
    captureCurrentPage() {
      if (this.showSlide && this.currentCourseIndex !== null) {
        this.showSlide = false;
      }
    },
    toggleDrawer() {
      this.showSlide = !this.showSlide;
    },
    formatDuration(num) {
      return formatDuration(num);
    },
    setCurrentCourseIndex(i) {
      if (this.currentCourseIndex === i) return;
      this.currentCourseIndex = i;
      this.showSlide = false;
    }
  },
  destroyed() {
    this.currentCourseIndex = null;
    this.replayList = [];
  }
};
</script>

<style lang="less" scoped>
  .main-app {
    padding: 10px 20px;
    position: relative;
  }

  .course-name {
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
  }

  .choose-reply-course {
    color: #676767;
  }
</style>
