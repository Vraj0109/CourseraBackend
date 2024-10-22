const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const Admin = new Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const Course = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  createrId: ObjectId,
});

const Purchase = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const UserModel = mongoose.model("user", User);
const CourseModel = mongoose.model("course", Course);
const AdminModel = mongoose.model("admin", Admin);
const PurchaseModel = mongoose.model("purchase", Purchase);

module.exports = {
  UserModel: UserModel,
  CourseModel: CourseModel,
  AdminModel: AdminModel,
  PurchaseModel: PurchaseModel,
};
