var WPAPI = require("wpapi");
var _ = require( 'lodash' );
const {worker, isMainThread } = require('worker_threads');


  const  wp = new WPAPI({
    endpoint: "https://groupcnetdev.wpengine.com/wp-json",
    username: "abonini@redventures.com",
    password: "IaUq 61ta PFgW 7KTJ vSik FqDv",
  });
// var _ = require( 'lodash' );
function getAllTags(request) {
    return request.then((response) => {
        if (!response._paging || !response._paging.next) {
            return response;
        }
        return Promise.all([
            response,
            getAllTags(response._paging.next)
        ]).then((responses)=>{
            return _.flatten(responses);
        });
    });
}

getAllTags(wp.tags().order('asc').orderby('id')).then((tags) => {
    let allTags = []
    allTags = [...tags]
    let tagsIs = allTags.map((tag)=>{
        console.log(tag.id)
        return tag.id
    })

    return tagsIs;
})

//Gets 1 to 10 random categories
// let randomTags = _.sampleSize(tagsIs, Math.floor(Math.random() * 10) + 1);
// console