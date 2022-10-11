<script>

    import Data from "../../core/data/Data";
    import VueApexCharts from 'vue-apexcharts';

    export default {
        name: "timeline",
        props : ['url' , 'name'],
        components: {
            apexchart: VueApexCharts
        },
        data() {
            return {
                report: {},
                loading: false,
                showStatistics: false,
                data : new Data({
                    url : this.url,
                    prefix : 'audits',
                    other: 'statistics',
                }),
                groups : [
                    {
                        name : 'Events',
                        object : 'eventGroup',
                    },
                    {
                        name : 'User Types',
                        object : 'userGroup',
                    },
                ]
            };
        },
        methods : {
            toggleStatistics()
            {
                this.showStatistics = !this.showStatistics;
                window.scrollTo(0, 0);
            },
            init()
            {
                this.data.fetch();
            },
        },

        mounted() {
            this.init();
        }
    }
</script>
<template>
    <div :class="['dimmer' , loading  ? 'active' : '']">
        <div class="loader"></div>
        <div class="dimmer-content">
            <div class="row py-3 justify-content-center">
                <div v-if="data.stats !== null && showStatistics" class="col-lg-12">
                    <div class="row">
                        <div :key="`${k}--------`" v-for="(group , k) in groups" class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div v-if="data.stats[group.object]" class="card-body">
                                        <h5 class="header-title mt-2 text-center">{{ group.name }} Summary</h5>
                                        <apexchart :key="`${k}-------sss-`"
                                                   type="line"
                                                   height="250" :options="{
                                                chart: {
                                                    type: 'line',
                                                    zoom: {
                                                        enabled: false
                                                    }
                                                },
                                                dataLabels: {
                                                    enabled: false
                                                },
                                                stroke: {
                                                    width: 1,
                                                    curve: 'smooth'
                                                },
                                                xaxis: {
                                                    categories : data.stats[group.object].keys,
                                                    labels: {
                                                        show: true,
                                                        maxHeight: 120,
                                                        style: {
                                                            colors: [],
                                                            fontSize: '8px',
                                                            fontWeight: 400,
                                                            cssClass: 'apexcharts-xaxis-label',
                                                        },
                                                    }
                                                },
                                                yaxis: {
                                                    title: {
                                                        text: 'Number of users'
                                                    }
                                                },
                                                fill: {
                                                    opacity: 1
                                                },
                                            }"
                                                   :series="data.stats[group.object].chartDatasets">
                                        </apexchart>
                                    </div>
                                    <h5 class="header-title mt-2 mb-3 text-center">{{ group.name }}</h5>
                                    <div class="table-responsive">
                                        <table v-if="data.stats[group.object]" class="table table-centered mb-0 font-10 table-hover">
                                            <thead class="thead-light">
                                            <tr>
                                                <th/>
                                                <th>Type</th>
                                                <th class="text-center" v-for="item in data.stats[group.object].keys">{{ item }}
                                                </th>
                                                <th class="text-center">Totals</th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item , key) in data.stats[group.object].datasets">
                                                <td/>
                                                <td>{{ key}}</td>
                                                <td class="text-center" v-for="i  in item">{{ i }}</td>
                                                <td class="text-center"><strong> {{ data.stats[group.object].sideTotals[key] }}</strong></td>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td/>
                                                <td>Totals</td>
                                                <td class="text-center" v-for="i  in data.stats[group.object].bottomTotals"><strong>
                                                    {{ i }} </strong></td>
                                                <td class="text-center"><strong>{{ data.stats.total }}</strong></td>
                                                <td/>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="card">
                        <form @submit.prevent="data.fetch()" class="card-body">
                            <div class="d-flex flex-fill mb-2">
                                <div class="mr-3 flex-fill">
                                    <select v-model="data.filters['group']" class="custom-select">
                                        <option :value="undefined">Group By</option>
                                        <option value="month">Month</option>
                                        <option value="week">Week</option>
                                        <option value="days">Days</option>
                                    </select>
                                </div>
                                <div class="mr-3 flex-fill">
                                    <input type="text" v-model="data.filters['user_id']" class="form-control" placeholder="User ID">
                                </div>
                                <div class="mr-3 flex-fill">
                                    <input type="text" v-model="data.filters['auditable_id']" class="form-control" placeholder="Model ID">
                                </div>
                                <div class="mr-3 flex-fill">
                                    <select v-model="data.filters['auditable_type']" class="custom-select">
                                        <option :value="undefined">Choose Type</option>
                                        <option value="App\User">User</option>
                                        <option value="App\Account">Account</option>
                                        <option value="App\Corporate">Corporate</option>
                                        <option value="App\Authorisation">Authorisation</option>
                                        <option value="App\Bank">Bank</option>
                                        <option value="App\Batch">Batch</option>
                                        <option value="App\Corporate">Corporate</option>
                                        <option value="App\InternalTransfer">Internal Transfer</option>
                                        <option value="App\ReportRequest">Report Request</option>
                                        <option value="App\RTGSTransfer">RTGS Transfer</option>
                                        <option value="App\SelfRegistration">Self Registration</option>
                                        <option value="App\StatementEnquiry">Statement Enquiry</option>
                                        <option value="App\Transaction">Transaction</option>
                                    </select>
                                </div>
                                <div class="mr-3 flex-fill">
                                    <select v-model="data.filters['event']" class="custom-select">
                                        <option :value="undefined">Choose Event</option>
                                        <option value="create">Create</option>
                                        <option value="update">Update</option>
                                    </select>
                                </div>
                                <div class="mr-3 d-flex align-items-center flex-fill">
                                    <span class="mr-2 text-right filter-label">Created Start</span>
                                    <input type="date" v-model="data.filters['startDate']" class="form-control" placeholder="ID">
                                </div>
                                <div class="d-flex align-items-center flex-fill">
                                    <span class="mr-2 text-right filter-label">Created End</span>
                                    <input type="date" v-model="data.filters['endDate']" class="form-control" placeholder="ID">
                                </div>
                            </div>
                            <div class="d-flex flex-fill mb-2">
                                <div class="mr-2 flex-fill">
                                    <div class="app-search">
                                        <div>
                                            <div class="input-group">
                                                <input type="text" v-model="data.filters.search" placeholder="Search..." class="form-control">
                                                <span class="mdi mdi-magnify"></span>
                                                <div class="input-group-append">
                                                    <button type="submit" @click.prevent="data.fetch()" :class="['btn btn-primary' , data.loading ? 'btn-loading' : '' ]">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <button @click="data.fetch()" :class="['btn btn-primary px-3' , data.loading ? 'btn-loading' : '' ]">
                                        <i class="mdi mdi-autorenew"></i>
                                    </button>
                                    <button @click.prevent="toggleStatistics()"
                                            :class="['btn ml-2' , loading ? 'btn-loading' : '' , showStatistics ? 'btn-light' : 'btn-primary' ]">
                                        <i class="mdi mdi-chart-line mr-2"></i> {{ showStatistics ? 'Hide' : 'Show' }} Show Statistics
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="h4 m-o">
                                    {{ name }}
                                </div>
                                <div class="ml-auto mr-3 d-flex align-items-center">
                                    <div class="mr-2">Showing</div>
                                    <div class="form-group mb-0">
                                        <select @change="data.fetch()" v-model="data.filters.size" class="custom-select">
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="25">25</option>
                                            <option value="30">30</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mr-3 d-flex align-items-center">
                                    <div class="mr-2">Sort By</div>
                                    <div class="form-group mb-0">
                                        <select @change="data.fetch()" v-model="data.sort.field" class="custom-select">
                                            <option value="id">ID</option>
                                            <slot name="sort-fields"/>
                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div class="form-group mb-0">
                                        <select @change="data.fetch()" v-model="data.sort.direction" class="custom-select">
                                            <option value="asc">Ascending</option>
                                            <option value="desc">Descending</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-11">
                    <div class="">
                        <div class="media d-block d-lg-flex">
                            <div class="media-body">
                                <div class="timeline-group tx-13">
                                    <div class="timeline-label py-5"></div>
                                    <div :key="item.id" v-for="item in data.content.data" class="timeline-item">
                                        <div class="timeline-time">
                                            <strong>{{ item.created_at_read }} <br> {{ item.last_update }}</strong>
                                        </div>
                                        <div class="timeline-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="h6 mg-b-0 d-flex">
                                                        <div>
                                                            {{ item.event }} : {{ item.user ? item.user.name + ' ' + item.user.last_name   : 'Root System' }} - {{ item.user ? item.user.email : 'root@steward.co.zw' }} - <span class="text-primary">#{{ item.user ? item.user.id : 'ROOT' }}</span>
                                                        </div>
                                                        <div class="ml-auto">
                                                            <router-link :to="`/audits/${item.id}/view`" class="action-icon text-primary">
                                                                <i class="mdi mdi-eye mdi-24px"/>
                                                            </router-link>
                                                        </div>
                                                    </div>
                                                    <h6 class="mg-b-0"><span class="text-primary">#{{ item.auditable_id }}</span> {{ item.auditable_type }}</h6>
                                                    <p class="mb-3">
                                                        <span class="text-muted">IP : </span> {{ item.ip_address }}<br>
                                                        <span class="text-muted">User Agent : </span> {{ item.user_agent }}<br>
                                                        <span class="text-muted">Url : </span> <span class="text-primary"> {{ item.url }} </span> <br>
                                                    </p>
                                                    <table v-if="Object.entries(item.old_values).length > 0 || Object.entries(item.new_values).length > 0 " class="table border-bottom border-right border-left">
                                                        <thead>
                                                        <tr>
                                                            <th v-if="Object.entries(item.old_values).length > 0" class="w-50">Old</th>
                                                            <th v-if="Object.entries(item.new_values).length > 0 " class="w-50">New</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td  v-if="Object.entries(item.old_values).length > 0"  class="">
                                                                <div :key="`${i}-${k}-${item.id}-old-values`" v-for="(i , k ) in item.old_values"><span class="text-muted">{{ k.replace('_',' ') }} : </span>{{ i |  string_limit(50) }}</div>
                                                            </td>

                                                            <td v-if="Object.entries(item.new_values).length > 0 "  class="">
                                                                <div :key="`${i}-${k}-${item.id}-new-values`" v-for="(i , k ) in item.new_values"><span class="text-muted">{{ k.replace('_',' ') }} : </span>{{ i  |  string_limit(50)  }}</div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div class="timeline-label pb-4 pt-4">
                                        <button @click="data.append()" v-if="data.content.total !== data.content.to && data.content.data.length > 0" :class="['btn btn-primary btn-sm' , data.loading ? 'btn-loading' :'']">
                                            <i class="mdi mdi-arrow-down mr-1"></i> Load More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
