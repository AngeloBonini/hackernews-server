var _ = require( 'lodash' );
var WPAPI = require("wpapi");

const  wp = new WPAPI({
    endpoint: "https://groupcnetdev.wpengine.com/wp-json",
    username: "abonini@redventures.com",
    password: "IaUq 61ta PFgW 7KTJ vSik FqDv",
  });

function getAllCategories(request) {
    return request.then((response) => {
        if (!response._paging || !response._paging.next) {
            return response;
        }
        return Promise.all([
            response,
            getAllCategories(response._paging.next)
        ]).then((responses)=>{
            console.log(responses)
            return _.flatten(responses);
        });
    });
}

getAllCategories(wp.categories().order('asc').orderby('id')).then((categories) => {
    let allCategories = []
    allCategories = [...categories]
    let categoriesId = allCategories.map((category)=>{
        return category.id
    })
    console.log(categoriesId)
    return categoriesId;
})

//Gets 1 to 10 random categories
let randomCategories = _.sampleSize(categoriesId, Math.floor(Math.random() * 10) + 1);
// console.log(getAllCategories())
// console.log(getAllCategories)