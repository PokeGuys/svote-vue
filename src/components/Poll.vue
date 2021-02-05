<template>
  <div class="poll">
    <h3 class="qst text-center" v-text="question"></h3>
    <div class="ans-cnt">
      <div v-for="(ans, idx) in calcAnswers" :key="idx" class="ans">
        <template v-if="!finalResults">
          <div
            v-if="!visibleResults"
            :class="{ 'ans-no-vote noselect': true, active: ans.selected }"
            @click.prevent="handleVote(ans)"
          >
            <span class="txt" v-text="ans.text"></span>
          </div>
          <div v-else :class="{ 'ans-voted': true, selected: ans.selected }">
            <span v-if="ans.percent" class="percent" v-text="ans.percent"></span>
            <span class="txt" v-html="ans.text"></span>
          </div>
          <span class="bg" :style="{ width: visibleResults ? ans.percent : '0%' }"></span>
        </template>
        <template v-else>
          <div :class="{ 'ans-voted': true, final: true, selected: ans.selected }">
            <span v-if="ans.percent" class="percent" v-text="ans.percent"></span>
            <span class="txt" v-text="ans.text"></span>
          </div>
          <span
            :class="{ bg: true, selected: mostVotes == ans.votes }"
            :style="{ width: ans.percent }"
          ></span>
        </template>
      </div>
      <div class="votes" v-if="visibleResults || finalResults" v-text="totalVotes + ' votes'"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface Answer {
  id: string;
  text: string;
  votes: number;
  percent?: string;
  selected?: boolean;
}

@Component({
  name: 'Poll',
})
export default class Poll extends Vue {
  @Prop() private readonly question!: string;

  @Prop() private readonly answers!: Answer[];

  @Prop({
    default: false,
  })
  private readonly finalResults!: boolean;

  public visibleResults!: boolean;

  public localAnswers!: Answer[];

  constructor() {
    super();
    this.visibleResults = false;
    this.localAnswers = this.answers;
  }

  get totalVotes() {
    return this.localAnswers.reduce((acc, ans) => acc + ans.votes, 0);
  }

  get mostVotes() {
    const mostVoted = this.localAnswers.reduce((prev, current) => {
      if (prev.votes > current.votes) {
        return prev;
      }
      return current;
    });
    return mostVoted.votes;
  }

  get calcAnswers() {
    if (this.totalVotes === 0) {
      return this.localAnswers.map((a) => {
        a.percent = '0%';
        return a;
      });
    }
    return this.localAnswers.map((a) => {
      if (a.votes > 0) {
        const percentage = Math.round((a.votes / this.totalVotes) * 100);
        a.percent = `${percentage}%`;
      } else {
        a.percent = '0%';
      }

      return a;
    });
  }

  handleVote(ans: Answer) {
    ans.votes += 1;
    ans.selected = true;
    this.localAnswers = [...this.localAnswers];
    this.visibleResults = true;
    this.$emit('voted', {
      ...ans,
      totalVotes: this.totalVotes,
    });
  }
}
</script>

<style>
.poll {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.poll .noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.poll .qst {
  font-weight: normal;
}
.poll .ans-cnt {
  margin: 20px 0;
}
.poll .ans-cnt .ans {
  position: relative;
  margin-top: 10px;
}
.poll .ans-cnt .ans:first-child {
  margin-top: 0;
}

.poll .ans-cnt .ans-no-vote {
  text-align: center;
  border: 2px solid #77c7f7;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 0;
  transition: background 0.2s ease-in-out;
  -webkit-transition: background 0.2s ease-in-out;
  -moz-transition: background 0.2s ease-in-out;
}

.poll .ans-cnt .ans-no-vote .txt {
  color: #77c7f7;
  transition: color 0.2s ease-in-out;
  -webkit-transition: color 0.2s ease-in-out;
  -moz-transition: color 0.2s ease-in-out;
}

.poll .ans-cnt .ans-no-vote.active {
  background: #77c7f7;
}

.poll .ans-cnt .ans-no-vote.active .txt {
  color: #fff;
}

.poll .ans-cnt .ans-voted {
  padding: 5px 0;
}

.poll .ans-cnt .ans-voted .percent,
.poll .ans-cnt .ans-voted .txt {
  position: relative;
  z-index: 1;
}
.poll .ans-cnt .ans-voted .percent {
  font-weight: bold;
  min-width: 51px;
  display: inline-block;
  margin: 0 10px;
}

.poll .ans-cnt .ans-voted.selected .txt:after {
  content: '✔';
  margin-left: 10px;
}

.poll .ans-cnt .ans .bg {
  position: absolute;
  width: 0%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  background-color: #e1e8ed;
  border-radius: 5px;
  transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
  -webkit-transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
  -moz-transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
}

.poll .ans-cnt .ans .bg.selected {
  background-color: #77c7f7;
}

.poll .votes {
  font-size: 14px;
  color: #8899a6;
}
</style>
