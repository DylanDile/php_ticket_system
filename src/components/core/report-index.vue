<script>
    import Data from "../../core/data/Data";

    export default {
        name: "report-index",
        props: ['url', 'prefix', 'name', 'other', 'report'],
        data() {
            return {
                requested: false,
                loading: false,
                showStatistics: false,
                download: {},
                message: "Generating report , Please wait ...",
                data: new Data({
                    url: this.url,
                    report: this.report,
                    prefix: this.prefix,
                    other: this.other,
                })
            };
        },
        methods: {
            toggleStatistics() {
                this.showStatistics = !this.showStatistics;
                window.scrollTo(0, 0);
            },
            runReport() {
                this.loading = true;
                window.axios.get(this.data.buildReportUrl()).then((response) => {
                    window.alerts.success(response).then((res) => {
                        this.$router.push("/queue");
                    });
                }).finally(() => {
                    this.loading = false;
                });
            },
        },
        mounted() {
            this.data.fetch();
        }
    }
</script>

<template>
    <div class="row py-4">
        <div v-if="data.stats !== null && showStatistics" class="col-lg-12">
            <div class="row">
                <slot name="statistics" :row="data"/>
            </div>
        </div>
        <slot :filters="data.filters" name="extra-filters"/>
        <div class="col-lg-12">
            <form @submit.prevent="data.fetch()" class="card">
                <div class="card-body d-flex flex-wrap flex-fill align-items-center">
                    <slot :filters="data.filters" name="filters"/>
                    <div class="flex-fill form-group mr-2">
                        <div class="app-search">
                            <div>
                                <div class="input-group">
                                    <input type="text" v-model="data.filters.search" placeholder="Search..."
                                           class="form-control">
                                    <span class="mdi mdi-magnify"></span>
                                    <div class="input-group-append">
                                        <button type="submit" @click.prevent="data.fetch()"
                                                :class="['btn btn-primary' , data.loading ? 'btn-loading' : '' ]">Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button @click.prevent="data.fetch()" :class="['btn btn-primary' , data.loading ? 'btn-loading' : '' ]">
                            <i class="mdi mdi-filter"></i>Apply Filter
                        </button>
                        <button @click.prevent="toggleStatistics()"
                                :class="['btn  ml-2' , loading ? 'btn-loading' : '' , showStatistics ? 'btn-light' : 'btn-primary' ]">
                            <i class="mdi mdi-chart-line mr-2"></i> {{ showStatistics ? 'Hide' : 'Show' }} Statistics
                        </button>
                        <button @click="runReport()" :class="['btn btn-primary ml-2' , loading ? 'btn-loading' : '' ]">
                            <i class="mdi mdi-check mr-2"></i> Run Report
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex align-items-center p-3 flex-wrap">
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
                <div class="table-responsive">
                    <table class="table table-centered mb-0 font-12">
                        <thead class="thead-light">
                        <tr>
                            <th/>
                            <slot name="table-header"/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="row in data.content.data">
                            <td/>
                            <slot name="table-row" :row="row"/>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-body d-flex align-items-center border-top">
                    <div class="mr-auto font-weight-bolder">
                        Showing {{ data.content.data.length }} of {{ data.content.total }} Records
                    </div>
                    <div v-if="data.content.total !== data.content.to && data.content.data.length > 0">
                        <button @click="data.append()"
                                :class="['btn btn-primary' , data.loading ? 'btn-loading' : '' ]">Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


