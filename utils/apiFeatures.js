class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = structuredClone(this.queryStr);

    // excludedFields
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      // A) If Sort => Sort Based On Field In Sort Query
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // B ) Not Sort => Sort Based On createdAt Field In Document
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else this.query = this.query.select("-__v");

    return this;
  }

  // search(modelName) {
  //   if (this.queryString.keyword) {
  //     let query = {};
  //     if (modelName === "Products") {
  //       query.$or = [
  //         { title: { $regex: this.queryString.keyword, $options: "i" } },
  //         { description: { $regex: this.queryString.keyword, $options: "i" } },
  //       ];
  //     } else {
  //       query = { name: { $regex: this.queryString.keyword, $options: "i" } };
  //     }

  //     this.mongooseQuery = this.mongooseQuery.find(query);
  //   }
  //   return this;
  // }

  paginate(documentsCount) {
    const page = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    const totalPages = Math.ceil(documentsCount / limit);

    this.docs = {
      page,
      totalPages: totalPages,
    };

    return this;
  }
}

module.exports = APIFeatures;
