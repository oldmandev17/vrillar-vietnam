class APIFeature {
  query: any
  queryStr: any
  constructor(query: any, queryStr: any) {
    this.query = query
    this.queryStr = queryStr
  }
  // Search: ?keyword=...
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i'
          }
        }
      : {}
    this.query = this.query.find({ ...keyword })
    return this
  }
  // Filter: &&year=2022&&...
  filter() {
    const queryCopy = { ...this.queryStr }
    const removeFields = ['keyword', 'limit', 'page', 'sortBy', 'orderBy']
    removeFields.forEach((field) => {
      return delete queryCopy[field]
    })
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }
  // Sort: &&sortBy=points&&orderBy=desc&&
  sorting() {
    const sort = []
    if (this.queryStr.sortBy && this.queryStr.orderBy) {
      sort[this.queryStr.sortBy] = this.queryStr.orderBy === 'desc' ? -1 : 1
    }
    this.query = this.query.sort(sort)
    return this
  }
  // Pagination: &&limit=10&&page=1&&
  pagination() {
    const { limit, page } = this.queryStr
    const currentPage = Number(page) || 1
    const skip = limit * (currentPage - 1)
    this.query = this.query.limit(limit).skip(skip)
    return this
  }
}

export = APIFeature
