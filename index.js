/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.constants = {
  DEFAULT_MESSAGE: 'Hello shredder.',
}
exports.helloWorld = (req, res) => {
  let message = req.query.message || req.body.message || 'Hello shredder.';
  res.status(200).send(message);
};
