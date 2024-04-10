const { User } = require('../../../models');
// const { password } = require('../../../models/users-schema');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password, passwordConfirm) {
  return User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * change password match
 * @param {string} newPassword- new password
 * @param {string} hashedPassword -hashed Password
 * @returns {boolean}
 */
async function passwordMatched(password, hashedPassword) {
  const bcrypt = require('bcrypt');
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Change password
 * @param {string} id - ID
 * @param {string} newPassword -New Password
 * @returns {Promise}
 */

async function changePassword(id, newPassword) {
  try {
    const user = await User.findByIdAndUpdate(id, { password: newPassword });

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  passwordMatched,
  changePassword,
};
