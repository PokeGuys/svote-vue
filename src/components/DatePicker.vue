<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable :min="min" :max="max">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  data() {
    return {
      modal: false,
    };
  },
})
export default class DatePicker extends Vue {
  @Prop() private value!: string[];

  @Prop() private label!: string;

  @Prop() private min!: string;

  @Prop() private max!: string;

  get date() {
    return this.value;
  }

  set date(value: string[]) {
    this.$emit('input', value);
  }
}
</script>
