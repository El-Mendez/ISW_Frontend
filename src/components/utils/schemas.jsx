const z = require('zod');

const contact = z.object({
  facebook: z.string(),
  instagram: z.string(),
});

module.exports = { contact };
