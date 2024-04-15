import { LogFactory } from '../Logger/Winston';
import { PoolConnection } from 'mysql2';
import { pool } from './DatabaseSetupMysql';

const logger = LogFactory.getLogger({ name: 'QueryWrapper' });

export const getConnection = async (): Promise<PoolConnection> => {
  return new Promise(async (resolve, reject) => {
    pool.getConnection(function (err: any, connection: any) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

export type BindValue = number | string | Date | boolean;
export const execute = async function (query: string, bindValuesArray: BindValue[] = []) {
  return new Promise(async (resolve, reject) => {
    const connection = await getConnection();
    try {
      connection.query(query, bindValuesArray, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (e) {
      reject(e);
    } finally {
      connection.release();
    }
  });
};
