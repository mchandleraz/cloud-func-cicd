/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const constants = {
  DEFAULT_MESSAGE: 'Hello shredder.',
};
exports.constants = constants;
exports.helloWorld = (req, res) => {
  let message = req.query.message || req.body.message || constants.DEFAULT_MESSAGE;
  res.status(200).send(message);
};
