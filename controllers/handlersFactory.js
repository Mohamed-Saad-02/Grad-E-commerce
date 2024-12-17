const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.deleteOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Modal.findByIdAndDelete(id);

    if (!document)
      return next(new AppError(`No document for this id ${id}`, 404));

    res.status(204).send();
  });

exports.updateOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const document = await Modal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document)
      return next(
        new AppError(`No document for this id ${req.params.id}`, 404)
      );

    res.status(200).json({
      status: "success",
      data: document,
    });
  });

exports.createOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Modal.create(req.body);
    res.status(201).json({ status: "success", data: newDoc });
  });

exports.getOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Modal.findById(id);
    if (!document)
      return next(new AppError(`No document for this id ${id}`, 404));

    res.status(200).json({ status: "success", data: document });
  });

exports.getAll = (Modal) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.filterObj) filter = req.filterObj;

    // Build Query
    const documentsCount = await Modal.countDocuments();

    const apiFeatures = new APIFeatures(Modal.find(filter), req.query)
      .paginate(documentsCount)
      .filter()
      .limitFields()
      .sort();

    // Execute Query
    const { query, docs } = apiFeatures;
    const documents = await query;

    res.status(200).json({
      status: "success",
      results: documents.length,
      total: documentsCount,
      docs,
      data: documents,
    });
  });
