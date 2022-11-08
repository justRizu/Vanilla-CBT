module.exports = {
  GuruMapel: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
      },
      nama: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      confirmPassword: {
        type: 'string',
      },

      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
}
