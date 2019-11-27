const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/details.controller');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/details List details
   * @apiDescription Get a list of details
   * @apiVersion 1.0.0
   * @apiName ListDetails
   * @apiGroup User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-50}}      [perPage=1]  Details per page
   * @apiSuccess {Object[]} users List of details.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

  .post(controller.list)

/**
 * @api {post} v1/details/create Create report
 * @apiDescription Create a new report
 * @apiVersion 1.0.0
 * @apiName CreateReport
 * @apiGroup User
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             email     User's email
 * @apiParam  {String{6..128}}     password  User's password
 *
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
 */
router.route('/create')
  .post(controller.create);

module.exports = router;
