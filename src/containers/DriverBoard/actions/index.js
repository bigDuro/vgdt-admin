import { getCommonActions } from './common';
import { filterFields } from '../columns/filterFields';

export const getActions = (history, driver) => {
  const common = getCommonActions(history, driver);

  return common;
}
