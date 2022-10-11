<script>
    import Data from "../../core/data/Data";
    export default {
        name: "page-index",
        props : ['url', 'prefix' , 'name'],
        data(){
            return {
                data :  new Data({
                    url : this.url,
                    prefix : this.prefix
                })
            };
        },
        mounted() {
            this.data.fetch()
        }
    }
</script>

<template>
    <div class="row text-sm">
        <div class="col-lg-12">

          <form @submit.prevent="data.fetch()">
            <div class="row g-3 mb-4 align-items-center justify-content-between">
              <div class="col-auto">
                <h1 class="app-page-title mb-0">{{ name }}</h1>
              </div>
             <div class="col-auto">
               <slot :filters="data.filters" name="filters"/>
             </div>
              <div class="col-auto">
                <div class="page-utilities">
                  <div class="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div class="col-auto">
                      <div class="table-search-form row gx-1 align-items-center">
                        <div class="col-auto">
                          <input type="text" id="search-orders" v-model="data.filters.search" name="searchorders" class="form-control search-orders" placeholder="Search">
                        </div>
                        <div class="col-auto">
                          <button type="submit" @click.prevent="data.fetch()" :class="['btn btn-outline-primary mr-1' , data.loading ? 'btn-loading' : '' ]" >Search</button>
                        </div>
                      </div>

                    </div><!--//col-->
                    <div class="col-auto">

                      <div class="form-group">
                        <button @click.prevent="data.fetch()" :class="['btn btn-outline-primary mr-1' , data.loading ? 'btn-loading' : '' ]">
                          <i class="mdi mdi-autorenew fs-6"></i>
                        </button>
                        <slot class="ps-1" name="actions"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>


        <div class="col-lg-12">
            <div class="card">
                <div class="m-2">
                  <br>
                  <div class="page-utilities mr-3">
                    <div class="row g-2 justify-content-start justify-content-md-end align-items-center mr-2">
                      <div class="col-auto">
                        <label class="pe-2"><small>Sort By</small></label>
                        <select @change="data.fetch()" v-model="data.sort.field" class="form-select-sm w-auto">
                          <option value="id">ID</option>
                          <slot name="sort-fields"/>
                        </select>
                      </div>
                      <div class="col-auto">
                        <label class="pe-2"><small>Showing</small></label>
                        <select @change="data.fetch()" v-model="data.filters.size" class="form-select-sm w-auto">
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="25">25</option>
                          <option value="30">30</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                      <div class="col-auto">
                        <label class="pe-2"><small>Sort</small></label>
                        <select @change="data.fetch()" v-model="data.sort.direction" class="form-select-sm w-auto pe-2">
                          <option value="asc">Ascending</option>
                          <option value="desc">Descending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="app-card app-card-orders-table mb-5">
                    <div class="app-card-body">
                      <div class="table-responsive font-13">
                          <table class="table table-sm mb-0 text-left">
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
                    </div>
                </div>
                <div class="card-body d-flex align-items-center border-top text-sm">
                    <div class="mr-auto font-weight-bolder pe-5">
                     <small>Showing <b> {{ data.content.data.length }}</b> of <b>{{ data.content.total }}</b> Records</small>
                    </div>
                    <div v-if="data.content.total !== data.content.to && data.content.data.length > 0" >
                        <button @click="data.append()" :class="['btn-sm app-btn-primary  badge badge-primary p-2' , data.loading ? 'btn-loading' : '' ]" >Load More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


