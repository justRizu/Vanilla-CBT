module.exports = {
  '/guru/mapel': {
    post: {
      tags: ['Guru Mapel'],
      summary: 'buat akun guru',
      security: [{ tokenoperator: [] }],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                nama: {
                  type: 'string',
                },
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
              required: ['nama', 'username', 'password'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'buat akun guru',
        },
      },
    },
  },
}
