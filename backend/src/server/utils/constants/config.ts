import { IStrategyOptions } from 'passport-local';

export const pasportFields: IStrategyOptions = {
  usernameField: 'email',
} as const;

export const sessionFields: Readonly<Record<string, string>> = {
  session_id: 'sid',
  session_data: 'sess',
  expire: 'expire',
} as const;
