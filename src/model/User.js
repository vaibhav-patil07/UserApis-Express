const User = function (user) {
  this.name = user.name;
  this.profileImage = user.profileImage;
  this.introduction = user.introduction;
  this.profileLink = user.profileLink;
};

User.prototype.keys = ["name", "profileImage", "introduction", "profileLink"];

module.exports = User;
