// A custom class for filtering API results based on query string

class APICallModifier {
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
             
    }

    filter(){
        // remove queries that do not correspond to fields from query, but instead pagination or search
        // const queryCopy = {...this.queryStr}
        // const removeParams = ['page', 'search']
        // removeParams.forEach(el => delete queryCopy[el])

        this.query = this.query.find(this.queryStr)

        // console.log(this.query);

        return this;

    }

    pagination(resPerPage){

        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)

        return this;

    }
}

export default APICallModifier