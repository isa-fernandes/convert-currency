<template>
    <div>
        <b-row class="row-outter mt-5">
            <b-col>
                <h1 class="text-primary">Open Exchange</h1>
                <h2 v-show="showConverted">{{convertedValue | toCurrency(this.selectedDestination)}}</h2>
                <h2 v-show="!showConverted">Press the button...</h2>
            </b-col>
        </b-row>
        <b-row class="row-outter">
            <b-col cols="2" class="text-left" offset="3">
                <b-row>
                    <b-col>
                        <label>Value</label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <money class="form-control form-control-sm" v-model="value" v-bind="money"></money>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="2" class="text-left">
                <b-row>
                    <b-col>
                        <label>Origin Currency</label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-select v-model="selectedOrigin" :options="currencyOpts" @change="updateSuffix" size="sm"></b-form-select>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="2" class="text-left">
                <b-row>
                    <b-col>
                        <label>Destination Currency</label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-select v-model="selectedDestination" :options="currencyOpts" size="sm"></b-form-select>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="row-outter">
            <b-col>
                <b-button @click="convert" variant="primary" class="btn-round">CONVERT</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {Money} from 'v-money'

export default {
    data () {
        return {
            showConverted: false,
            value: 1,
            convertedValue: 0,
            selectedOrigin: 'USD',
            selectedDestination: 'BRL',
            currencyOpts: [],
            money: {
                decimal: ',',
                thousands: '.',
                prefix: '',
                suffix: ' ' + this.selectedOrigin,
                precision: 2,
                masked: false /* doesn't work with directive */
            }
        }
    },
    mounted () {
        this.axios
            .get('https://openexchangerates.org/api/currencies.json')
            .then(response => {
                for (var i in response.data) {
                    this.currencyOpts.push({value: i, text: i})
                    this.money.suffix = ' ' + this.selectedOrigin
                }
            })
    },
    methods: {
        updateSuffix: function () {
            this.money.suffix = ' ' + this.selectedOrigin
        },
        convert: function () {
            var latestRates;
            var url = 'https://openexchangerates.org/api/latest.json?app_id=' + process.env.VUE_APP_EXCHANGE_APP_ID
            this.axios
                .get(url)
                .then(response => {
                    latestRates = response.data.rates
                    var origin = latestRates[this.selectedOrigin]
                    var destination = latestRates[this.selectedDestination]
                    var rate = destination/origin
                    this.convertedValue = this.value * rate
                    this.showEnable()
                })
        },
        showDisable: function () {
            this.showConverted = false;
        },
        showEnable: function () {
            this.showConverted = true;
        }
    },
    watch: {
        value: function () {
            this.showDisable()
        },
        selectedOrigin: function () {
            this.showDisable()
        },
        selectedDestination: function () {
            this.showDisable()
        }
    },
    filters: {
        toCurrency: function (value, destination) {
            if (typeof value !== "number") {
                return value;
            }
            var formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: destination,
                minimumFractionDigits: 2
            });
            return formatter.format(value);
        }
    },
    components: {Money}
}
</script>

<style scoped>
.row-outter {
    padding: 2.5rem;
}
.btn-round {
    color: black; 
    border-radius: 25px;
    padding: 0.5rem 1.5rem;
    font-weight: 700;
}
</style>