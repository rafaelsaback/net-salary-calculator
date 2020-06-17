import { useEffect } from 'react';
import isEmpty from 'lodash-es/isEmpty';

import { PersistenceService } from './services/persistence-service';

export const usePersistedData = (
  key: string,
  defaultValue: any,
  callbackFunc: (data: any) => void,
) => {
  useEffect(() => {
    PersistenceService.getData(key)?.then((persistedData) => {
      const data = isEmpty(persistedData) ? defaultValue : persistedData;
      callbackFunc(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
