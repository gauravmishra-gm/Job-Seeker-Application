import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user; // 2nd Alt Method-- const role = req.user.role;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this Resource!",
        400
      )
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  //If Any of the above Constraints are not there from title to location
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please Provide Full Job Details!", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    new ErrorHandler(
      "Please Either Provide Fixed Salary or Ranges Salary!",
      400
    );
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    new ErrorHandler(
      "Cannot Enter Fixed Salary ad Ranged Salary Together!",
      400
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Job Posted Succesfully!",
    job,
  });
});

//One could only acces his posted Jobs and not others
export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this Resource!",
        400
      )
    );
  }
  const myjobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myjobs,
  });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this Resource!",
        400
      )
    );
  }
  const { id } = req.params; //id is Params in Line 10 of JobRouter(if changed there, must change here)
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops, Job not found", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "Job Updated Succesfully!",
  });
});

//Delete the Job
export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this Resource!",
        400
      )
    );
  }
  const { id } = req.params; //id is Params in Line 10 of JobRouter(if changed there, must change here)
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops, Job not found", 404));
  }
  await Job.deleteOne();
  res.status(200).json({
    succes: true,
    message: "Job Deleted Succesfully!",
  });
});

export const getSingleJob = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    try {
        const job = await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job Not Found", 404));
        }
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(new ErrorHandler(`Invalid ID/ Cast Error`, 404));
    }
});