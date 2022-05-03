import AdminBro from 'admin-bro';
import { User, Favorite, Session } from 'data/models';

const initializeAdminBroRoutes = () =>
  new AdminBro({
    rootPath: '/admin',
    resources: [
      {
        resource: User,
        options: {
          parent: {
            name: 'Database',
            icon: 'Api',
          },
          listProperties: ['id', 'email', 'password', 'salt'],
        },
      },
      {
        resource: Favorite,
        options: {
          parent: {
            name: 'Database',
            icon: 'Api',
          },
          listProperties: ['id', 'characterId'],
        },
      },
      {
        resource: Session,
        options: {
          parent: {
            name: 'Database',
            icon: 'Api',
          },
          listProperties: ['sid', 'sess', 'expire'],
        },
      },
    ],
    branding: {
      logo: false,
      companyName: 'Haufe',
      softwareBrothers: false,
      favicon:
        'https://assets.website-files.com/591e6251f13786217f2e1ff8/591e6251f13786217f2e2062_16132_LO_Haufe_Group_RGB_pos_en.svg',
    },
  });

export default initializeAdminBroRoutes;
