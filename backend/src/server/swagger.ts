const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/user/': {
      post: {
        summary: 'Creates a user',
        tags: ['user'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new user',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes the logged in user.',
        tags: ['user'],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },
    '/favorite/': {
      post: {
        summary: 'Creates a favorite',
        tags: ['favorite'],
        parameters: [
          {
            name: 'characterId',
            in: 'body',
            required: true,
            type: 'integer',
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new favorite',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateFavorite',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a favorite by characterId (only for logged in user)',
        tags: ['favorite'],
        parameters: [
          {
            name: 'characterId',
            in: 'body',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Logs in a user',
        tags: ['auth'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Login',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns the user',
            headers: {
              'Set-Cookie': {
                schema: {
                  type: 'string',
                  example: 'SID=abcde12345; Path=/; HttpOnly',
                },
              },
            },
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
    '/ricky/': {
      get: {
        summary: 'Lists all the characters from Rick and Morty',
        tags: ['ricky'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Favorite',
            },
          },
        },
      },
    },
    '/ricky/{id}': {
      get: {
        summary: 'Gets a character by its primary key',
        tags: ['ricky'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a character with primary key',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
  },
  definitions: {
    Login: {
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        password: {
          type: 'string',
          maxLength: 255,
        },
      },
    },
    User: {
      required: ['email', 'password'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        email: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        favorites: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Favorite: {
      required: ['characterId'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        characterId: {
          type: 'integer',
          format: 'int32',
        },
        user: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateUser: {
      required: ['email', 'password'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        email: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        password: {
          type: 'string',
          maxLength: 255,
        },
      },
    },

    CreateUpdateFavorite: {
      required: ['characterId'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        characterId: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
  },
};

export default swaggerDocument;
